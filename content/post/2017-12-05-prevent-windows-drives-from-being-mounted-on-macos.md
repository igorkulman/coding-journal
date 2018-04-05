+++
Categories = ["macOS", "Hardware"]
Description = "If you run macOS side by side with Windows or have some drives formated with NTFS, you may not want them to get automatically mounted when you start macOS. I have a Windows 10 SSD with NFTS and a data HDD with NTFS next to my macOS SSD and I do not use any o those two drivers when booted in macOS, so I was looking for a way to have them not mounted at startup. "
Tags = ["macOS", "Hardware"]
Keywords = ["macOS", "Hardware", "Sleep", "Disk"]
author = "Igor Kulman"
date = "2017-12-05T09:29:12+01:00"
title = "Preventing Windows drives from getting automatically mounted on macOS"
url = "/prevent-windows-drives-from-being-mounted-on-macos"
share_img = "/images/nomount.png"

+++

If you run macOS side by side with Windows or have some drives formated with NTFS, you may not want them to get automatically mounted when you start macOS. I have a Windows 10 SSD with NFTS and a data HDD with NTFS next to my macOS SSD and I do not use any o those two drivers when booted in macOS, so I was looking for a way to have them not mounted at startup. 

The main reason for this other than them not being shown in Finder is that macOS spins the data HDD from time to time for no apparent reason and I really do not want this.

In a classic Linux system you could edit `/etc/fstab`. This file can be also created on macOS, but Apple does not recommend editing it directly but to use `sudo vifs`. The drives should be addressed by their UUID as opposed to their "location" on Linux, so you first have to find that UUIDs. 

When you have the drivers mounted, run `diskutil info /Volumes/"Volume name" | grep 'Volume UUID'` where "Volumne name" is the volume name as shown in Finder. This will get you just the UUID. 

<!--more-->

Next you need to create a new record for each of the drives you do not want mounted at startup in `/etc/fstab` (by running `sudo vifs` as mentioned before) in this format

`UUID=XXXXXXXXXXXXXXXXX none ntfs ro, noauto`

where "XXXXXXXXXXXXXXXXX" is the correct UUID, `ntfs` is the filesystem and 'ro, noauto' means the drive will no be mounted automatically but when you mount it manually it will get mounted read-only.

The resulting configuration may look like this

{{% img-responsive "/images/nomount.png" %}}