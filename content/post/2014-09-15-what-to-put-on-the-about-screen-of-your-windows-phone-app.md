+++
title = "What to put on the about screen of your Windows Phone app"
author = "Igor Kulman"
date = "2014-09-15"
url = "/what-to-put-on-the-about-screen-of-your-windows-phone-app/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone","Windows Store","XAML"]
+++
The about screen of a Windows Phone app is usually the most overlooked part of the app. Sure, the users usually visit it only once, after installing the app, if ever, but it is a part of your Windows Phone app that you could put to a good use. 

If you have ever taken a DVLUP challenge you may have noticed, that they recommend you place a text describing your app on the about screen. I really do not agree with this. If users install your app, they know what the app does and if they cannot figure it out, then your UI is a failure and the about screen will not save you.

After some trial and error I came up with a standardized about screen I now use in all my apps. It is a pivot with two tabs; About and More apps. 

<!--more-->

The About tab is the most important. It shows the version of the app, this is important when users report problems, information about the author and the designer of the app with Twitter contacts and buttons to send feedback via email and rate the app in the Windows Phone Store. Providing a feedback mechanism is really important, the users will write you about an issue they have with the app instead of just giving you a bad review in the Windows Phone Store.

{{% img-responsive "/images/about1.png" %}}

The screenshot shows the About page from my latest app [TvTime][2]. You can easily get the app version from the manifest using the [ManifestHelper][3] from the [Kulman.WP8 Nuget package][4].

You should know that submitting an app is just a beginning, you then have to answer to user feedback, provide bug fixes, etc. In my case, the Feedback button launches an EmailComposeTask with filled in recipient and subject so the users just write what is on their minds and send it to me. I always answer each and every one of those feedback emails. 

I use the second tab, More apps, as a form of cross-promotion.

{{% img-responsive "/images/about2.png" %}}

If the users like your app, they may also like your other apps so why not make it easier for them to get them. I have a simple XML file with names, links and icons of my apps hosted on a webserver that the app downloads and displays, of course removing itself from the list.

To sum it all up, do not underestimate your about screen, use it to provide your users with a feedback mechanism. You will make your apps better.

 [1]: http://blog.kulman.sk/wp-content/uploads/2014/09/about1.png
 [2]: http://blog.kulman.sk/tvtime-track-your-favorite-tv-shows-on-windows-phone/ "TvTime: track your favorite TV shows on Windows Phone"
 [3]: https://github.com/igorkulman/Kulman.WP8/blob/master/Kulman.WP8/Code/ManifestHelper.cs
 [4]: https://www.nuget.org/packages/Kulman.WP8/
 [5]: http://blog.kulman.sk/wp-content/uploads/2014/09/about2.png
