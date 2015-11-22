---
title: Ignoring certificate errors in Windows Phone 8.1
author: Igor Kulman
layout: post
date: 2014-06-11
url: /ignoring-certificate-errors-in-windows-phone-8-1/
dsq_thread_id:
  - 2755539762
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
  - winrt
---
Connecting to servers with self-signed, expired or otherwise problematic certificates has always been a problem in Windows Phone. There is no way to ignore certificate errors in Windows Phone 7 and Windows Phone 8, not even using the new Portable HTTP Client Libraries. If you are dealing with a self-signed certificate on the server, you have to somehow get it (may not always be possible) and install it on the device or in the emulator (for emulator every time you close and start it again). Ignoring certificate errors would be a much more comfortable approach. Of course, only do it in development with dev servers, not in production.

In Windows Phone 8.1 there are strangely two HttpClient classes, one in System.Net.Http and another in Windows.Web.Http. Normally you would go with the one in System.Net.Http because you are probably using it thanks to the mentioned Portable HTTP Client Libraries on every other platform. You are out of luck in Windows Phone 8.1 XAML, if you want to ignore certificate errors, you have to use the one from Windows.Web.Http, because only this one accepts an IHttpFilter as an argument.

Using the IHttpFilter, you can easily ignore certificate errors

but you have to get used to doing all the request in a different way, the Windows.Web.Http.HttpClient way that differs from the System.Net.Http.HttpClient way.