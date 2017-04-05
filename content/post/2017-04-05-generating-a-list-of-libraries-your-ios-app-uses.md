+++
Categories = [ "iOS"]
Description = ""
Tags = ["iOS", "Carthage"]
author = "Igor Kulman"
date = "2017-04-05T09:29:12+01:00"
title = "Generating a list of libraries your iOS app uses"
url = "/generating-a-list-of-libraries-your-ios-app-uses"
draft = true

+++

If you work on an iOS app that is a bit more corporate you probably need to show the list of all the libraries you use with their licenses somewhere in the app. Creating and updating this list by hand is a pain. If you use Carthage to manage all your dependencies ([and you really should](http://drekka.ghost.io/cocoapods-vs-carthage/)) there is a handy [script by Piet Brauer](https://github.com/pietbrauer/CarthageLicenseScript) I contributed to that will help you. 

When you run the script using `$ ./PATH_TO_YOUR_SCRIPT/fetch_licenses.swift Cartfile.resolved  OUTPUT_DIR` it reads your Carthage file, gets all the libraries you use, downloads their licenses and stores them all in a single `plist` file. The `plist` file contains the name, license name and full license content for every library in your Carthage file. 

There is currently no support for using multiple Carthage files (when you have more projects in your workspace), you need to generate the `plist` file for each of them separately and then merge them manually. But you can set up a `bash` script to do it for you. 

<!--more-->

You can then read the `plist` file in your app and show it as a list of libraries like I do