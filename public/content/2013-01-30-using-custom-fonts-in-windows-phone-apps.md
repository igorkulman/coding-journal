---
title: Using custom fonts in Windows Phone apps
author: Igor Kulman
layout: post
date: 2013-01-30
url: /using-custom-fonts-in-windows-phone-apps/
dsq_thread_id:
  - 1179173172
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
---
Windows Phone allows yout to use custom TTF fonts in your apps. Using a custom font from XAML or C# is easy, but your run into troubles when you want to use if from a Background Agent (e.g: for updating a Live Tile).

**Adding font to solution**

The custom font must be a TTF, you can also use a ZIP file with multiple TTF files. You need to know the name of the font to identify it. Add the font file to your solution and set its build action to Content.

**Custom font and XAML**

Using a custom font in XAML is very straightforward. You just need to set the _FontFamily_ property to the font file path followed by a hash (#) and the font name:

**Custom font and C#**

Using a custom font from C# follows the same principle. You just need to set the _FontFamily_ property to a new FontFamily instance created by the constructor that takes a font family name as a parameter:

**Custom font and Background Agent**

Using a custom font from a Background Agent is a bit tricky. If you want to use it to render an image for your Live Tile, you will find out, that none of the before mentioned steps work. The font just does not get rendered. I suspect that the font does not get loaded because of some bug in the Silverlight runtime. 

A possible workaround is to to read the font file as a stream and set this stream to the TextBlock&#8217;s _FontSource_ property before setting the _FontFamily_ property: