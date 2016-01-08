+++
title = "Beware of removing localizations from your Windows Phone apps"
author = "Igor Kulman"
date = "2013-06-05"
url = "/beware-of-removing-localizations-from-your-windows-phone-apps/"
categories = ["Windows Phone"]
tags = ["c#","Windows Phone"]
+++
When I released version 2.0 of my app [Photo Timeline][1], some users reported updating problems. I finally found out what caused the problem and submited a new build to the Windows Phone store.

In my app I had three localizations: en-US (default), en and cs. I do not exactly remember why I had English twice as localization. I decided to remove the en localization thinking that nothing will break and that was a mistake. 

**Once you add a localization to your app, never remove it!** If you do so, all the users who use your app with that localization will have update problems.

<!--more-->

 [1]: http://phototimeline.kulman.sk/
