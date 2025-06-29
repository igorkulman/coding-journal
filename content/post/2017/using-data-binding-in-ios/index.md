+++
Description = "When I started working on a native iOS project after a few years of Windows (Phone) development I looked into ways to write a more declarative and more elegant code than the standard iOS way. I wanted to transfer some of my habits over and the first thing I really missed was XAML binding. I did some research on how to do binding in iOS and found a few libraries that make it possible. This allowed me to write better code and I think binding is a concept that all the iOS developer should look into."
Tags = ["iOS", "Swift", "RxSwift", "MVVM"]
author = "Igor Kulman"
date = "2017-03-14T09:29:12+01:00"
title = "Using data binding in iOS"
url = "/using-data-binding-in-ios"
images = ["/images/iosvalidation.gif"]

+++

When I started working on a native iOS project after a few years of Windows (Phone) development I looked into ways to write a more declarative and more elegant code than the "standard" iOS way. I wanted to transfer some of my habits over and the first thing I really missed was XAML data binding. I did some research on how to do data binding in iOS and found a few libraries that make it possible. This allowed me to write better code and I think data binding is a concept that all the iOS developer should look into. If you are interested in my experience with using binding in iOS, read on.

## Sample scenario

Let's use a simple example scenario. You have a screen where the users have to choose their country and then enter their mobile number. The number has to be validated with respect to the selected country and if everything is ok the Next button should become visible. So basically it should work like this

![Form validation](iosvalidation.gif)

<!--more-->

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

## Data binding

UI data binding is a software design pattern to simplify development of GUI applications. UI data binding binds UI elements to an application domain model. Most frameworks employ the Observer pattern as the underlying binding mechanism.

The main idea is simple, you declare what UI elements are connected to what properties in your model. Of course you can do some transformations, like mapping the validation state to text color. There are a few frameworks that will help you do it.

### Bond

[Bond](https://github.com/ReactiveKit/Bond) is a Swift library based on [ReactiveKit](https://github.com/ReactiveKit/ReactiveKit) that allows you to do binding in a simple way. The documentation is quite sufficient and there is also a [quite nice tutorial](https://www.raywenderlich.com/123108/bond-tutorial). It allows not only data binding basic UI elements like text fields but also supports data binding table views. So I tried it first.

I created a ViewModel with a property for the selected country, another property for the mobile number and a signal telling if the mobile number is valid. Every time the mobile number or the selected country changes, the validity signal also changes automatically. The ViewModel is quite simple, creating the validation signal in a nice declarative way

```swift
class NumberSelectionViewModel {
    let selectedCountry = Observable<CountryDefinition?>(nil)
    let phoneNumber = Observable<String?>(nil)
    let isValid: Signal<Bool, Property<Any>.Error>
    
    init() {
        isValid = combineLatest(self.selectedCountry, self.phoneNumber) {
            (country: CountryDefinition?, number: String?) in if let number = number, let parsedNumber = try? NBPhoneNumberUtil.sharedInstance().parse(number, defaultRegion: country?.isoCode ?? "de") {
                return NBPhoneNumberUtil.sharedInstance().isValidNumber(parsedNumber)
            } else {
                return false
            }
        }
    }
}
```

Binding this ViewModel to the ViewController is also quite simple

```swift
numberTextField.reactive.text.bidirectionalBind(to: viewModel.phoneNumber).dispose(in: reactive.bag)
numberTextField.reactive.textColor.bind(signal: viewModel.isValid.map({ [unowned self] (isValid) in return isValid ? self.view.tintColor : UIColor.red})).dispose(in: reactive.bag)

self.navigationItem.rightBarButtonItem.reactive.isEnabled.bind(signal: viewModel.isValid).dispose(in: reactive.bag)
```

I used Bond for a while but when I wanted to do more reactive programming, Bond was not enough. It is a data binding library, it works well for data binding but if you want to do more you have to choose something more powerful. So I switched to RxSwift.

### RxSwift vs ReactiveSwift

[RxSwift](https://github.com/ReactiveX/RxSwift) and [ReactiveSwift](https://github.com/ReactiveCocoa/ReactiveSwift) are two most popular reactive programming libraries for iOS. I recommend you read an [article comparing those two libraries](https://www.raywenderlich.com/126522/reactivecocoa-vs-rxswift) and choose the one that you like best. I chose RxSwift because it is a Swift implementation of the .NET Reactive Extensions I am familiar with and the documentation is so much better. There is also a [RxSwift community repository](https://github.com/RxSwiftCommunity/) with extension that add support for table views, gestures, etc. 

The ViewModel looks a bit different when using RxSwift than when using Bond, but the main idea is the same

```swift
class NumberSelectionViewModel {
    let selectedCountry = Variable<CountryDefinition?>(nil)
    let phoneNumber = Variable<String?>(nil)
    let isValid : Observable<Bool>
    
    init() {        
        isValid = Observable.combineLatest(selectedCountry.asObservable(), phoneNumber.asObservable()) {
            (country: CountryDefinition?, number: String?)->Bool in if let number = number, let parsedNumber = try? NBPhoneNumberUtil.sharedInstance().parse(number, defaultRegion: country?.isoCode ?? "de") {
                return NBPhoneNumberUtil.sharedInstance().isValidNumber(parsedNumber)
            } else {
                return false
            }
        }
    }
}
```

The actual bindings are also quite similar. The main difference is it is more visible what is being bound to what and in what direction

```swift
numberTextField.rx.text.bindTo(viewModel.phoneNumber).disposed(by: disposeBag)

viewModel.isValid.bindTo(navigationItem.rightButtonItem.rx.isEnabled).disposed(by: disposeBag)
viewModel.isValid.asObservable().map({[unowned self] (isValid) in return isValid ? self.view.tintColor : UIColor.red}).bindTo(numberTextField.rx.textColor).disposed(by: disposeBag)
```

Compare this to the amount of code you would have to write using the "standard" iOS way.

## Conclusion

I think data binding is a great concept that makes your code more declarative, more elegant and much simpler. It has been widely used in the Microsoft platforms with XAML, now it is also available in Android so it is time that iOS developers make a mental switch from delegates and start programming in a more declarative and reactive way. It is definitely worth it.

If you want a more complex example of MVVM and binding, check out my [iOS sample app on Github](https://github.com/igorkulman/iOSSampleApp).

{{% github-repo "igorkulman/iOSSampleApp" %}}
