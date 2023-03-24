+++
title = "Automatic ViewModels and Services registration for (not only) Caliburn.Micro"
author = "Igor Kulman"
date = "2014-07-23"
url = "/automatic-viewmodels-and-services-registration-for-not-only-caliburn-micro/"
categories = ["Windows Phone"]
tags = ["Csharp","Caliburn-Micro","Windows Phone","Windows Store","WinRT"]
+++

My MVVM framework of choice, Caliburn.Micro, provides a simple Dependency Injection container, where you have to register all your ViewModels and Services. This is done in the Bootstraper&#8217;s Configure method and may look like this:

```csharp
container.PerRequest<MainViewModel>():
container.PerRequest<AboutViewModel>();

container.Singleton<SessionService>();
container.RegisterSingleton(typeof(ISettingsService),null,typeof(SettingsService));
```

where you typically register your ViewModels as per request and services as singletons. 

Of course this is done just once, but having to register a ViewModel each time you create a new one can be a nuisance, especially in a large project. 

<!--more-->

There is a better way that uses reflection. First, you need to create attributes that will represent registration as per request and a s singleton:

```csharp
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class PerRequestAttribute : Attribute
{
}
```

```csharp
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
public class SingletonAttribute : Attribute
{
}
```

Iterating over all the non-abstract classes in your assemblies using reflection is quite easy, the tricky part is deciding when to register a class as &#8220;itself&#8221; and when to register it for an interface it implements. My rule of thumbs is that if the class implements exactly one interface, it is one of my services and I register it for that interface, otherwise I register it as itself (ViewModels descendant from Screen implement circa 5 interfaces). 

The final registration code looks different for WinRT (Windows 8, Windows 8.1, Windows Phone 8.1 XAML)

```csharp
// Automatically registers all view models and services
foreach (var type in (typeof(MainViewModel).GetTypeInfo().Assembly.DefinedTypes)
    .Union((typeof(ContactPointsService).GetTypeInfo().Assembly.DefinedTypes)))
{
    if (type.IsClass && !type.IsAbstract)
    {
        // Non-inherited first, inherited second
        if (type.GetCustomAttributes(inherit: false).OfType<SingletonAttribute>().Any())
        {
            container.RegisterSingleton(type.ImplementedInterfaces.Count()==1 ? type.ImplementedInterfaces.First() : type.AsType(), null, type.AsType());
        }
        else if (type.GetCustomAttributes(inherit: false).OfType<PerRequestAttribute>().Any())
        {
            container.RegisterPerRequest(type.ImplementedInterfaces.Count()==1 ? type.ImplementedInterfaces.First() : type.AsType(), null, type.AsType());
        }
        else if (type.GetCustomAttributes(inherit: true).OfType<SingletonAttribute>().Any())
        {
            container.RegisterSingleton(type.ImplementedInterfaces.Count() == 1 ? type.ImplementedInterfaces.First() : type.AsType(), null, type.AsType());
        }
        else if (type.GetCustomAttributes(inherit: true).OfType<PerRequestAttribute>().Any())
        {
            container.RegisterPerRequest(type.ImplementedInterfaces.Count() == 1 ? type.ImplementedInterfaces.First() : type.AsType(), null, type.AsType());
        }                     
    }
}       
```

and for &#8220;classic&#8221; .NET (Windows Phone 8)

```csharp
// Automatically registers all types from the current assembly that have correct attribute
foreach (var type in (Assembly.GetExecutingAssembly().GetTypes())
  .Union(Assembly.Load("business logic assembly name").GetTypes()))
{
    if (type.IsClass && !type.IsAbstract)
    {
        var interfaces = type.GetInterfaces();

        // Non-inherited first, inherited second
        if (type.GetCustomAttributes(inherit: false).OfType<SingletonAttribute>().Any())
        {
            container.RegisterSingleton(interfaces.Count() == 1 ? interfaces.First() : type, null, type);
        }
        else if (type.GetCustomAttributes(inherit: false).OfType<PerRequestAttribute>().Any())
        {
            container.RegisterPerRequest(interfaces.Count()==1 ? interfaces.First() : type, null, type);
        }
        else if (type.GetCustomAttributes(inherit: true).OfType<SingletonAttribute>().Any())
        {
            container.RegisterSingleton(interfaces.Count() == 1 ? interfaces.First() : type, null, type);
        }
        else if (type.GetCustomAttributes(inherit: true).OfType<PerRequestAttribute>().Any())
        {
            container.RegisterPerRequest(interfaces.Count() == 1 ? interfaces.First() : type, null, type);
        }
    }
}       
```

because of reflection differences in WinRT. Do not forget to add the PerRequest or Singleton attribute to your classes to make it work.
