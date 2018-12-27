+++
title = "Detecting tablets and smartphones in ASP.NET"
author = "Igor Kulman"
date = "2014-09-22"
url = "/detecting-tablets-and-smartphones-in-asp-net/"
categories = ["WinRT"]
tags = ["ASP","Csharp"]
+++
I recently worked on an ASP.NET application that needed to detect if users were coming from tablets or smartphones. The project used data from <http://user-agent-string.info/> to do this detection, but the result were not really good. We needed a better solution, so I came up with using [WURFL][1].

WURFL, the Wireless Universal Resource FiLe, is a Device Description Repository (DDR), i.e. a software component that maps HTTP Request headers to the profile of the HTTP client (Desktop, Mobile Device, Tablet, etc.) that issued the request. Adding WURFL to your ASP.NET application is easy thanks to the [WURFL\_Official\_API Nuget package][2]. The Nuget package also contains definition file, so you just need to update the Nuget package once in a while to get your definition file up to date.

<!--more-->

After installing the Nuget package, you need to setup WURLF in your Global.asax file

{{< highlight csharp >}}
var wurflDataFile = HttpContext.Current.Server.MapPath("~/App_Data/wurfl-latest.zip");
var configurer = new InMemoryConfigurer().MainFile(wurflDataFile).SetMatchMode(MatchMode.Accuracy);
WURFLManagerBuilder.Build(configurer);
{{< / highlight >}}

I recommend setting the match mode to accuracy instead of speed, to get the best results. Using the WURFL library is also quite easy, just pass the user agent string and get the properties you want.

{{< highlight csharp >}}
var device = WURFLManagerBuilder.Instance.GetDeviceForRequest(context.Request.UserAgent);
var isTablet = Boolean.Parse(device.GetCapability("is_tablet"));
var isMobileDevice = Boolean.Parse(device.GetCapability("is_smartphone"));
{{< / highlight >}}

 [1]: http://wurfl.sourceforge.net/
 [2]: https://www.nuget.org/packages/WURFL_Official_API/
