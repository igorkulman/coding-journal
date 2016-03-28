+++
Categories = [ "Windows Phone", "Windows Store", "UWP" ]
Description = "If you are a Windows Phone user you must know that filling in forms in apps is usually a real pain. There is no good way to move from one input to another or to collapse the keyboard. The whole process becomes a struggle, tapping outside the input fields to collapse the keyboard allowing you to scroll to the next input or to the submit button at the top of the screen, usually occluded by the keyboard."
Tags = []
author = "Igor Kulman"
date = "2016-03-29T09:29:12+01:00"
title = "Creating better forms in Windows Phone apps"
url = "/creating-better-forms-in-windows-phone-apps"

+++

If you are a Windows Phone user you must know that filling in forms in apps is usually a real pain. There is no good way to move from one input to another or to collapse the keyboard. The whole process becomes a struggle, tapping outside the input fields to collapse the keyboard allowing you to scroll to the next input or to the submit button at the top of the screen, usually occluded by the keyboard.

The typical struggle to get to the last input fields and the submit button may look like this

{{% img-responsive "/images/forms1.gif" %}}

There is no guidance on how to approach this. Take a look at the Store app on Windows 10 mobile, the perfect example of bad UI and UX directly from Microsoft and try review an app. You fill in the title of the review, then struggle to go into the review text input, you have to tap somewhere above the input to hide the keyboard, but not to hit the stars control ... just an UX disaster. 

<!--more-->

There is one simple thing you can do to make the experience much better for the user. When the keyboard appears on the screen, take the area of the screen than contains the input and add it a bottom margin corresponding to the height of the keyboard. This will make the whole screen longer and all the inputs and the submit button will be available while scrolling without the need to hide the keyboard.

The whole experience becomes much better

{{% img-responsive "/images/forms2.gif" %}}

Implementation is also simple.

<script src="https://gist.github.com/igorkulman/250de623e9213bc3bf90.js"></script>