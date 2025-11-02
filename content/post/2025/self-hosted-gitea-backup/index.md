+++
Description = ""
Tags = ["Self-Hosting", "Gitea", "Git", "Backup"]
author = "Igor Kulman"
date = "2025-11-05T05:29:12+01:00"
title = "Backing up my repositories to self-hosted Gitea"
url = "/self-hosted-gitea-backup"

+++

I’ve been gradually moving more of my setup to self-hosted services. After [turning my old ThinkPad into a home server](https://github.com/igorkulman/thinkserver), one of the next logical step was to back up all my Git repositories.

Most of my projects live on [GitHub](https://github.com/igorkulman/), and other places I use for contract work.

For a while, I just ran an `rsync` backup of my local clones. It worked, but it wasn’t a real solution — no metadata, no browsing, and no way to restore easily.

I wanted something that behaved like a proper Git hosting platform but ran under my control.

That is where [Gitea](https://about.gitea.com/) came in. It is lightweight, fast, and easy to self-host. Once I had it running, I started migrating everything there.

## Migrating archived and inactive private repositories

I started with my older archived and inactive private repositories on GitHub.

I got a list of all of them

```bash
gh repo list igorkulman --visibility=private --archived --json name,url --limit 1000 > archived.json
jq -r '.[] | [.name, .url] | @tsv' archived.json > repos.tsv
```

generated a Gitea access token under **Settings → Applications → Generate Token**, giving it at least the repository scope and ran a migration script I wrote

```bash
#!/usr/bin/env bash

GITEA_URL="https://git.example.com"
GITEA_TOKEN="YOUR_GITEA_TOKEN"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
GITHUB_USER="YOUR_USERNAME"

while IFS=$'\t' read -r name url; do
  echo "Migrating $name"
  curl -s -X POST "${GITEA_URL}/api/v1/repos/migrate" \
    -H "Content-Type: application/json" \
    -H "Authorization: token ${GITEA_TOKEN}" \
    -d "{
      \"clone_addr\": \"${url}.git\",
      \"auth_username\": \"${GITHUB_USER}\",
      \"auth_token\": \"${GITHUB_TOKEN}\",
      \"repo_name\": \"${name}\",
      \"private\": true,
      \"mirror\": false
    }"
done < repos.tsv
```

After confirming all the repositories were imported correctly, I deleted them from GitHub

```bash
jq -r '.[].name' archived.json > to_delete.txt
gh auth refresh -h github.com -s delete_repo
while read -r name; do
  echo "Deleting $name"
  gh repo delete igorkulman/$name --yes
done < to_delete.txt
```

## Backing up active repositories with mirroring

For my active private and public repositories, I wanted automatic updates instead of one-time imports.

Gitea’s migration API supports that too — just set `"mirror": true` in the request body

```bash
#!/usr/bin/env bash

GITEA_URL="https://git.example.com"
GITEA_TOKEN="YOUR_GITEA_TOKEN"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
GITHUB_USER="YOUR_USERNAME"

while IFS=$'\t' read -r name url; do
  echo "Setting up mirror for $name"
  curl -s -X POST "${GITEA_URL}/api/v1/repos/migrate" \
    -H "Content-Type: application/json" \
    -H "Authorization: token ${GITEA_TOKEN}" \
    -d "{
      \"clone_addr\": \"${url}.git\",
      \"auth_username\": \"${GITHUB_USER}\",
      \"auth_token\": \"${GITHUB_TOKEN}\",
      \"repo_name\": \"${name}\",
      \"private\": true,
      \"mirror\": true
    }"
done < repos.tsv
```

This creates the repositories in Gitea as mirrors of the GitHub originals.

Gitea automatically fetches updates at the interval set in your server configuration (`[mirror] DEFAULT_INTERVAL`).

That keeps my Gitea instance in sync with all my current work without me needing to run the script again.

## Backing up client repositories

For some client projects hosted elsewhere, I just mirror them manually from my local clone

```bash
git remote add backup ssh://git.example.org/user/repo.git
git push --mirror backup
```

That pushes everything, branches, tags, ref, exactly as they exist locally, so **including changes I have not pushed yet**. It’s simple and reliable, especially for environments where I do not control the remote server.

Now all my repositories, personal, archived, active, and client, live safely on my self-hosted Gitea.

It’s not about replacing GitHub, but about having control, redundancy, and peace of mind knowing every line of code I’ve ever written also exists on hardware I own.
