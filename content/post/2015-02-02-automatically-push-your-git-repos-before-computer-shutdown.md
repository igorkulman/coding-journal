+++
title = "Automatically push your Git repos before computer shutdown"
author = "Igor Kulman"
date = "2015-02-02"
url = "/automatically-push-your-git-repos-before-computer-shutdown/"
categories = ["PowerShell"]
tags = ["Git","PowerShell"]
+++
I use two computers, my desktop computer located at home and set up for work and play and a work notebook (company provided) that I usually leave at the office. I use both computers for work and sometimes I forget to do &#8216;git push&#8217; when working at my home desktop computer. The next day, when using the work notebook, I wonder where the code from the previous day has disappeared.

Of course, I can solve it by connecting to my home Raspberry Pi through SSH, waking the desktop computer over LAN from it, connecting to it using Remote Desktop to do the &#8216;git push&#8217; .. not really a simple solution, there must be a better way.

<!--more-->

So I came up with a really simple PowerShell script to iterate to a directory with git projects and execute &#8216;git push&#8217; on all of them

{{< gist 275a76230757dcd48576>}}

To make the script execute on each computer shutdown, run **gpedit.msc** and go to **Computer Configuration** | **Windows Settings** | **Scripts (Startup/Shutdown)** | **Shutdown** and add the script. Adding the script just by referencing the .ps1 file did not work for me, I had to add the path to PowerShell (%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe) with the script as a parameter.
