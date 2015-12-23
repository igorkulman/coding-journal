+++
title = "Tampering with Windows Store apps data"
author = "Igor Kulman"
date = "2012-11-13"
url = "/tampering-with-windows-store-apps-data/"
categories = ["WinRT"]
tags = ["security","winrt"]
+++
Windows Store apps run in a sandbox with their data isolated from each other. So how secure is this storage from tampering by the user? It turns out not much. 

The only Windows Store app I use on my work notebook is WeatherFlow because of the live tile. The app allows you to add your city and view weather forecast for it. But there is now way to get rid of the default cities like New York, Tokyo, etc. that are in the app when you first run it. This realy annoyed me so I started to poke around. 

Using the debugger and checking the value of ApplicationData.Current.LocalFolder I found out that all the data of Windows Store apps are stored in AppData\Local\Packages in your profile (for me it is C:\Users\Igor\AppData\Local\Packages). The name of the directory for the app you are lookin for usualy contain its name, it is 08C8076A.WeatherFlow_gyyqpbm0tqk6g for WeatherFlow. The directory for each app contains a few subdirectories

<!--more-->

AC
  
LocalState
  
RoamingState
  
Settings
  
SystemAppData
  
TempState

The important directories are LocalState and RoamingState representing the local and roaming folder, where each application can store its files. WeatherFlow uses only LocalState where it stores one data.json file with its configuration. You can edit the file and remove the unwanted city, then run the application again and it still works, with the changes you made. 

Now imaging editing files of a game, giving yourself gold coins or armor, or copying files somewhere else, sharing &#8230; If you want the data of your Windows Store app to be secured, you have to do it by yourself.
