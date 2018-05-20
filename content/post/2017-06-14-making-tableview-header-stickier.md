+++
Categories = [ "iOS", "Swift"]
Description = "Working on na iOS app I had to solve a interesting UI problem. The screen had to contain a UITableView with a header. The header should not have been visible when the screen was displayed. In fact the header should not have been visible when the user just scrolled the UITableView up and down, it only had to become visible when the user dragged the UITableView down, similar to doing pull to refresh. Scrolling the UITableView then hides the header again."
Tags = ["iOS", "Swift"]
Keywords = ["iOS", "Swift", "UITableView", "UIScrollView", "UIKit"]
author = "Igor Kulman"
date = "2017-06-14T09:29:12+01:00"
title = "Making UITableView's header 'stickier'"
url = "/making-tableview-header-stickier"
share_img = "/images/stickyheader.gif"

+++

Working on na iOS app I had to solve a interesting UI problem. The screen had to contain a `UITableView` with a header. The header should not have been visible when the screen was displayed. In fact the header should not have been visible when the user just scrolled the `UITableView` up and down, it only had to become visible when the user "dragged" the `UITableView` down, similar to doing pull to refresh. Scrolling the `UITableView` then hides the header again. 

To better imagine the requirements, take a look at this animation

{{% img-responsive "/images/stickyheader.gif" %}}

Notice that you see that the header is there but I have to really drag the `UITableView` to make it visible. It then disappears when I scroll the `UITableView`. 

<!--more-->

I read Apple documentation and found two properties of `UITableView` (coming from `UIScrollView`) that might help with that, `contentOffset` and `contentInset`. There is a [great article by Lucas Louca explaining the details and differences](https://lucaslouca.com/understanding-the-contentoffset-and-contentinset-properties-of-the-uiscrollview-class/). 

The `contentOffset` may help you with not showing the header when the `UITableView` is displayed by basically scrolling it so the header is not visible. The `contentOffset` represents the scroll position of the  `UITableView`, `contentOffset.y` is vertical scroll position and `contentOffset.x` is horizontal scroll position. But this does not help with the rest of the requirements so this is not a way to go. The way to go is using the `contentInset`. 

By using the `contentInset` property you can affect the scrollable area of the `UITableView`. You can inset the scrollable area top by the height of the header so it is off the screen and you can never scroll to it

{{% gist id="95b406f633b24471490673317c3cc3f0" file="inset.swift" %}}

It remains visible when the `UITableView` bounces. This gives the users a visual clue that something is there and they might try to scroll to it. 

Now we need to detect that the user dragged the `UITableView` to see the whole header. It corespondents to the user scrolling the `UITableView` down so far that the vertical scroll position represented by `contentOffset.y` is less than zero. When that happens we just reset the `contentInset.y` back to `0`. This makes the `UITableView` behave like a standard `UITableView` with a header. 

{{% gist id="95b406f633b24471490673317c3cc3f0" file="show.swift" %}}

The last step is switching back to the initial states when the user scrolls and the header comes out of view. Again, we check the vertical scroll position represented by the `contentOffset.y` property and when it is more that the header height, we inset the `UITableView` again. 

{{% gist id="95b406f633b24471490673317c3cc3f0" file="hide.swift" %}}

The best place for both checks seems to be the `scrollViewWillBeginDecelerating` method, making the changes while the scroll is still in progress.

{{% gist id="95b406f633b24471490673317c3cc3f0" file="all.swift" %}}