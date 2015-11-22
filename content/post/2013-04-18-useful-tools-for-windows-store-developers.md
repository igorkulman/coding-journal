---
title: Useful tools for Windows Store developers
author: Igor Kulman
layout: post
date: 2013-04-18
url: /useful-tools-for-windows-store-developers/
dsq_thread_id:
  - 1405667874
categories:
  - Windows Phone
  - WinRT
tags:
  - 'c#'
  - windows store
  - xaml
---
I recently discovered two really neet tools that helped me with Windows Store app development. 

**Windows Store Icon Maker**

When creating a Windows Store or Windows 8 apps, there are many icon sizes you have to provide. If you do nont wat to do all the resizing by yourself, you can use the [Windows Store Icon Maker][1]. It is a fork of the [Windows Phone Icons Maker][2] with added support for Windows Store apps. It takes a 300x300px icon as input and outputs all the square icons you need. 

**HAMMER.Pants**

To brand Windows Store apps written in XAML, you need to override all the control styles. This sucks if you just want to change the colours to match your theme. [HAMMER.Pants][3] solves this, by auto-modifying all the coloured brushes so you don&#8217;t have to pick through them. Currently, you provide a &#8220;base&#8221; colour, and HAMMER.Pants modifies that based on the luminance variation found in the original styles. That is, if you pick red, all the purples will be replaced with reds, but they&#8217;ll change in brightness slightly just like the default purples do.

 [1]: https://github.com/DavidBurela/WindowsMarketplaceIconMaker
 [2]: http://wpiconmaker.codeplex.com/
 [3]: https://github.com/Code52/HAMMER