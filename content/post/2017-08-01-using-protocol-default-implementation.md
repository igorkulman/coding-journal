+++
Categories = ["iOS", "Swift"]
Description = "When I started using Swift the first thing I started missing was the support for abstract classes. I was used to using abstract classes for my ViewModels, especially to implement the template pattern, but also to provide some basic methods, like showing dialogs, that the ViewModels may need. Of course there are some tricks to do abstract classes like checking in the class type in constructor and throwing an error if it is the abstract class type, but Swift is a language based on protocols so there are better ways to achieve the same results just using the protocols. "
Tags = ["iOS", "Swift"]
Keywords = ["iOS", "Swift", "Patterns", "Architecture", "Protocols"]
author = "Igor Kulman"
date = "2017-08-01T09:29:12+01:00"
title = "Using protocol default implementation instead of abstract classes"
url = "/using-protocol-default-implementation"

+++

When I started using Swift the first thing I started missing was the support for abstract classes. I was used to using abstract classes for my ViewModels, especially to implement the [template pattern](https://www.tutorialspoint.com/design_pattern/template_pattern.htm), but also to provide some basic methods, like showing dialogs, that the ViewModels may need. Of course there are some "tricks" to do abstract classes like checking in the class type in constructor and throwing an error if it is the abstract class type, but Swift is a language based on protocols so there are better ways to achieve the same results just using the protocols. 

Imagine you want to add a functionality to show iOS alerts to some of your ViewControllers. In a language like C# you would create an abstract class, something like `BaseViewController`, add a `ShowAlert` method to it and make all your ViewControllers inherit from this base class. Most languages nowadays only support single inheritance, so you would put all the functionality your ViewController may or may not need to your one abstract class. But you can typically implement as many interfaces as you like. 

Using Swift and protocols there is another way. Protocols in Swift are really similar to interfaces in languages like Java or C# but with some neat stuff added to them like default protocol implementation. 

<!--more-->

In Swift, you start with a protocol 

{{< highlight swift >}}
protocol AlertCapable: class {
    func showAlert(message: String)
}
{{< / highlight >}}

and add a default implementation of this protocol applicable to all the ViewControllers

{{< highlight swift >}}

extension AlertCapable where Self: UIViewController {
    func showAlert(message: String) {
        let alert = UIAlertController(title: "error".localized, message: message, preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "dialogconfirm".localized, style: UIAlertActionStyle.default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}
{{< / highlight >}}

If you now add this protocol to a ViewController

{{< highlight swift >}}
class RegistrationViewController: UIViewController, AlertCapable {
  ...
}
{{< / highlight >}}

the ViewController does not have to implement the `showAlert` because a default implementation exists. It can just use it in any of its methods. 

This way you can add the `showAlert` method and use it in every ViewController where you add the `AlertCapable` protocol. No abstract class or inheritance needed. 

It also enables better granularity, you can have as many protocols with default implementation as you like and add them only to those classes that need them, because you are not constrained by single inheritance. But you cannot do the template pattern though. 
