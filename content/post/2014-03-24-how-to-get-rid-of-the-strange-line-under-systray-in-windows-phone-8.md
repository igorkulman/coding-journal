+++
title = "How to get rid of the strange line under systray in Windows Phone 8"
author = "Igor Kulman"
date = "2014-03-24"
url = "/how-to-get-rid-of-the-strange-line-under-systray-in-windows-phone-8/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone","XAML"]
+++
If you create an Windows Phone 8 app and test it only on WVGA and 720p devices or emulators, you may be surprised how you app looks on a WXGA device (or emulator). 

{{% img-responsive "/images/line.png" %}}

I have not been able the reason why this happens but the solution is quite simple. Set your page&#8217;s top border to -1. 

<!--more-->

{{% gist id="9572347" file="line.xaml" %}}

Doing this in XAML for every page is not very convenient, a better solution would be to set the negative top margin on the whole application frame

{{% gist id="9572347" file="line.cs" %}}

If you use Caliburn.Micro, you need to override the CreatePhoneApplicationFrame in the Bootstrapper instead

{{% gist id="9572347" file="line.caliburn.cs" %}}

 [1]: http://blog.kulman.sk/wp-content/uploads/2014/03/line.png
