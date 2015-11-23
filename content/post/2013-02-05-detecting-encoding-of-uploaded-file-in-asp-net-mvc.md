---
title: Detecting encoding of uploaded file in ASP.NET MVC
author: Igor Kulman
layout: post
date: 2013-02-05
url: /detecting-encoding-of-uploaded-file-in-asp-net-mvc/
dsq_thread_id:
  - 1400866623
categories:
  - Programming in general
tags:
  - .net
  - asp
  - 'c#'
---
Uploading a file in ASP.NET MVC is very easy, but there is no easy way to detect the encoding of a uploaded text file. However you can use the fact if you try to read the file with a wrong encoding, you get an DecoderFallbackException. So how do you put everything together?

First, get a stream of the uploaded file.

{{< gist 5849381>}}

<!--more-->

Next, read the whole file to a byte array

{{< gist 5849384>}}

Finally the trick is to try all the encodings you think the file may be in and chech if if fails or not

{{< gist 5849390>}}