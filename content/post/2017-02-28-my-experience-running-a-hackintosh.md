+++
Categories = [ "MacOS", "Hackintosh"]
Description = ""
Tags = []
author = "Igor Kulman"
date = "2017-02-28T09:29:12+01:00"
title = "My experience running a hackintosh"
url = "/my-experience-running-a-hackintosh"
draft = true

+++

A few months ago I decided to take part in na iOS project. The first problem I needed to solve was to be able to run macOS Sierra. I did not really want to buy an overpriced MacBook withhout function keys or and underpowered Mac Mini. Especially when I own a nearly 4 years old desktop computer that is still usable for all my needs. A few iOS developers I know recommended I go the Hackintosh way.

## Hackintosh

Hackintosh is PC that runs macOS. This configuration is not supported by Apple but it is possible if you have the right hardware since Apple has been using a fairly standard PC hardware for the last couple of years. For example you cannot us any new GeForce 10x0 because there are no Apple computers with those new graphic cards so there are no drivers yet. But if you have an older GeForce like me or an integrated one, you will be one. The [tonymacx86.com](https://www.tonymacx86.com/) website, basically the central hub of all the Hackintosh information, reguraly publishes a buying guide that can be useful if you want to buy a new computer and install macOS on it.

<!--more-->

## Installing macOS Sierra

I needed a bigger SSD anyway so I bought a new 500 GB SSD and cloned my Windows installation to it. That way I got a spare 128 GB SSD that I decided to use to install macOS Sierra on my desktop computer with this quite old configuration

- Gigabyte Z77 DS3H
- i5 3570K (4 core)
- 16 GB RAM
- ASUS GTX 660
- 128 GB SSD (macOS), 500 GB SSD (Windows), 1TB HDD (data)

I [created a installation disk](https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/) on a friend's iMac and I was surprised the installation only took about 20 minutes. I then injected the correct drivers for GPU (Nvidia), sound card and ethernet and everything worked. You just need to know your hardware to be able to choose the correct drivers and you will be fine with the setup.

I installed macOS on a separate SSD, so I had no problem with the UEFI loader conflicting with Windows. The only problem is that my Windows 10 install is MBR not UEFI so Clover (the Hackintosh UEFI loader) cannot run it. I solved it by having the SSD with Windows as primary boot device so Windows boots automatically when I turn on the computer. When I want to boot macOS I just press F12 to get to the BIOS boot menu and choose the macOS drive to boot from manually.

## Using macOS and software

I was surprised that basically everything worked out of the box. I had some problems getting my microphone to work but I finnaly solved it basicaly by accident when reading a [reddit thread](https://www.reddit.com/r/hackintosh/comments/4gp7mj/need_help_getting_alc887_microphone_working_el/). I even got iMessage to work [following this quite long tutorial](https://www.tonymacx86.com/threads/an-idiots-guide-to-imessage.196827/). I performed some tests with the few benchmarks that have both a Windows and a macOS version and the results were quite similar. There was basically no performance degradation on the macOS. 

Software like XCode also runs fine (for the crap it is), including iOS simulators. 