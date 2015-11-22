---
title: AutoCompleteBox for Windows Store apps
author: Igor Kulman
layout: post
date: 2012-11-29
url: /autocompletebox-for-windows-store-apps/
onswipe_thumb:
  - SKIP
dsq_thread_id:
  - 1394855540
categories:
  - WinRT
tags:
  - nuget
  - winrt
---
There is no AutoCompleteBox control that can be used when building Windows Store apps in C# and XAML so I decided to create one, because I needed it for a project. Currently it supports only String collections and the selected value must be accessed using code behind, but this will hopefully change. 

The AutoCompleteBox uses [WinRT XAML Toolkit][1] to show the watermark and [Reactive Extensions][2] so the users does not need to press enter, the results will show after they stop typing for a second.

The project is hosted on my Bitbucket so you can check it out at <https://github.com/igorkulman/AutoCompleteBox>, forks and code contributions are welcomed. Nuget package is available at <https://nuget.org/packages/AutoCompleteBoxWinRT>.

Installation using Nuget: 

[code]
  
Install-Package AutoCompleteBoxWinRT
  
[/code]

 [1]: http://winrtxamltoolkit.codeplex.com/
 [2]: http://msdn.microsoft.com/en-us/data/gg577609.aspx