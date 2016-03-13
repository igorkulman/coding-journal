+++
Categories = [ "Windows Phone", "Windows Store", "UWP" ]
Description = "When developing Windows Phone apps you may encounter a use case when you have to allow the user to either pick a photo from the photos gallery in the photo or a take a new photo using the phone's camera. One example of this may be the registration process when the user may choose a profile picture. In Windows Phone 8.1, this task is quite simple, just use the FileOpenPicker. It allows you to pick a photo from the gallery or take a new photo. Just take a look at this animation showing how the users takes a new photo using the phone's camera."
Tags = []
author = "Igor Kulman"
date = "2016-03-14T09:29:12+01:00"
title = "Choosing an image from gallery or camera a bit better in Universal Windows apps"
url = "/choosing-an-image-from-gallery-or-camera-in-uwp"

+++

When developing Windows Phone apps you may encounter a use case when you have to allow the user to either pick a photo from the photos gallery in the photo or a take a new photo using the phone's camera. One example of this may be the registration process when the user may choose a profile picture.

In Windows Phone 8.1, this task is quite simple, just use the FileOpenPicker. It allows you to pick a photo from the gallery or take a new photo. Just take a look at this animation showing how the users takes a new photo using the phone's camera.

{{% img-responsive "/images/wpa81.gif" %}}

<!--more-->

The code for this is relatively simple, although the AndContinue pattern can be a pain

<script src="https://gist.github.com/igorkulman/2885b4a6faa5b0861f17.js?file=pick-wpa81.cs"></script>

In Windows 10 Mobile, the FilePicker has been changed to be more customizable. This make the process of  taking a new photo using the phone's camera totally hidden. Not a chance a common user will discover it, just take a look at this animation.

{{% img-responsive "/images/uwp.gif" %}}

So how to make this experience a bit better for the user? My solution is instead of launching the FileOpenPicker showing a flyout with two options; Choose from gallery and Take photo. The Choose from gallery option just launches the FileOpenPicker 

<script src="https://gist.github.com/igorkulman/2885b4a6faa5b0861f17.js?file=pick-uwp.cs"></script>

and the Take photo option uses CameraCaptureUI to directly take a photo

<script src="https://gist.github.com/igorkulman/2885b4a6faa5b0861f17.js?file=camera-uwp.cs"></script>       

The result might look like this.       

{{% img-responsive "/images/uwp2.gif" %}}