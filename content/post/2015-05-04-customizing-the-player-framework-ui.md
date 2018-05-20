+++
title = "Customizing the Player Framework UI"
author = "Igor Kulman"
date = "2015-05-04"
url = "/customizing-the-player-framework-ui/"
categories = ["Windows Phone","Windows Store"]
tags = ["Windows Phone","Windows Store", "XAML"]
keywords = ["Windows Phone","Windows Store", "XAML", "PlayerFramework"]
+++
In my last article I gave you a tip on how to localize the Player Framework, in this article I will show you have to customize the UI of the actual player. 

The first step is to obtain the Generic.xaml file that the Player Framework uses for styling. You can find it in `C:\ Program Files (x86)\ Microsoft SDKs\ Windows\ v8.0\ ExtensionSDKs\ Microsoft.PlayerFramework.Xaml\ 2.0.0.0\ Redist\ CommonConfiguration\ neutral\ Microsoft.PlayerFramework\ Themes`. Copy it to your projects and rename it to something more telling, like PlayerFramework.xaml.

You can now edit the copied XAML file and customize it any way you want. If you do the styling for a Windows Phone app, keep in mind that the ControlPanel switches to the Compact states and a few transformations are applied by default, that can interfere with your styling. 

<!--more-->

Finally, you need to apply the style by adding it to the page with your player

{{% gist id="7bbbefc9a25afa07c5e1" %}}
