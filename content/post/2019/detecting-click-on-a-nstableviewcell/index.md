+++
Description = "When you use NSTableView in an macOS application, there is no direct way to know a specific NSTableViewCell was clicked by the user. In my Localization Editor project I wanted the user to be able to focus a NSTextField when clicking anywhere in the NSTableViewCell it is contained in, so I had to implement it myself."
Tags = ["macOS", "Swift"]
author = "Igor Kulman"
date = "2019-04-24T05:29:12+01:00"
title = "Detecting click on a specific NSTableViewCell"
url = "/detecting-click-on-a-nstableviewcell"

+++

When you use `NSTableView` in an macOS application, there is no direct way to know a specific `NSTableViewCell` was clicked by the user. In my [Localization Editor](https://github.com/igorkulman/iOSLocalizationEditor) project I wanted the user to be able to focus a `NSTextField` when clicking anywhere in the `NSTableViewCell` it is contained in, so I had to implement it myself.

I created a new delegate extending the `NSTableViewDelegate` with one additional method informing about a `NSTableViewCell` getting clicked

```swift
protocol NSTableViewClickableDelegate: NSTableViewDelegate {
    func tableView(_ tableView: NSTableView, didClickRow row: Int, didClickColumn: Int)
}
```

Then I added an extension to the `NSTableView` to compute the index of the clicked `NSTableViewCell`

```swift
extension NSTableView {
    open override func mouseDown(with event: NSEvent) {
        let localLocation = self.convert(event.locationInWindow, to: nil)
        let clickedRow = self.row(at: localLocation)
        let clickedColumn = self.column(at: localLocation)

        super.mouseDown(with: event)

        guard clickedRow >= 0, clickedColumn >= 0, let delegate = self.delegate as? NSTableViewClickableDelegate else {
            return
        }

        delegate.tableView(self, didClickRow: clickedRow, didClickColumn: clickedColumn)
    }
}
```

To be able to use this extension you just need to implement `NSTableViewClickableDelegate` instead of `NSTableViewDelegate` and use the additional method it provides.

<!--more-->