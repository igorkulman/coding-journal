+++
title = "The problem with Windows 8 development is the WinRT’s lack of capabilities"
author = "Igor Kulman"
date = "2013-03-14"
url = "/why-are-there-no-great-windows-8-apps-because-of-winrt-a-developers-view/"
categories = ["WinRT"]
tags = ["Csharp","winrt"]
+++
Let&#8217;s face it, there are no really great apps for Windows 8 and the number of trashy apps is also very low compared to the Android and iOS ecosystems. Microsoft looks really desperate to bring more apps and developers to the ecosystem. Instead of improving the API and its capabilities, Microsoft just generates desperately looking campaigns to improve the apps count. I sometimes wonder if they ever realize that the number of apps is not important when people cannot find the apps they are used to use on Android or iOS in the Windows Store.

{{% post-image "microsoft-surface-2-650x0.jpg" %}}

So why are there so few Windows 8 apps? I will tell you my (and only my) opinion and experience. I developed a few Windows 8 apps, some of them fairly complex. I tried to develop a few really great apps but many of those projects never got done. The reason is the API (WinRT).

Let&#8217;s start with something (that should be) trivial. Imagine you want to **display HTML files with images, CSS, JS in a WebView**. It is a common scenario for displaying downloaded manuals, interactive texts, etc. It can be done on Android, iOS and even on Windows Phone by copying the data to isolated storage and pointing the WebView there. 

This scenario is impossible in WinRT. You can reference files in Isolated Storage (Local / Roaming folders) using the ms-appdata protocol, but the WebView does not work with it. You can use the NavigateToString method to display one HTML file, but all the images, CSS, JS references must be internet URLs, you cannot reference other local files. The only way around this issue is to inline all the CSS, JS and images (as base64) to the HTML file. Really messy, painful and slow and not really an option if you have JS reading XML files and inserting external images.

<!--more-->

<del datetime="2013-03-21T17:08:20+00:00">There is another workaround pointed out by Javier Sosa in the comments. Instead of saving your files to Local / Roaming folders, save them to the installation folder of your app (Windows.ApplicationModel.Package.Current.InstalledLocation) and use the ms-appx-web protocol. The WebView can for some reason work with ms-appx-web but not with ms-appdata. Saving your data to the installation folder instead of data folders is quite messy in my opinion. Another problem is, that you cannot create folders in Windows.ApplicationModel.Package.Current.InstalledLocation. This means you have to preprocess your HTML,CSS,JS files and make the file structure flat.</del> Turns out this works only in debug, so it is not a viable workaround.

Let us continue with something as basic and common as Zip files. Windows 8 offers absolutely [no protection of your locally saved files][2] so a client may want to at least use password protected Zip files. **The ZipArchive class in WinRT does not support password protected Zip files**. No 3rd party Zip library can be compiled in WinRT because of a missing Security namespace. You are out of luck, [there is no workaround][3] and it may be a deal-breaker for a security-conscious client. 

**Update:** [SharpCompress][4] now supports WinRT! Get [version 0.9+ from Nuget][5].

Let us assume that you want to create an interactive textbook app like there are a few on iOS. The apps should contain **multimedia content like images, video, sounds, Word and Excel documents**. You would assume that displaying (or better said previewing) Microsoft Word and Microsoft Excel files on a Microsoft platform would be easy. You should have learned to limit your expectations and always assume the worst by now when dealing with WinRT. You can [display Word documents with a component for $199][6] and [Excel sheets with one for $1195][7]. Previewing Microsoft Office documents on iOS is easy and [built-in][8].

Do you need your app to **display PDF files**? There are a few solutions, mainly in beta and each has some flaws. I will write a [separate article about rendering PDF files in WinRT][9] but, again, be prepared to spend at least $900 for something that can be done for free on other platforms. Sure, you can send the PDF file to the default PDF viewer but that is usually not what you want. It takes the user out of your app and more importantly you cannot protected the PDF content from copying, sharing, etc.

Do not forget about the [strange behavior of the Windows Store certification process][10] and the bugs. 

I am really fed up with telling customers who want an (complex iOS clone) app the magic words &#8220;it is not possible in Windows 8&#8221;.


 [2]: http://blog.kulman.sk/tampering-with-windows-store-apps-data/
 [3]: http://stackoverflow.com/questions/15367922/ziparchive-with-password-in-windows-store-apps
 [4]: https://github.com/adamhathcock/sharpcompress
 [5]: https://nuget.org/packages/sharpcompress/
 [6]: https://www.syncfusion.com/products/winrt
 [7]: https://www.componentone.com/SuperProducts/SpreadWinRT/
 [8]: http://developer.apple.com/library/ios/#DOCUMENTATION/QuickLook/Reference/QuickLookFrameworkReference_iPhoneOS/_index.html
 [9]: http://blog.kulman.sk/displaying-pdf-files-in-windows-store-apps/
 [10]: http://blog.kulman.sk/few-thoughts-about-the-windows-phone-store-certification-process/
