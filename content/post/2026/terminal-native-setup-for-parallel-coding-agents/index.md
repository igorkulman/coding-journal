+++
title = "My terminal-native setup for parallel coding agents"
description = "How I use Ghostty, Git worktrees, Herdr, Tailscale, and Heeler to run and remotely manage parallel coding agents."
author = "Igor Kulman"
date = "2026-09-16T05:29:12+01:00"
tags = ["AI", "Coding Agents", "Developer Tools", "Terminal", "Git"]
keywords = ["Ghostty", "Herdr", "Heeler", "Git worktrees", "Pi", "coding agents", "Tailscale"]
url = "/terminal-native-setup-for-parallel-coding-agents"
+++

In [my previous post about Pi](/pi-is-now-my-ai-harness), I wrote about wanting a stable coding harness while the models underneath it keep changing. But one agent in one terminal is not the whole workflow. I increasingly have several agents working at once, sometimes in the same repository.

The surprising part is that I manage that with a simpler stack: a terminal, Git worktrees, and a terminal multiplexer built for agents.

My current setup is mostly [Ghostty](https://ghostty.org/), [Git worktrees](https://git-scm.com/docs/git-worktree), and [Herdr](https://herdr.dev/). It also has the nice property that I can access the whole thing remotely, even from my iPhone.

## The stack at a glance

```text
Ghostty → Herdr → Git worktrees → Pi sessions
   iPhone → Heeler → Tailscale + SSH → Herdr
```

## Ghostty is the terminal

I use Ghostty as my terminal on macOS.

I like that it is a native macOS application rather than an Electron app, and that it is focused on doing terminal fundamentals well. I also follow its author, Mitchell Hashimoto, and appreciate his general approach to building software: native where it makes sense, fast, and focused.

One Ghostty feature has become particularly useful since I started working more with coding agents: inline images.

Ghostty supports the Kitty graphics protocol, so terminal applications can display images directly inside the terminal. Pi takes advantage of this. If an image is part of my conversation with the agent, I can see it alongside the text.

That matters for the Xcode and Figma workflow I described in the previous post. A rendered SwiftUI preview or a design reference can be part of the same terminal conversation in which the agent is implementing the screen. The terminal no longer has to be a text-only interface.

## Coding agents made Git worktrees much more useful

Working with one coding agent is easy. Things become more interesting once I want several of them working in parallel.

I might have one agent implementing something while another investigates a bug and a third works on an unrelated change. They cannot all happily modify the same working directory.

Git already has a solution for this: worktrees.

A worktree gives each task its own working directory and branch while still belonging to the same Git repository. This makes worktrees a natural fit for coding agents. Give every task its own worktree and every agent gets an isolated environment to work in.

On a typical day, I might have one agent implementing a feature, another investigating a bug, and a third reviewing a change. Each gets its own worktree, branch, and Herdr workspace.

Worktrees isolate filesystem changes; they do not make overlapping tasks safe. I still give agents separate, well-defined work.

The problem then shifts from Git to managing all those terminals and worktrees.

## From Superset to Herdr

My first solution was [Superset](https://superset.sh/), which is built around exactly this idea: running coding agents in parallel using Git worktrees.

Conceptually, it was what I wanted. In practice, it felt heavier and less reliable than I wanted for a workflow that is ultimately terminals and Git worktrees.

Then I found Herdr.

The best description of Herdr comes from the project itself: if you have used tmux, it is basically that, rebuilt for agents. That is also a good description of why I like it.

Herdr runs inside my existing terminal. It provides persistent sessions with workspaces, tabs, and panes, but it also understands the things that make coding agents different from normal terminal processes. In particular, it understands Git worktrees.

I can create another worktree for a repository and have it appear as another Herdr workspace. Each worktree can have its own agent working on a separate branch, while Herdr keeps them grouped under the same project.

Herdr also tracks the state of coding agents. Instead of manually switching between terminals to see what is happening, I can see whether an agent is working, idle, finished, or blocked waiting for me.

So my mental model is simply tmux that knows about coding agents and Git worktrees.

I could do this with tmux, but Herdr adds the two things I would otherwise manage manually: worktree-aware workspaces and agent-status awareness.

## The same setup works over SSH

An unexpected benefit of keeping everything terminal-native is that the development environment is not really tied to my Mac’s display.

Herdr sessions are persistent. I can detach from them, SSH into the machine later, and reattach to exactly the same agents.

I use [Tailscale](https://tailscale.com/) for connectivity, so my Mac is reachable without exposing SSH to the public internet. As long as the Mac is online, I can connect from another computer and continue working with the same Herdr session. I can even do it from my iPhone.

Of course, using a normal terminal on an iPhone is not particularly pleasant. But coding agents change the requirements considerably.

I do not need to write code on my phone. The agent is doing that.

What I usually need is to see what the agent has done, answer a question, approve something, or give it another instruction.

## Checking my agents from an iPhone

For that there is [Heeler](https://github.com/ZingerLittleBee/Heeler).

Heeler is a native iOS companion for Herdr. It connects to machines running Herdr over SSH and presents the agents in an interface designed for a phone.

Instead of trying to operate an entire terminal multiplexer through a tiny SSH client, I can see which agents need attention, open one, inspect its live terminal, and send it another instruction.

It can also notify me when an agent needs attention.

There is a nice bit of symmetry here: Heeler uses Ghostty’s libghostty for its terminal rendering. Ghostty therefore sits at both ends of the setup—as the terminal application on my Mac and as the terminal engine inside the iPhone app I use to remotely interact with the agents.

With Tailscale providing connectivity, I can leave an agent working on my Mac, walk away, and later check what it needs from my phone.

That is much more useful to me than trying to turn an iPhone into a development machine.

## Complexity without a complicated stack

There are increasingly sophisticated applications being built specifically around coding agents. Many combine agents, editors, Git management, diffs, terminals, and task management into a new development environment.

I ended up moving in almost the opposite direction.

My current stack is:

- Ghostty as a native macOS terminal with inline image support
- Pi as my coding agent
- Git worktrees to isolate parallel tasks
- Herdr to manage those worktrees, terminals, and agents
- Tailscale and SSH for remote connectivity
- Heeler when I want to check on the agents from my iPhone

Each piece does one relatively small thing, and they compose well.

That is what I like most about the setup. Coding agents have made it practical to have much more work happening in parallel, which could easily result in an increasingly complicated development environment.

Instead, I ended up with something that is essentially Git, a terminal, and a modern version of tmux.

The agents got more sophisticated. The tooling around them did not have to.
