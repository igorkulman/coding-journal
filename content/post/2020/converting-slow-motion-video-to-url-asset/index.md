+++
Categories = ["iOS", "Xcode"]
Description = ""
Tags = ["iOS", "Xcode"]
Keywords = ["iOS", "Xcode"]
author = "Igor Kulman"
date = "2020-07-22T05:29:12+01:00"
title = "Converting slow motion video to an URL asset"
url = "/converting-slow-motion-video-to-url-asset"

+++

In the iOS application I currently work on the users can choose a video from the device's gallery and that video gets uploaded to the backend. 

This functionality has always worked fine but recently somebody tried to upload s slow motion video and the application was not able to handle it. 

Turns out slow motion videos need a special case, they work a bit differently than normal videos.

When you pick a video from the device's gallery you get a `PHAsset` of type `.video`. You can use `PHImageManager` to load it as `AVAsset`.

The application just tried to cast it to `AVURLAsset` and processed it as a video file stored at some url that can be converted to `Data` and uploaded to the backend. 

A slow motion video is an `AVAsset`, just not an `AVURLAsset` but an `AVComposition` and it needs to be treated differently. 

The best way to make it work for my upload to backend scenario was to export it to a standard video file

{{< highlight swift >}}
guard let exportSession = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetMediumQuality) else {
    Log.error?.message("Could not create AVAssetExportSession")
    return
}

let targetURL = dataPathProvider.uploadsDirectory.appendingPathComponent("\(UUID().uuidString).mp4")

exportSession.outputURL = targetURL
exportSession.outputFileType = AVFileType.mp4
exportSession.shouldOptimizeForNetworkUse = true

exportSession.exportAsynchronously {
    let exportedAsset = AVURLAsset(url: targetURL)
    self.processVideoAsset(asset: exportedAsset)
}
{{< / highlight >}}

After the slow motion video gets exported it can be converted to an `AVURLAsset` and treated the same way as a normal video file.

<!--more-->

Just make sure you set the correct extension for the exported file as without it you will not be able to preview in `AVPlayer` or get the duration or thumbnail for it.