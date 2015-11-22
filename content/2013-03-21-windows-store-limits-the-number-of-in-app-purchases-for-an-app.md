---
title: Windows Store limits the number of in-app purchases for an app
author: Igor Kulman
layout: post
date: 2013-03-21
url: /windows-store-limits-the-number-of-in-app-purchases-for-an-app/
dsq_thread_id:
  - 1179173024
categories:
  - WinRT
tags:
  - windows store
---
Windows 8 development has [many problems and pitfalls because of WinRT][1]. Windows Store, the only distribution channel for Windows 8 apps, has some problems too. One of them is really serious for everyone who wants to create a newspaper or newsreader app with in-app purchases. 

We developed a Windows 8 app for a local newspaper. The content consists of issues, there is one issue published each work day. The users can buy the issues using in-app purchases. The problem is that there is a limit of <del datetime="2013-05-26T14:03:17+00:00">100</del> 200 in-app purchases that can be defined for a single app in Windows Store. I really do not know what would Microsoft impose such a limit. 

As far as I know there is no way around the limit. We need to either delete in-app purchases for old issues so user will no longer be able to buy them (which is stupid and as ot turns out not possible) or create new app with a different name and in-app purchases for another time period (which is even more stupid).

Sure you can implement content purchasing using other ways, but they all have one big problem. There is no way your app can get the identity of the user. If you implement your own purchasing mechanism, you cannot pair the purchases with the user, only with the device. So the user would have to buy the same content on each device, if he reinstall his system, etc. That is usually not what you want.

 [1]: http://blog.kulman.sk/why-are-there-no-great-windows-8-apps-because-of-winrt-a-developers-view/