+++
Categories = ["Swift", "macOS"]
Description = ""
Tags = ["Swift", "macOS"]
Keywords = ["Swift", "macOS"]
author = "Igor Kulman"
date = "2025-07-02T05:29:12+01:00"
title = "Implementing Auto-Type on macOS"
url = "/implementing-auto-type-on-macos"
images = ["/implementing-auto-type-on-macos/logo.png"]

+++

Auto-Type is a feature that simulates typing a sequence of keystrokes into another application. On macOS, you can achieve this by programmatically generating keyboard events. In this post, I’ll show you how to implement Auto-Type in Swift, covering permissions, event synthesis, character-to-keycode mapping, and practical tips for reliability and security.

## Understanding the Approach

macOS does not provide a direct API for sending text to other apps. Instead, you need to

- Request Accessibility permissions
- Use Core Graphics (`CGEvent`) to synthesize key events
- Map characters to key codes, including handling modifiers (Shift, Option, etc.)
- Ensure the target app is focused before sending events

## Requesting Accessibility Permissions

Your app must be trusted for Accessibility to send events to other apps.

First, add the `NSAppleEventsUsageDescription` key to your app’s `Info.plist` file. This key provides a message shown to the user when the system asks for permission to control other apps.

```plist
<key>NSAppleEventsUsageDescription</key>
<string>This app requires access to control other applications for Auto-Type functionality.</string>
```

You should also check and prompt for permission in your code.

```swift
import ApplicationServices

let options: [String: Any] = [kAXTrustedCheckOptionPrompt.takeRetainedValue() as String: true]
let isTrusted = AXIsProcessTrustedWithOptions(options as CFDictionary)

if !isTrusted {
    // The system will show a prompt to the user to enable Accessibility for your app
    // You can also show your own instructions here if needed
}
```

> **Note:** The system prompt to grant Accessibility permission can only be shown once per app launch. If the user dismisses the prompt or does not grant permission, your app must be restarted to show the prompt again. Always provide clear instructions to users on how to enable the application in **System Settings → Privacy & Security → Accessibility** if the prompt does not appear.

## Mapping Characters to Key Codes

macOS keyboard events use key codes, not characters. You need a mapping from characters to key codes and modifiers.

For ASCII letters and numbers, you can use a lookup table. For more complex input, use `UCKeyTranslate` or `TISInputSource`.

Example mapping for common characters

```swift
let keyCodeMap: [Character: (CGKeyCode, CGEventFlags)] = [
    "a": (0, []), "A": (0, .maskShift),
    "b": (11, []), "B": (11, .maskShift),
    // ... add more as needed
    "1": (18, []), "!": (18, .maskShift)
]
```

## Synthesizing and Posting Key Events

Use `CGEvent` to create key down and key up events, and post them to the system event tap.

```swift
import Cocoa

func sendKeystroke(keyCode: CGKeyCode, flags: CGEventFlags = []) {
    guard let keyDown = CGEvent(keyboardEventSource: nil, virtualKey: keyCode, keyDown: true),
          let keyUp = CGEvent(keyboardEventSource: nil, virtualKey: keyCode, keyDown: false) else {
        return
    }
    keyDown.flags = flags
    keyDown.post(tap: .cgAnnotatedSessionEventTap)
    keyUp.flags = flags
    keyUp.post(tap: .cgAnnotatedSessionEventTap)
}
```

## Typing a String

Combine the mapping and event synthesis to type a string.

```swift
func typeString(_ string: String) {
    for char in string {
        guard let (keyCode, flags) = keyCodeMap[char] else {
            continue // skip unsupported characters
        }
        sendKeystroke(keyCode: keyCode, flags: flags)
        usleep(100_000) // 100ms delay to mimic human typing
    }
}
```

## Focusing the Target Application

Auto-Type only works if the target app or field is focused.

You can use AppleScript to bring an app to the front.

```swift
import Foundation

func activateApp(bundleIdentifier: String) {
    let script = """
    tell application id "\(bundleIdentifier)"
        activate
    end tell
    """
    var error: NSDictionary?
    if let scriptObject = NSAppleScript(source: script) {
        scriptObject.executeAndReturnError(&error)
    }
}
```

## Security Considerations

Security is paramount when implementing Auto-Type. Only trigger Auto-Type after explicit user action, never log or store sensitive data, and always clearly inform users about the permissions required and what will be typed. This ensures users remain in control and sensitive information is never exposed unintentionally.

## Handling Edge Cases

There are several edge cases to consider. For international layouts or special characters, you may need to use more advanced APIs for dynamic mapping, such as `TISInputSource` or `UCKeyTranslate`. It is also important to insert delays between keystrokes to avoid dropped input, especially in slower or virtualized environments. Modifier keys (such as Shift or Option) must be handled correctly for uppercase letters and symbols, ensuring that the correct key combination is sent for each character.

## Typing a Password into Another App

```swift
// 1. Activate the target app (e.g., Safari)
activateApp(bundleIdentifier: "com.apple.Safari")

// 2. Wait for the app to become active
sleep(1)

// 3. Type the password
typeString("P@ssw0rd!")
```

## Conclusion

By combining Accessibility permissions, key code mapping, and event synthesis, you can implement reliable Auto-Type functionality in any macOS app. This approach is flexible and can be adapted for various automation needs, but always keep user security and privacy in mind.