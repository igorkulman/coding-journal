+++
Categories = ["iOS", "Swift"]
Description = "One of the new features of iOS 11 is the ability to display large headers in the navigation bar by setting the `prefersLargeTitles` property to `true`.  You can set it for the whole app (using UIAppearance for example) or differently for each view controller. But there is a problem. If you navigate from a view controller with large titles enabled to a view controller with large titles disabled, you will see a black artifact under the change animation"
Tags = ["iOS", "Swift"]
Keywords = ["iOS", "Swift", "UIAppearance", "UI"]
author = "Igor Kulman"
date = "2017-09-21T09:29:12+01:00"
title = "Fixing black artifact when changing large titles mode in iOS11"
url = "/fixing-black-artifact-changing-large-tiles-mode"
share_img = "/images/blackartifact.gif"

+++

One of the new features of iOS 11 is the ability to display large headers in the navigation bar by setting the `prefersLargeTitles` property to `true`.  You can set it for the whole app (using the [`UIAppearance`](https://developer.apple.com/documentation/uikit/uiappearance) for example) or differently for each view controller. 

But there is a problem. If you navigate from a view controller with large titles enabled to a view controller with large titles disabled, you will see a black artifact under the change animation:

{{% post-image "blackartifact.gif" %}}

The black artifact comes from the navigation controller. If you set the `backgroundColor` of the navigation controller's `view` to any, like red, it will replace the black artifact with an artifact of that color. The solution is to set the color of the color of you UI, white in my case:

<!--more-->

{{% post-image "noartifact.gif" %}}

Now the animation looks ok, no visible artifact. The problem is, you cannot set it globally using `UIAppearance`, so you can either set `navigationController.view.backgroundColor = UIColor.white` on every navigation controller in your app, or create a custom navigation controller inheriting from `UINavigationController` and use it everywhere where needed.
