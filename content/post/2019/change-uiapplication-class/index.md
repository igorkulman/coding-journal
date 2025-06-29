+++
Description = "When developing an iOS application you might get into a situation when you need to change the UIApplication base class. It is often a requirement when using various MDM SDKs, like the Mobile Iron AppConnect SDK. There are two ways to do that in a Swift application, both with some advantages and disadvantages."
Tags = ["iOS", "Swift", "Xcode"]
author = "Igor Kulman"
date = "2019-10-30T05:29:12+01:00"
title = "Changing UIApplication base class"
url = "/change-uiapplication-class"

+++

When developing an iOS application you might get into a situation when you need to change the `UIApplication` base class. It is often a requirement when using various MDM SDKs, like the Mobile Iron AppConnect SDK. There are two ways to do that in a Swift application, both with some advantages and disadvantages.

### Declarative method with `Info.plist`

The first method to change the UIApplication base class is using `Info.plist`. It is quite simple, you just need to add a new key `NSPrincipalClass` with a string value representing the name of the desired class, like `AppConnectUIApplication` when using the Mobile Iron AppConnect SDK.

```xml
<key>NSPrincipalClass</key>
<string>AppConnectUIApplication</string>
```

No actual code changes are required.

### Code method with `main.swift`

The second method is a bit more complicated but more flexible at the same time. First you need to remove `@UIApplicationMain` from your `AppDelegate` class definition. Then you add a `main.swift` to the root of your project that looks like this

```swift
import AppConnect
import UIKit

UIApplicationMain(
    CommandLine.argc,
    CommandLine.unsafeArgv, 
    ACUIApplicationClassName,
    NSStringFromClass(AppDelegate.self)
)
```

The third parameter in the `UIApplicationMain` call is the name of the desired class, `ACUIApplicationClassName` in this example. 

<!--more-->

The flexibility of this approach comes form the ability to use stuff like complier conditionals. 

Let's say you have two targets in your application, one using the Mobile Iron AppConnect SDK and one using some other MDM SDK. With the first `Info.plist` method you would have to have two separate `Info.plist` files. With this `main.swift` you can do

```swift
import UIKit

#if canImport(AppConnect)
import AppConnect

UIApplicationMain(
    CommandLine.argc,
    CommandLine.unsafeArgv, 
    ACUIApplicationClassName,
    NSStringFromClass(AppDelegate.self)
)
#else
UIApplicationMain(
    CommandLine.argc,
    CommandLine.unsafeArgv, 
    nil,
    NSStringFromClass(AppDelegate.self)
)
#endif
```