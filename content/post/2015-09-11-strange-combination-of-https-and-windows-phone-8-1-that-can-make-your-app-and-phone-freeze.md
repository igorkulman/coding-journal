---
title: Strange combination of HTTPS and Windows Phone 8.1 that can make your app and phone freeze
author: Igor Kulman
layout: post
date: 2015-09-11
url: /strange-combination-of-https-and-windows-phone-8-1-that-can-make-your-app-and-phone-freeze/
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
dsq_thread_id:
  - 4119721143
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
  - winrt
  - xaml
---
Last week I came upon a really bizarre problem that you may also find interesting. Lets start with a bit of context.

**Tl;Dr**: There seems to be a bug in Windows phone 8.1 that can make your app and the phone freezes when displaying images over HTTPS from some servers. Skip to [the end of this article][1] to see a video and get the source code.

**The Windows Phone app**

The app is a Windows Phone 8 shopping app for the biggest Czech online retailer. The main screen of the app contains quite a bit of data, usually about ten carousel with about 10 products and the list of main categories, so about 10 more images.

In worst case the main screen contains over 10 hundred images. It was quite a hassle to make it work well in the Windows Phone 8 SDK (no, rewriting a shopping about with about 70 screens to Windows Phone 8.1 is not feasible). But it work juts fine. Until last week.

<!--more-->

**The problem**

Last week, users started to report that the app freezes on the main screen, sometime making the whole phone freeze. This was really bad. Frozen app means not only angry customers but customer that do not buy stuff. So I started to investigate.

First I thought there may be a problem in the app, although the app was last updated more than a month ago and the problem started only last week. Everything worked fine in the emulator, the problem was reproducible only on real devices. I tried showing only one carousel to make the app render much less data, did not help. I tried making the app show only one product in the only one carousel, still a problem. So it looked like the images were the problem. I tried replacing all the real image urls with random images from [lorempixel.com](http://lorempixel.com) and the app worked just fine.

I determined that the source of the problems are the images on the server. Talking with the server customer&#8217;s people I found out that the images on the server were exchanged for bigger one because of the iPhones. But it did not make sense. I tried using much bigger random images and the app worked fine. I tried downloading the images and using them locally, the app worked fine.

<strong id="bug">Windows Phone 8.1 bug?</strong>

Finally I found out that the app worked the whole time on phones with Windows 10, only phones with Windows Phone 8.1 were affected. Android and iOS apps that the customer has also never experienced this problem. This make me thing that there is some kind of bug in Windows Phone 8.1 that causes this behavior, because the app does not do any image processing, it only uses an Image control and sets is Source url.

Here is a sample app to reproduce the problem: <https://github.com/igorkulman/WindowsPhoneHttpsImageBug>. The solution contains a Windows Phone 8 project and a Windows Phone 8.1. Both apps suffer from the sample problem, but the problem is worse in the Silverlight app. This also makes me think that this is a Windows Phone 8.1 bug, independent on the Windows Phone SDK version.

I made a video using the sample app showing the problem

{{< vimeo 138747871>}}

 [1]: #bug