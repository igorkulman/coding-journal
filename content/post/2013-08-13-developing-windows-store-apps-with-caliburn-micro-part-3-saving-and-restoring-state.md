+++
title = "Developing Windows Store apps with Caliburn Micro Part 3: saving and restoring state"
author = "Igor Kulman"
date = "2013-08-13"
url = "/developing-windows-store-apps-with-caliburn-micro-part-3-saving-and-restoring-state/"
categories = ["WinRT"]
tags = ["c#","Caliburn.Micro","windows store","winrt","xaml"]
+++
In the [previous post][1] I stated that a well-behaved Windows Store app should remeber the View the user navigated to before suspension and navigate to this View upon next run. The View can contain some input that the user can fill in. A well-behaved Windows Store app should remember the user&#8217;s input and restore it after suspension. 

**Saving and restoring state**

Implementation of the above-mentioned scenario is not very complicated, thanks to the project setup. If you want your ViewModel to be able to save and restore state, implement the IHaveState interface. It contains two method that you can override; SaveState and LoadState. In bith method you have access to a page state dictionary that you can use to save and load the state. 

<!--more-->

Let us reuse the SecondPageViewModel from the last post. Implement IHaveState, add two string properties and use the SaveState and LoadState method to save and load them using the page state dictionary

{{< gist 6173564>}}

To test it, first add two TextBoxes to the SecondPageView with two-way binding

{{< gist 6173636>}}

Now run the application, navigate to the SecondPageViewModel and fill in the TextBoxes. Switch to Visual Studio and invoke the Suspend and Shutdown command. When you run the application again, you will see the SecondPageViewModel with TextBoxes with the same values as before the suspension.

The code is again [available at Github][2]. If you are interested in the implementation of saving and loading state, read [this article][3].

 [1]: http://blog.kulman.sk/developing-windows-store-apps-with-caliburn-micro-part-2-navigation/ "Developing Windows Store apps with Caliburn Micro Part 2: navigation"
 [2]: https://github.com/igorkulman/CaliburnDemoWinRT
 [3]: http://nybbles.blogspot.cz/2013/02/winrt-caliburnmicro-and-ioc-part-3.html
