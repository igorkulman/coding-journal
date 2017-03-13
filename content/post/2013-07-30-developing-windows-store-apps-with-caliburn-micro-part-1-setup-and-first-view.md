+++
title = "Developing Windows Store apps with Caliburn Micro Part 1: setup and first view"
author = "Igor Kulman"
date = "2013-07-30"
url = "/developing-windows-store-apps-with-caliburn-micro-part-1-setup-and-first-view/"
categories = ["WinRT"]
tags = ["Csharp","Caliburn-Micro","Fody","Unity","WinRT"]
+++
I have been developing Windows Store apps for some time. I have always used MVVM, but mostly &#8220;my own&#8221; MVVM. I have finally decided to use a &#8220;real&#8221; MVVM framework and I have chosen Caliburn Micro, because I did not like MVVM very much. In this article I am going to show you how to use Caliburn Micro, Unity and Fody to develop Windows Store apps. 

**Caliburn Micro**

[Caliburn Micro][1] is a small, yet powerful framework, designed for building applications across all Xaml Platforms. With strong support for MVVM and other proven UI patterns, Caliburn.Micro will enable you to build your solution quickly, without the need to sacrifice code quality or testability.

<!--more-->

**Unity**

When I started with Calibun Micro I discovered an [article by Thomas Baker about using Unity as DI container with Caliburn Micro][2]. His article also contains code that makes it easy for you to save and load state when the app gets suspended. With his permission, I have [created a Nuget package][3] from his code, this article is going to use this package.

**Fody**

I have been using [Fody][4] with Windows Phone and Windows Store apps for some time now. I especially use the [INotifyPropertyChanged weaver][5] I [wrote about earlier][6]. Check the article for more information if you are not already familliar with Fody.

**Application setup**

Let&#8217;s start buidling a simple demo application. This demo application will show you how little code you need to write to get something done when using the mentioned libraries.

Create a Blank App. Add the [Caliburn.Micro.Unity.WinRT][7] package from Nuget. It will install all the dependencies you need. Install [PropertyChanged.Fody][8] from Nuget. Next you need to hook up PropertyChanged.Fody with Fody. Open FodyWeavers.xml and change it to

{{< gist 6088620>}}

PropertyChanged.Fody now knows that it should call the NotifyOfPropertyChange method from Caliburn Micro when a property gets changed. Let&#8217;s do some cleanup next. Delete MainPage.xaml, rename the Common folder to Resources and create a few additional folders: 

  * Views
  * ViewModels
  * Data
  * Converters
  * Services
  * Code

Next make you app inherit from CaliburnUnityApplication by changing App.xaml to

{{< gist 6088861>}}

and cleaning up and changing App.xaml.cs to

{{< gist 6088871>}}

**First ViewModel**

Now you can create your first ViewModel and your first View. Caliburn Micro uses a naming convention to pair a ViewModel and a View. Create a new class called MainViewModel in the ViewModels folder. Make the class inherit from ViewModelBase and implement the default constructor:

create a new string property called Title. Add the ImplementPropertyChanged attribute to the class. This makes NotifyPropertyChanged.Fody call the NotifyOfPropertyChange whenever any of the properties (just Title for now) changes. Assing some text to the Title property in the constructor:

{{< gist 6088988>}}

**First View**

Now create a view for the MainViewModel as a Blank Page. According to the naming conventions, it needs to be called MainView and created in the Views folder. Add a TextBlock to the View. To bind the text of this TextBlock to the Title property, you could use Text=&#8221;{Binding Title}&#8221;. This works just fine but you do not have to do it. Just name the TextBlock the same as the property you want it to bind to (in our case Title):

{{< gist 6089012>}}

**Navigating to the view**

There is only one more thing left to do. You need to tell the framework to navigate to the MainView when the app starts. This is done in the OnLaunched method in App.xaml.cs

{{< gist 6089032>}}

**Run you app**

Hit F5 and you will see your app start, navigate to MainView and show the text from the Title property in this view.

You can find the [code on Github][9] and stay tuned for Part 2!

 [1]: https://caliburnmicro.codeplex.com/
 [2]: http://nybbles.blogspot.cz/2013/02/winrt-caliburnmicro-and-ioc-part-3.html
 [3]: https://nuget.org/packages/Caliburn.Micro.Unity.WinRT/
 [4]: https://github.com/Fody/Fody
 [5]: https://github.com/Fody/PropertyChanged
 [6]: http://blog.kulman.sk/inotifypropertychanged-the-easy-way-in-windows-phone-and-windows-8/ "INotifyPropertyChanged the easy way in Windows Phone and Windows 8"
 [7]: http://www.nuget.org/packages/Caliburn.Micro.Unity.WinRT/
 [8]: http://www.nuget.org/packages/PropertyChanged.Fody/
 [9]: https://github.com/igorkulman/CaliburnDemoWinRT
