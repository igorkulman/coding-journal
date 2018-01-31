+++
Categories = ["iOS", "Swift"]
Description = "When your iOS application receives a push notification while in foreground, the didReceiveRemoteNotification method in the application's AppDelegate gets called. You get the whole push notification payload and you can react to it. But there is a problem introduced in iOS 11, then fixed and then broken again that ądidReceiveRemoteNotification does not get called when a push notification arrives and the application is in foreground. This can be really bad if your application depends on reliable push notifications while running."
Tags = ["iOS", "Swift"]
author = "Igor Kulman"
date = "2017-12-07T09:29:12+01:00"
title = "Workaround for receive remote notification callback not getting called in foreground on iOS 11"
url = "/workaround-for-didreceiveremotenotification-not-called-in-ios11"

+++

When your iOS application receives a push notification while in foreground, the `didReceiveRemoteNotification` method in the application's `AppDelegate` gets called. You get the whole push notification payload and you can react to it. But there is a problem introduced in iOS 11, then fixed and then broken again (like many things done by Apple these days) that `didReceiveRemoteNotification` does not get called when a push notification arrives and the application is in foreground. This can be really bad if your application depends on reliable push notifications while running. 

The worst thing about this problem is that everything seems to be working while you are debugging the application from XCode. The method gets called, the payload is available. But when you open the application in your iPhone or iPad without the debugger attached, `didReceiveRemoteNotification` just never gets called. There are many developers reporting this problem [on the Apple forums](https://forums.developer.apple.com/thread/79734#272007) and on [StackOverflow](https://stackoverflow.com/questions/46736376/swift-push-notifications-delegate-debug-mode-behavior/47659951). 

<!--more-->

I encountered the problem in the iOS application I currently work on so I was looking for a workaround, not trusting Apple to finally fix this in the foreseeable future. I found a very interesting explanation of this problem [deep in the Apple forums](https://forums.developer.apple.com/thread/79734#272007)

> Basically there is a new process called Duet on iOS 11, that gives each app a score. If your apps uses a lot of energy, or receives silent notifications many times in sequence, Duet discards the push notification or delays when it will be delivered. This all sounds extremely nice and good for the user. The problem starts when Duet triggers these behaviors and also stop calling the app in foreground or after being plugged to power. 

Suggesting implementing `UNUserNotificationCenterDelegate.userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void)` as a workaround. 

And it worked! This method gets called every time a push notification arrives and the application is in the foreground running. 

When connected to the debugger, both `didReceiveRemoteNotification` and `userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void)` get called, so when you implement this new method do not forget to remove all the logic from `didReceiveRemoteNotification` because it will get executed twice when Apple fixes the problem one day. 