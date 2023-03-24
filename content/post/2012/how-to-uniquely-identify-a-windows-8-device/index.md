+++
title = "How to uniquely identify a Windows 8 device"
author = "Igor Kulman"
date = "2012-11-08"
url = "/how-to-uniquely-identify-a-windows-8-device/"
categories = ["WinRT"]
tags = ["Csharp","WinRT"]
+++
When developing a Windows 8 app you may need to uniquely identify the device the app runs on. One reason may be the implementation of in-app purchases.
  
The Windows.System.Profile namespace contains HardwareToken that you can get by calling HardwareIdentification.GetPackageSpecificToken(null)

```csharp
var packageSpecificToken = Windows.System.Profile.HardwareIdentification.GetPackageSpecificToken(null);
```

This class contains a bunch of interesting fields

```csharp
var hardwareId = packageSpecificToken.Id;
var signature = packageSpecificToken.Signature;
var certificate = packageSpecificToken.Certificate;
```

<!--more-->

All of these fields are of type Windows.Storage.Stream.Ibuffer, therefore COM calls. To use a value useable with .NET you have to use the DataReader, I get the unique device identifier from the hardwareId

```csharp
var dataReader = Windows.Storage.Streams.DataReader.FromBuffer(hardwareId);
var array = new byte[hardwareId.Length];dataReader.ReadBytes(array)
```

The resulting byte array can be converted to an UTF8 string

```csharp
string uuid = System.Text.Encoding.UTF8.GetString(array, 0, array.Length); 
```

I prefer concatenating the bytes to a string

```csharp
StringBuilder sb = new StringBuilder();
for (var i = 0; i < array.Length; i++)
{        
    sb.Append(array[i].ToString());
} 
string uuid = sb.ToString();
```

**Update:** The hardware token of a device can change with hardware changes. Even small hardware changes like disabling Bluetooth can change the hardware token. You should generate it just once and save it.
