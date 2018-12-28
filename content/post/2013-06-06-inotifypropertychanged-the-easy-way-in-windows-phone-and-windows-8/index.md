+++
title = "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
author = "Igor Kulman"
date = "2013-06-06"
url = "/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/"
categories = ["Windows Phone","WinRT"]
tags = ["Csharp","Fody","MVVM", "Windows Phone","WinRT"]
+++
If you develop Windows Phone, Windows 8, Silverlight or WPF apps using the MVVM pattern, you are familiar with the INotifyPropertyChanged interface.

**Typical implementation**

In a typical implementation, you usually have a base class implementing the interface, like

{{< highlight csharp >}}
public class BaseViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    public void NotifyPropertyChanged(string propertyname)
    {
        if (PropertyChanged != null)
        {
            PropertyChanged(this, new PropertyChangedEventArgs(propertyname));
        }
    }     
}
{{< / highlight >}}

or use a framework like MVVMLight, Prism or Caliburn Micro that provides such base class for you. In your view models you have properties using the PropertyChanged method

<!--more-->

{{< highlight csharp >}}
public class UserViewModel: BaseViewModel
{
    public string FirstName
    {
        get { return _firstName; }
        set
        {
            if (_firstName != value)
            {
                _firstName = value;
                NotifyPropertyChanged("FirstName");
                NotifyPropertyChanged("FullName");
            }
        }
    }
    private string _firstName;

    public string Surname
    {
        get { return _surname; }
        set
        {
            if (_surname != value)
            {
                _surname = value;
                NotifyPropertyChanged("Surname");
                NotifyPropertyChanged("FullName");
            }
        }
    }
    private string _surname;

    public string FullName
    {
        get { return String.Format("{0} {1}", FirstName, Surname); }
    }
}
{{< / highlight >}}

You do not need to create such properties by hand, you can [use a snippet][1], but it is still a lot of code to do such a simple thing.

**Meet Fody**

[Fody][2] is an assembly weaver for .NET that plugs to the build process of your project and modifies the IL of your assemblies according to your needs. It supports .net 3.5, .net 4, .net 4.5, Silverlight 4, Silverlight 5, Windows Phone 7, Windows Phone 8, Metro on Windows 8, Mono, MonoTouch, MonoDroid and PCL. No installation or configuration is required, you just need to install the [Fody Nuget package][3].

**INotifyPropertyChanged using Fody (80% of the time)**

Fody has a [PropertyChanged addin][4] that does all the INotifyPropertyChanged plumbing for you. If you want the same behavior as in my typical implementation example, there is no need for a base class. Install the [PropertyChanged.Fody Nuget package][4], decorate your view model class with the ImplementPropertyChanged attribute and use just basic properties

{{< highlight csharp >}}
[ImplementPropertyChanged]
public class UserViewModel
{
    public string FirstName { get; set; }
    public string Surname { get; set; }

    public string FullName
    {
        get { return String.Format("{0} {1}", FirstName, Surname); }
    }                
}
{{< / highlight >}}

That is it. Less code, the same behaviour. You can verify it with tools like [Telerik JustDecompile][5].

**The remaining 20%**

Fody does all the plumbing for you. It even knows that the FullName property uses FirstName and Surname and raises the PropertyChanged event for it when any og the two properties changes. The PropertyChanged.Fody addin [contains attributes][6], that you can use to define dependencies 

{{< highlight csharp >}}
[DependsOn("FirstName ","Surname")]
public string FullName { get; set; }
{{< / highlight >}}

or to raise the PropertyChanged event for any other property

{{< highlight csharp >}}
[AlsoNotifyFor("FullName")]
public string FirstName { get; set; }
{{< / highlight >}}

Sometimes you want to execute some additional code in the setter. Fody allows it, just create a method with the [name On\_PropertyName\_Changed][7]

{{< highlight csharp >}}
public void OnFirstNameChanged()
{
    Debug.WriteLine("FirstName Changed");
}
{{< / highlight >}}

If you use a framework and you want to raise the PropertyChanged event through a method of this framework, it is not a problem. You just need to [set the EventInvokerNames options][8]. The Fody [documentation even describes what to set for some of the frameworks][9] so you do not have to figure it out for yourself.

 [1]: http://www.kulman.sk/data/down/propn.snippet
 [2]: https://github.com/Fody/Fody
 [3]: http://nuget.org/packages/Fody/
 [4]: https://github.com/Fody/PropertyChanged
 [5]: http://www.telerik.com/justdecompile.aspx
 [6]: https://github.com/Fody/PropertyChanged/wiki/Attributes
 [7]: https://github.com/Fody/PropertyChanged/wiki/On_PropertyName_Changed
 [8]: https://github.com/Fody/PropertyChanged/wiki/Options
 [9]: https://github.com/Fody/PropertyChanged/wiki/SupportedToolkits
