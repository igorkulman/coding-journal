+++
Categories = ["iOS", "macOS"]
Description = ""
Tags = ["iOS", "macOS"]
author = "Igor Kulman"
date = "2017-09-19T09:29:12+01:00"
title = "Fixing problems with iPhone USB tethering on macOS"
url = "/fixing-iphone-usb-tethering-on-macos"
share_img = "/images/tethering.png"
draft = true

+++

When my ISP had a problem resulting in Internet outage for multiple hours and I needed to work, I wanted to tether the LTE connection from my iPhone 6S to my [hackintosh running macOS Sierra](/my-experience-running-a-hackintosh). It has no Wi-Fi card so the only was was tethering over USB cable. 

The whole process should be easy, just connecting the iPhone to the computer with an USB cable and turning on the Personal hotspot in the Settings. The iPhone immediately registered 1 connection, but Internet did not work on the computer, although everything looked fine in System Preferences

{{% img-responsive "/images/tethering.png" %}}

<!--more-->

After killing mDNSResponder with `killall -HUP mDNSResponder` I was able to `ping` IP addresses like 8.8.8.8 just fine, but DNS did not work. Running `cat /etc/resolv.conf` showed that the DNS server was still set to the IP address of my router. 

The solution was to set the DNS for the tethering connection manually with `networksetup -setdnsservers "iPhone USB" 8.8.8.8` and flush the cache using `dscacheutil -flushcache`. 