---
title: HTC 8X, Windows Phone 8 and playing music
author: Igor Kulman
layout: post
date: 2012-11-24
url: /htc-8x-windows-phone-8-and-playing-music/
onswipe_thumb:
  - SKIP
dsq_thread_id:
  - 1179172918
categories:
  - Windows Phone
tags:
  - Windows Phone
---
I use my Nokia Lumia 800 also as a music player, with a few annoyances but nothing I could not live with. When I tried to use the HTC 8X with Windows Phone 8 as a music player, the situation was quite different.

The first thing that annoys me is more of a HTC&#8217;s fault than Windows Phone&#8217;s. The HTC 8X has Beats Audio. It does not really say what it is or does, it just says it is there. Every time you plug in your headset, a notification sound is played and a toast appears informing you that the Beats Audio is on. You can disable the sound only using the disable all other notifications option in settings, so you may loose some notifications you need. Disabling the toast is impossible. I naively thought that if I disable the Beats Audio completely the notification goes away. Silly me. The notifications just changes from Beats Audio on to Beats Audio off every damn time you plug in your headset.

<!--more-->

The thing I really hate and makes me unable to use Windows Phone 8 as a music player is the music app&#8217;s (I guess it is called XBOX Music) ignorance to my ID3 tags. I copied one album to the phone&#8217;s Music directory in explorer. All the songs from this album had ID3 v1 and v2 filled in. The music app recognized it as some bullshit album with unknown artist and unknown song names and downloaded an american flag on blue curtain as its cover. Windows Phone 7 had no problem recognizing it, neither had Zune. I had the same issue with almost every other album I copied to the phone.

I deleted all the albums using explorer, but they did not disappear from the music app. I could not find a way to delete them from the library. I even installed the terrible synchronization app but the song records could not be deleted using it either. The only thing that helped was a complete reset of the phone deleting all the data.

If anyone knows how to make the music app on Windows Phone 8 behave as a user would expect, please let me know. If it is possible at all.

**Update:** Thanks to Radek Hulán (in comments) I was able to solve it. Windows Phone 8 does not support ID3 2.4 like every other sofware just 2.3. You need to convert all your 2.4 tags to 2.3 with a software like [MP3Tag][1]. If you want to sync by albums, you cannot do that, you need to create a playlist for each album. It looks like the usability and ease of use got reimagined.

 [1]: http://www.mp3tag.de/en/