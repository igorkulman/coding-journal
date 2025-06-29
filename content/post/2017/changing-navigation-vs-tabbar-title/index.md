+++
Description = "The UI of the iOS app I currently work on contains a tab bar with Profile as the title of one of the included tabs. This Profile tab contains a view controller with a navigation bar where I wanted the title to be set as You profile."
Tags = ["iOS", "Swift"]
author = "Igor Kulman"
date = "2017-09-12T09:29:12+01:00"
title = "iOS tip: Changing navigation bar vs tab bar title"
url = "/changing-navigation-vs-tabbar-title-ios"

+++

The UI of the iOS app I currently work on contains a tab bar with "Profile" as the title of one of the included tabs. This "Profile" tab contains a view controller with a navigation bar where I wanted the title to be set as "You profile". 

So I set the tab bar item's title to "Profile" and wanted to set the navigation bar title of the view controller the standard way

```swift
title = "Your profile"
```

I noticed that this also changes the title in the tab bar. After some research I found out that changing the view controller's title property changes bot the title in the navigation bar and in the bar bar. But you can change the title just for the navigation bar

<!--more-->

```swift
navigationItem.title = "Your profile"
```

and just for the tab bar

```swift
tabBarItem.title = "Profile"
```
