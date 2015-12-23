+++
title = "Back navigation on Backspace key press in Windows 8.1 apps"
author = "Igor Kulman"
date = "2015-03-03"
url = "/back-navigation-on-backspace-key-press-in-windows-8-1-apps/"
categories = ["WinRT"]
tags = ["c#","windows store","winrt"]
+++
I am not a mouse or a touch person, I like using the keyboard and keyboard shortcuts for everything. So when I (have to) use a Windows 8.1 Metro app, I always miss when the app does not navigate back when I press the Backspace key, just like the browser does. 

Implementing this functionality is really simple, you just need to handle the KeyUp event and listen for the Backspace key. You can implement the KeyUp event handler on every View in your app, but that is not necessary. You can just hook up the global Window.Current.CoreWindow.KeyUp event after you app starts.

<!--more-->

{{< gist b0f41a1a25acad0d17a4>}}

If you implement this in your app, I am sure you will make some of your users more happy.
