+++
Categories = ["iOS", "macOS", "Xcode"]
Description = "If you use Continuous Integration (CI) builds or build your app from the command line using `xcodebuild` you know that the output is not pretty and not very readable. Reading the build output is important when a CI build breaks"
Tags = ["iOS", "macOS", "Xcode"]
Keywords = ["iOS", "macOS", "Xcode", "CI", "Xcpretty"]
author = "Igor Kulman"
date = "2017-10-11T09:29:12+01:00"
title = "More readable XCode build output for CI"
url = "/more-readable-xcodebuild-output"
share_img = "/images/xcprettytests.png"

+++

If you use Continuous Integration (CI) builds or build your app from the command line using `xcodebuild` you know that the output is not pretty and not very readable. Reading the build output is important when a CI build breaks, but it is not easy when it looks like this

{{% post-image "xcodebuild.png" %}}

Many iOS developers were not satisfied with this so the [`xcpretty`](https://github.com/supermarin/xcpretty) project was created. `Xcpretty` is a fast and flexible formatter that turn the output from screnshot above to this neatly formatted output

{{% post-image "xcpretty.png" %}}

<!--more-->

The unit tests output looks especially nice

{{% post-image "xcprettytests.png" %}}

Using `xcpretty` is easy, you install it as a gem (`gem install xcpretty`) and then pipe the results of your `xcodebuild` commands to it like this `xcodebuild test -project iOSSampleApp.xcodeproj -scheme iOSSampleApp -destination 'platform=iOS Simulator,name=iPhone 6s,OS=11.0' | xcpretty`

You can use it with any CI that allows installing custom utilities. I use [Travis CI](https://travis-ci.org/igorkulman/iOSSampleApp), you can take a look at my [.travis.yml config](https://github.com/igorkulman/iOSSampleApp/blob/master/.travis.yml). 
