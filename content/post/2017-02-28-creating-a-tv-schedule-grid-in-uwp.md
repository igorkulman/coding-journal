+++
Categories = [ "Windows Phone", "UWP"]
Description = "I am currently working on a UWP app for a cable TV company. The app allows their clients to watch the TV channels they are subscribed to with additional information like the TV schedule, information about TV shows, recording TV shows for watching later, etc. One of the main functionalities of the app is a TV schedule grid. Creating this TV schedule grid in UWP is not so easy, especially because of the poor XAML rendering performance"
Tags = ["Windows Phone", "UWP", "XAML"]
author = "Igor Kulman"
date = "2017-02-28T09:29:12+01:00"
title = "Creating a TV schedule grid in UWP"
url = "/creating-a-tv-schedule-grid-in-uwp"
share_img = "/images/tvgrid.gif"

+++

I am currently working on a UWP app for a cable TV company. The app allows their clients to watch the TV channels they are subscribed to with additional information like the TV schedule, information about TV shows, recording TV shows for watching later, etc. One of the main functionalities of the app is a TV schedule grid. Creating this TV schedule grid in UWP is not so easy, especially because of the poor XAML rendering performance. 

## TV schedule grid

The TV schedule grid shows a TV schedule for all the subscribed channels for a given day. The channels are being shown in rows and the columns represent TV shows. The grid is scrollable in both directions and the channel logos are sticky. The users can be subscribed up 70 channels and all of this should work reasonably well even on a Windows Phone.

This is how the result looks in a Windows Phone emulator. Spoiler: there is just no way to make it so smooth on a real Windows Phone device.

{{% img-responsive "/images/tvgrid.gif" %}}

<!--more-->

## XAML controls

My first and obvious approach to implement the TV schedule grid was to use native XAML controls. The `ScrollViewer` control got a handy `LeftHeader` property in UWP making implementing the sticky channels logos easy. The problem with `ScrollViewer` is it does not support virtualization. If you create something like a huge `Grid` with all the data and put into the `ScrollViewer` the app will crash because of memory constrains. 

You can create a `ListView` or `GridView` and use it to display rows and put another one into each row to show columns. You will gain virtualization that works, your app will not crash because of memory but the scrolling performance will be abysmal. The users will notice the virtualization manifesting itself as appearing and disappearing rows and columns resulting in very poor user experience. When you have a vertical `ListView` where each row represents a TV channel containing another horizontal `ListView` with the TV shows, then you have to face another hard problem. When the user scrolls horizontally in a row, you need all the other rows to scroll to the same horizontal position so the TV schedule stays in sync. Try syncing horizontal `ListViews` in a virtualized vertical `ListView`, I dare you. 

*Update:* When I was trying out this solution I tried phasing as suggested by Tim Heuer in the comments. Instead of seeing empty gaps in the TV schedule when scrolling, as the result of virtualization, I sometimes saw TV show borders instead. It was better but still not good enough, the perceived performance did not improve much. And there was still the hard problem of syncing the horizontal `ListViews`.

My last idea was to put a big `Canvas` into the `ScrollViewer` and render only what is currently in view. This is the way the Radaee PDF I use in another project does PDF rendering. You can add XAML controls to the `Canvas`, remove them when they are not in view anymore. This is quite laborious and the resulting performance is still not very good.

You can also use the `Canvas` as a canvas and draw primitives instead of using XAML controls. It is not very comfortable, it is quite low level stuff. Thinking about using such a low level solution made me think of Win2D.

## Win2D

Win2D is an easy-to-use Windows Runtime API for immediate mode 2D graphics rendering with GPU acceleration. It is available to C# and C++ developers writing Windows apps for Windows 8.1, Windows Phone 8.1 and Windows 10. It utilizes the power of Direct2D, and integrates seamlessly with XAML and CoreWindow. I have some experience with Win2D, I [used it when creating my retro Sokoban game](/creating-a-simple-windows-10-game-with-win2d). So I gave it a try.

Win2D is a really low level API. This means I had to do a lot of math to compute what is currently in view and where to render it. Rendering TV shows is also not easy, you have to render the cell using rectangles, lines, etc. At least Win2D makes drawing texts relatively easy. 

The next thing to solve was scrolling the Win2D canvas. Capturing gestures and mouse movements on a XAML control is not easy, so I came up with another solution. I put a transparent `ScrollViewer` over the Win2D grid making the Win2D canvas redraw when the `ViewChanged` event fires. The math in the rendering logic takes the `ScrollViewer` scroll positions into account to correctly determine what is currently in view. 

### Performance tuning

After a lot of work this solution worked, rendered what I wanted it to. The performance seemed good in a Windows Phone emulator but when I tried it on a real phone I was disappointed. The performance was still quite bad. I found out rendering the texts is the slowest part, so the idea was to cache the texts or even better the whole cells by TV show.

Win2D supports [offscreen drawing](https://microsoft.github.io/Win2D/html/Offscreen.htm). This means you can render something into a texture and the use the texture instead of drawing it again, making it ideal as a form of caching. When rendering the cell of a TV show for the first time, I do not render it directly to the Win2D canvas but instead into a texture. I then add the rendered texture into a in-memory dictionary and draw it to the Win2D canvas. When I need to render the TV show cell again (when the users scrolls the TV schedule grid and the TV show is in view) I just render the texture again. This means you render each show with its multiple texts just once.

Solving cache invalidation is quite easy in this case, the texture becomes invalid only when the TV show it represents becomes active (meaning it is currently being broadcasted on a given channel making it gray) or inactive (black). Of course you cannot cache everything, only a certain number of textures, but it is easily solved by setting a limit on the number of cached textures.

With this performance improvement the TV schedule grid became quite tolerable on a Lumia 950, but still slow on a Lumia 750. Sadly, there was nothing else I could do about it. I asked about it on Twitter and found another developer who implemented a TV schedule grid in his app. He also used Win2D but just omitted it from the phone version, because of performance. 

## Conclusion

Creating something like a TV schedule grid in UWP with good performance is simply impossible using XAML controls. You can use Win2D to gain some performance but the result is still not exactly great on Windows Phones. 

Even Microsoft XAML apps suffer from poor rendering performance. Just take a look at the list in the Add or remove programs section of Windows 10 settings. This is how it behaves on ma quad-core i5, 16 GB RAM and GTX 660. 

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">When clients tell you your <a href="https://twitter.com/hashtag/uwp?src=hash">#uwp</a> app is slow and lists lag, just show them how Microsoft does it in <a href="https://twitter.com/hashtag/Windows10?src=hash">#Windows10</a>. Nothing better you can do. <a href="https://t.co/rnDWLFEHeb">pic.twitter.com/rnDWLFEHeb</a></p>&mdash; Igor Kulman (@igorkulman) <a href="https://twitter.com/igorkulman/status/818938357275328514">January 10, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

If Microsoft cannot create a well-performing lists in XAML and UWP, you as a developer cannot do much better no matter how hard you try.