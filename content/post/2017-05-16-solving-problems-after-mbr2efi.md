+++
Categories = [ "Windows", "Hyper-V"]
Description = "When I upgraded my Windows 10 installation to the Creators Update I wanted to take advantage of the new MBR2GPT.EXE tool. This tool allows you to upgrade your Windows 10 installation to EFI without having to reinstall or loosing any data. My motivation for moving to EFI installation was to be able to boot Windows 10 from Clover, the macOS bootloader in my hackintosh installation, making switching between Windows 10 and macOS easier without involving the BIOS boot menu."
Tags = ["Windows", "Hyper-V"]
Keywords =["Windows", "Hyper-V", "VirtualMachine"]
author = "Igor Kulman"
date = "2017-05-16T09:29:12+01:00"
title = "Solving problem after upgrading Windows 10 to EFI"
url = "/solving-problems-after-mbr2efi"

+++

When I upgraded my Windows 10 installation to the Creators Update I wanted to take advantage of the new `MBR2GPT.EXE` tool. This tool allows you to upgrade your Windows 10 installation to EFI without having to reinstall or loosing any data. My motivation for moving to EFI installation was to be able to boot Windows 10 from Clover, the macOS bootloader in [my hackintosh installation](/my-experience-running-a-hackintosh), making switching between Windows 10 and macOS easier without involving the BIOS boot menu.

The upgrade from MBR to EFI went fine on both my desktop computer and my Thinkpad but there were a few thing that needed fixing afterwards. 

<!--more-->

### Fixing broken Hyper-V

On both my computer Hyper-V stopped working after the upgrade. When trying to run a Windows Phone emulator I just got an error message

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Anyone seeing this after upgrading to Creators Update? No emulators work now.  <a href="https://twitter.com/hashtag/Windows10?src=hash">#Windows10</a> <a href="https://t.co/MTzIlCHCw1">pic.twitter.com/MTzIlCHCw1</a></p>&mdash; Igor Kulman (@igorkulman) <a href="https://twitter.com/igorkulman/status/855788447977672706">April 22, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Virtualization was still enabled in BIOS. I ran the [CoreInfo](http://technet.microsoft.com/en-us/sysinternals/cc835722) tool and it told me virtualization is enabled but Hyper-V is disabled. So I uninstalled Hyper-V, restarted the computer and installed Hyper-V back. That fixed the problem. 

### Fixing broken hibernation

On my Thinkpad, where I use sleep and hibernation (after 3 hours of sleep), there was another problem. Sleep still worked but waking up form hibernation was giving me a [strange error message](https://social.technet.microsoft.com/Forums/windows/en-US/0bfbe8a7-2eb9-4432-a477-258ae7d102f9/boot-manager-recover-from-critical-error-some-essential-variables-are-absent-or-corrupted-and-boot?forum=win10itprosetup). 

I could not find any other mention of it so I tried the obvious, I tried to repair the Windows bootloader using the Startup Repair functionality. It took some time and finished with some errors. But it definitely did something to the bootloader because a new partition appeared (probably the EFI partition) in Windows Explorer. 

I hid the partition and try hibernation again and it worked without the error message. Maybe a lucky coincidence but the Startup Repair seems to have fixed it. 