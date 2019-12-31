+++
title = "Using .NET libraries with MonoTouch"
author = "Igor Kulman"
date = "2012-12-28"
url = "/using-net-libraries-with-monotouch/"
categories = ["Programming in general"]
tags = ["Csharp","iOS","Mono","MonoTouch"]
+++
I have been [playing with MonoTouch][1] only for a few days when I already started to miss all the .NET libraries I commonly use. The first one I needed to get working with MonoTouch was [JSON.NET][2].

MonoDevelop does not support Nuget so you have to get your libaries the old way. I downloaded JSON.NET package from [Nuget.org][3], but it does not contain a DLL built for Mono. Harldy any Nuget package does. You can reference a DLL built for .NET, MonoDevelop will recognize it and even offer you IntelliSense but your project will not get built.

The right way to get a .NET library working with MonoTouch is downloading its source code and building it yourself. You can use MonoDevelop to build the source codes. The only think you have to do (at least for JSON.NET) is to change the .NET profile to an equivalent Mono profile in the project settings.

<!--more-->

 [1]: http://blog.kulman.sk/monotouch-ios-development-for-net-programmers/
 [2]: http://james.newtonking.com/projects/json-net.aspx
 [3]: http://nuget.org/
