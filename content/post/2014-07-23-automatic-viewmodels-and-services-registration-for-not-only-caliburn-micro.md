+++
title = "Automatic ViewModels and Services registration for (not only) Caliburn.Micro"
author = "Igor Kulman"
date = "2014-07-23"
url = "/automatic-viewmodels-and-services-registration-for-not-only-caliburn-micro/"
categories = ["Windows Phone"]
tags = ["Csharp","Caliburn-Micro","Windows Phone","Windows Store","WinRT"]
+++

My MVVM framework of choice, Caliburn.Micro, provides a simple Dependency Injection container, where you have to register all your ViewModels and Services. This is done in the Bootstraper&#8217;s Configure method and may look like this:

{{% gist id="0353b26073fc11d3635f" file="reg1.cs" %}}

where you typically register your ViewModels as per request and services as singletons. 

Of course this is done just once, but having to register a ViewModel each time you create a new one can be a nuisance, especially in a large project. 

<!--more-->

There is a better way that uses reflection. First, you need to create attributes that will represent registration as per request and a s singleton:

{{% gist id="0353b26073fc11d3635f" file="PerRequest.cs" %}}

{{% gist id="0353b26073fc11d3635f" file="Singleton.cs" %}}

Iterating over all the non-abstract classes in your assemblies using reflection is quite easy, the tricky part is deciding when to register a class as &#8220;itself&#8221; and when to register it for an interface it implements. My rule of thumbs is that if the class implements exactly one interface, it is one of my services and I register it for that interface, otherwise I register it as itself (ViewModels descendant from Screen implement circa 5 interfaces). 

The final registration code looks different for WinRT (Windows 8, Windows 8.1, Windows Phone 8.1 XAML)

{{% gist id="0353b26073fc11d3635f" file="reg2.cs" %}}

and for &#8220;classic&#8221; .NET (Windows Phone 8)

{{% gist id="0353b26073fc11d3635f" file="reg3.cs" %}}

because of reflection differences in WinRT. Do not forget to add the PerRequest or Singleton attribute to your classes to make it work.
