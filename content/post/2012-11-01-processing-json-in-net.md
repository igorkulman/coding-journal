---
title: Processing JSON in .NET
author: Igor Kulman
layout: post
date: 2012-11-01
url: /processing-json-in-net/
onswipe_thumb:
  - 'http://blog.kulman.sk/wp-content/plugins/onswipe/thumb/thumb.php?src=http://blog.kulman.sk/wp-content/uploads/2012/10/jsonperformance.png&amp;w=600&amp;h=800&amp;zc=1&amp;q=75&amp;f=0'
dsq_thread_id:
  - 1423097820
categories:
  - WinRT
tags:
  - 'c#'
  - json
---
JSON is a very popular format for exchanging data, especially in the world of web technologies and JavaScript. The .NET platform contains a native support for this format but a better alternative is to use the JSON.NET library.

**JSON.NET**

[JSON.NET][1] is a flexible JSON serializer for .NET with LIQN support. The biggest reason for using this library is its performance in comparison to the standard DataContractJsonSerializer. The easiest way to use the library is to use the [Nuget package][2].

JSON.NET is very easy to use; first you create a JObject instance

{{< gist 5857544>}}

<!--more-->

from which you can get a collection (in our example of type TicketViewModel)

{{< gist 5857549>}}

filling the TicketViewModel instance from the JObject

{{< gist 5857554>}}

**DataContractJsonSerializer**

If you do not want or cannot use JSON.NET you can use the already mentioned DataContractJsonSerializer. Before you use it, you have to create a class with the same structure as the JSON. You do not have to create it by hand; you can use the [json2csharp][3] utility.

Using the DataContractJsonSerializer is a less readable than using JSON.NET

{{< gist 5857558>}}

 [1]: http://james.newtonking.com/projects/json-net.aspx
 [2]: https://nuget.org/packages/Newtonsoft.Json
 [3]: http://json2csharp.com/