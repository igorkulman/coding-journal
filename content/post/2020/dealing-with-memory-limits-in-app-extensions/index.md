+++
Categories = ["iOS", "Xcode", "UIImage"]
Description = ""
Tags = ["iOS", "Xcode", "UIImage"]
Keywords = ["iOS", "Xcode", "UIImage"]
author = "Igor Kulman"
date = "2020-05-27T05:29:12+01:00"
title = "Dealing with memory limits in iOS app extensions"
url = "/dealing-with-memory-limits-in-app-extensions"

+++

In the iOS app I currently work on there is a `Notification Service Extension` and a `Share Extension`. Both extensions have been implemented quite some time age and have been working fine. 

Recently I got some bug reports that led to discovering some interesting limits about both of those extension types.

### Notification Service Extension

The `Notification Service Extension` is executed when the iOS app receives a push notification and has a chance to modify the payload before iOS displays the push notification.

I use it to change the push notification sound to the sound the user chose in the app, for better personalization. 

Another feature is adding a big red warning image as an attachment to the push notification if the push notification is of an alert type.

I already use the image in the main app so I implemented it quite simply, loading it from the asset catalog, saving it into a file and adding that file as an attachment

```swift
let image = #imageLiteral(resourceName: "NotificationAlert")
guard let data = image.jpegData(compressionQuality: 0.8) else {
    return failEarly()
}

try data.write(to: tmp.appendingPathComponent("image.png"), options: [])
let imageAttachment = try UNNotificationAttachment(identifier: "image.png", url: fileURL, options: nil)
content.attachments = [imageAttachment]
contentHandler(content.copy() as! UNNotificationContent)

```

This worked fine on smaller phones but when users started using bigger phone, like iPhone 11, they started complaining that the image is not shown when they receive an alert push notification.

I was able to reproduce the problem and found out the extension crashed exceeding the `24 MB` memory limit. But only on bigger phones. 

The problem is that manipulating an `UIImage` instance does not consume the same amount of memory on every device, it depends on the device screen scaling factor. 

On smaller devices with smaller scaling factor the image operations take up less memory, below the extension limit, but on bigger devices the memory limit is exceeded.

I solved this problem by just adding the image to the app bundle as a file and using the file directly, without the additional step of using an `UIImage`.

<!--more-->

```swift
guard let iconFileUrl = Bundle.main.url(forResource: "avatarAlertNotifications", withExtension: "png") else {   
	return failEarly()
}

let imageAttachment = try UNNotificationAttachment(identifier: "image.png", url: iconFileUrl, options: nil)
content.attachments = [imageAttachment]
contentHandler(content.copy() as! UNNotificationContent)
```

Which I probably should have done right from the start as it also results in simpler code.

### Share Extension

The `Share Extension` in the app accepts a variety of data types, including images. An image can be shared to the `Share Extension` in various ways:

```swift
case kUTTypeImage:
    var resultsImage: UIImage?

    // data could be raw Data
    if let imageData = results as? Data {
        resultsImage = UIImage(data: imageData)
    } else if let url = results as? URL { 
    	// data could be an URL from Photos
		if let imageData = try? Data(contentsOf: url) {
	    	resultsImage = UIImage(data: imageData)
		}
    } else if let imageData = results as? UIImage { 
    	// data could be an UIImage object (screenshot editor)
        resultsImage = imageData
    }

    guard let image = resultsImage?.resizeForUpload() else {        
        showError(title: L10n.error, message: L10n.attachmentNotSupported, closeDialog: true)
        return
    }
    viewModel.add(attachment: .picture(image))
```

In every case I converted the data to `UIImage` and resized it before upload. 

Everything worked fine until I got a bug report that sharing a portrait mode (not orientation) image from iPhone 11 does not work. I reproduced the problem and saw the `Share Extension` crashing exceeding the `120 MB` memory limit when resizing the portrait mode image.

When you share an image from `Photos` to a `Share Extension` you get it as a file `URL`, not as an `UIImage`. Creating an `UIImage` from the file, then creating another one resizing it is quite wasteful, causing the high memory consumption.

I found a better way, creating a resized `UIImage` directly from the file URL

```swift
private func resizeForUpload(_ imageURL: URL) -> UIImage? {
	let imageSourceOptions = [kCGImageSourceShouldCache: false] as CFDictionary
	let maxDimensionInPixels: CGFloat = 2000
	let downsampleOptions =  [kCGImageSourceCreateThumbnailFromImageAlways: true,
	                          kCGImageSourceShouldCacheImmediately: true,
	                          kCGImageSourceCreateThumbnailWithTransform: true,
	                          kCGImageSourceThumbnailMaxPixelSize: maxDimensionInPixels] as CFDictionary

	guard let imageSource = CGImageSourceCreateWithURL(imageURL as CFURL, imageSourceOptions), let downsampledImage =  CGImageSourceCreateThumbnailAtIndex(imageSource, 0, downsampleOptions) else {	    
	    return nil
	}

	return UIImage(cgImage: downsampledImage)
}
```
