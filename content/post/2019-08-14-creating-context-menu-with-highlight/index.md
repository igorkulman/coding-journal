+++
Categories = ["iOS", "Swift", "Xcode"]
Description = ""
Tags = ["iOS", "Swift", "Xcode"]
Keywords = ["iOS", "Swift", "Xcode"]
author = "Igor Kulman"
date = "2019-08-14T05:29:12+01:00"
title = "Creating iOS context menu with highlight and dim"
url = "/creating-context-menu-with-highlight"

+++

### 1. New `UIWindow`

The first step is to create a new `UIWindow` and put it on top of the main application window. This is it needed mostly to show the context menu as a standard `UIViewController` presented as `.popover` without dismissing the keyboard.

If you just create a new `UIWindow` and make it visible, it is shown under the keyboard window. To make it show above the keyboard window you need to set its `windowLevel` to a value higher that the `windowLevel` of the keyboard window. 

But this does not work as expected since iOS 11. The setter would not allow you to assign a value higher than `windowLevel` of the keyboard window, it will be always `1` less. 

The solution to this is to create a custom class inheriting from `UIWindow` and overriding the `windowLevel` getter with some hard-coded hight value

{{< highlight swift >}}
final class MessageContextMenuWindow: UIWindow {
    // needed because just setting the level on iOS 11+ to be more than the keyboard does not work for some reason
    override var windowLevel: UIWindow.Level {
        get {
            return UIWindow.Level(rawValue: CGFloat.greatestFiniteMagnitude - 1)
        }
        set { }
    }
}
{{< /highlight>}}

If you now create this window and make it visible, it will be shown on top of your main window without dismissing the keyboard, but it will be transparent for now

{{% post-image "TransparentWindow.png" "200px" %}}

### 2. `UIViewController` with the original view snapshot

The next step is to create a `UIViewController` that will be shown in the new window. 

#### Dim effect

First just set the background to some level of semi-transparent black

{{< highlight swift >}}
let backgroundDuration: TimeInterval = 0.1
UIView.animate(withDuration: backgroundDuration) {
    self.view.backgroundColor = #colorLiteral(red: 0.01568627451, green: 0.01568627451, blue: 0.05882352941, alpha: 0.5)
}
{{< /highlight>}}

to get the dim effect

{{% post-image "DimEffect.png" "200px"%}}

#### Highlighted original view

The next step is taking the original view, for example the `contentView` of the `UITableViewCell` and highlight it in this new `UIViewController`. 

With `focusedView` as the original view your first create a snapshot from this view

{{< highlight swift >}}
guard let snapshotView = focusedView.snapshotView(afterScreenUpdates: false) else {
    return
}
{{< /highlight>}}

This creates a new `UIView` that is "flat" (no subviews) and looks exactly like the original view.

This snapshot view then needs to be added to the `UIViewController`

{{< highlight swift >}}
view.addSubview(snapshotView)
{{< /highlight>}}

The trick here is to position it exactly over the original view in the main application window. To do this you need to convert the position of the original view to the position in the `UIViewController`

{{< highlight swift >}}
guard let focusedViewSuperview = focusedView.superview else {
    return
}

let convertedFrame = view.convert(focusedView.frame, from: focusedViewSuperview)
snapshotView.frame = convertedFrame
{{< /highlight>}}

With the you can now see the view highlighted        

{{% post-image "HighlightEffect.png" "200px" %}}

### 3. `UIViewController` shown as `.popover`

The final step is to show the actual context menu. I wanted to keep it simple so I just use an `UITableViewController` with fixed size

{{< highlight swift >}}
override func viewDidLoad() {
    super.viewDidLoad()

    tableView.reloadData()
    tableView.layoutIfNeeded()
    preferredContentSize = CGSize(width: 200, height: tableView.contentSize.height)
}
{{< /highlight>}}

and present it like a `.popover`

{{< highlight swift >}}
let vc = MessageContextMenuViewController(message: message)
vc.modalPresentationStyle = .popover
vc.popoverPresentationController?.delegate = self
vc.popoverPresentationController?.sourceView = snapshotView
vc.popoverPresentationController?.sourceRect = snapshotView.bounds
vc.popoverPresentationController?.backgroundColor = UIColor.white.withAlphaComponent(0.9)
present(vc, animated: true, completion: nil)
{{< /highlight>}}

There are two important things here; properly positioning the `popover` and setting its delegate

{{< highlight swift >}}
extension MessageContextMenuWindowViewController: UIPopoverPresentationControllerDelegate {
    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }
}
{{< /highlight>}}

If you forget to set the delegate and override `adaptivePresentationStyle` the `popover` will be shown fullscreen.

The context menu is now finished

{{% post-image "Menu.png" "200px" %}}