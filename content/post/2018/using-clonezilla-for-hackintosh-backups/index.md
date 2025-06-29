+++
Description = "If you are a macOS user you may be used to Time Machine as the standard for backups. Time Machine is fine if you want to backup your files and configuration, but if for example your disk dies or your hackintosh completely breaks with some bad update, there are better and faster ways to get it up and running again. "
Tags = ["macOS", "Hackintosh", "Backup", "CloneZilla"]
author = "Igor Kulman"
date = "2018-02-14T09:29:12+01:00"
title = "Using CloneZilla for regular hackintosh backups"
url = "/using-clonezilla-for-hackintosh-backups"
images = ["/using-clonezilla-for-hackintosh-backups/clonezilla.jpg"]

+++

**Update**: With macOS Catalina I switched to [bootable daily incremental backups](/creating-bootable-macos-backups).

If you are a macOS user you may be used to Time Machine as the standard for backups. Time Machine is fine if you want to backup your files and configuration, but if for example your disk dies or your hackintosh completely breaks with some bad update, there are better and faster ways to get it up and running again.

## Requirements

Basically everything comes down to your backup requirements. These are mine

* full backup of the macOS SSD including EFI with Clover
* backups that can be restored without any additional configuration to the current macOS SSD or a new one in case of a disk failure
* no need for the ability to restore single files (all work data are in Git and Dropbox)
* reasonable backup and restore speed

Looking at different backup solutions I chose [Clonezilla](http://clonezilla.org/). It is not exactly the most user-friendly solution, but it is a very powerful one if you know what you are doing.

<!--more-->

## Clonezilla workflow

Once a week I, or before a macOS update I

* boot Clonezilla from a flash drive
* save the macOS SSD as an image file to a data HDD
* delete old backups to keep just 4 latest ones

Although I use High Sierra I kept the *HFS+* file system. One of the reasons was that Clonezilla understands *HFS+* when saving the image file.

This means the resulting backups are only as big as the actually used disk space on my macOS SSD. I use a 256 GB SSD for macOS but the backups currently have only 63 GB which is my used disk space. It takes Clonezilla about 10 minutes to do the backup.

Clonezilla can of course also backup *APFS* partitions but just with a sector by sector backup (basically a *dd*), meaning the resulting image file is the same size as the SSD no matter what amount of disk space you actually use.

## Test

You cannot think your backups are working until you try to restore them. So when I decided to upgrade from Sierra to High Sierra a few months ago it was a good chance to test it. I was running Sierra on an 128 GB SSD so I decided to buy a new 256 GB SSD, restore a Clonezilla backup to this new SSD and upgrade Sierra to High Sierra. The idea was that if anything goes wrong I can still boot Sierra from the old SSD and continue using it.

I booted Clonezilla, restored the latest backup to the new SSD and macOS booted just fine from it. The whole process took about 10 minutes. Now I am reasonably sure that in case of a failure (other then both my macOS SSD and the data HDD breaking at the same time) I am safe.
