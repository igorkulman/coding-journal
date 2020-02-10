+++
title = "Why Universal Apps as not as universal as you may think"
author = "Igor Kulman"
date = "2014-12-18"
url = "/why-universal-apps-as-not-as-universal-as-you-may-think/"
categories = ["Windows Phone","WinRT"]
tags = ["Csharp","Windows Phone","Windows Store","WinRT","XAML"]
+++
I have been developing Windows Phone apps for a few years now, always sticking to Silverlight and keeping using Silverlight also after Microsoft announced the WinRT flavor of Windows Phone apps and the so called Universal Apps. The Windows Phone 8.0 and 8.1 Silverlight APIs have some limitations, but are now well known do not contain many bugs. They are the safe choice if you want to create a Windows Phone apps. And do not forget that there are still many device running Windows Phone 8 (like Verizon customers in the US) that never got the 8.1 updated promised to everyone during the summer. 

**Really universal?**

Windows Phone 8.1 XAML and Universal Apps included WinRT APIs that have many problems, including some that there is no solution for. I used the WinRT APIs when creating first Windows 8 apps about 2 years ago, so I am not new to the APIs. I have not touched the WinRT APIs again until recently, because there was no demand for Windows 8 or Windows 8.1 apps. Why would it? People use Windows 8 or 8.1 but do not care about Metro apps, they give them no value compared to &#8220;normal&#8221; Win32 and Windows tablets are practically non-exists (expect for the Surface tablets owned by few programmers and maybe no one else). 

<!--more-->

**Universal Apps**

Recently, a client was thinking about adding a Windows Phone app for their service the its existing Android and iOS apps, but they did not think it was worth the money. So the local Microsoft branch told them they would pay for the app (seems like many of the app here are created this way) under two conditions. The app had to be a Universal App and had to be finished before the years end. The client agreed and I had to create a Universal App. And the problems started.

In theory, Universal Apps are supposed to make code sharing between Windows Phone and Windows 8.1 simple and allow you to reuse as much code as possible. This works on the trivial Microsoft samples, but try to create a real world app. I have a business logic project with API calls, storage, etc. in a portable class library (like I always did before Universal Apps existed) and I created an Universal App from the template. And the #ifdef hell started. 

![IFDEFS, IFDEFS everywhere](56995992.jpg)

**#ifdefs everywhere**

With Universal Apps you can safely share the ViewModels (I am using Caliburn.Micro) .. and that is about it. You have to create separate Views (because on phone and desktop information is typically displayed different), but the worst parts are the #ifdefs.

You need to set some properties of the main Frame, you have to use #ifdefs because the frame is a bit different on phone and desktop (like animations). You want to reuse as much DataTemplates as possible, so add another #ifdef for adding the right resource dictionary or many #ifdefs in the data templates to tune them, because it does not matter you use GridView on phone and GridView on desktop, they behave a bit differently in some cases.

Then you need to add audio playback to your app. There is a background audio playback API for Windows Phone 8.1 and none for Windows 8.1 In Windows 8.1 you need a global MediaElement in your Frame and handling everything differently. So add another big #ifdef. And by the way, the background audio playback API for Windows Phone 8.1 really sucks compared to the old Silverlight APIs. Just try downloading the [sample form MSDN][2] and hitting Suspend and Resume in Visual Studio, the background agent crashes horribly, without any exception and takes your Visual Studio instance to hell with it. And of course, the background audio playback API does not work on some phones. [Just does not work][3]. I confirmed this finding with other developers. Another messed up API that used to work before the whole Universal Apps hype. And explain this to the client who sees that things like this work on iOS, work on Android, hell, they even for on Windows Phone 8.0 (Slivelight) apps. 

**More messed up APIs**

So background audio playback API for Windows Phone 8.1 is messed up, anything else? Sure. BackgroundDownloader is another example. In Silverlight, there was a BackgroundDownloader that was quite limited, but it worked. In Universal Apps, there is a new BackgroundDownloader with some new features, and some essential ones missing. For example, in Silverlight, each download could have a Tag, where you can store any data so you know something about the download when it finishes (to what business entity it belongs, etc.). Not any more in Universal Apps. There is no Tag, so you have to build and manage you own kind of index for all the downloads, so you can actually match them to your business entities. An annoyance, but nothing you cannot manage, right.

The BackgroundDownloader in Universal Apps has a bigger problem. It sometimes crashes so horribly, that it reboots the whole device! No exception, no logs, just a reboot. The maximum limit for the BackgroundDownloader is 1000 downloads, but try adding say 300 to the queue, cancelling them after a few minutes (does not seem to matter if you use one cancellation token or give each download its own) and there is a good chance the phone or the emulator will reboot itself. Not always, but quite often. Again, try explaining this issue to the client.

**Performance**

In Silverlight, I commonly used the LongListSelector to display data, using it with a WrapPanel when I needed to create a two column layout. The LongListSelector is gone, in Universal Apps you have to use GridView also on Windows Phone. Or you can use the ListView with a custom wrap panel you write yourself or download somewhere, but it takes some effort to make it do virtualization properly. 

So you use GridView on both Windows Phone 8.1 and Windows 8.1 to make it consistent. Add tens f of items with images to it and the performance starts to really suffer. Gray placeholders will show up and more importantly, [never disappears][4]. You do not event need images, just add about 300 text only items to the GridView and the gray placeholders will starts to show when scrolling. 

Need another proof that the WinRT controls are slower? Just [take a look at this video comparing the media app on and old Windows Phone 7 to the media app on a much more powerful device running Windows Phone 8.1][5]. You can see that the old, single core device runs the Silverlight apps faster than the new powerful phone runs the new WinRT equivalent of the app.

 [2]: https://code.msdn.microsoft.com/windowsapps/BackgroundAudio-63bbc319
 [3]: https://stackoverflow.com/questions/26175599/windows-phone-8-1-rt-backgroundmediaplayer-not-working
 [4]: https://stackoverflow.com/questions/27488201/gridview-and-placeholders-that-never-disapper-in-windows-8-and-windows-phone-app
 [5]: https://www.youtube.com/watch?v=nn5hVq6Q-zo
