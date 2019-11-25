+++
Categories = ["iOS", "Swift", "Xcode"]
Description = "As an iOS developer you need to periodically update your Xcode, on your own machine and on your CI/CD server. There are multiple ways to do this so do not waste your time and use the fastest way possible."
Tags = ["iOS", "Swift", "Xcode"]
Keywords = ["iOS", "Swift", "Xcode"]
author = "Igor Kulman"
date = "2019-11-20T05:29:12+01:00"
title = "Faster way to download and install Xcode"
url = "/faster-way-to-download-and-install-xcode"
share_img = "/faster-way-to-download-and-install-xcode/xcode-icon-17.jpg"

+++

As an iOS developer you need to periodically update your Xcode, on your own machine and on your CI/CD server if you [automate your development workflow](/automating-ios-development-and-distribution-workflow/). There are multiple ways to do this so do not waste your time and use the fastest way possible. 

### Forget Mac App Store, use Apple Developer Portal

Installing Xcode from the Mac App Store might seem like a convenient way to do so but it is too slow and inflexible. You cannot use the Mac App Store to install multiple version of Xcode at the same time if you need them, like when testing with a Xcode beta for an upcoming iOS release. Download from the Mac App Store is incredibly slow and sometimes not even available for days after release (like 11.2.1).

The place to go is the [Apple Developer Portal](https://developer.apple.com/download/) where you can find all the Xcode versions, including the betas. 

### Faster download with `aria2`

Downloading Xcode from the Apple Developer Portal is faster than using the Mac App Store, but it can be made even better. You just need to use the right tools.

Install `aria2` from Homebrew and uses this [Ruby script from Ian Dundas](https://gist.github.com/iandundas/fabe07455e5216442a421922361f698c):

{{< highlight swift >}}
#!/usr/bin/env ruby

print "What is the URL of your Apple Downloads resource?\nURL:"
url = gets.strip

print "What is the ADCDownloadAuth cookie token:\nADCDownloadAuth: "
token = gets.strip

command = "aria2c --header \"Host: adcdownload.apple.com\" --header \"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\" --header \"Upgrade-Insecure-Requests: 1\" --header \"Cookie: ADCDownloadAuth=#{token}\" --header \"User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 Mobile/14B72 Safari/602.1\" --header \"Accept-Language: en-us\" -x 16 -s 16 #{url} -d ~/Downloads"

exec(command)
{{< /highlight >}}

This script downloads the given Xcode by URL from the Apple Developer Portal, but uses up to 16 separate connections to do so. You will see a significant download speed improvement.

Make sure you use the "More" site at [https://developer.apple.com/download/more/](https://developer.apple.com/download/) even for downloading the latest version of Xcode. 

{{< post-image "more.png" >}}

When copying the `ADCDownloadAuth` cookie make sure you copy the correct value, Safari adds all kinds stuff around it when you just use "copy value". 

### Faster install with `xip` and deleting previous Xcode first

When you install the Xcode xip file you need to extract it. You can double click it in Finder and wait or you can use 

{{< highlight bash >}}
xip -x Xcode11.xip
{{< /highlight >}}

Using `xip` from the command line is much faster because it does not verify the file signature like double clicking in Finder. Of course this is a potential security risk, so it is up to you to decide if it is worth it.

Another trick is not to drag the extracted `Xcode.app` to `/Applications` immediately but delete the existing `/Applications/Xcode.app` first. I guess this is related to Finder first getting the list of those thousands of files in the `Xcode.app` before the update.

<!--more-->