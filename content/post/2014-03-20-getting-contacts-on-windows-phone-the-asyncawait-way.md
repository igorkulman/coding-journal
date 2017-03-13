+++
title = "Getting contacts on Windows Phone the async/await way"
author = "Igor Kulman"
date = "2014-03-20"
url = "/getting-contacts-on-windows-phone-the-asyncawait-way/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone"]
+++
Getting contacts info on Windows Phone means using a callback based API provided by the Windows Phone SDK

<div data-gist="9572748" data-file="Contacts.Standard.cs"></div>

I really dislike all the callback-based API so I was looking for a way to convert it to an async/await based API. And it is quite easy to do so

<!--more-->

<div data-gist="9572748" data-file="AddressBookService.cs"></div>

You can find this implementation in my [Kulman.WP8][1] library (also [available on Nuget][2])

 [1]: https://github.com/igorkulman/Kulman.WP8
 [2]: http://www.nuget.org/packages/Kulman.WP8/
