+++
Categories = ["macOS", "Hackintosh"]
Description = "When I turned my computer into a Hackintosh about 2 years ago I knew I needed a good backup solution. The idea was that if something goes wrong, like a macOS update breaking the installation or the failure of a macOS SSD, I need to be able to be back up and running in a few minutes."
Keywords = ["macOS", "Hackintosh"]
author = "Igor Kulman"
date = "2019-03-20T05:29:12+01:00"
title = "Creating bootable macOS backups"
url = "/creating-bootable-macos-backups"
share_img = "/creating-bootable-macos-backups/logo.png"

+++

When I [turned my computer into a Hackintosh about 2 years ago](my-experience-running-a-hackintosh/) I knew I needed a good backup solution. The idea was that if something goes wrong, like a macOS update breaking the installation or a failure of the macOS SSD, I need to be able to be back up and running in a few minutes.

## Initial image based backups

I decided to [use CloneZilla and backup the whole macOS SSD into an image file on another HDD](/using-clonezilla-for-hackintosh-backups/) every week. In case of failure I would be able to restore the image file to the SSD or any new SSD and be back up and running in about 30 minutes. I basically use macOS only for work, so restoring an at most week old backup did not seem like a problem, I would then just do a `git pull` and all the important data would be back.

The backups worked fine, when I bought a bigger SSD for macOS and just restored the latest backup image to it and everything went fine. I had to remember to boot **CloneZilla** every week and do the backup, but that was not that much of a problem, it became a weekly ritual.

### The problem with image base backups

The problem is that requirements change over time, most of the time after problems you did not expect before.

#### Size dependent on the filesystem

**CloneZilla** works well with `HFS+`, can detect used and free space. This means it only backs up the used space, so the resulting image is not as big as your SSD and the process is fast. When you update to `APFS` this is no longer true. **CloneZilla** backs it up sector by sector, the resulting image is as big as the SSD and it is slow.

#### Inflexibility for smaller fixes

Once I updated **Clover** and my Hackintosh did not boot, got stuck on some error message. The problem was that the **Clover** installer decided not to check `OsxAptioFix3Drv-64.efi` by default anymore and this module got deleted. 

Doing a full restore from an image seemed like a waste of time when I just needed to restore one missing file. So I used **Clover** on my `Unibeast` flash drive that I keep safe and booted the Hackintosh with it. This screwed up iMessage (different serial number). I then reinstalled **Clover** checking `OsxAptioFix3Drv-64.efi`, booted backed normally and fixed iMessage. 

This made me realize that image based backups are not ideal for real world problems (you probably screw up your **EFI** or **kext**s more often that your SSD dies) and I got looking for some other solution.

## Bootable macOS backups

I stumbled upon [Carbon Copy Cloner](https://bombich.com/); a backup tool that offers bootable backups for macOS. I bought another SSD for bootable backups and got to work.

### Preparing the SSD

Once you plug in the backup SSD, you need to format it to **Mac OS Extended (Journaled)**. Do not just format the existing partition (if any already) exists, format the whole drive. 

<!--more-->

In the macOS **Disk Utility** you need to switch the view to **Show all devices**. Make sure the Scheme is set to **GUID Partition Map**, otherwise the backup will not be bootable.

{{% post-image "Formatting.png" %}}

### Cloning macOS

Once you format the backup SSD, just run **Carbon Copy Cloner** and use it to make a full backup. This step takes some time, you are cloning a live system and doing it for the first time. Be patient.

{{% post-image "Clone.png" %}}

If it offers to also create an recovery partition on the backup SSD, go for it.

### Copying EFI (hackintosh-specific)

The newly created backup is not yet bootable by itself. You can use **Clover** in your macOS SSD to boot the backup SSD, but when you break it (Clover), the backup SSD is useless. To fix this, you need to make the backup SSD bootable.

Use **Clover Configurator** to mount the **EFI** partition on your macOS SSD. Copy the **EFI** folder from it somewhere like to the Desktop and unmount it. Then mount the **EFI** partition on the backup SSD and copy the **EFI** folder to it. Unmount the **EFI** partition and you are done.

### Testing the bootable backup

To test that the newly created backup is really bootable, restart your computer and select the backup SSD as boot drive. To be absolutely sure you can just physically disconnect the macOS SSD or even better all the other drives.

If **Clover** shows up and macOS boots up, you are all set. You can check the current boot drive in the **About This Mac** dialog to be 100% sure.

{{% post-image "BootedBackup.png" %}}

### Scheduling the backup

With all of the setup now done, you should schedule **Carbon Copy Cloner** do do a periodic backup. The backup will be incremental, so it will not take as much time as the first backup. It will be done in the background so you wil probably not even notice it.

{{% post-image "Schedule.png" %}}

## Conclusion

With bootable macOS backups using **Carbon Copy Cloner** I get automatic incremental backups that I do not have to think about. When anything happens, I can boot from the backup SSD, fix broken **Clover**, continue working or let **Carbon Copy Cloner** do a restore.