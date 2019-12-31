+++
Categories = ["Swift", "iOS", "Xcode"]
Description = "In all my iOS projects I use and strongly prefer Carthage. It is easy to use, does not do any changes to your project, all the dependencies are built just once and then linked to the project as dynamic frameworks. There are many good posts about the advantages of Carthage compared to CocoaPods so in this post I will just focus on the actual usage, mainly in CI."
Tags = ["Swift", "iOS", "Xcode"]
Keywords = ["Swift", "iOS", "Xcode"]
author = "Igor Kulman"
date = "2018-10-17T08:29:12+01:00"
title = "Building iOS dependencies with Carthage"
url = "/building-ios-depedencies-with-carthage"
share_img = "/building-ios-depedencies-with-carthage/carthage-logo.png"

+++

In all my iOS projects I use and strongly prefer [Carthage](https://github.com/Carthage/Carthage). It is easy to use, does not do any changes to your project, all the dependencies are built just once and then linked to the project as dynamic frameworks. There are many good posts about the advantages of Carthage compared to CocoaPods so in this post I will just focus on the actual usage, mainly in CI.

### Carthage basics

All your Carthage dependencies are listed in the `Cartfile` file in the root of your project. In case you split your app into multiple projects like I do, there is a `Cartfile` for every project in the workspace. Next to every `Cartfile` there is a `Cartfile.resolved` file pinning all your dependencies to a specific version.

You just need to keep those two files in your source control and then run `carthage bootstrap` when you clone the project so Carthage downloads and builds all the dependencies. This happens just once for a developer, but it is slow and time consuming. If you use a CI for automatic builds, it becomes a real time waste rebuilding all the dependencies before each build.

### Carthage approaches

Developers typically try to speed things up with multiple approaches

* **Keeping `Carthage/Checkouts` in source control**. This makes the repository bigger by keeping unnecessary files, the checkout is faster but the build is still slow.
* **Keeping `Carthage/Build` in source control**. This also makes the repository bigger, potentially much bigger if you update your dependencies often, but the build times are super fast as there is nothing to actually build.
* **Caching the Carthage builds in CI**. This does not make the repository bigger and can be really fast when done properly
* **Caching the Carthage builds using tools like [Rome](https://github.com/blender/Rome)**. This does not make the repository bigger and can be very powerful and flexible, but typically requires a paid 3rd party storage service like Amazon S3. 

<!--more-->

### My current approach

I personally started with the second approach, but had to abandon it because of the repository size. After a few trials and errors I came up with this variation with the third approach

* Keep just `Cartfile` and `Cartfiles.resolved` in the repository
* Have the CI cache the `Carthage/Build` folder between builds

I [use Gitlab CI to automate my development and deployment workflow](/automating-ios-development-and-distribution-workflow), so I just need to define the cache and run the `carthage bootstrap` before each build

{{< highlight yaml >}}
cache:
  key: xcode94
  paths:
  - YourApp/Carthage/

before_script:
- carthage bootstrap --platform iOS --cache-builds
{{< / highlight >}}

Gitlab CI restores the built dependencies from the cache, uses them in the build and then caches them again when the build finishes. I use the Xcode version as the cache key (e.g `xcode94`) because every Xcode version typically comes with a different version of Swift causing a need for rebuilding all the dependencies. 

This approach is really simple, your repository will not get big and all the dependencies are built just once per Xcode version in the CI. 

When a new developer joins the project or does a `git pull` with changes requiring building some new dependencies, they can do a neat trick: downloading the CI cache. With a simple 

{{< highlight bash >}}
scp user@build.sever/cache/xcode94/cache.zip && unzip cache.zip && rm cache.zip
{{< / highlight >}}

the developer can download and use the current build dependencies without wasting time doing any Carthage builds. This of course requires the developers to use the same version of Xcode as the build server, but that is necessary anyways with the way Swift is coupled with Xcode.
