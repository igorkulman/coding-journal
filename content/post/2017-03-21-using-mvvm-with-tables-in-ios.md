+++
Categories = [ "iOS", "Swift", "RxSwift"]
Description = ""
Tags = ["iOS", "Swift", "RxSwift", "MVVM"]
Keywords = ["iOS", "Swift", "RxSwift", "MVVM", "UITableView", "UIKit"]
author = "Igor Kulman"
date = "2017-03-21T09:29:12+01:00"
title = "Using MVVM with tables and cells in iOS"
url = "/using-mvvm-with-tables-in-ios"
draft = false
share_img = "/images/iostablemvvm.gif"

+++

When I ventured into native iOS development I immediately took a look at the possibility to [use data binding on iOS](/using-data-binding-in-ios) which enables me to simply declare the relationships between the UI and the ViewModel. This article takes that approach further shows you how to use MVVM and data binding when using tables and cells, or in the world of iOS `UITableView` and `UITableViewCell`.

## Sample scenario

Let's start with simple example scenario. You want to show progress of some flow that contains of multiple steps, each of the steps can be either running or complete. When a step is running it can report its progress. You want to display this flow in a table that looks like this

{{% img-responsive "/images/iostablemvvm.gif" %}}

<!--more-->

## The classic iOS way

Now imagine you want to implement this scenario in the classic iOS way. You will have a list of some model. Every time you add an item to the list you need to refresh the table. Every time you change something on a model in the list you need to refresh the table and of course you need a table delegate to manipulate the UI according to the properties of the model. 

Of course there is a better, more declarative way.

## The reactive way

### ViewModel

First you need a ViewModel for all the steps of the flow. My flow is connected to application synchronization, so my ViewModel is called `SyncStepViewModel`

<div data-gist="a2c5b63f835e8bd01df89566a5627d6b" data-file="SyncStepViewModel.swift"></div>

This ViewModel has a title, contains property determining if the flow step is currently running, property for the current progress percentage and a computed property for the step title. This computer property just adds the progress percentage at the end of the title when applicable. 

The ViewModel for the screen just needs to hold the array of the flow steps in an observable way, so let's make it easy

<div data-gist="a2c5b63f835e8bd01df89566a5627d6b" data-file="SyncViewModel.swift"></div>

This ViewModel will of course contains some logic to add the flow steps to the array. 

### Table and cells binding

Binding the `SyncViewModel` to the `UITableView` in the `UIViewController` is really easy

<div data-gist="a2c5b63f835e8bd01df89566a5627d6b" data-file="SyncViewController.swift"></div>

It is just a few lines of declarative code and no delegates!

The tricky part is the `UITableViewCell` and making the UI work with the ViewModel. As you can see from the previous snippet, I do not access any of the UI elements of my `SyncStepCell` I just assign the ViewModel. The `SyncStepCell` takes care of the rest using data binding

<div data-gist="a2c5b63f835e8bd01df89566a5627d6b" data-file="SyncStepCell.swift"></div>

My `UITableViewCell` just "waits" for the ViewModel and then sets up all the necessary bindings. Again, no direct access to the UI elements, just making everything work in a simple declarative way.

If you want a more complex example of MVVM and binding, check out my [iOS sample app on Github](https://github.com/igorkulman/iOSSampleApp).