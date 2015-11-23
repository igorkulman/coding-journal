---
title: Player Framework localization
author: Igor Kulman
layout: post
date: 2015-04-27
url: /player-framework-localization/
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
dsq_thread_id:
  - 3716240076
categories:
  - Windows Phone
  - WinRT
tags:
  - 'c#'
  - Windows Phone
  - windows store
  - winrt
  - xaml
---
In my recent universal (Windows Phone 8.1 and Windows 8.1) project I implemented PlayReady DRM protected smooth streaming movies playback using the [Player Framework][1]. This projects seems to be dead, but it is still the best option when implementing any kind of video playback. 

One of the first things I had to do was localize it&#8217;s controls, because the app I worked on was in Czech and Slovak, not in English (the only language the Player Framework supports out of the box). Not all the texts an be localized, but the most visible ones like button labels and error messages can. 

To create your own localization, I suggest you create a new RESW file in your project. You can use and existing one, but I prefer to separate the texts for the Player Framework from texts for the rest of the app. 

<!--more-->

Next you have to find out the keys for the string you want to localize. You an [find them in the source code][2]. You can just copy the content of that RESW file to yours RESW file and localized everything.

The last step is to let the PlayerFramework know about your RESW file using

{{< gist a5dcc1537cb977d023b4>}}

 [1]: https://playerframework.codeplex.com/
 [2]: https://playerframework.codeplex.com/SourceControl/latest#Win8.Xaml.Localize.Win81/en-US/PlayerFramework.resw