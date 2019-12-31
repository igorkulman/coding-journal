+++
Categories = ["Swift", "iOS"]
Description = "When I started to look at some iOS tutorials and other peoples' iOS code. Learning and using Swift was easy but when reading about using the iOS SDK and especially application architecture I found stuff that I really disliked. There were three big things in particular that I disliked, that I want to show you together with solutions I found. This first post deals with navigation. "
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS", "Architecture", "Coordinators", "Patterns"]
author = "Igor Kulman"
date = "2018-02-07T09:29:12+01:00"
title = "Architecting iOS apps: Coordinators"
url = "/architecting-ios-apps-coordinators"

+++

When switching from Windows Phone development to iOS I had about 3 months to learn iOS and Swift before starting the work on an actual iOS application. I had a chance to build the application from scratch with a colleague so I wanted the application to be really well written and architected. 

I started to look at some iOS tutorials and other peoples' iOS code. Learning and using Swift was easy (read more about [my Swift experience in a separate blog post](/my-experience-with-swift-after-9-months)) but when reading about using the iOS SDK and especially application architecture I found stuff that I really disliked. 

There were three big things in particular that I disliked, that I want to show you together with solutions I found. This first post deals with navigation. 

### The problem

When going through some iOS tutorials I found code like this a lot

{{< highlight swift >}}
class ProfileViewController: UIViewController {
  
  @objc func donection(sender: UIButton) {
    let vc = PreferencesViewController()
    navigationController?.pushViewController(vc, animated: true)
  }
}
{{< / highlight >}}

When you are a long-time iOS developer, you may have seen and probably written code like this. All the tutorials contain code likes this. It may look perfectly OK to you. But for me, coming from the .NET world, this was a real WTF moment:

* Why would anyone write code like this? 
* Why the strong coupling between those two view controllers? 
* Why an assumption the view controller is embedded in a navigation controller and we always want to do a push?

This code looked absolutely awful to me and I never wanted to write a code like this. So I started looking for better approaches and solutions. And I found coordinators (sometimes called flow controllers).

### The solution: Coordinators

The idea of a coordinator is simple. In your application you probably have some flows, like registration flow, user settings flow, product purchasing flow, etc. Every flow is managed by a coordinator. The role of the coordinator is to know which view controller to display at a certain time. 

<!--more-->

#### Example 

Suppose you have a `RegistrationCoordinator`. When it starts, it knows it needs to display step 1 of the registration process. The view controller for the step 1 does not know there is a step 2 and does not care. Its role is just to display the UI on the screen and gather some needed data from the user. 

When the view controller finishes, it just tells the registration coordinator that it is finished via a delegate and the `RegistrationCoordinator` decides what to do next. 

It may display step 2, it may skip to step 3 if for example step 2 is not needed because the application has the data from some other source like MDM. The coordinator decides what is displayed next. 

#### Implementation

You do not need any special frameworks to create coordinators. A coordinator can be a simple protocol with `start` method

{{< highlight swift >}}
protocol Coordinator: class {    
    func start()
}
{{< / highlight >}}

where you just put your navigation logic

{{< highlight swift >}}
class RegistrationCoordinator: Coordinator {  
  
  let navigationController: UINavigationController
  
  init(navigationController: UINavigationController) {
    self.navigationController = navigationController
  }
  
  func start() {
    showProfileForm()
  }
  
  func showProfileForm() {
    let vc = // get ProfileViewController from DI container, XIB, Storyboard, etc
    vc.delegate = self
    navigationController.pushViewController(vc, animated: true)
  }
  
  func showPreferencesForm() {
    ...
  }
}

extension RegistrationCoordinator: ProfileViewControllerDelegate {
    func profileViewControllerDidFinish() {
      showPreferencesForm()
    }
}
{{< / highlight >}}

It does not even matter how you create the UI for your view controllers. You can create your UI in code, in a XIB file, on the storyboard, the coordinators do not care, as long as you can create an instance of your view controllers in code. 

You can create a whole hierarchy of coordinators if you like, making them as granular as you need. 

{{% post-image "coordinators.png" %}}

Your application may start with an `AppCoordinator`. 

{{< highlight swift >}}
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions _: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

      window = UIWindow()
      appCoordinator = AppCoordinator(window: window!)
      appCoordinator.start()

      window?.makeKeyAndVisible()
      return true
  }
}
{{< / highlight >}}

It checks if the user is already registered. If not, it starts the `RegistrationCoordinator` as its child and waits for it to finish to start the `DashboardCoordinator`.

{{< highlight swift >}}
// MARK: - Coordinator keys

enum AppChildCoordinator {
    case registration
    case dashboard
}

class AppCoordinator: Coordinator {  

  // MARK: - Properties

  private let window: UIWindow
  private var childCoordinators = [AppChildCoordinator: Coordinator]()
  private let navigationController: UINavigationController

  init(window: UIWindow, container: Container) {
    self.window = window
    navigationController = UINavigationController()    
    self.window.rootViewController = navigationController
  }
  
  func start() {  
    if isLoggedIn {            
      showDashborad()
    } else {
      showRegistration()
    }
  }
  
  private func showRegistration() {
    let registrationCoordinator = RegistrationCoordinator(navigationController: navigationController)
    childCoordinators[.registration] = registrationCoordinator        
    registrationCoordinator.delegate = self
    registrationCoordinator.start()
  }
  
  private func showDashboard() {
    ...
  }
}

extension AppCoordinator: RegistrationCoordinatorDelegate {
  func registrationCoordinatorDidFinish() {
    childCoordinators[.registration] = nil
    showDashborad()
  }
}
{{< / highlight >}}

Notice the `childCoordinators` dictionary in the `AppCoordinator`. We need to store our coordinator instances in this dictionary so ARC does not clean them. We clean them manually when they are no longer needed (`registrationCoordinatorDidFinish()`).

#### Advantages

Thanks to coordinators your view controllers do not know about each other and do not handle navigation. And the best thing is, you can reuse them. Suppose you have a profile view controller. You can use it in the registration flow to gather some user data like name and email and then push another step when it is finished, or you may show it modally from another coordinator as part of user settings.

To sum it up, coordinators

* create a well defined way to deal with navigation
* make your view controllers less massive by moving navigation logic away from them
* make your view controllers reusable in different contexts
* organize your application by use case scenarios

If you want to see coordinators in practice together with the other concepts I will talk about in the next posts, check out [my sample iOS application at GitHub](https://github.com/igorkulman/iOSSampleApp). It contains a two level hierarchy of coordinators and also shows you how to use child coordinators. 

{{% github-repo "igorkulman/iOSSampleApp" %}}
