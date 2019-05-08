+++
Categories = ["iOS", "Xcode", "Carthage", "Cocoapods"]
Description = ""
Tags = ["iOS", "Xcode", "Carthage", "Cocoapods"]
Keywords = ["iOS", "Xcode", "Carthage", "Cocoapods"]
author = "Igor Kulman"
date = "2019-05-08T05:29:12+01:00"
title = "Using CocoaPods to just build frameworks for use elsewhere"
url = "/using-pods-to-just-build-frameworks"
share_img = "/using-pods-to-just-build-frameworks/logo.png"

+++

I am definitely not a fan of `CocoaPods`, I use `Carthage` in all of my projects. It is not ideal but [I have a way of using it that works for me](/building-ios-depedencies-with-carthage/). 

Recently I was faced with a problem that made me use `CocoaPods` but in a quite different way, just to build some frameworks to be used elsewhere without `CocoaPods`.

## The problem

I use [GRDB.swift](https://github.com/groue/GRDB.swift) to work with the database in iOS applications, especially because it support using [SQLCipher](https://github.com/sqlcipher/sqlcipher) to have the database encrypted. The current version `3.x` has [some problem when used by Xcode 10.2 and Swift 5](https://github.com/groue/GRDB.swift/issues/482) so using the latest `4.0` is recommend.

`GRDB.swift` never supported `Carthage` but there was always a way to make it work. I usually just needed to delete some of the shared schemes and run `carthage build` instead of `carthage bootstrap`. I was not able to make `Carthage` work with `4.0`, mainly because the targets changed. There is no `GRDBCipher` target for use with `SQLCipher` anymore, just a `podspec` definition

{{< highlight ruby >}}
  s.subspec 'SQLCipher' do |ss|
    ss.source_files = 'GRDB/**/*.swift', 'Support/*.h'
    ss.framework = 'Foundation'
    ss.dependency 'SQLCipher', '>= 3.4.0'
    ss.xcconfig = {
      'OTHER_SWIFT_FLAGS' => '$(inherited) -D SQLITE_HAS_CODEC -D GRDBCIPHER -D SQLITE_ENABLE_FTS5',
      'OTHER_CFLAGS' => '$(inherited) -DSQLITE_HAS_CODEC -DGRDBCIPHER -DSQLITE_ENABLE_FTS5',
      'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) SQLITE_HAS_CODEC=1 GRDBCIPHER=1 SQLITE_ENABLE_FTS5=1'
    }
end
{{< /highlight>}}

It looks like only using `CocoaPods` and `SwiftPM` is now supported, there is not even an easy way to do manual installation.

I had to decide how to integrate `4.0` to my project in the best way possible.

<!--more-->

## Possible solutions

There were a few solution that came to mind

### Using CocoaPods

This would be the easiest solution. I would just create a `Podfile` with

{{< highlight ruby >}}
# GRDB with SQLCipher 3
pod 'GRDB.swift/SQLCipher'
pod 'SQLCipher', '~> 3.4'
{{< /highlight>}}

and make it integrate into the existing workspace of my application. 

It would probably work but I really do not want to use `CocoaPods` and it would be a bit strange having 2 libraries added via  `CocoaPods` and all the other libraries via `Carthage`.

### Creating projects for GRDB.swift and SQLCipher and integrating them

Another option would be to create separate projects for `GRDB.swift` and `SQLCipher`, add them to the workspace of the application and link everything properly. This is easier said than done. 

Creating a project for `GRDB.swift` and applying the special build flags from he `podspec` shown earlier would not be a problem. The problem would be creating a project for `SQLCipher`, it would have to be done just from reading their `podspec`. 

Not impossible but managing updates would be quite hard even when adding both libraries as git submodules.

## Using CocoaPods just to build GRDB and SQLCipher and use the `.framework` files directly

I came up with a different solution. The main idea was to let `CocoaPods` generate and build a project with both libraries and then use the resulting `.framework` files in my main project directly. This solution needed a bit of knowledge and tinkering but I decided to go for it.

### Creating a separate project

I created a new iOS framework project called `GRDBCipher`. The name is not important and it is a completely empty project, no filed other than what the Xcode template creates.

I then added `GRDB.swift` and `SQLCipher` using `CocoaPods` to this project

{{< highlight ruby >}}
platform :ios, '10.0'
use_frameworks!

target 'GRDBCipher' do
    # GRDB with SQLCipher 3
    pod 'GRDB.swift/SQLCipher', :git => 'https://github.com/groue/GRDB.swift', :branch => 'GRDB-4.0'
    pod 'SQLCipher', '3.4.2'
end
{{< /highlight>}}

When I built the project Xcode created `GRDB.framework` and `SQLCipher.framework` that looked ready to be used.

### Dealing with multiple architectures

When you do a build in Xcode you do it for a certain architecture. Either for the iOS simulator or for a real ARM device. `GRDB.framework` and `SQLCipher.framework` created by building the new `GRDBCipher` project can only be used either with the iOS simulator or a real device. To fix this issue you have to create a so called "fat" framework containing all the architectures. 

The easiest way to do this was adding an aggregate target (`File | New target | Cross-platform | aggregate`) to the `Pods` project. I changed its build configuration to `Release` and added both `GRDB.framework` and `SQLCipher.framework` as its `Target dependencies`. 

I then needed to add scripts to build both frameworks for all the architectures and merge them together using `lipo`. I copied the scripts for this from an [Instabug post about Creating and Distributing an iOS Binary Framework](https://instabug.com/blog/ios-binary-framework/).

I had to make slight changes to the script because `GRDB.swift` uses  `GRDB.swift` as the scheme name but  `GRDB.framework` instead of  `GRDB.swift.framework` as the name of the framework that actually gets built. I also added a script that copies the resulting fat `GRDB.framework` and `SQLCipher.framework` to a directory in the main project. 

Every time I updated the libraries using `CocoaPods` the project got regenerated, but I could then just revert the project changes so I did not have to add the aggregated target again.

With this setup, whenever I need to build a new version of `GRDB.swift`, I just update `CocoaPods` in the  `GRDBCipher` project and run the aggregate target. After a few minutes the frameworks are built and ready in the correct folder.

I created a Github repository showing the whole project: https://www.github.com/igorkulman/GRDBCipher.

## Adding the frameworks to the main project

Both `GRDB.framework` and `SQLCipher.framework` built as fat libraries can be embedded to the application just like any other static framework. 

{{% github-repo "igorkulman/GRDBCipher" %}}