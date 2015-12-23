---
title: Leveraging ETag caching in Windows Phone and Windows apps
author: Igor Kulman
layout: post
date: 2015-04-20
url: /leveraging-etag-caching-in-windows-phone-and-windows-apps/
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
dsq_thread_id:
  - 3697035225
categories:
  - Windows Phone
  - WinRT
tags:
  - 'c#'
  - Windows Phone
  - windows store
  - winrt
---
In my previous article I showed you [how to implements server side caching using ETag][1]. HTTP clients on other platforms can usually work with ETag automatically, but of course, the portable HTTP client used on Windows platforms cannot. You have to implement ETag handling yourself.

In [TvTime][2], all the server requests are GET request, so I remember the ETag values for each Url (= each GET request). I store the ETag values in application local settings.

When the app wants to get some data, I perform a GET request including the ETag as the If-None-Match header. If my ETag matches with the ETag on the server, the server returns HTTP 304 Not Modified and I return the cached data from disk. Otherwise I read the response body and return it.

<!--more-->

{{< gist 55fa534bdcb4ab963253>}}

This approach works with the portable Http client library, that you can use with Windows Phone 8 (Silverlight), 8.1 (Sliverlight), 8.1 XAML and Windows 8/8.1. If you only need to support Windows Phone 8.1 XAML and Windows 8.1, you may want to look into the Windows.Web.Http.HttpClient.

 [1]: http://blog.kulman.sk/using-etag-to-cache-responses-in-nancyfx/ "Using ETag to cache responses in NancyFX"
 [2]: http://blog.kulman.sk/tvtime-track-your-favorite-tv-shows-on-windows-phone/ "TvTime: track your favorite TV shows on Windows Phone"