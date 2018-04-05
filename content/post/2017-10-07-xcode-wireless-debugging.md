+++
Categories = ["iOS", "macOS", "Xcode"]
Description = "One of the best XCode 9 features is the ability to deploy and debug iOS app on your device over WiFi, with no need to have the device connected to you computer by a cable. The only requirement is that the device runs iOS 11."
Tags = ["iOS", "macOS", "XCode"]
Keywords = ["iOS", "macOS", "Xcode", "Debug"]
author = "Igor Kulman"
date = "2017-10-07T09:29:12+01:00"
title = "iOS tip: Wireless debugging from XCode"
url = "/xcode-wireless-debugging"
share_img = "/images/wifideploy.png"

+++

One of the best XCode 9 features is the ability to deploy and debug iOS app on your device over WiFi, with no need to have the device connected to you computer by a cable. The only requirement is that the device runs iOS 11. 

Setting it up is really easy. Connect the device using a cable like you normally do and go to `Window | Devices and Simulators`. You will see a new checkbox next to your iOS 11 devices called `Connect via Network` (see screenshot below), so check it. Now you can disconnect the cable and debug on your device over WiFi, the device has to be on the same network as your computer of course. 

{{% img-responsive "/images/wifideploy.png" %}}

<!--more-->

If it does not work on the first try, reboot your device, it will help. To check if XCode sees your device on the network, look for the icon of a globe next to your device's name in the left pane of the window (as shown on the screenshot).