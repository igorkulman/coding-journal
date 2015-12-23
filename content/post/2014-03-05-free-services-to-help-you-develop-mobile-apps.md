---
title: Free services to help you develop mobile apps
author: Igor Kulman
layout: post
date: 2014-03-05
url: /free-services-to-help-you-develop-mobile-apps/
dsq_thread_id:
  - 2365112270
categories:
  - Windows Phone
tags:
  - bugsense
  - flurry
  - Windows Phone
---
If you develop mobile or any other kinds of apps, you need to have your source code versioned and stored in a safe place, cooperate with other people, track information about the usage of your apps and track all the errors that may occur. There are many free services that may help you with those tasks. In this article I will give you a list of the ones I use when developing [my apps][1].

**Bitbucket: source control and issue tracker**

I use Git as my source control system and all my private repos are stored at [Bitbucket][2] (public at [GitHub][3]). Bitbucket offers unlimited number of private repos and cooperation with up to 5 other people for free.

For each private repo you can create a private issue tracker also for free, so all your code and issues are at the same place. The main advantage is that source control and issue tracker are connected, so you can comment or close issues directly from Git commits.

<!--more-->

**Flurry: mobile analytics**

I use [Flurry Analytics][4] to track the usage of my apps. Flurry supports Android, iOS, Windows Phone 8 and Blackberry. The tool is completely free and allows you to track events like app runs, unique users, page views or custom events with parameters. Tracking custom events with parameters is really handy, for example thanks to it I know how many users use which color theme in my Shopping List Simple app.

**BugSense: bug tracking**

Flurry also offers bug tracking, it is no very well done and you cannot get much use of it. To track application crashes and caught exceptions I use [BugSense][5]. BugSense supports Android, iOS, HTML5, Windows Phone and Windows 8 apps.

Each logged error (exception) provides a complete stracktrace, number of occurrences and detailed info about each instance, like app version, phone model, country, etc. BugSense can be connected to GitHub, Bitbucket is no supported. Maybe in the future.

BugSense is a really useful service that can help you easily identify problems in your apps. Free version offers you 7 days bug info retention for up to 500 different errors for unlimited amount of apps.

 [1]: http://www.windowsphone.com/en-US/store/publishers?publisherId=Igor%2BKulman&appId=c00715a7-d2d4-48c1-94e2-2ecc7c1b798b
 [2]: http://bitbucket.org/
 [3]: http://github.com/igorkulman
 [4]: http://www.flurry.com/flurry-analytics.html
 [5]: http://bugsense.com/