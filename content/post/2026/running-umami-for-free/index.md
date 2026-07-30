+++
title = "Running Umami analytics for free on Vercel and Supabase"
description = "How I replaced hosted analytics with my own Umami deployment using Vercel, Supabase, and Netlify — including the database pooling trap that only appeared after a redeployment."
author = "Igor Kulman"
date = "2026-08-12T07:00:00+02:00"
tags = ["Umami", "Analytics", "Self-Hosting", "Vercel", "Supabase", "Netlify"]
Keywords = ["Umami", "privacy-friendly analytics", "Vercel", "Supabase", "Netlify", "PostgreSQL", "self-hosted analytics"]
url = "/running-umami-for-free"
+++

I have never used Google Analytics on my personal websites. It always felt far too invasive and complicated for what I actually wanted to know: whether anyone reads my articles, which pages people visit, and where they came from.

For a while I used [Simple Analytics](https://www.simpleanalytics.com/). It was privacy-friendly and did exactly what I needed, but it was still somebody else's analytics service. I wanted to try running something under my own control instead.

I found Hans-Jørgen Hjerpbakk's article about [self-hosting Umami](https://hjerpbakk.com/blog/2026/07/11/self-hosting-umami), using Fly.io for the application, Supabase for PostgreSQL, and a Cloudflare Worker as a first-party proxy.

It was almost what I wanted, but not quite. Fly.io is no longer free for new accounts, and using the Cloudflare Worker would mean moving my DNS to Cloudflare. I wanted the whole setup to cost nothing and I did not want to move DNS just for analytics.

My websites were already hosted on Netlify, so I ended up with this instead:

```text
Website on Netlify
        ↓ same-origin rewrite
Umami on Vercel
        ↓
Supabase PostgreSQL
```

The result costs me nothing for the traffic my personal websites receive. Getting there was not difficult, but there were a few traps — especially one involving Supabase connection pooling that only appeared after a fresh Vercel deployment.

## Deploying Umami without running a server

[Umami](https://umami.is/) is open source and has an official [Vercel deployment guide](https://docs.umami.is/docs/guides/running-on-vercel). Vercel can create a private GitHub repository from the Umami source and deploy it as a Next.js application.

The application needs a PostgreSQL database, so I created a free Supabase project in the same general region as the Vercel deployment.

The important environment variables are:

```text
DATABASE_URL
DIRECT_DATABASE_URL
APP_SECRET
DISABLE_TELEMETRY=1
```

`APP_SECRET` should be a random value. It can be generated locally with:

```bash
openssl rand -hex 32
```

The two database URLs look redundant, but they serve different purposes. This distinction turned out to be the most important part of the whole setup.

## The Supabase connection pooling trap

Supabase offers multiple ways to connect to PostgreSQL. I initially used the **session pooler on port 5432** for `DATABASE_URL`.

The first deployment worked. Umami created its tables, I could log in, and analytics events appeared in the dashboard. Nothing suggested the configuration was wrong.

Later I pushed another change, causing Vercel to perform a completely fresh deployment. The Umami homepage and heartbeat endpoint still worked, but login and every other database-backed request returned HTTP 500.

The Vercel logs contained the actual explanation:

```text
EMAXCONNSESSION: max clients reached in session mode
max clients are limited to pool_size: 15
```

The session pooler reserves a connection for each client session. That is a poor match for serverless platforms where multiple function instances can appear and hold their own connections. The likely explanation was that the original deployment had used enough of the available pool that the fresh one exhausted the remaining slots.

The correct setup is to use Supabase's **transaction pooler on port 6543** for normal application traffic:

```text
DATABASE_URL=postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true
```

Database migrations need a non-transaction-pooled connection. Supabase's direct connection (`db.YOUR-PROJECT.supabase.co:5432`) is preferred when it is reachable; the session pooler (`...pooler.supabase.com:5432`) can be used from an IPv4-only environment instead. I used the session pooler:

```text
DIRECT_DATABASE_URL=postgresql://...pooler.supabase.com:5432/postgres
```

Umami uses `DATABASE_URL` while the application is running and `DIRECT_DATABASE_URL` when executing `prisma migrate deploy` during a build.

After changing the runtime URL to port 6543, keeping the port 5432 session-pooler URL only for migrations, and redeploying, database access worked normally again. I also verified a clean production build with migrations enabled. There were no pending migrations, login returned a normal authentication response instead of HTTP 500, and the tracker continued accepting events.

During recovery I temporarily set `SKIP_DB_MIGRATION=1`. That can be useful to get a broken deployment online, but it must not remain enabled. Otherwise a future Umami update can deploy new application code without applying the corresponding database schema changes.

This was the deceptive part: the wrong pooler did not fail during setup. It worked until a later deployment changed the number of active connections.

## Making analytics requests first-party with Netlify

The original article used a Cloudflare Worker to expose the Umami tracker under the website's own domain. Because my sites already run on Netlify, I could do the same thing with two rewrite rules and no additional service.

My Hugo sites use a `_redirects` file containing:

```text
/np/x.js https://YOUR-UMAMI.vercel.app/script.js 200
/np/api/send https://YOUR-UMAMI.vercel.app/api/send 200
```

The `200` is important. These are rewrites, not redirects. The visitor's browser never navigates to Vercel. Netlify receives the request and proxies it internally.

The corresponding Umami tracker is:

```html
<script
  defer
  src="/np/x.js"
  data-website-id="YOUR-WEBSITE-ID"
  data-host-url="https://YOUR-DOMAIN/np"
  data-domains="YOUR-DOMAIN"
></script>
```

Both browser requests now go to the website itself:

```text
https://YOUR-DOMAIN/np/x.js
https://YOUR-DOMAIN/np/api/send
```

That has a few useful properties:

- The browser makes no cross-origin analytics requests, so there is no CORS configuration to maintain.
- The tracker and collection endpoint appear under the website's own domain.
- The unusual paths are less obvious than loading a script from an analytics hostname, although this is not a guarantee against blocking.
- The Umami deployment can move without changing the HTML on every page; only the Netlify rewrite target needs updating.

I deliberately kept the generated Vercel hostname as the Netlify proxy destination. Visitors never see that internal destination, and tracking does not depend on my custom dashboard DNS working.

## Keeping a private Vercel repository updated

There was another unexpected detail. The private GitHub repository created by Vercel was not a real GitHub fork of Umami. It was a standalone snapshot with a single initial commit, so GitHub's normal **Sync fork** functionality was unavailable.

I wanted stable Umami releases to reach the deployment automatically. I did not want to track every commit on the upstream development branch, and I did not need preview pull requests for a personal analytics dashboard.

I added a scheduled GitHub Actions workflow that asks GitHub for the latest stable release, copies that release over the private snapshot, and pushes any changes directly to `main`:

```yaml
name: Sync upstream release

on:
  schedule:
    - cron: "17 6 * * *"
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: sync-upstream-release
  cancel-in-progress: true

jobs:
  sync:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Check out repository
        uses: actions/checkout@v5

      - name: Get latest stable release
        id: release
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          tag="$(gh api repos/umami-software/umami/releases/latest --jq .tag_name)"
          echo "tag=$tag" >> "$GITHUB_OUTPUT"

      - name: Copy release files
        env:
          RELEASE_TAG: ${{ steps.release.outputs.tag }}
        run: |
          git clone \
            --branch "$RELEASE_TAG" \
            --depth 1 \
            https://github.com/umami-software/umami.git \
            "$RUNNER_TEMP/umami-upstream"

          rsync -a --delete \
            --exclude='.git/' \
            --exclude='.github/workflows/' \
            "$RUNNER_TEMP/umami-upstream/" ./

      - name: Commit and deploy update
        env:
          RELEASE_TAG: ${{ steps.release.outputs.tag }}
        run: |
          if git diff --quiet && test -z "$(git ls-files --others --exclude-standard)"; then
            echo "Already synchronized with $RELEASE_TAG"
            exit 0
          fi

          git config user.name "YOUR-GITHUB-USERNAME"
          git config user.email "YOUR-GITHUB-NOREPLY-EMAIL"
          git add --all
          git commit -m "Update Umami to $RELEASE_TAG"
          git push origin HEAD:main
```

The workflow preserves its own directory while replacing everything else with the contents of the latest release. It uses the built-in `GITHUB_TOKEN`, so a personal access token is not necessary.

It currently checks once a day. Most runs do nothing because the repository already matches the latest release. When a new stable release appears, the push to `main` triggers a Vercel production deployment, and the build applies any pending migrations through `DIRECT_DATABASE_URL`.

Automatically deploying database migrations without review is a trade-off. For an important or high-traffic installation I would open a pull request, inspect the release notes, and verify a preview first. For my personal analytics, following only stable releases is a level of risk I am comfortable with.

## Is this really self-hosting?

Not in the traditional sense. There is no server in my home and no virtual machine I administer. Vercel runs the application, Supabase runs PostgreSQL, and Netlify proxies the website requests. All three are third-party infrastructure providers, and their free tiers or terms can change.

What I control is the Umami deployment, its configuration, and the database account containing the analytics data. I am not sending my visitors to Google Analytics or buying analytics as a hosted product. I can export the database, move Umami elsewhere, or replace any part of the stack.

I am comfortable calling that **self-hosted software on managed infrastructure**, but not independence from third parties.

## The final setup

The setup now consists of:

- Umami running on the Vercel Hobby plan
- PostgreSQL in a Supabase free project
- `DATABASE_URL` using the transaction pooler on port 6543
- `DIRECT_DATABASE_URL` using the port 5432 session pooler for migrations
- Same-origin tracker and collection URLs through Netlify rewrites
- A private GitHub repository following stable Umami releases automatically
- No permanent migration bypass

The most valuable lesson was not how easy Umami was to deploy. It was how easily a serverless database configuration could look correct while being one deployment away from failure.

Once the pooler was configured correctly, the rest became pleasantly boring. My websites make first-party analytics requests, the data goes to an Umami installation I control, stable releases deploy automatically, and the total monthly cost remains zero.
