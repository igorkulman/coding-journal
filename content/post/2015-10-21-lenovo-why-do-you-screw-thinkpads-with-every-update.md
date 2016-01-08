+++
title = "Lenovo, why do you screw Thinkpads with every update?"
author = "Igor Kulman"
date = "2015-10-21"
url = "/lenovo-why-do-you-screw-thinkpads-with-every-update/"
categories = ["Rants"]
+++
I have a Lenovo Thinpad T440s that I got about a year ago after a great experience with a company issued Lenovo Thinkpad T420 I used for about two and half years before that. I use it daily for on-site work, not so much at home, where I have a desktop computer. The T440s is thinner and lighter than T420, but otherwise everything is just worse. You cannot change RAM or disk so easily as on the T420, the keyboard and trackpoint are worse (the trackpoint does not have physical buttons like on the T420 but [I had it replaced for one that does][1]). 

So why did I get the T440s? Because it seemed like a wise choice at the time, compared to the competition. It has a trackpoint, fingerprint reader, a keyboard with all the keys in the right place and it is, after all, a Thinkpad, a sturdy and reliable work machine build from good materials. 

But not really. As every Thinkpad fan can tell you, the quality of Thinkpads is declining (even when not counting the plastic Thinkpad Edge computers that are not &#8220;real&#8221; Thinkpads). It seems like Lenovo simply does not care, making the hardware worse and software even more so. Gone are the superb ThinkVantage tools, only the Thinkpad update utility remained. And it often install software and drivers that can screw up your computer. It happened to many times, this is the latest incident.

<!--more-->

**Security BIOS update**

The latest problem is with a BIOS update. Lenovo releases BIOS 2.35 for my T440s, fixing a [SMM &#8220;Incursion&#8221; Attack][2]. The BIOS update as pushed to me as critical using the Thinkpad update tools and fixing security problems is always a good thing. So I installed it. And problems started.

When I put the computer to sleep and it went from sleep to hibernation after 180 minutes (default settings), the computer started to beep madly and hung on a black screen. Not really a good sight. 

I figured it must be because of the BIOS update, so I went to the Lenovo website to download the previous BIOS update. I downloaded BIOS 2.34 and could not installed it because of I strange error. Then I noticed this note in the BIOS 2.35 changelog: **&#8220;If the UEFI BIOS has been updated to version 2.35 or higher, it is no longer able to roll back to the version before 2.35 for security improvement.&#8221;**. So my computer got screwed. I had a problematic BIOS and could not downgrade. Great work Lenovo.

**Insecure workaround**

I did some research and [found out that the problem is related to the TPM chip][3]. I use the TPM chip with BitLocker in Windows 10, so It looked like it maybe be the problem. 

So I turned off BitLocker, waited for my disk do get decrypted and disabled the TPM in BIOS. I put the computer to sleep, waited for it to go to hibernation, and nothing happened. No beeps, no problems, the computer woke normally.

**Conclusion**

So now I have a BIOS (that I cannot get rid of) with the security fix for an obscure issue but my disk is not encrypted and when I loose my computer or it gets stolen, anyone can read my data. Again, great work Lenovo. Time to install TrueCrypt I guess.

**Update**: it took two month for Lenovo to acknowledge the problem and release a fix.

 [1]: http://camerongray.me/2015/02/fitting-physical-trackpoint-buttons-to-a-lenovo-thinkpad-t440s/
 [2]: https://support.lenovo.com/us/en/product_security/smm_attack
 [3]: https://forums.lenovo.com/t5/ThinkPad-T400-T500-and-newer-T/T440s-beeps-while-putting-in-sleep-mode-and-a-blank-screen/m-p/2191866
