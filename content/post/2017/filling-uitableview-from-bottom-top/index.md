+++
Description = "If you work on something like an chat app, you may need to use the UITableView in a way where data is filled from bottom to top. An example of this is a chat detail screen, where you want the `UITableView` to show the latest messages at the bottom when loaded, new messages are added to the bottom and immediately shown and older messages are loaded on top when the user scrolls to the top of the UITableView."
Tags = ["iOS", "Swift"]
author = "Igor Kulman"
date = "2017-11-08T09:29:12+01:00"
title = "Filling UITableView with data from bottom to top"
url = "/filling-uitableview-from-bottom-top"

+++

If you work on something like an chat app, you may need to use the `UITableView` in a way where data is filled from bottom to top. An example of this is a chat detail screen, where you want the `UITableView` to show the latest messages at the bottom when loaded, new messages are added to the bottom and immediately shown and older messages are loaded on top when the user scrolls to the top of the `UITableView`. 

There are multiple ways to achieve this, each with some advantages and disadvantages. 

### Scrolling

The first simplest idea that comes to mind is using the `UITableView` as is and just scrolling it when necessary:

- Scroll to bottom when the initial messages are loaded
- Scroll to bottom when a new message is added
- When older messages are about to be added to the top, remember the position, add the older messages, scroll back to that position

The first two situations are easy to accomplish, but the last one is not. I could not find a way to make it works without a visible scrolling effect. 

### Rotating `UITableView` 180 degrees

Another solution is to rotate the `UITableView` by 180 degrees; rotating it upside down. Of course you have to also "flip" your data source but that is trivial to achieve. The advantage is that you do not have to do any scrolling when new messages are added to the bottom (which is the top of the rotated `UITableView`) and if you use batch updates instead of reload neither when older messages are loaded.

<!--more-->

After you rotate the `UITableView`

```swift
tableView.transform = CGAffineTransform(rotationAngle: (-.pi))
```

you have to also rotate all the cells

```swift
cell.transform = CGAffineTransform(rotationAngle: (-.pi))
```

When you do this you immediately notice that the scrollbar is on the wrong side of the `UITableView`. You can fix this by setting

```swift
tableView.scrollIndicatorInsets = UIEdgeInsetsMake(0, 0, 0, tableView.bounds.size.width - 10)
```

but this is not a very good solution. It depends on the width of the `UITableView` so you have to observe its changes and set it again with every change so the scrollbar is in the correct place when the user rotates the device and changes between portrait and landscape. 

Also do not forget that the header becomes footer and vice versa. 

### Flipping `UITableView`'s Y axis

The best solution I found is to flip the `UITableView`'s Y axis. It gives you all the advantages of the previous solution, but you do not have to handle the scrollbar. It stays in the right place because only the content is flipped. 

So flip the `UITableView`

```swift
tableView.transform = CGAffineTransform(scaleX: 1, y: -1)
```

and flip your cells in the same way

```swift
cell.contentView.transform = CGAffineTransform(scaleX: 1, y: -1)

```
