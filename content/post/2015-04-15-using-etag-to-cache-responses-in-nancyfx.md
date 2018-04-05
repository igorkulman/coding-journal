+++
title = "Using ETag to cache responses in NancyFX"
author = "Igor Kulman"
date = "2015-04-15"
url = "/using-etag-to-cache-responses-in-nancyfx/"
categories = ["Windows Azure"]
tags = ["ASP","Azure","NancyFX"]
keywords = ["ASP","Azure","NancyFX", "Cloud"]
+++
Caching data is usually a good idea, especially when creating APIs for mobile clients and the user may pay for each transferred byte. There are many approaches to caching data (I recommend reading [this article][1]), in my last NancyFX project I used ETag.

**ETag**

ETag is a HTTP header that acts as a hash of the data. When the server returns a response, it computes a hash of the data and sends it to the client. When the client requests the data again, it includes the ETag in its request. The server compares the ETag with the hash of the current data and if they match (the data did not change), it returns an empty responses with a HTTP 304 status code.

<!--more-->

<div data-gist="4e6d24d0fedfe8361c6b" data-file="etagresponse.cs"></div>

**NancyFX impelemntation**

To implement caching using ETag in NancyFX I use a method in my base module

There are two parameters in this method, because you may sometimes want to compute the ETag from only a part of the returned model. 

Using this method is the really simple

<div data-gist="4e6d24d0fedfe8361c6b" data-file="usage.cs"></div>

 [1]: http://frontendplay.com/2013/05/22/http-caching-demystified/
