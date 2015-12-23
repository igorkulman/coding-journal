+++
title = "Testing in-app purchases in Windows Phone"
author = "Igor Kulman"
date = "2014-03-17"
url = "/testing-in-app-purchases-in-windows-phone/"
categories = ["Windows Phone"]
tags = ["c#","inapp","Windows Phone","windows store"]
+++
Windows Phone Store does not offer developers any sandbox to test in-app purchases in their apps, like stores on other platforms do. If you want test in-app purchases in your Windows Phone apps, you need to use other options.

To make in-app purchases implementation easier, I created a simple Windows Phone Store service interface in my [Kulman.WP8][1] library (also [available on Nuget][2])

<script src="https://gist.github.com/igorkulman/9571908.js?file=IWindowsPhoneStoreService.cs"></script>

<!--more-->

**Private beta**

If you publish your app as a private beta and add the in-app products, you can test them. All the in-app purchases are always free in this scenario. The disadvantage is that you cannot debug anything, it either works or it does not (if you use my [implementation from Kulman.WP8][3], it should :).

**Real app testing**

If your app is already in the Windows Phone Store, create an in-app product and try to buy it from your app run from Visual Studio, you may be wondering, why you are getting an error. The problem is that the app run from Visual Studio has a different app id from the app in Windows Phone Store. If you change the app id in the manifest to the app id state in Windows Phone Store (the details view), you will be able to make a real in-app purchase. 

**Mocking library**

To mock in-app purchases you can use the [Mock In-App Purchase Library][4]. To make testing easier, implement my interface using this library

{{< gist 9571846>}}

And setup the products you want to use at your app startup

<script src="https://gist.github.com/igorkulman/9571908.js?file=SetupMockIAP.cs"></script>

The advantage of this approach is that you just switch the IWindowsStoreService implementation between then mock on and the [real one][3], depending on the situation. For example (Caliburn.Micro Bootstrapper)

<script src="https://gist.github.com/igorkulman/9571908.js?file=IAP.cs"></script>

 [1]: https://github.com/igorkulman/Kulman.WP8
 [2]: http://www.nuget.org/packages/Kulman.WP8/
 [3]: https://github.com/igorkulman/Kulman.WP8/blob/master/Kulman.WP8/Services/WindowsPhoneStoreService.cs
 [4]: http://code.msdn.microsoft.com/wpapps/Mock-In-App-Purchase-33080f0c
