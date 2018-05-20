+++
title = "Getting contacts on Windows Phone the async/await way"
author = "Igor Kulman"
date = "2014-03-20"
url = "/getting-contacts-on-windows-phone-the-asyncawait-way/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone"]
+++
Getting contacts info on Windows Phone means using a callback based API provided by the Windows Phone SDK

{{% gist id="9572748" file="Contacts.Standard.cs" %}}

I really dislike all the callback-based API so I was looking for a way to convert it to an async/await based API. And it is quite easy to do so

<!--more-->

{{% gist id="9572748" file="AddressBookService.cs" %}}

You can find this implementation in my [Kulman.WP8][1] library (also [available on Nuget][2])

 [1]: https://github.com/igorkulman/Kulman.WP8
 [2]: http://www.nuget.org/packages/Kulman.WP8/

{{% github-repo "igorkulman/Kulman.WP8" %}}