+++
Description = "Working on an iOS app I had to implement a filter for the table view displayed on screen. The filter should have contained 5 items and be accessible when tapping the screen title in the navigation bar. My first idea was to use an UIAlertController with those 5 options. It worked but it looked really ugly, So I started searching for a better, nicer solution. Ideally some kind of a dropdown menu."
Tags = ["iOS", "Swift", "UINavigationBar", "UIKit", "Custom Views", "Dropdown Menu"]
author = "Igor Kulman"
date = "2017-09-12T09:29:12+01:00"
title = "Creating a dropdown menu from iOS navigation bar"
url = "/creating-navigationbar-dropdown-menu"
images = ["/images/dropdown.gif"]

+++

Working on an iOS app I had to implement a filter for the table view displayed on screen. The filter should have contained 5 items and be accessible when tapping the screen title in the navigation bar. My first idea was to use an `UIAlertController` with those 5 options. It worked but it looked really ugly, So I started searching for a better, nicer solution. Ideally some kind of a dropdown menu.

![Dropdown menu](dropdown.gif)

I found multiple libraries for an iOS dropdown menu, but I liked [BTNavigationDropdownMenu](https://github.com/PhamBaTho/BTNavigationDropdownMenu) the best. The usage is really simple. First you define the items for the dropdown as an string array

```swift
let items = filterOptions.map({ $0.description })
```

create the menu instance

```swift
let menuView = BTNavigationDropdownMenu(navigationController: self.navigationController, containerView: self.navigationController!.view, title: BTTitle.title("Dropdown Menu"), items: items)
```

<!--more-->

and set it as the navigation item's title view

```swift
navigationItem.titleView = menuView
```

and react to the user selection

```swift
menuView.didSelectItemAtIndexHandler = {[weak self] (indexPath: Int) -> () in
    print("Did select item at index: \(indexPath)")
}
```

The library allows you to customize the UI, which will come handy. You can set the arrow to black, disable the tick next to the selected item, remove the item separators or make the the navigation bar title look the same as the default look

```swift
menuView.arrowPadding = 15
menuView.navigationBarTitleFont = UIFont.systemFont(ofSize: 17, weight: UIFontWeightSemibold)
menuView.cellSelectionColor = StyleKit.getSeparatorColor()
menuView.shouldKeepSelectedCellColor = true
menuView.arrowTintColor = UIColor.black
menuView.cellSeparatorColor = menuView.cellBackgroundColor
menuView.cellTextLabelFont = UIFont.systemFont(ofSize: 16)
menuView.checkMarkImage = nil
```
