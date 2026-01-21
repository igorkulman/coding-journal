+++
title = "Beating App Store review: lessons from shipping a minimal indie game"
description = "What App Store ‘Minimum Functionality’ really means, based on shipping a focused, minimal indie game and navigating multiple review rejections."
tags = ["iOS", "Indie Development", "App Store", "Game Development", "SpriteKit"]
author = "Igor Kulman"
date = "2026-03-11T07:00:00+01:00"
url = "/beating-app-store-review"
+++

Shipping a small, focused app on the App Store sounds straightforward.
Build the app, make sure it works, submit it, done.

That was my assumption when I finished my first iOS game — a minimal, offline, pixel‑art push‑box puzzle inspired by classic warehouse logic games.

What followed instead was a multi‑week back‑and‑forth with App Store Review, several rejections, and a slow realization that **“simple” and “complete” are not the same thing in Apple’s eyes**.

This post documents what actually caused the rejections, what changes finally made the app pass review, and what I learned in the process. If you are building a minimal or retro‑style indie app, this will likely save you time.

I like building small, focused things. I like when they work, and I like shipping them. I thought the App Store would see it the same way.

I was wrong.

## The app

The game itself is deliberately simple.

It is a classic push‑box logic puzzle game:

- Grid‑based levels
- Push objects onto target tiles
- No timers
- No randomness
- No power‑ups
- No ads
- No subscriptions
- Fully offline

Just logic puzzles.

I originally built a version of this game years ago for Windows Phone 7, later rewrote it using SpriteKit as a personal project, and eventually decided to clean it up and ship it properly on iOS.

By the time I submitted it:
- it had hundreds of handcrafted levels
- a clean menu and level selection
- undo and restart
- a tutorial
- statistics
- achievements
- optional extra levels as a one‑time purchase

From my perspective, this was clearly a *complete game*.

App Store Review disagreed.

I thought: lots of levels, no bugs, no ads, no nonsense. What else could they want?


## Rejection #1: “Minimum Functionality” (Guideline 4.2)

The first rejection cited Guideline 4.2 – Design – Minimum Functionality:

> “The usefulness of the app is limited by the minimal functionality it currently provides.”

This was confusing at first. The app had many levels, working controls, multiple screens, and no obvious missing features.

The issue was not whether the game *worked*.
It was whether it **looked complete to a reviewer opening it for the first time**.

What was missing from Apple’s perspective:

- No obvious long‑term progression signals
- No visible meta systems early on
- Limited feedback beyond “level completed”
- A tutorial that assumed too much
- No explicit framing of scope


In other words, the game was playable, but it did not *advertise* its completeness.

It worked, but it did not *look* finished enough. Not to someone seeing it cold.

## Tutorial clarity matters more than you think

One recurring problem was the first level.

Originally:
- The tutorial was subtle
- The level could technically be failed
- Controls were explained briefly

From a developer’s point of view this felt fine. From a reviewer’s point of view, it was not.

What finally worked:

- The first level was redesigned to be **non‑failable**
- A one‑time tutorial overlay clearly explained movement
- Completing the level immediately showed post‑level feedback

This single change had more impact than adding new gameplay features.

**Reviewers need to be guided, not just left to figure things out. The first impression is everything.**

## Rejection #2: Pixel art vs “low quality visuals”

Another rejection cited low‑resolution or jagged images.

The visuals were intentionally pixel art. That intent did not matter.

**App Store Review does not evaluate artistic intent — it evaluates polish signals.**

What helped:

- Ensuring correct scaling on all devices, especially iPad
- Avoiding unintended interpolation or blurring
- Framing screenshots carefully with enough negative space
- Making sure pixel art looked deliberate, not accidental

Pixel art is allowed, but only if it looks controlled and intentional at a glance.

If it looks rough, it is rejected. If it looks intentional, it is fine. The difference is in the details, not the style.

## Rejection #3: Copycat concerns and naming

One of the more surprising — and honestly confusing — rejections was under Guideline 4.1 (Copycats).

Despite the game being clearly in a long‑established genre, I was asked to remove the genre name from the app name and metadata to avoid “misleading association”.

**Apple treats naming literally, not historically.**

What ultimately worked was renaming the app to a neutral, original name and removing the genre term from visible metadata.

Nothing about the gameplay changed.
Sometimes, the only fix is to just do what they ask, even if it feels silly.
Arguing rarely helps; compliance usually does.

## What actually made the app pass review

The changes that finally pushed the app through review were mostly about presentation and clarity, not scope:

- A clearly non‑failable tutorial level
- Explicit tutorial overlays
- A visible statistics screen
- Game Center achievements surfaced in the UI
- Clear level pack structure (free vs optional extras)
- Clean, factual App Store description
- Calm, specific review notes
- Screenshots framed as features, not raw gameplay

None of these changed the core game.
They changed how finished it *looked*.
I did not add more content. I just made it more obvious that the content was there.

## What I learned

A few things became very clear during this process:

- App Store Review optimizes for average users, not genre experts
- Minimal apps need extra signals of completeness
- Metadata and screenshots matter as much as code
- “Classic” or “retro” is not an automatic justification
- Simplicity has to be explained, not assumed

## The result

The game is now live on the App Store as **Dungeon Pusher**, a classic push-box puzzle game focused on offline, distraction-free play.

App Store: https://apps.apple.com/us/app/dungeon-pusher/id6757638518

If you are building a minimal or retro‑style indie app, expect to spend time proving completeness, not correctness.

And if App Store Review tells you your app is “too simple”, read that as:

> “Show us more clearly why this is finished.”

Sometimes, the hardest part is not building the thing. It is convincing someone else it is really done.
