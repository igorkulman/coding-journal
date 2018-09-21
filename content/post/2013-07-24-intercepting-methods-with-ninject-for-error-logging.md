+++
title = "Intercepting methods with Ninject for error logging"
author = "Igor Kulman"
date = "2013-07-24"
url = "/intercepting-methods-with-ninject-for-error-logging/"
categories = ["Windows Azure"]
tags = ["Azure","Csharp","Ninject"]
+++
I am currently working on a fairly large Windows Azure projects that among other things conatins a Web Role where I use [Ninject][1] as a dependency container. As the business logic library grew larger I found myself writing a lot of repeating boiler plate code to log exceptions in many important methods. I wantet to remove all the boiler plate code and create a custom attribute, say LogErrorAttribute with one simple goal: each method decorated woth this attribute should log info about any occuring exception.

**IL weaving?**

I have been using [Fody][2] for some time to [implement the INotifyPropertyChanged calls for me in Windows Phone and Windows 8 projects][3] so it was my first choice. 

There is a [Fody.MethodDecorator][4] extensions that allows you to execute your code on a methods start, exit and exception. Writing the exception to Console is trivial, but I wanted to use a implementation of my custom ILogFactory. 

<!--more-->

There was no way to inject a ILogFactory implementation into the InterceptorAttribute. The only way that could work would be to use a ServiceLocator and I did not want to do it.

**Dynamic proxy!**

I came across [Castle Dynamic Proxy][5] and realized that there are Ninject extensions that allow you to easily use it. 

First you need to install [Ninject.Extensions.Interception][6]. It has no depedencies other that Ninject, but you also have to install [Ninject.Extensions.Interception.DynamicProxy][7] (and [Castle.Core][8] as a dependency) otherwise it will not work.

First, create a class implementing the IInterceptor interface

{{< highlight csharp >}}
public class ErrorLoggingInterceptor : IInterceptor
{
    private readonly ILogFactory _logFactory;

    public ErrorLoggingInterceptor(ILogFactory logFactory)
    {
      _logFactory = logFactory;
    }

    public void Intercept(IInvocation invocation)
    {
      try
      {
        invocation.Proceed();
      }
      catch (Exception e)
      {
        var sb = new StringBuilder();
        sb.AppendFormat("Executing {0}.{1} (", invocation.Request.Target.GetType().Name, invocation.Request.Method.Name);
        var parameters = invocation.Request.Method.GetParameters();
        for (int i=0;i<invocation.Request.Arguments.Length;++i)
        {
            sb.AppendFormat("{0}={1},", parameters[i].Name, invocation.Request.Arguments[i]);
        }
        sb.AppendFormat(") {0} caught: {1})", e.GetType().Name, e.Message);
        _logFactory.Error(sb.ToString());
         throw e;
      }
    }
}
{{< / highlight >}}

This class wraps the intercepted method invocation into a try..catch block and logs any occuring exception using my custom ILogFactory, including parameter values.

Next, create a class implementing the InterceptAttribute

{{< highlight csharp >}}
public class LogErrorAttribute : InterceptAttribute
{
    public override IInterceptor CreateInterceptor(IProxyRequest request)
    {
        return request.Context.Kernel.Get<ErrorLoggingInterceptor>();
    }
}
{{< / highlight >}}

This attribute uses the Ninject kernel to get an instance of the ErrorLoggingInterceptor so you do not have to concern yourself explictily with providing an ILogFactory implementation, Ninject will do all the work.

Now you can use the LogErrorAttribute to mark any method, but keep in mind that all the marked methods must be virtual

{{< highlight csharp >}}
[LogError]
public virtual bool Send(string text, IEnumerable<string> languageCodes, string carId, string type, bool save=true)
{
    //error in this method will be logged  
}
{{< / highlight >}}

 [1]: http://www.ninject.org/
 [2]: https://github.com/Fody/Fody
 [3]: http://blog.kulman.sk/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/ "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
 [4]: https://github.com/Fody/MethodDecorator
 [5]: http://www.castleproject.org/projects/dynamicproxy/
 [6]: http://www.nuget.org/packages/Ninject.Extensions.Interception/3.0.0.8
 [7]: http://www.nuget.org/packages/Ninject.Extensions.Interception.DynamicProxy/3.0.0.8
 [8]: http://www.nuget.org/packages/Castle.Core/
