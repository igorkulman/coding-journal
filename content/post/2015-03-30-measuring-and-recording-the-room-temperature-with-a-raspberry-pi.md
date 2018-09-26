+++
title = "Measuring and recording the room temperature with a Raspberry Pi"
author = "Igor Kulman"
date = "2015-03-30"
url = "/measuring-and-recording-the-room-temperature-with-a-raspberry-pi/"
categories = ["Raspberry Pi"]
tags = ["IoT","Raspberry Pi"]
keywords = ["IoT","Raspberry Pi", "Python"]
+++
The Raspberry Pi is a small embedded computing device that you can use for [many different software and hardware projects][1]. One of the first projects I did with the Pi was turning it into a device that would measure, record and display the room temperature.

**Hadrware**

To make the project, you will of course need a Raspberry Pi. I use my old Raspberry Pi model B, any newer one would also work. You also need a DS18B20 temperature sensor and a RRU 4K7 resistor. You can buy the separately, or you can buy the [Raspberry Pi YouTube Workshop Kit][2] that also contains both parts. 

To connect the temperature sensor to the Pi, I suggest you follow the [YouTube tutorial for the kit][3]. You can also solder the temperature sensor and the resistor into one piece and connect it to the Pi using [this schema][4], so the result then looks like this

<!--more-->

{{% img-responsive "/images/pitherm.jpg" %}}

**Drivers**

The advantage of using the DS18B20 temperature sensor is that Raspbian and all the other Raspbian based Linux distors for the Pi contain drivers for it. There are two drivers that you need to load to make it work, the w1-gpio and the w1-therm. You can load them using

{{< highlight sh >}}
sudo modprobe w1-gpio  
sudo modprobe w1-therm
{{< / highlight >}}

or just add them to /etc/modules so they autoload with each boot of the Pi. 

When the temperature sensor is connected and both drivers are loaded, a new device will appear in /sys/bus/w1/devices/. On my Pi, it is 28-000004e23e98, execute

{{< highlight sh >}}
ls /sys/bus/w1/devices/
{{< / highlight >}}

to find the id on yours.

**Software**

I am a .NET developer but running Mono on the Pi just seems strange to me, so I decided to use Node.js to create the UI. You can find the [whole project on Github][6]. It is a simple Node.js server that gets the temperature and shows it.

{{% img-responsive "/images/pi-ui.png" %}}

Getting the temperature is a matter of a simple cat command to the right place

{{< highlight sh >}}
cat /sys/bus/w1/devices/28-000004e23e98
{{< / highlight >}}

and parsing the result. 

I decided to use SQLite for storing the data and create a simple endpoint that gets the current temperature and stores it in the database. I recommend using cron to call the endpoint with the periodicity you want. 

You can then use the /history endpoint to get the temperature stats.

{{% img-responsive "/images/pi-history.png" %}}

You can get, download, fork the whole project from <https://github.com/igorkulman/rpi-thermometer>.

{{% github-repo "igorkulman/rpi-thermometer" %}}

 [1]: http://blog.kulman.sk/my-year-with-the-raspberry-pi-and-what-i-used-it-for/ "My year with the Raspberry Pi and what I used it for"
 [2]: https://www.modmypi.com/raspberry-pi/set-up-kits/project-kits/raspberry-pi-youtube-workshop-kit
 [3]: https://www.youtube.com/watch?v=S2v1VNgHnvI
 [4]: http://www.astromik.org/raspi/sch-2tep.gif
 [5]: https://camo.githubusercontent.com/b70c9e166c6f40e8c594b7dbe0c487eb08c811b8/687474703a2f2f7777772e6b756c6d616e2e736b2f646174612f636f6e74656e742f696e7365745f696d616765732f706167652f72706974656d702e6a7067
 [6]: https://github.com/igorkulman/rpi-thermometer
 [7]: https://camo.githubusercontent.com/3f433ca0c3a765a0885581e01fe7f11e5aa48727/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f752f37333634322f61727469636c65732f7270692e706e67
 [8]: https://camo.githubusercontent.com/e34f5c0247b592e874f2864e75e184570b181993/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f752f37333634322f61727469636c65732f72706974656d702e706e67
