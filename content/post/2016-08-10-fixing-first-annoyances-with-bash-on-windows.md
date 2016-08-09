+++
Categories = [ "Windows", "Bash", "Linux" ]
Description = "When you enable the Linux Subsystem on Windows in the Windows 10 Anniversary Update so you can use Bash and all the GNU utilities, you may encounter a few annoyances like strange error messages, wrong language settings, etc. Here is how to fix the ones I encountered."
Tags = []
author = "Igor Kulman"
date = "2016-08-10T09:29:12+01:00"
title = "Fixing first annoyances with Bash on Windows"
url = "/fixing-first-annoyances-with-bash-on-windows"

+++

When you enable the Linux Subsystem on Windows in the Windows 10 Anniversary Update so you can use Bash and all the GNU utilities, you may encounter a few annoyances like strange error messages, wrong language settings, etc. Here is how to fix the ones I encountered.

<!--more -->

**Adding Bash to cmder**

If you use [cmder](http://cmder.net/), you can add a new Bash task like this.

{{% img-responsive "/images/bash-cmder.png" %}}

If you do not use cmder, you should. It is a nice terminal app, enables copy and paste and editors like `vim` and `nano` work with it in Bash unlike when using the bash.exe directly.

**Changing language to English**

When I installed the Linux Subsystem on Windows I was quite surprised that it spoke to me in Slovak. I have my display language set to English in Windows 10, only my locale is Slovak. To fix this and make it talk English to you just run 

<script src="https://gist.github.com/igorkulman/8ad13c532296b721d50a1898745e40d1.js?file=english.sh"></script>

**Fixing unable to resolve host MACHINENAME**

When you try some command that works with the Internet you may get an `unable to resolve host MACHINENAME` error message where `MACHINENAME` is the name of your computer. I do not know why this happens but you can fix it by editing `/etc/hosts` and adding your `MACHINENAME` to 127.0.0.1

<script src="https://gist.github.com/igorkulman/8ad13c532296b721d50a1898745e40d1.js?file=hosts.txt"></script>

**Using ping**

When you try `ping` you will get and error message saying `ping: icmp open socket: Socket type not supported`. The only way can can get ping to work is to run bash.exe as Administrator. This is strange, but seems to be [limitation of the Windows TCP/IP stack](https://github.com/Microsoft/BashOnWindows/issues/18#issuecomment-222026969).

**Resetting the Linux Subsystem on Windows**

When everything fails, open the command prompt as Administrator and use 

<script src="https://gist.github.com/igorkulman/8ad13c532296b721d50a1898745e40d1.js?file=install.cmd"></script>

to completely uninstall the Linux Subsystem on Windows. Just to be sure, you may also want to remove the `%localappdata%\Lxss` directory. You can install the Linux Subsystem on Windows back using

<script src="https://gist.github.com/igorkulman/8ad13c532296b721d50a1898745e40d1.js?file=uninstall.cmd"></script>