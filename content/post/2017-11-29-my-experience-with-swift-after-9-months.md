+++
Categories = ["Swift", "iOS"]
Description = "About 9 months ago I basically left the world of Windows development because of the death of Windows Phone and me being really fed up with Microsoft. I got a chance to work on a complete native rewrite of an iOS application so I turned my desktop PC into a hackintosh and started learning Swift and iOS development. This post describes my experience and feelings about Swift, the language, tooling, resources after 9 months. I will probably write another post about my experience with iOS development and the iOS community."
Tags = ["Swift", "iOS"]
author = "Igor Kulman"
date = "2017-11-29T09:29:12+01:00"
title = "My experience with Swift after 9 months"
url = "/my-experience-with-swift-after-9-months"

+++

About 9 months ago I basically left the world of Windows development because of the death of Windows Phone and me being really fed up with Microsoft. I got a chance to work on a complete native rewrite of an iOS application so I [turned my desktop PC into a hackintosh](/my-experience-running-a-hackintosh/) and started learning Swift and iOS development. 

This post describes my experience and feelings about Swift, the language, tooling, resources after 9 months. I will probably write another post about my experience with iOS development and the iOS community.

### Swift language

I think Swift is a nice modern language, it reminds me of a combination of C# and F#, so two languages I really like. The introduction of Swift got me first thinking about switching to iOS development, Windows Phone was already dying at that time.

I tried iOS development with Objective-C some time ago, did some tutorials but the language just felt wrong. Not only the strange syntax, I do not really care about that, but the expressiveness of the language compared to C#. I had to write so much more code to do anything. Swift is just much better with that. 

As a side note I remember reading [Masterminds of Programming](http://amzn.to/2zJinE3) a few years back, the interview with one of Objective-C authors and his hate about C++ saying he did everything better that Stroustrup and thinking "I really do not like this guy" (I do not remember if it was Cox or Love).

<!--more-->

In Swift I really like immutability, non-nullability, extensions with default implementation and the whole focus on [protocols instead of inheritance](/using-protocol-default-implementation/). There is just one thing I really miss and hope Swift would get it soon and that is the async/await from C#. 

Using a concept like async/await is so much better than callbacks, even [JavaScript is getting async/await now](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) so Swift should be next. It would make the code so much more readable and easier to reason about.

### Swift toolchain

What I really hate is the lack of [ABI stability](https://github.com/apple/swift/blob/master/docs/ABIStabilityManifesto.md) and its consequences. My problem is that when Apple releases a new version of Xcode that includes a newer version of Swift I have to rebuild all m dependencies because I use [Carthage](https://github.com/Carthage/Carthage) (not only because it reminds me of [Nuget](https://www.nuget.org/) from the .NET world, so linking dependencies as frameworks instead of sources but I also really dislike Pods).

This means not only running `carthage update` but also forcing my colleague to update Xcode and updating XCode on the build machine we use for continuous integration with Gitlab.

Swift is the first language I have ever used where code compiled with an older version of the language does not work with a newer version. It is time to change that, hopefully [Swift 5 will do it](https://github.com/apple/swift-evolution). 

Another problem is the tooling. The Swift compiler is quite slow so Swift apps can have a really long compilation times. You have to be aware of what makes the compilation slower, like [using the Nil coalescing operator](https://medium.com/@RobertGummesson/regarding-swift-build-time-optimizations-fc92cdd91e31) and decide between a code you thing is more readable and code that compiles a bit faster. Also the compiler error messages are not that great, for example if there is a problem inside a closure you get a nonsense error message most of the time. When the compiler crashes during build, you do not get a reasonable error message either. 

### Resources for learning

Learning the language was not a problem, I think it is quite easy to learn if you have experience with other similar languages. I like programming languages and computer science in general so I [tried out quite a few of them](/being-a-polyglot-programmer/) and picking up another was not a big problem. 

One important thing I had to get used to was the absence of the .NET garbage collector. Swift uses automatic reference counting, so you have to thing about not creating retain cycles. This is important especially when capturing `self` in closures, but you can get used to it quickly.  

The Apple [documentation about Swift](https://developer.apple.com/swift/) is surprisingly good and playgrounds are a good way to get you started, they are similar to Scala worksheets. 

I like podcasts, podcasts are the main source of information about programming for me. There are some really good podcasts in the .NET world, not only about Microsoft technologies ([MSDevShow](https://msdevshow.com/)) but also some with a broader reach ([.NET Rocks](https://www.dotnetrocks.com/), [Coding Blocks](https://www.codingblocks.net/)). 

I had some troubles finding something similar for Swift and iOS. I tried [Inside iOS Dev](http://insideiosdev.com/) but I do not think it is that great. I got recommendations for [Fireside Swift](https://twitter.com/fireside_swift) and [Swift by Sundell](https://www.swiftbysundell.com/podcast/) so trying out those two now. More tips are welcomed. 