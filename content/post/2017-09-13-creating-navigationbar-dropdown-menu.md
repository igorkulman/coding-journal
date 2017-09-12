+++
Categories = ["iOS", "Swift"]
Description = "Working on an iOS app I had to implement a filter for the table view displayed on screen. The filter should have contained 5 items and be accessible when tapping the screen title in the navigation bar. My first idea was to use an UIAlertController with those 5 options. It worked but it looked really ugly, So I started searching for a better, nicer solution. Ideally some kind of a dropdown menu."
Tags = ["iOS", "Swift"]
author = "Igor Kulman"
date = "2017-09-12T09:29:12+01:00"
title = "Creating a dropdown menu from iOS navigation bar"
url = "/creating-navigationbar-dropdown-menu"
share_img = "/images/dropdown.gif"

+++

Working on an iOS app I had to implement a filter for the table view displayed on screen. The filter should have contained 5 items and be accessible when tapping the screen title in the navigation bar. My first idea was to use an `UIAlertController` with those 5 options. It worked but it looked really ugly, So I started searching for a better, nicer solution. Ideally some kind of a dropdown menu.

{{% img-responsive "/images/dropdown.gif" %}}

I found multiple libraries for an iOS dropdown menu, but I liked [BTNavigationDropdownMenu](https://github.com/PhamBaTho/BTNavigationDropdownMenu) the best. The usage is really simple. First you define the items for the dropdown as an string array

<div data-gist="f94f4bf63eb2d540b7bd34178fcf0300" data-file="items.swift"></div>

create the menu instance

<div data-gist="f94f4bf63eb2d540b7bd34178fcf0300" data-file="create.swift"></div>

<!--more-->

and set it as the navigation item's title view

<div data-gist="f94f4bf63eb2d540b7bd34178fcf0300" data-file="set.swift"></div>

and react to the user selection

<div data-gist="f94f4bf63eb2d540b7bd34178fcf0300" data-file="react.swift"></div>

The library allows you to customize the UI, which will come handy. You can set the arrow to black, disable the tick next to the selected item, remove the item separators or make the the navigation bar title look the same as the default look

<div data-gist="f94f4bf63eb2d540b7bd34178fcf0300" data-file="setup.swift"></div>