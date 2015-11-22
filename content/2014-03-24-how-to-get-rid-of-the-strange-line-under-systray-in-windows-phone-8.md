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

{{% img-responsive "/images/line.png" %}}

I have not been able the reason why this happens but the solution is quite simple. Set your page&#8217;s top border to -1. 

<script src="https://gist.github.com/igorkulman/9572347.js?file=line.xaml"></script>

Doing this in XAML for every page is not very convenient, a better solution would be to set the negative top margin on the whole application frame

<script src="https://gist.github.com/igorkulman/9572347.js?file=line.cs"></script>

If you use Caliburn.Micro, you need to override the CreatePhoneApplicationFrame in the Bootstrapper instead

<script src="https://gist.github.com/igorkulman/9572347.js?file=line.caliburn.cs"></script>

 [1]: http://blog.kulman.sk/wp-content/uploads/2014/03/line.png