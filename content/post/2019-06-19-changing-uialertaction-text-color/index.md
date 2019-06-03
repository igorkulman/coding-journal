+++
Categories = ["iOS", "Xcode"]
Description = "If you use the standard iOS UIAlertController to present the user with a list of actions, there is not much you can do about styling each of the UIAlertActions shown. The text of the shown UIAlertAction uses the UIView's tint color, so you can use the UIAppearence API to change it to any color you want, but the same color for all the `UIAlertAction`s. If you set the style to destructive instead of default, the text is shown as red, not affected by the tint color."
Tags = ["iOS", "Xcode"]
Keywords = ["iOS", "Xcode"]
author = "Igor Kulman"
date = "2019-06-19T05:29:12+01:00"
title = "Changing UIAlertAction text color"
url = "/changing-uialertaction-text-color"
share_img = "/changing-uialertaction-text-color/color.png"

+++

If you use the standard iOS `UIAlertController` to present the user with a list of actions, there is not much you can do about styling each of the `UIAlertAction`s shown. 

The text of the shown `UIAlertAction` uses the `UIView`'s tint color, so you can use the `UIAppearence` API to change it to any color you want, but the same color for all the `UIAlertAction`s. If you set the style to `destructive` instead of `default`, the text is shown as red, not affected by the tint color.

`UIAlertController` with one `default` and one `destructive` action might then look like this with dark blue set as the global tint color using `UIAppearence`:

{{% post-image "default.png" %}}

The red color for the destructive option does not look that great, especially if your app uses a different shade of red everywhere else. 

If you dive deep into Apple documentation you will find a KVC called `titleTextColor`. This KVC allows you to set exactly what you need, the color for the `UIAlertAction` text.

<!--more-->

You can then use a simple extension

{{< highlight swift >}}
extension UIAlertAction {
    var titleTextColor: UIColor? {
        get {
            return self.value(forKey: "titleTextColor") as? UIColor
        } set {
            self.setValue(newValue, forKey: "titleTextColor")
        }
    }
}
{{< /highlight>}}

to use the correct shade of red for your destructive actions

{{% post-image "color.png" %}}

or to make any of the `UIAlertAction`s to be shown in any color you want or need.