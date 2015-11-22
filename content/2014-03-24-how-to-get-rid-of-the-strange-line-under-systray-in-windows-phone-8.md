---
title: How to get rid of the strange line under systray in Windows Phone 8
author: Igor Kulman
layout: post
date: 2014-03-24
url: /how-to-get-rid-of-the-strange-line-under-systray-in-windows-phone-8/
dsq_thread_id:
  - 2499009486
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
  - xaml
---
If you create an Windows Phone 8 app and test it only on WVGA and 720p devices or emulators, you may be surprised how you app looks on a WXGA device (or emulator). 

[<img src="http://blog.kulman.sk/wp-content/uploads/2014/03/line.png"  class="alignnone size-full wp-image-890" />][1]

I have not been able the reason why this happens but the solution is quite simple. Set your page&#8217;s top border to -1. 

Doing this in XAML for every page is not very convenient, a better solution would be to set the negative top margin on the whole application frame

If you use Caliburn.Micro, you need to override the CreatePhoneApplicationFrame in the Bootstrapper instead

 [1]: http://blog.kulman.sk/wp-content/uploads/2014/03/line.png