+++
Categories = [ "WPF", "NSIS", "Squirrel" ]
Description = "Currently working on a WPF app as a side project I came upon and interesting requirement regarding installation and deployment of the application. As a result I ended with some Squirrel and NSIS knowledge I would like to share."
Tags = [ "WPF", "NSIS", "Squirrel"]
Keywords = [ "WPF", "NSIS", "Squirrel"]
author = "Igor Kulman"
date = "2016-06-22T09:29:12+01:00"
title = "Application deployment with NSIS and Squirrel"
url = "/application-deployment-with-nsis-and-squirrel"

+++

Currently working on a WPF app as a side project I came upon and interesting requirement regarding installation and deployment of the application. As a result I ended with some Squirrel and NSIS knowledge I would like to share.

<!--more-->

**Requirements**

The client came with a specific set of requirement for the installer

- Check for .NET 4.5.2 and offer installation if not present
- Install the application for all users (Program Files)
- Install a hardware driver as part of the install process
- Create desktop and start menu shortcuts
- Create an uninstaller
- Set the application to start after boot / logon

and the update process

- a Check for updates button in the app
- automatically and installing a newer version if available
- periodically checking for updates and installing them silently when app is minimized to tray

**Squirrel**

As you may have noticed, most .NET apps nowdays use [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows). The problem with Squirrel is that it cannot install a hardware driver as part of the installation process and it typically install applications to the users profile. But Squirrel is a good choice for the applictaion update requirements, so we decided to combine it with a classic installer.

**NSIS**

We came up with an idea to combine Squirrel with [NSIS](http://nsis.sourceforge.net/Main_Page). We chose NSIS because it seemed reasonable. I think it is the best of bad choices. The documentation is not very good, especially when using MUI to create a GUI with some meaningful texts and branding.

The idea was to create a NSIS installer that install the hardware driver and a Squirrel app packages and make the updates work after such installation.

**Solution**

The final solution consisted of multiple things combined together. We added Squirrel to the build process of the app, so each build in Release created a Squirrel install package. Then we created the NSIS installer that

- Checks for .NET 4.5.2 presence (using the [NsisDotNetChecker plugin](https://github.com/ReVolly/NsisDotNetChecker))
- Copies and installs the hardware driver (using a `/s` switch for instalaltion without a GUI)
- Installs the Squirrel package by unpacking it to the install directory in Program Files (using the [NsUnzip plugin](http://nsis.sourceforge.net/NsUnzip_plugin))
- Set appropriate permission for the install directory (using the [AccessControl plugin](http://nsis.sourceforge.net/AccessControl_plug-in))
- Copies Squirrel.exe as Update.exe to the install directory
- Creates shortcuts using the Update.exe instead of the app binary

To make Squirrel work in this scenario we also had to create a `SquirrelTemp` directory one level above the install directory and make it writeable. 

We also had to create a [custom update logic](https://gist.github.com/igorkulman/702be46eacba7bfe3f1444815aef645a) to check for new releases and restart the app with full path to correct exe file, but in the ends, it all works.
