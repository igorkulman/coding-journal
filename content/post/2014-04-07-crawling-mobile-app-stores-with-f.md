+++
title = "Crawling mobile app stores with F#"
author = "Igor Kulman"
date = "2014-04-07"
url = "/crawling-mobile-app-stores-with-f/"
categories = ["Functional programming"]
tags = ["Fsharp","Windows Phone","Windows Store"]
+++
Some time ago I needed a way to programatically search the Apple AppStore and Google Play Store to get some info about apps for a project. I decided to write an F# script for that task and later added support for Windows Phone Store.

**Types**

I wanted the script to be easily usable from outside of F# so first I created a type for the app.

<div data-gist="10019990" data-file="types.fs"></div>

I also needed a helper function to download data from the web. I used a classic WebClient with user agent set to Chrome, because the Windows Phone Store API requires a user agent header

<!--more-->

<div data-gist="10019990" data-file="net.fs"></div>

**Apple AppStore**

Searching in Apple AppStore is easy, because Apple provides a simple search API that returns JSON. Thanks to the JsonProvider from FSharp.Data, the code is really simple

<div data-gist="10019990" data-file="AppStore.fs"></div>

Just downloading the JSON transforming the data to our type.

**Google Play Store**

Searching in Google Play Store is a bit more of a challenge. There is no API I could found so I had to parse the html returned from the web version of Google Play Store. The web can change at any time so I need to be aware of this fact and fix the method if it happens.

<div data-gist="10019990" data-file="PlayStore.fs"></div>

Another problem with parsing the web is that there is no way to return search result for a specific country like for Apple AppStore. The web always shows results according to your IP address.

**Windows Phone Store**

There is no official API for searching the Windows Phone Store but I was given a tip obtained after sniffing the traffic from a Windows Phone, so I did not have to parse the web. The code is as simple as for Apple AppStore thanks to XmlProvider.

<div data-gist="10019990" data-file="WindowsPhoneStore.fs"></div>

**Conclusion**

Using F# is fun and processing data is really simple thanks to type provides. You can find it whole code at <https://github.com/igorkulman/AppStoreCrawler>.
