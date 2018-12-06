+++
Categories = ["Swift", "iOS", "Xcode"]
Description = ""
Tags = ["Swift", "iOS", "Xcode"]
Keywords = ["Swift", "iOS", "Xcode"]
author = "Igor Kulman"
date = "2018-12-12T05:29:12+01:00"
title = "Animating tab bar buttons on tap"
url = "/animating-tab-bar-buttons"
share_img = "/images/tw-animation.gif"

+++

If you use the Twitter app on iOS you might have noticed that tapping the buttons in the tab bar makes them bounces. 

{{% img-responsive "/images/twitter-animation.gif" %}}

This is a very subtle animation that I really like so I decided to do the same for the tab bar in the app I currently work on. 

The first step is to find the right place to insert the bounce animation into. When you tap a button in the tab bar, the `tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem)` method of the `UITabBarController` gets called. You cannot override this method in extension, so you have to create a new subclass. 

This method ives you the selected `UITabBarItem` but you need to get to the actual view and its image. I found out that the tab bar contains (at least in my case) an background subview and then subviews corresponding to the tab bar buttons, so when a tab bar button at index N is tapped, its subview is at N+1. 

{{< highlight swift >}}
class AnimatedTabBarController: UITabBarController {

    override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        // find index if the selected tab bar item, then find the corresponding view and get its image, the view position is offset by 1 because the first item is the background (at least in this case)
        guard let idx = tabBar.items?.index(of: item), tabBar.subviews.count > idx + 1, let imageView = tabBar.subviews[idx + 1].subviews.flatMap { $0 as? UIImageView }.first else {
            return
        }

        // animate the imageView
    }
}
{{< / highlight >}}

To create a bounce animation we can use `CAKeyframeAnimation` and animate the `transform.scale` key path. Basically you need to make the image bigger, then slightly smaller and original size again. This is the animation I use

<!--more-->

{{< highlight swift >}}
let bounceAnimation = CAKeyframeAnimation(keyPath: "transform.scale")
bounceAnimation.values = [1.0, 1.4, 0.9, 1.02, 1.0]
bounceAnimation.duration = TimeInterval(0.3)
bounceAnimation.calculationMode = CAAnimationCalculationMode.cubic
{{< / highlight >}}        

It is more visible as the one in the Twitter app, you can tweak the values to get the animation you like best.

{{% img-responsive "/images/tw-animation.gif" %}}

The resulting class code looks like this

{{< highlight swift >}}
class AnimatedTabBarController: UITabBarController {

    private var bounceAnimation: CAKeyframeAnimation = {
        let bounceAnimation = CAKeyframeAnimation(keyPath: "transform.scale")
        bounceAnimation.values = [1.0, 1.4, 0.9, 1.02, 1.0]
        bounceAnimation.duration = TimeInterval(0.3)
        bounceAnimation.calculationMode = CAAnimationCalculationMode.cubic
        return bounceAnimation
    }()

    override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        // find index if the selected tab bar item, then find the corresponding view and get its image, the view position is offset by 1 because the first item is the background (at least in this case)
        guard let idx = tabBar.items?.index(of: item), tabBar.subviews.count > idx + 1, let imageView = tabBar.subviews[idx + 1].subviews.flatMap { $0 as? UIImageView }.first else {
            return
        }

        imageView.layer.add(bounceAnimation, forKey: nil)
    }
}
{{< / highlight >}}