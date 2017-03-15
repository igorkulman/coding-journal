+++
Categories = [ "Windows Phone", "Windows Store", "UWP" ]
Description = "If you use Windows apps with navigation menus consisting of icons, you may have noticed that some of those apps show you a text when hovering above those icons. This is a nice touch for the users, allowing them to quickly grasp the meaning of the menu icons without the need to click them or to expand the menu (if available)."
Tags = ["Windows Phone", "Windows Store", "UWP"]
author = "Igor Kulman"
date = "2016-03-23T09:29:12+01:00"
title = "Using Tooltips to make better menus in Windows apps"
url = "/using-tooltips-to-make-better-menus-in-windows-apps"
share_img = "/images/tooltips.gif"

+++

If you use Windows apps with navigation menus consisting of icons, you may have noticed that some of those apps show you a text when hovering above those icons. This is a nice touch for the users, allowing them to quickly grasp the meaning of the menu icons without the need to click them or to expand the menu (if available).

{{% img-responsive "/images/tooltips.gif" %}}

Implementing this kind of hovers is really easy thanks to the `ToolTipService` that is available in Windows 8.1 and Windows 10 UWP. You can add `<ToolTipService.ToolTip>` with any element and include basically any XAML content as the tooltip. Here is a sample from the animation using a simple localized `TextBlock`

<!--more-->

<script src="https://gist.github.com/igorkulman/c7320d81f9b882bcfd69.js"></script>