+++
Categories = ["macOS", "Hackintosh"]
Description = ""
Tags = ["macOS", "Hackintosh"]
Keywords = ["macOS", "Hackintosh"]
author = "Igor Kulman"
date = "2019-02-27T05:29:12+01:00"
title = "Switching my Hackintosh from NVIDIA to AMD because of Mojave"
url = "/switching-my-hackintosh-from-nvidia-to-amd"
share_img = "/switching-my-hackintosh-from-nvidia-to-amd/logo.jpg"

+++

When I [turned my computer into a Hackintosh about 2 years ago](/my-experience-running-a-hackintosh/) i was using an **NVIDIA GTX 660** as my GPU and worked without any additional drivers because of built in support in Sierra. When I later bought a 4K display I could not make the **GTX 660** drive the display at 4K@60Hz in macOS, although it worked well in Windows. 

## NVIDIA web drivers

I decided I needed a more powerful anyway to play games on the new display in Windows so I bought a **GTX 1060**. It worked in Sierra and High Sierra thanks to the so called web drivers; GPU drivers provided my NVIDIA on their website. Without the web drivers you get no hardware acceleration, no 4K as maximum resolution, just one display working ... the whole setup is basically unusable. 

Those web drivers are version specific, so every time the macOS build number changes after some update you need new ones (or to use a [script to patch the previous ones](https://github.com/Benjamin-Dobell/nvidia-update)). This is a bit annoying, you typically have to wait a few days after every macOS for new drivers to become available and update then. 

### No web drivers for Mojave

When a new major version of macOS comes out, like Mojave, you cannot use web drivers for the previous version, not even with any kind of patching. NVIDIA just need to release new drivers and they cannot do it without cooperation from Apple. 

And that is exactly the problem, citing from the [NVIDIA Developer forums](https://devtalk.nvidia.com/default/topic/1043070/announcements/faq-about-macos-10-14-mojave-nvidia-drivers/)

> Developers using Macs with NVIDIA graphics cards are reporting that after upgrading from 10.13 to 10.14 (Mojave) they are experiencing rendering regressions and slow performance. Apple fully controls drivers for Mac OS. Unfortunately, NVIDIA currently cannot release a driver unless it is approved by Apple.

Apple basically blocks NVIDIA from releasing web drivers for Mojave, that us the reason the drivers are not our even now half a year after Mojave release. If you are for example an iOS developer, XCode 10.2, the next version of Xcode, will only run on Mojave and you will not be able to use it unless you upgrade. 

## AMD GPUs in Mojave

Mojave natively supports GPU from AMD. You can buy a **RX 560**, **RX 570**, **RX 580**, **Vega 56** or **Vega 64** and it should work out of the box, no extra drivers needed. I did not even have to install [Lilu](https://github.com/acidanthera/Lilu) or [Whatevergreen](https://github.com/acidanthera/WhateverGreen).  

<!--more-->

### Switching to RX 570

I am not a fan of AMD GPUs to be honest but I decided to buy a **RX 570** to be able to update to run Mojave in expectation of Xcode 10.2. The **RX 570** (8 GB variant) seemed like the closets option to my **GTX 1060** (6 GB variant) and it is quite cheap, you can get it under 200€.

I switched the GPUs, booted High Sierra and the RX 570 just worked. No extra settings needed. I did not even need to uninstall the web drivers in advance. I did it after booting with the RX 570. 

### Update to Mojave

I did a [full disk backup with CloneZilla](/using-clonezilla-for-hackintosh-backups/) and updated to Mojave. The update went fine, no problems during the process. 

The only thing that did not work right a way was sound. The [Clover ALC script](https://github.com/toleda/audio_CloverALC) I used in High Sierra to get my **ALC887** working is no longer supported in Mojave. 

To get your sound working in Mojave you now have to use [AppleALC](https://github.com/acidanthera/AppleALC), which is a **Lilu** plugin and supports [a lot of sound card codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs). My **ALC887** is directly supported so I just installed the **kext** using **Kext Utility** without any modifications and the sound started working worked after restart, both playback and recording using my gaming headset. 

### RX 570 in Windows 10

The AMD drivers are notoriously bad, especially for gaming when you will get a few more FPS in some game but a huge FPS drop in others. 

You will also encounter additional problems. When Windows 10 is booting, both my displays show the Windows logo. After the boot is complete, the second display just turns of and is not even detected in Windows 10. To make it work I have to physically unplug it and plug it back in. The same thing happens when the computer wakes up from sleep. This seems to be an [unresolved AMD issue as old as the GPU](https://community.amd.com/thread/225828).

Or when I plug in the VR headset (HDMI + USB) the second display just turns off. Again I have to manually unplug it and plug it back in. When I keep the VR headset connected to HDMI when I sleep the computer, does not matter if it is booted to Windows 10 or Mojave, both displays are black when I wake it up and only a restart helps. 

I never had such problems with the NVIDIA GPU.

## Conclusion

The AMD GPUs are good enough for driving your (4K) display in macOS, you basically have no other choice when you need to run Mojave. But that is about it. They are just not good products overall. If you dual boot to Windows on your Hackintosh, the experience there will be quite bad. 