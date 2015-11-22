---
title: Intercepting methods with Ninject for error logging
author: Igor Kulman
layout: post
date: 2013-07-24
url: /intercepting-methods-with-ninject-for-error-logging/
dsq_thread_id:
  - 1515007871
categories:
  - Windows Azure
tags:
  - azure
  - 'c#'
  - ninject
---
I am currently working on a fairly large Windows Azure projects that among other things conatins a Web Role where I use [Ninject][1] as a dependency container. As the business logic library grew larger I found myself writing a lot of repeating boiler plate code to log exceptions in many important methods. I wantet to remove all the boiler plate code and create a custom attribute, say LogErrorAttribute with one simple goal: each method decorated woth this attribute should log info about any occuring exception.

**IL weaving?**

I have been using [Fody][2] for some time to [implement the INotifyPropertyChanged calls for me in Windows Phone and Windows 8 projects][3] so it was my first choice. 

There is a [Fody.MethodDecorator][4] extensions that allows you to execute your code on a methods start, exit and exception. Writing the exception to Console is trivial, but I wanted to use a implementation of my custom ILogFactory. 

There was no way to inject a ILogFactory implementation into the InterceptorAttribute. The only way that could work would be to use a ServiceLocator and I did not want to do it.

**Dynamic proxy!**

I came across [Castle Dynamic Proxy][5] and realized that there are Ninject extensions that allow you to easily use it. 

First you need to install [Ninject.Extensions.Interception][6]. It has no depedencies other that Ninject, but you also have to install [Ninject.Extensions.Interception.DynamicProxy][7] (and [Castle.Core][8] as a dependency) otherwise it will not work.

First, create a class implementing the IInterceptor interface

{{< gist 6045777>}}

This class wraps the intercepted method invocation into a try..catch block and logs any occuring exception using my custom ILogFactory, including parameter values.

Next, create a class implementing the InterceptAttribute

{{< gist 6045812>}}

This attribute uses the Ninject kernel to get an instance of the ErrorLoggingInterceptor so you do not have to concern yourself explictily with providing an ILogFactory implementation, Ninject will do all the work.

Now you can use the LogErrorAttribute to mark any method, but keep in mind that all the marked methods must be virtual

{{< gist 6045825>}}

 [1]: http://www.ninject.org/
 [2]: https://github.com/Fody/Fody
 [3]: http://blog.kulman.sk/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/ "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
 [4]: https://github.com/Fody/MethodDecorator
 [5]: http://www.castleproject.org/projects/dynamicproxy/
 [6]: http://www.nuget.org/packages/Ninject.Extensions.Interception/3.0.0.8
 [7]: http://www.nuget.org/packages/Ninject.Extensions.Interception.DynamicProxy/3.0.0.8
 [8]: http://www.nuget.org/packages/Castle.Core/