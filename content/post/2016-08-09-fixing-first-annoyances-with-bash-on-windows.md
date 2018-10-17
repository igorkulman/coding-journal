+++
Categories = [ "Windows", "Bash", "Linux" ]
Description = "When you enable the Linux Subsystem on Windows in the Windows 10 Anniversary Update so you can use Bash and all the GNU utilities, you may encounter a few annoyances like strange error messages, wrong language settings, etc. Here is how to fix the ones I encountered."
Tags = ["Windows", "Bash", "Linux"]
Keywords = ["Windows", "Bash", "Linux"]
author = "Igor Kulman"
date = "2016-08-09T09:29:12+01:00"
title = "Fixing first annoyances with Bash on Windows"
url = "/fixing-first-annoyances-with-bash-on-windows"

+++

When you enable the Linux Subsystem on Windows in the Windows 10 Anniversary Update so you can use Bash and all the GNU utilities, you may encounter a few annoyances like strange error messages, wrong language settings, etc. Here is how to fix the ones I encountered.

**Adding Bash to cmder**

If you use [cmder](http://cmder.net/), you can add a new Bash task like this.

<!--more-->

{{% img-responsive "/images/bash-cmder.png" %}}

If you do not use cmder, you should. It is a nice terminal app, enables copy and paste and editors like `vim` and `nano` work with it in Bash unlike when using the bash.exe directly.

**Changing language to English**

When I installed the Linux Subsystem on Windows I was quite surprised that it spoke to me in Slovak. I have my display language set to English in Windows 10, only my locale is Slovak. To fix this and make it talk English to you just run 

{{< highlight sh >}}
sudo update-locale LANG=en_US.UTF8
{{< / highlight >}}

**Fixing unable to resolve host MACHINENAME**

When you try some command that works with the Internet you may get an `unable to resolve host MACHINENAME` error message where `MACHINENAME` is the name of your computer. I do not know why this happens but you can fix it by editing `/etc/hosts` and adding your `MACHINENAME` to 127.0.0.1

{{< highlight txt >}}
127.0.0.1        localhost MYMACHINE
{{< / highlight >}}

**Using ping**

When you try `ping` you will get and error message saying `ping: icmp open socket: Socket type not supported`. The only way can can get ping to work is to run bash.exe as Administrator. This is strange, but seems to be [limitation of the Windows TCP/IP stack](https://github.com/Microsoft/BashOnWindows/issues/18#issuecomment-222026969).

**Resetting the Linux Subsystem on Windows**

When everything fails, open the command prompt as Administrator and use 

{{< highlight cmd >}}
lxrun /uninstall /full
{{< / highlight >}}

to completely uninstall the Linux Subsystem on Windows. Just to be sure, you may also want to remove the `%localappdata%\Lxss` directory. You can install the Linux Subsystem on Windows back using

{{< highlight cmd >}}
lxrun /install
{{< / highlight >}}
