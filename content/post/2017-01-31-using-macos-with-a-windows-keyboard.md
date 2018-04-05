+++
Categories = [ "macOS", "Hackintosh"]
Description = "When you start using macOS after years of using Windows there are some things you expect to work in certain ways. One of those things is the ways the OS handles keyboard input and keyboard shortcuts. This is especially important if you still also use Windows and use a Windows keyboard with macOS. Here are a few things regarding the keyboard that help me when using macOS working on a side project."
Tags = ["macOS", "Hackintosh"]
Keywords = ["macOS", "Hackintosh", "Hardware", "Tools"]
author = "Igor Kulman"
date = "2017-01-31T09:29:12+01:00"
title = "Using macOS with a Windows keyboard"
url = "/using-macos-with-a-windows-keyboard"
share_img = "/images/macoskeymapping.png"

+++

When you start using macOS after years of using Windows there are some things you expect to work in certain ways. One of those things is the ways the OS handles keyboard input and keyboard shortcuts. This is especially important if you still also use Windows and use a Windows keyboard with macOS. Here are a few things regarding the keyboard that help me when using macOS working on a side project.

## Control, Option and Command keys

The fist thing you may notice when using macOS with a Windows keyboard is that the modifier keys are not in the right order. The order of the modifier keys on an Apple keyboard is Control, Option, Command but the Ctrl, Windows, Alt keys on a Windows keyboard map to Control, Command, Option by default. You can fix the order of the modifier keys in System Preferences | Keyboard | Modifier keys

{{% img-responsive "/images/macoskeymapping.png" %}}

<!--more-->

## Correctly working Home and End keys

If you are a programmer you probably use Home and End keys to navigate to the beginning and end of the current line a lot. Those keys work differently on macOS, pressing them will make your cursor jump to the beginning or the end of a file and drive you nuts. Luckily, there is quite an easy way to fix it. Create a `DefaultKeyBinding.dict` file in `~/Library/KeyBindings` to remap them

<div data-gist="8b7ccbb32a639b7fdb2efaa5f4b02d6d"></div>

It is best to logout and log back in for the apps to notice this change.

If you use the Terminal app (you should really try [Hyper](https://hyper.is/) instead) this change will not work. You have to go to Preferences | Settings | Keyboard for the Terminal app and add `\033[H` to move to the beginning of the line and `\033[F` to move to the end of the line.

## Volume controls

Windows keyboard do not usually have Volume up and Volume down keys but you can quite simply create custom keyboard shortcuts for this functionality using Automator. Open Automator and create two Services executing Apple script. One for Volume up

<div data-gist="871c92d9fdadf8dea25d4bbbae28ce66" data-file="volumeup.applescript"></div>

and another one for volume down

<div data-gist="871c92d9fdadf8dea25d4bbbae28ce66" data-file="volumedown.applescript"></div>

You can then open System preferences | Keyboard | Keyboard shortcuts | Services and assign those two services any keyboard shortcut you want. I use Control + Command + Up for Volume up and Control + Command + Down for Volume down.

{{% img-responsive "/images/volumeshortcuts.png" %}}