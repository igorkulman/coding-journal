---
title: Creating a Search box with Reactive Extensions and MVVM
author: Igor Kulman
layout: post
date: 2013-12-02
url: /creating-a-search-box-with-reactive-extensions-and-mvvm/
dsq_thread_id:
  - 2017164604
categories:
  - Windows Phone
tags:
  - 'c#'
  - Caliburn.Micro
  - Windows Phone
  - xaml
---
Having a Search box in a Windows Phone app is a common use-case but it is only rarely done right. A good Search box does not have a Search button associated with it that the users have to click when they are finished typing and want to start the search. A good Search box starts the search immediately when the user stops typing (for a certain period of time). 

You can implement this functionality with some nasty code using a DispatcherTimer, or you can use [Reactive Extensions][1]. You can use Reactive Extensions directly on a TextBox representing the Search box, but if you use MVVM (and you should) you need to attach to the property associated with the Search box instead.

Suppose the ViewModel contains a string property called SearchTerm (with two-way binding to the Search box) and an event called PropertyChanged (used for the INotifyPropertyChanged implementation). We need to observe the changes of the SearchTerm property. There is no way to do it directly, we need to observe the PropertyChanged event instead. 

<!--more-->

We need to create an observable from the PropertyChanged event, subscribe to it filtering only the PropertyChanged calls regarding the SearchTerm property, throttling for 0.5 seconds

Using the throttle operator we will get exactly the desired behaviour of executing the Search method 0.5 seconds after the user stopped typing. 

{{< gist 7657908>}}

However, there is a small problem. The SearchTerm property changes (and fires the PropertyChanged event) only when the Search box loses focus. We need to make the SearchTerm property change after each letter typed instead. In WPF that would be trivial using UpdateTrigger, but Windows Phone does not support UpdateTrigger. 

We need to create a custom binding utility

{{< gist 7657969>}}

and apply it to the Search box

{{< gist 7658031>}}

 [1]: http://msdn.microsoft.com/en-us/data/gg577609.aspx