+++
Categories = ["Swift", "iOS"]
Description = ""
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS"]
author = "Igor Kulman"
date = "2025-06-18T05:29:12+01:00"
title = "Migrating internal iOS libraries to a monorepo using Swift Package Manager"
url = "/migrate-pods-to-local-spm-in-monorepo"

+++

I recently worked on an iOS project where we decided to move away from Cocoapods and Git submodules, and migrate our internal libraries to Swift Package Manager. At the same time, we wanted to consolidate everything into a monorepo to make development and dependency management simpler. One important requirement was to preserve the full Git history of each library during the migration.

## Motivation

The main motivation for this migration was that CocoaPods is effectively end-of-life—it is no longer actively maintained or recommended for new projects by many in the iOS community. Relying on it long-term did not seem sustainable. Additionally, the previous setup using Git submodules was cumbersome—each change to a shared library required creating a pull request in the library’s own repository and then another one in the main app to update the submodule reference. Keeping things in sync was tedious and error-prone. This made even simple changes unnecessarily complicated.

The project used several internal libraries, each added as a Pod and included as a submodule. My task was to take each library, convert it to SPM, and migrate it into the main app repository with its full history preserved.

## Converting the library to Swift Package Manager

For each library, I cloned it locally and created a new branch (e.g. `spm`) where I replaced the podspec and folder structure with a `Package.swift`. I restructured the source code into the standard Swift Package Manager layout and verified that everything still compiled and tests passed.

## Rewriting history and merging into the monorepo

Once the Swift Package Manager migration was complete, I needed to move the library into the main app repo under the `Modules` directory while preserving its entire Git history. This is where [`git filter-repo`](https://github.com/newren/git-filter-repo) comes in handy.

I used the following command to rewrite the library's history so that all its content lives in `Modules/LibraryName`

```bash
git filter-repo --to-subdirectory-filter Modules/LibraryName
```

Then I added the filtered repository as a remote to the monorepo and merged it

```bash
git remote add libraryname ../libraryname
git fetch libraryname
git merge --allow-unrelated-histories libraryname/spm
git remote remove libraryname
```

After this, I had:
- the library’s code under `Modules/LibraryName`
- full commit history preserved
- no conflicts with the root of the monorepo

## Removing the old submodule

Since the library was previously added as a Git submodule, I needed to remove it. I created a small script to cleanly do that:

```bash
#!/bin/bash

# Usage: ./remove-submodule.sh path/to/submodule

set -e

SUBMODULE_PATH=$1

if [ -z "$SUBMODULE_PATH" ]; then
  echo "❌ Usage: $0 path/to/submodule"
  exit 1
fi

# Step 1: Remove the submodule entry from .gitmodules
echo "🧹 Removing $SUBMODULE_PATH from .gitmodules"
git config -f .gitmodules --remove-section submodule."$SUBMODULE_PATH" || true
git add .gitmodules

# Step 2: Remove the submodule entry from .git/config
echo "🧹 Removing $SUBMODULE_PATH from .git/config"
git config --remove-section submodule."$SUBMODULE_PATH" || true

# Step 3: Unstage and remove the submodule directory
echo "🗑️ Removing tracked submodule directory"
git rm --cached "$SUBMODULE_PATH"

# Step 4: Delete the actual directory (working copy)
echo "🧨 Deleting $SUBMODULE_PATH"
rm -rf "$SUBMODULE_PATH"

echo "🎉 Submodule $SUBMODULE_PATH removed successfully"
```
After running the script, I re-ran pod install to update the workspace and changed the project configuration to use the local Swift Package Manager package instead of the old Pod.

One important thing to note is that while the pull request with the merged library is open, no one should merge anything else into the `develop` branch. Rebasing the branch that contains the history rewrite and monorepo merge is extremely difficult due to the volume of changes and Git's handling of rewritten commit trees. It's best to coordinate with the team and temporarily lock `develop` for the duration of the migration.

I followed the same process for each internal library. In the end, we ended up with a cleaner and more maintainable setup using Swift Package Manager and a monorepo. The migration removed the overhead of managing submodules and the limitations of CocoaPods, making the development workflow much smoother.