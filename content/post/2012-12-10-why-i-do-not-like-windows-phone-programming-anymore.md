+++
title = "Why I do not like Windows Phone programming anymore"
author = "Igor Kulman"
date = "2012-12-10"
url = "/why-i-do-not-like-windows-phone-programming-anymore/"
categories = ["Windows Phone"]
tags = ["Windows Phone","WinRT"]
+++
Before I start with the actual arguments I feel a need to state my background first so you do not mistake me with just another hater rattling about things he does not know. I have been a long time .NET developer, I have worked with winforms, webforms, mvc, compact framework. I really like C# and love F#. In February I started to work as a full time Windows Phone developer. Although I have been programming exclusively for Windows 8 for the last few months I have a ton of experience with Windows Phone programming. 

**Good old Windows Phone 7 times**

I really like Windows Phone 7 as a programmer. Although capabilities of this mobile OS are very limited compared to other platforms, the things you can do can be done easily and reliably. The OS is based on Silverlight, which is a mature platform. Everything works as you would expect.

**The abomination called Windows Phone 8**

When I first got my hands on a Windows Phone 8 phone I was really disappointed. I wrote two concrete post about [troubles with Windows Phone Store region][1] and an [unaccountable approach to MP3 tags][2] but lets take it more generally. Windows Phone 8 feels like Windows Phone 7 written from scratch using another technology, visually looking nearly the same but full of bugs and unfinished things. I am really amazed at things that worked on Windows Phone 7 but work much worse on Windows Phone 8. I thought that only Czech and Slovak people suffered from the &#8220;not invented here&#8221; syndrome but clearly it might be a more widespread disease. 

<!--more-->

The advocates of throwing away Silverlight and writing everything from scratch always tell you that it allows you to share your code with Windows 8, use the same APIs and program the same way. And they try hard to persuade you that all the Windows Phone 7 apps run great on Windows Phone 8. Neither of this statements are completely true.

**Running Windows Phone 7 apps on Windows Phone 8**

The majority of Windows Phone 7 apps run ok on Windows Phone 8 but your own app never falls into that ok category. If you do not use any problematic APIs yours will be fine just with replacing all your graphic resources with a twice the size equivalent. And you should definitely do so, because all the icons and backgrounds look ugly scaled up on a high resolution phones like the HTC 8X. The splashcreens also look ugly scaled up but there is nothing you can do about it, a splashscreen in a Windows Phone 7 project must always be 480&#215;800.

There are [some API incompatibilities][3] you should be aware of and also some undocumented problems. For instance if you use udp multicast, your application will not work on Windows Phone 8. It will join the multicast group but will neither send nor receive any packets. No error or exception thrown, it just will not work. What is even worse is that [you cannot opt-out from Windows Phone 8][4] in the Windows Phone Store. That means that if you upload your Windows Phone 7 app to the Windows Phone Store and you know that it does not work on Windows Phone 8, there is no way to ban it from being installed on Windows Phone 8 devices. At least no way for you, apps like WhatsApp can do it.

**Sharing code between Windows 8 and Windows Phone 8**

The biggest benefit of throwing away Silverlight and using the same kernel as Windows 8 should be the before-mentioned ability to share code when programming for both platforms. The Windows Phone 8 API is only a subset of the Windows 8 API (WinRT) so you cannot share everything. Take a simple task, downloading a string from the internet. In Windows Phone 7 you would use the WebClient class, in Windows 8 it is not available, so you have to go a bit deeper and use the HttpHandler class. There is no HttpHandler only WebClient so no sharing of code here. I can state many more examples. 

Sometimes you find APIs in Windows Phone 8 from phone Windows Phone 7 and Windows 8 and you are very surprised by it (I was). One example can be that to store your app&#8217;s settings you can use IssolatesStorageSettings from Windows Phone 7 and ApplicationData.Current.LocalSettings from Windows 8. It is a bit strange you say to yourself and choose to use the latter to be able to share the code with Windows 8. You implement your app using this Windows 8 API, the app compiles without problems and then you run the app. What do you get? A [NotImplementedException][5]! This makes me want to punch someone into the face. So why is this included in the API if it is not implemented? It should not be there or at least the compilers should warn you. There are many more Windows 8 APIs that will throw you a NotImplementedException. 

**New era?**

Trying to say something positive; if you are a C++, web or game developer that you can use for skill in Windows Phone 8 programming, if you for some reason decide to target this (to be honest with ourselves) irrelevant mobile platform. If you are a C# developer the Windows Phone 8 development sucks for you. The same can be said about Windows 8 development, where creating a content app in HTML is much easier that trying to bend XAML to your needs (maybe I will write a separate post about this). Quite an interesting twist, would you not say?

 [1]: http://blog.kulman.sk/store-region-messed-up-in-windows-phone-8/
 [2]: http://blog.kulman.sk/htc-8x-windows-phone-8-and-playing-music/
 [3]: http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj206947(v=vs.105).aspx
 [4]: http://stackoverflow.com/questions/13702991/is-there-a-way-to-opt-out-from-wp8-when-submiting-an-windows-phone-app/
 [5]: https://twitter.com/igorkulman/status/276698899689914368
