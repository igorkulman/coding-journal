+++
Description = "When I started working on my open-source Localization Editor, which is a macOS application, I encountered some things that were a bit strange compared to iOS development. One of those things is that copy & paste does not automatically work on a NSTextField. You have to implement it yourself."
Tags = ["macOS", "Swift"]
author = "Igor Kulman"
date = "2019-04-10T05:29:12+01:00"
title = "Making copy & paste work with NSTextField"
url = "/making-copy-paste-work-with-nstextfield"

+++

When I started working on my open-source [Localization Editor](https://github.com/igorkulman/iOSLocalizationEditor), which is a macOS application, I encountered some things that were a bit strange compared to iOS development. One of those things is that copy & paste does not automatically work on a `NSTextField`.

To be exact, copy & paste works on a `NSTextField` as long as you do not delete the `Edit menu` from the standard `Main menu`. If you do that for some reason, you have to implement all the copy & paste functionality yourself.

The key to the implementation is overriding the `performKeyEquivalent` method and manually checking for `cmd + c/v/x/z/a`

```swift
final class EditableNSTextField: NSTextField {

    private let commandKey = NSEvent.ModifierFlags.command.rawValue
    private let commandShiftKey = NSEvent.ModifierFlags.command.rawValue | NSEvent.ModifierFlags.shift.rawValue

    override func performKeyEquivalent(with event: NSEvent) -> Bool {
        if event.type == NSEvent.EventType.keyDown {
            if (event.modifierFlags.rawValue & NSEvent.ModifierFlags.deviceIndependentFlagsMask.rawValue) == commandKey {
                switch event.charactersIgnoringModifiers! {
                case "x":
                    if NSApp.sendAction(#selector(NSText.cut(_:)), to: nil, from: self) { return true }
                case "c":
                    if NSApp.sendAction(#selector(NSText.copy(_:)), to: nil, from: self) { return true }
                case "v":
                    if NSApp.sendAction(#selector(NSText.paste(_:)), to: nil, from: self) { return true }
                case "z":
                    if NSApp.sendAction(Selector(("undo:")), to: nil, from: self) { return true }
                case "a":
                    if NSApp.sendAction(#selector(NSResponder.selectAll(_:)), to: nil, from: self) { return true }
                default:
                    break
                }
            } else if (event.modifierFlags.rawValue & NSEvent.ModifierFlags.deviceIndependentFlagsMask.rawValue) == commandShiftKey {
                if event.charactersIgnoringModifiers == "Z" {
                    if NSApp.sendAction(Selector(("redo:")), to: nil, from: self) { return true }
                }
            }
        }
        return super.performKeyEquivalent(with: event)
    }
}
```

<!--more-->