+++
title = "Loading XAML components at runtime"
author = "Igor Kulman"
date = "2012-11-20"
url = "/loading-xaml-components-at-runtime/"
categories = ["WinRT"]
tags = ["Csharp","WinRT","XAML"]
+++
When I had to create a library to generate UI elements with animated image Ads I found out that creating complicated UI elements in code with bindings is not as easy as doing the same in XAML. A better way is to create your UI elements and bindings in a XAML file (if they are not very dynamic of course), load the XAML at runtime, parse it and set its DataContext.

First you need to read the XAML file. You can use the standard API with Windows.ApplicationModel.Package.Current.InstalledLocation as the folder. The XAML file must be set to Build=Content in your project

{{< highlight csharp >}}
var path = @"Templates\SkyScrapper.xaml";
var folder = Windows.ApplicationModel.Package.Current.InstalledLocation;

var file = await _Folder.GetFileAsync(_Path);
var template = await Windows.Storage.FileIO.ReadTextAsync(_File);
{{< / highlight >}}

<!--more-->

Once you have the XAML read as string, you can use the XamlReader and cast it to a DependencyObject.

{{< highlight csharp >}}
var rootObject = XamlReader.Load(template) as DependencyObject;
{{< / highlight >}}

or a more concrete class like UserControl if you know what the file contains.
