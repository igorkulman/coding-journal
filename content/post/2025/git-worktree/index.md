+++
Tags = ["iOS", "Git", "Development Workflow"]
author = "Igor Kulman"
date = "2025-07-30T05:29:12+01:00"
title = "Using Git worktrees for development"
url = "/git-worktree"

+++

When working on iOS applications, I often find myself in situations where I need to develop a new feature while simultaneously fixing a bug. This can be challenging to manage, especially when the changes for the feature and the bug fix overlap. Developers have different approaches to handle this:

- Stashing changes
- Creating temporary commits
- Cloning the repository twice

While these methods work, they are not ideal. Recently, I discovered a better solution.

## Git worktree

Git worktree is a lesser-known feature of Git that I wish I had started using sooner. It allows you to check out multiple branches of the same repository at the same time. This means you can work on a feature branch and a bug fix branch simultaneously, without needing to stash changes or create temporary commits.

Using Git worktree is straightforward

```bash
git worktree add ../bugfix-branch bugfix-branch
```

This creates a new directory (`../bugfix-branch`) where the `bugfix-branch` is checked out. You can now work on this branch independently of your current branch.

You can also create a worktree not just from an existing branch, but from a specific commit or tag

```bash
git worktree add ../hotfix v1.2.3
```
This will check out the tag `v1.2.3` in a new worktree so you can inspect or modify files without switching branches in your main working directory.

To remove a worktree, you can use:
```bash
git worktree remove ../bugfix-branch
```

Alternatively, you can manually delete the folder

```bash
rm -rf ../bugfix-branch
```

If you delete it manually, Git will still list it as a worktree, so you need to prune it

```bash
git worktree prune
```

or configure Git to prune automatically

```bash
git config worktree.prune true
```

If you prefer using a GUI, tools like [Fork](https://fork.dev/) for macOS support Git worktree. You can easily manage worktrees through the interface without needing to use the terminal.

Git Worktree simplifies the development workflow by allowing you to:

- Work on multiple branches simultaneously
- Avoid stashing or temporary commits
- Keep your repository clean

This feature has been a game-changer for my iOS development workflow, and I highly recommend giving it a try.
