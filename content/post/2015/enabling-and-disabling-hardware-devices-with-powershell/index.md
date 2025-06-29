+++
title = "Enabling and disabling hardware devices with PowerShell"
author = "Igor Kulman"
date = "2015-11-06"
url = "/enabling-and-disabling-hardware-devices-with-powershell/"
Tags = ["PowerShell", "Hardware", "Device Management", "Windows 10", "Automation"]
+++
I have a built-in fingerprint reader on my Thinkpad notebook that I use for loging in almost exclusively. I say almost because since I upgraded to Windows 10 it sometimes just stops working when the computer wakes up from sleep. I found out that to make it work again I have to go to the Device Manager, find it, disable it and enabled it back again.

Of course, I was looking for a way to automate this, because I do not think that this issue will be fixed any time soon by Microsoft or Lenovo. I found out there is a [PowerShell cmdlet that expose device enumeration and management APIs](https://gallery.technet.microsoft.com/Device-Management-7fad2388). Using this cmdlet I wrote a simple PowerShell script to the the work.

<!--more-->

It has to be run with administrator privileges to work. Maybe I will go one step further and make this script run each time the notebook wakes up, just to be sure.

```powershell
Import-Module DeviceManagement.psd1

Get-Device | where {$_.name -like "Synaptics FP Sensors*"} | Disable-Device
Get-Device | where {$_.name -like "Synaptics FP Sensors*"} | Enable-Device
```
