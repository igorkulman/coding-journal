+++
Categories = ["Swift", "iOS", "Xcode"]
Description = ""
Tags = ["Swift", "iOS", "Xcode"]
Keywords = ["Swift", "iOS", "Xcode"]
author = "Igor Kulman"
date = "2018-10-10T08:29:12+01:00"
title = "Building iOS dependencies with Carthage"
url = "/building-ios-depedencies-with-carthage"

+++

In all my iOS projects I use and strongly prefer [Carthage](https://github.com/Carthage/Carthage). It is easy to use, does not do any changes to your project, all the dependencies are built just once and then linked to the project as frameworks. There are many good posts about the advantages of Carthage compared to CocoaPods so in this post I will just focus on the actual usage.

All your Carthage dependencies are listed in a `Cartfile` file in the root of your project. In case you split your app into multiple projects like I do, there is a `Cartfile` for every project in the workspace. Next to every `Cartfile` there is a `Cartfile.resolved` file pinning all your dependencies to a specific version.

You just need to keep those two files in your source control and then run `carthage bootstrap` when you clone the project so Carthage downloads and builds all the dependencies. This happens just once for a developer, but it is slow and time consuming. When you use CI for automatic builds, it becomes a real time waste rebuilding all the dependencies before each build.

Developers typically try to speed things up with multiple approaches

* **Keeping `Carthage/Checkouts` in source control**. This makes the repo bigger by keeping unnecessary files, the checkout is faster but the build is still slow.
* **Keeping `Carthage/Build` in source control**. This also makes the repo bigger, potentially much bigger if you update your dependencies often, but the build times are super fast as there is nothing to actually build.
* **Caching the Carthage builds**. This does not make the repo bigger and can be really slow when done properly

I personally started with the second approach, but had to abandon it because of the repo size. After a few trials and errors I came up with this variation with the third approach

* Keep just `Cartfile` and `Cartfiles.resolved` in the repo
* Have the CI cache the `Carthage/Build` folder between builds for each Xcode version. When I update Xcode on the build server, I change the name of the cache (e.g from `xcode93` to `xcode94`)

<!--more-->

I [use Gitlab CI](/automating-ios-development-and-distribution-workflow), so I just need to define the cache and run the `carthage bootstrap` before each build

{{% gist id="841cdfc6097016f1998f250dc49e0084" file="gitlab-ci.yml" %}}

Gitlab CI restores the built dependencies from the cache, uses them in the build and then caches them again when the build finishes.

This approach is really simple, your repo will not get big and all the dependencies are build just once per Xcode version in the CI. 

When a new developer joins the project or does a `git pull` with changes requiring building some new dependencies, they can do a neat trick: downloading the CI cache. With a simple 

{{% gist id="841cdfc6097016f1998f250dc49e0084" file="update.sh" %}}

the developer can download and use the current build dependencies. 