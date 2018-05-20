+++
Categories = ["Swift", "iOS"]
Description = "When you have an iOS application running in production, you probably want to know if and why it crashes, so you can fix all your bugs as soon as possible. There are many good services like HockeyApp that can help you with that, but sometimes you are not allowed to use any 3rd party service for this. In this case you have to look for another solution how to get info about all your iOS application crashes and process it by yourself."
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS", "Logging", "Crash"]
author = "Igor Kulman"
date = "2018-02-28T09:29:12+01:00"
title = "Logging crashes in a Swift iOS application"
url = "/logging-ios-app-crashes"

+++

When you have an iOS application running in production, you probably want to know if and why it crashes, so you can fix all your bugs as soon as possible. 

There are many good services like [HockeyApp](https://www.hockeyapp.net/) that can help you with that, but sometimes you are not allowed to use any 3rd party service for this. In this case you have to look for another solution how to get info about all your iOS application crashes and process it by yourself.

## PLCrashReporter

Looking for a crash reporting solution I found [PLCrashReporter](https://www.plcrashreporter.org/). This library seems to be kind of a standard for crash reporting, used by the already mentioned HockeyApp and many others. 

It is a Objective-C framework with latest version from 2014, but it still works and you can use it in your Swift application.

### Installation

After downloading the latest PLCrashReporter and adding it to your project as a linked framework, you need to import it in bridging header

{{% gist id="608103ed0fa2138175e2cbae99d5cbf1" file="briding-header.h" %}}

### Usage

In the application I currently work on I use [CleanroomLogger](https://github.com/emaloney/CleanroomLogger) for all the logging, giving the user the ability to export all the logs and send them using the standard iOS share. 

<!--more-->

When the application crashes and is opened again, I want to get the crash report and log it. Your use case may be different, you may want to send the crash report to your server, etc.

{{% gist id="608103ed0fa2138175e2cbae99d5cbf1" file="AppDelegate-CrashReporting.swift" %}}