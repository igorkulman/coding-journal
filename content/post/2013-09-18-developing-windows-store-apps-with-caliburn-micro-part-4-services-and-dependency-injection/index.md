+++
title = "Developing Windows Store apps with Caliburn Micro Part 4: services and dependency injection"
author = "Igor Kulman"
date = "2013-09-18"
url = "/developing-windows-store-apps-with-caliburn-micro-part-4-services-and-dependency-injection/"
categories = ["WinRT"]
tags = ["Csharp","Caliburn-Micro","Fody","WinRT","XAML"]
+++
In this installment of the series I will show you how user data services. We will finally use the Unity DI container that is part of the project setup.

**Data and Services**

In next installment we will be showing a list of products, so let&#8217;s create a simple Product class first in the Data directory:

{{< highlight csharp >}}
[ImplementPropertyChanged]
public class Product : PropertyChangedBase
{
  public int Id { get; set; }
  public string Name { get; set; }
}
{{< / highlight >}}

PropertyChangedBase is a base class implementing the INotifyPropertyChanged interface and the ImplementPropertyChanged attribute makes sure it&#8217;s method is called for all the property changes. (More about Fody [here][1])

<!--more-->

All the operations will be handled by a service implementing the IProductService interface:

{{< highlight csharp >}}
public interface IProductService
{
  List<Product> GetAll();
  Product Get(int id);
}
{{< / highlight >}}

You can implement this interface any way you want. To keep things simple I chose an implementation with two hardcoded products:

{{< highlight csharp >}}
public class ProductService: IProductService
{
  private readonly List<Product> _products = new List<Product>()
  {
    new Product
    {
      Id = 1,
      Name = "Product 1"
    },
    new Product
    {
      Id = 2,
      Name = "Product 2"
    }
  };
  
  public List<Product> GetAll()
  {
    return _products;
  }

  public Product Get(int id)
  {
    return _products.SingleOrDefault(l => l.Id == id);
  }
}
{{< / highlight >}}

**Registering services**

All our services need to be registered with the Unity DI container before being used. The place to do it is the App class (App.xaml.cs file). You can override the Configure method to do it:

{{< highlight csharp >}}
protected override void Configure()
{
  container.RegisterType<IProductService, ProductService>(new ContainerControlledLifetimeManager());
}
{{< / highlight >}}

This registers the ProductService class to the IProductService interface. The new ContainerControlledLifetimeManager() parameter is Unity&#8217;s way of setting the registration to be a singleton.

**Injecting services into ViewModel**

Injecting the ProductService into our MainViewModel is very simple. Just declare a IProductService variable and initialize it from constructor. Unity will take care of the rest:

{{< highlight csharp >}}
[ImplementPropertyChanged]
public class MainViewModel: ViewModelBase
{
  public string Title { get; set; }
  private readonly IProductService _productService;

  public MainViewModel(INavigationService navigationService, IProductService productService) : base(navigationService)
  {
    _productService = productService;
    Title = "Caliburn Demo";
  }
}
{{< / highlight >}}

Next time we will implement a typical master-detail scenario showing products usign the ProductService whe have created. All the code is again [available at GitHub][2].

 [1]: http://blog.kulman.sk/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/ "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
 [2]: https://github.com/igorkulman/CaliburnDemoWinRT

{{% github-repo "igorkulman/CaliburnDemoWinRT" %}}
