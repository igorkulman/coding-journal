---
title: How to uniquely identify a Windows 8 device
author: Igor Kulman
layout: post
date: 2012-11-08
url: /how-to-uniquely-identify-a-windows-8-device/
onswipe_thumb:
  - SKIP
dsq_thread_id:
  - 1404773828
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
categories:
  - WinRT
tags:
  - 'c#'
  - metro
  - winrt
---
When developing a Windows 8 app you may need to uniquely identify the device the app runs on. One reason may be the implementation of in-app purchases.
  
The Windows.System.Profile namespace contains HardwareToken that you can get by calling HardwareIdentification.GetPackageSpecificToken(null)

This class contains a bunch of interesting fields

All of these fields are of type Windows.Storage.Stream.Ibuffer, therefore COM calls. To use a value useable with .NET you have to use the DataReader, I get the unique device identifier from the hardwareId

The resulting byte array can be converted to an UTF8 string

I prefer concatenating the bytes to a string

**Update:** The hardware token of a device can change with hardware changes. Even small hardware changes like disabling Bluetooth can change the hardware token. You should generate it just once and save it.