+++
title = "Developing Windows Store apps with Caliburn Micro Part 2: navigation"
author = "Igor Kulman"
date = "2013-08-06"
url = "/developing-windows-store-apps-with-caliburn-micro-part-2-navigation/"
categories = ["WinRT"]
tags = ["c#","Caliburn.Micro","winrt"]
+++
In this second part you will add another ViewModel and View and implement navigation between two ViewModels, including saving the navigation state between starts. The code is as always [available at Github][1].

**Invoking ViewModel methods**

If you want to test out navigation between ViewModels, you first need something that will trigger the navigation. The easiest way to do this is to use a standard Button. If you do MVVM &#8220;by hand&#8221;, you are probably used to creating ICommand properties and binding them to the Button&#8217;s Command dependency property. 

Caliburn Micro offers an easier way. If you want a Button to invoke a method on your ViewModel, just the give the button the same name as the name of the button. The method should be public void.

<!--more-->

On the MainViewModel, create a public void GoToSecondPage method:

{{< gist 6103983>}}

In the MainView create a Button with x:Name=&#8221;GoToSecondPage&#8221;. When you start the application and click the button, a message dialog is shown, so you know the autobinding beetween your Button and your GoToSecondPage method works. 

**Navigation**

As you may have noticed, a INavigationService is injected into the MainViewModel&#8217;s constructor. You can use this INavigationService to navigate between ViewModels.

In the ViewModels folder create a new ViewModel called SecondPageViewModel with one string property Title (exactly the same as the MainViewModel):

{{< gist 6103938>}}

In the Views folder, create a new View called SecondPageView as a Blank Page. Give it some colorful background so it is clearly distinguishable from the MainView:

{{< gist 6104005>}}

Now you can finally make the GoToSecondPage method navigate the user to the SecondPageViewModel. To do this, first get the Uri from the INavigationService using the strongly typed UriFor<.> method and then call the Navigate method:

{{< gist 6104023>}}

**Navigation with parameters**

In many cases you need to navigate to a ViewModel passing the ViewModel some parameters. This is as easy as adding a call to WithParam to your navigation code:

{{< gist 6104042>}}

You can use the WithParam method to give the ViewModel as many parameters as you want.

**Saving and loading navigation state**

A well-behaved Windows Store application should remember the last ViewModel active when the user exited the app and load this ViewModel when the user starts the application again. In our demo, this is not the case. You can test it by navigating to the SecondPageViewModel, switching to Visual Studio, using the Suspend and Shutdown option and starting the application again. 

You need to fix this so when the suspended application starts again, it will show the SecondPageViewModel (unless the MainViewModel was active when the application was suspended). The Caliburn.Micro.Unity.WinRT package already contains the support for saving and restoring state.

First you need to make the Views inherit from the Caliburn.Micro.Unity.WinRT.Code.AppPage insted of Page and delete theirs OnNavigateTo methods. Then you need to explicitly save the state when the application starts. Open the App.xaml.cs and add the following method:

{{< gist 6104122>}}

If you now navigate to second page, suspend and shutdown the application and start it again, you will see the second page.

There is currently no way to navigate back from the SecondPageViewModel to the MianViewModel. I am fairly confident you can implement it by yourself using the INavigationService&#8217;s GoBack method.

 [1]: https://github.com/igorkulman/CaliburnDemoWinRT
