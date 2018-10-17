+++
Categories = [ "Windows Phone", "Windows Store", "XAML" ]
Description = "If you develop Windows Phone apps, you surely had to use the WebView component at least once. Any you must have realized, that it kind of sucks. One of the problems is that it swallows all the gestures and manipulation events. This means you cannot put it into a Pivot, you cannot detect swipe left or right gestures to navigate to next or previous article .. or can you?"
Tags = ["Windows Phone", "Windows Store", "XAML" ]
Keywords = ["Windows Phone", "Windows Store", "XAML", "WebView"]
author = "Igor Kulman"
date = "2015-12-07T09:29:12+01:00"
title = "Detecting gestures over WebView on Windows Phone"
url = "/detecting-gestures-over-webview-on-windows-phone/"

+++

If you develop Windows Phone apps, you surely had to use the WebView component at least once. Any you must have realized, that it kind of sucks. One of the problems is that it swallows all the gestures and manipulation events. This means you cannot put it into a Pivot, you cannot detect swipe left or right events to navigate to next or previous article .. or can you?

In a recent project, I had to implement exactly the mentioned functionality, swiping between articles displayed in a WebView. I did some research and I could not find any solution. So I had to get creative and I find a way involving JavaScript.

<!--more-->

The idea was simple. If you cannot recognize the swipe event over the WebView in your C#/XAML, why not try to recognize them in the WebView? I did some research and found a JavaScript library that works on Windows Phone. The library is [Hammer](https://hammerjs.github.io/) and it recognizes all the basic gestures, including swiping left and right.

First you include Hammer into your HTML, then you set it up to listen over an HTML element and lastly you subscribe to events you are interested in. The only reasonable action you can execute is notify the WebView using the `window.external.notify` function.

{{< highlight javascript >}}
<script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
<script type="text/javascript">
    window.onload = function() {
        var hammertime = new Hammer(document.getElementById("text"));
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        hammertime.on('swipeleft', function (ev) {
            window.external.notify('left');
        });
        hammertime.on('swiperight', function (ev) {
            window.external.notify('right');
        });
    }
</script>
{{< / highlight >}}

The C#/XAML part of the solution consists just of handling the WebView's `ScriptNotify` event and implementing your action according to the value you receive.
