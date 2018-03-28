+++
Categories = ["Hardware"]
Description = "When I moved to a new apartment I had to decide where to put my quite old but still to my surprise regularly updated ASUS RT-N18U WiFi router. The obvious and easy choice was to put it in a box at the front door with electricity switches and the UTP cable from my ISP. But I was not sure this will result in a good WiFi signal strength on the balcony on the other side of the apartment. So I took some measurements."
Tags = ["Hardware"]
author = "Igor Kulman"
date = "2018-04-05T08:29:12+01:00"
title = "Mapping WiFi signal strength with NetSpot"
url = "/mapping-wifi-strength"
share_img = "/images/netspot1.png"

+++

When I moved to a new apartment I had to decide where to put my quite old but still to my surprise regularly updated ASUS RT-N18U WiFi router. The obvious and easy choice was to put it in a box at the front door with electricity switches and the Ethernet cable from my ISP. But I was not sure this will result in a good WiFi signal strength on the balcony on the other side of the apartment. 

Each room has an Ethernet socket so the alternative was to buy a good router without WiFi, put it in the the box and connect the WiFi router to it using Ethernet cable in one of the rooms just as a bridge. So I took some measurements. 

## NetSpot

There are many applications that can show you WiFi signal strength in any place of the apartment but only few of them can do real "mapping". I decided to try [NetSpot](https://www.netspotapp.com/). It is an application for Windows and macOS that promises real WiFi signal strength surveying. 

### Taking measurements

Doing a WiFi signal strength survey in NetSpot involves three simple steps. First you load your floor plan. It can be any bitmap image, I downloaded my from the website of the developer of the apartment building I live in. 

Then you need to tell NetSpot the scale of that floor plan. You do this by placing two points on the floor plan and setting a distance between them. I choose the width of one of the rooms as scale because I know exact dimensions of every room. But you can use anything, you can for example measure the width of a door in your apartment.

The final most important step is taking the WiFi signal strength measurements in multiple locations in the apartment. You position yourself somewhere in the apartment and click on that location on the floor plane in NetSpot. NetSpot takes a measurement and shows you what part of the floor plan is covered by this measurement. 

<!--more-->

{{% img-responsive "/images/netspot5.png" %}}

The you move to a next location in the apartment and repeat. You can any number of measurements you want, the more you take, the better. The basic idea is to take enough measurements to cover the whole area.

### Analyzing the results

After you take enough measurements it is time to analyze the results. By default NetSpot shows WiFi signal strength of all the detected WiFi networks, which is not that useful, you need to select just a single (your) WiFi network. The result may look like this

{{% img-responsive "/images/netspot1.png" %}}

It is basically what I expected. NetSpot even correctly detected the location of my WiFi router at the front door of the apartment. 

You can compare it with WiFi signal strength of your neighbors' networks reaching into your apartment

{{% img-responsive "/images/netspot2.png" %}}

If you click any point on the floor map you can see signal strength of all the detected WiFi networks

{{% img-responsive "/images/netspot3.png" %}}

### Conclusion

NetSpot is an interesting application that can map WiFi signal strength in your apartment in a few minutes. You can easily use it to find the best spot for your WiFi router if you have a choice in positioning it. 