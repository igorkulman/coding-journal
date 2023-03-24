+++
Categories = ["Swift", "iOS"]
Description = "The iOS 11 has many bugs, more are introduced with every update. I only just recently discovered a bug in the registration part of the application I work on."
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS", "iOS11", "iOSbug", "UINavigationBar"]
author = "Igor Kulman"
date = "2018-03-27T08:29:12+01:00"
title = "Workaround for UINavigationBar button remaining faded after back navigation"
url = "/workaround-for-faded-navbar-button"
images = ["/images/ios112bug.gif"]

+++

The iOS 11 has many bugs, more are introduced with every update. I only just recently discovered a bug in the registration part of the application I work on. 

The registration flow contains a few screens to gather the user data. The navigation among those screens ([managed by a coordinator](/architecting-ios-apps-coordinators/)) is done by Back and Next buttons in the `UINavigationBar`. The users can at any time get back to the previous screen, and if they are running iOS 11.2 they will see the bug:

![iOS 11.2 navbar bug](ios112bug.gif)

The users tap the Next button to go to the next screen and when they get back, the Next button is faded. It works, can be tapped, but does not look right. This only happens on iOS 11.2.

<!--more-->

You can work around this bug by setting the `UINavigationBar.tintAdjustmentMode` to `.normal` and then back to `.automatic`  in `viewWillDisappear`. This works but requires changing all the view controllers in the application that contain buttons in `UINavigationBar`.

A much better solution is to work around the bug in the `UINavigationControllerDelegate`:

```swift
func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
  if #available(iOS 11.2, *) {
    navigationController.navigationBar.tintAdjustmentMode = .normal
    navigationController.navigationBar.tintAdjustmentMode = .automatic
  }
}
```

If your application uses just one `UINavigationController` set its delegate and be done with it. If you use more than one, like I do in the application I work on, the best solution is probably creating a custom `UINavigationController` inheriting from the `UINavigationController`, setting it to be its own delegate and work around the bug in the `UINavigationControllerDelegate`:

```swift
import Foundation
import UIKit

class AppNavigationController: UINavigationController {
    override init(rootViewController: UIViewController) {
        super.init(rootViewController: rootViewController)
        setup()
    }

    override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
        super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
        setup()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setup()
    }

    init() {
        super.init(nibName: nil, bundle: nil)
        setup()
    }

    private func setup() {        
        delegate = self
    }
}

extension AppNavigationController: UINavigationControllerDelegate {

    /**
     Workaround for right navigation bar item staying faded when nbavigating back
     */
    func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        if #available(iOS 11.2, *) {
            navigationBar.tintAdjustmentMode = .normal
            navigationBar.tintAdjustmentMode = .automatic
        }
    }
}

```

This way you also have a place to accommodate all the future iOS bugs related to navigation, that will be introduced in the next releases.
