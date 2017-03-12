+++
Categories = [ "iOS", "Swift", "Reactive", "RxSwift"]
Description = "When I started working on a native iOS project after a few years of Windows (Phone) development I looked into ways to write a more declarative and more elgant code than the standard iOS way. I wanted to transfer some of my habits over and the firts thing I really missed was XAML binding. I did some reasearch on how to do binding in iOS and found a few libraries that make it possible. This allowed me to write better code and I think binding is a concept that all the iOS developer should look into."
Tags = []
author = "Igor Kulman"
date = "2017-03-14T09:29:12+01:00"
title = "Using binding in iOS"
url = "/using-binding-in-ios"
draft = true

+++

When I started working on a native iOS project after a few years of Windows (Phone) development I looked into ways to write a more declarative and more elgant code than the "standard" iOS way. I wanted to transfer some of my habits over and the firts thing I really missed was XAML binding. I did some reasearch on how to do binding in iOS and found a few libraries that make it possible. This allowed me to write better code and I think binding is a concept that all the iOS developer should look into. If you are interested in my experience with using binding in iOS, read on.

## Sample scenario

Let's use a simple example scenario. You have a screen where the users have to choose their country and then enter their mobile number. The number has to be validated with respect to the selected country and if everything is ok the Next button should become visible. So basically it should work like this

GIF

There are number of things that need to happen

- Selecting the country should refresh the validation state
- Changing the mobile number should refresh the validation state as the users type
- Setting the validation state should also set the mobile number text field text color
- Setting the validation state should also set the Next button enabled state

That is quite a lot of things if you add the validation logic (I use the [libPhoneNumber-iOS](https://github.com/iziz/libPhoneNumber-iOS)). 

## The classic iOS way

Now imagine you want to implement this scenario in the classic iOS way. You will have one Massive View Controller that would do many things.  

You will have a method that does validation and sets the mobile number text field text color and the Next button enabled state according to the result of this validation. Then you will have a delegate for the mobile number text field and you will have to call the validation method with every change. And finally you will have to change all the code that sets the selected country and call the validation method after each set. Of course you can use `didSet` but that will add a bad coupling between your model and your UI. 

There must be a better, more declarative way!

## Binding

UI data binding is a software design pattern to simplify development of GUI applications. UI data binding binds UI elements to an application domain model. Most frameworks employ the Observer pattern as the underlying binding mechanism.

The main idea is simple, you declare what UI elements are connected to what properties in your model. Of course you can do some transformation, like mapping the validation state to text color.  There are a few frameworks that will help you do it.

### Bond

[Bond](https://github.com/ReactiveKit/Bond) is a Swift library based on [ReactiveKit](https://github.com/ReactiveKit/ReactiveKit) that allows you to do binding in a simple way. The documentation is quite sufficient and there is also a [quite nice tutorial](https://www.raywenderlich.com/123108/bond-tutorial). It allows not only binding basic UI elements like text fields but also supports binding table views. So I tried it first.

I created a ViewModel with a property for the selected country, another property for the mobile number and a signal telling if the mobile number is valid. The ViewModel is quite simple, creating the validation signal in a nice declarative way

<div data-gist="2bb98d3398d1f211ba0f81c0f6ee90e7" data-file="BondVM.swift"></div>

Binding this ViewModel to the ViewController is also quite simple

<div data-gist="2bb98d3398d1f211ba0f81c0f6ee90e7" data-file="BondBinding.swift"></div>

I used Bond for a while but when I wanted to do more reactive programming, Bond was not enough. It is a binding library, it works nice for binding but if you want to do more you have to choose something else. So I switched to RxSwift.

### RxSwift vs ReactiveSwift

[RxSwift](https://github.com/ReactiveX/RxSwift) and [ReactiveSwift](https://github.com/ReactiveCocoa/ReactiveSwift) are two most popular reactive programming libraries for iOS. I recommend you read an [article comparing those two libraries](https://www.raywenderlich.com/126522/reactivecocoa-vs-rxswift) and choose the one that you like best. I chose RxSwift because it is a Swift implementation of the .NET Reactive Extensions I am familiar with and the documentation is so much better. 

The ViewModel looks a bit different when using RxSwift than when using Bond, but the main idea is the same

<div data-gist="2bb98d3398d1f211ba0f81c0f6ee90e7" data-file="RxSwift.swift"></div>

The actual bindings are also quite similar. The main difference is it is more visible what is beeing bound to what and in what dicection

<div data-gist="2bb98d3398d1f211ba0f81c0f6ee90e7" data-file="RxSwiftBinding.swift"></div>

## Conclusion

I think binding is a great concept that makes your code more declarative, more elegant and much simpler. It has been widely used in the Microsoft platforms with XAML, now it is also available in Android so it is time that iOS developers make a mental switch from delegates and start programming in a more declarative and reactive way. It is definitely worth it!