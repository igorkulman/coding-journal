---
title: Visual Studio template for Caliburn.Micro Windows Phone apps
author: Igor Kulman
layout: post
date: 2014-11-03
url: /visual-studio-template-for-caliburn-micro-windows-phone-apps/
dsq_thread_id:
  - 3186665284
categories:
  - Windows Phone
tags:
  - 'c#'
  - Caliburn.Micro
  - Windows Phone
  - xaml
---
I have been building Windows Phone apps using the [Caliburn.Micro][1] framework for some time now. Setting up a new project takes some time and can be easily automated, so I decided to create a Visual Studio template for Windows Phone apps build with Caliburn.Micro.

The templates can be downloaded from [the Visual Studio Extensions gallery][2] and used to build Windows Phone 8 and Windows Phone 8.1 Silverlight apps. It contains the basic setup with Caliburn Micro and [Fody][3], with a sample view and viewmodel.

The [source code is available on GitHub][4], so if you want to modify it to best suit your needs, feel free to do it.

 [1]: https://github.com/Caliburn-Micro/Caliburn.Micro
 [2]: https://visualstudiogallery.msdn.microsoft.com/21b4568e-1fb9-4881-9d51-8e1ea0160a9f
 [3]: http://blog.kulman.sk/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/ "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
 [4]: https://github.com/igorkulman/CaliburnWP8AppVSIX