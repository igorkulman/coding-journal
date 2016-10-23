+++
title = "Automatic ViewModels and Services registration for (not only) Caliburn.Micro"
author = "Igor Kulman"
date = "2014-07-23"
url = "/automatic-viewmodels-and-services-registration-for-not-only-caliburn-micro/"
categories = ["Windows Phone"]
tags = ["c#","Caliburn.Micro","Windows Phone","windows store","winrt"]
+++
My MVVM framework of choice, Caliburn.Micro, provides a simple Dependency Injection container, where you have to register all your ViewModels and Services. This is done in the Bootstraper&#8217;s Configure method and may look like this:

<div data-gist="0353b26073fc11d3635f" data-file="reg1.cs"></div>

where you typically register your ViewModels as per request and services as singletons. 

Of course this is done just once, but having to register a ViewModel each time you create a new one can be a nuisance, especially in a large project. 

<!--more-->

There is a better way that uses reflection. First, you need to create attributes that will represent registration as per request and a s singleton:

<div data-gist="0353b26073fc11d3635f" data-file="PerRequest.cs"></div>

<div data-gist="0353b26073fc11d3635f" data-file="Singleton.cs"></div>

Iterating over all the non-abstract classes in your assemblies using reflection is quite easy, the tricky part is deciding when to register a class as &#8220;itself&#8221; and when to register it for an interface it implements. My rule of thumbs is that if the class implements exactly one interface, it is one of my services and I register it for that interface, otherwise I register it as itself (ViewModels descendant from Screen implement circa 5 interfaces). 

The final registration code looks different for WinRT (Windows 8, Windows 8.1, Windows Phone 8.1 XAML)

<div data-gist="0353b26073fc11d3635f" data-file="reg2.cs"></div>

and for &#8220;classic&#8221; .NET (Windows Phone 8)

<div data-gist="0353b26073fc11d3635f" data-file="reg3.cs"></div>

because of reflection differences in WinRT. Do not forget to add the PerRequest or Singleton attribute to your classes to make it work.
