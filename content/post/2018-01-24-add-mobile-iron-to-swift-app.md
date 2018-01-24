+++
Categories = ["Swift", "iOS", "MobileIron"]
Description = "If you work on an iOS application intended for corporate environments, you are probably familiar with MobileIron AppConnect, because it is the most commonly used MDM solution. They have an SDK for iOS with stated support for Objective-C, Xamarin C# bindings and an Cordova plugin. If your application is written completely in Swift, there is some bad news in the documentation, it says you cannot use it with Swift."
Tags = ["Swift", "iOS", "MobileIron"]
author = "Igor Kulman"
date = "2018-01-24T09:29:12+01:00"
title = "Adding MobileIron AppConnect to a Swift application"
url = "/add-mobile-iron-to-swift-app"
share_img = "/images/mobileiron.png"

+++

If you work on an iOS application intended for corporate environments, you are probably familiar with MobileIron AppConnect, because it is the most commonly used MDM solution. They have an SDK for iOS with stated support for Objective-C, Xamarin C# bindings and an Cordova plugin. If your application is written completely in Swift, there is some bad news in the documentation:

<blockquote>
	NOTE: The AppConnect for iOS API supports apps written in Objective-C. It does not support apps written in Swift.
</blockquote>

Luckily, this is not true, you can integrate the AppConnect SDK to an application written entirely in Swift, you just need to do a few more steps. 

First, add the SDK to the project exactly as the documentation says:

* Add AppConnect.framework to your Xcode project
* Add the libcrypto.a library
* Add the libProtocolBuffers.a library
* Link the Security framework
* Link the Mobile Core Services framework
* Link the Local Authentication framework
* Add linker flags
* Copy bundle resources from AppConnect.framework
* Register as a handler of the AppConnect URL scheme
* Declare the AppConnect URL scheme as allowed

When you encounter the `Use AppConnect’s UIApplication subclass` step you have a problem, you cannot do it in a Swift application the same way as in Objective-C. You need to use the `Info.plist` in your project and add a key called `NSPrincipalClass` with the value of `AppConnectUIApplication` instead. This ensures your main application class inherits from the required AppConnect class. 

<div data-gist="1dec62d84a03de017933ccae3effbba1" data-file="info.plist"></div>

<!--more-->

The AppConnect SDK is now properly added to your project but to actually use it you need to add a bridging header to your project. 

<div data-gist="1dec62d84a03de017933ccae3effbba1" data-file="AppConnectBridge.h"></div>

Do not forget to define it as a bridging header in your projects configuration. 

Now you can use the AppConnect SDK in exactly the same way as described in the documentation for Objective-C. You just need to disable bitcode for your project, otherwise it will not build because of the libcrypto.a library.