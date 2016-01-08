+++
title = "Updating Azure Toolkit is always a pain"
author = "Igor Kulman"
date = "2012-10-26"
url = "/updating-azure-toolkit-is-always-a-pain/"
categories = ["Windows Azure"]
tags = ["azure","visual studio"]
+++
From time to time I need to develop or maintain a small Windows Azure project. This time I wanted to create the whole project in F#. The first thing I needed to to was to update the Azure toolkit 1.8 (October 2012) but updating Azure Toolkit is always a pain. I started Web Platform Installer, selected Azure Toolkit 1.8, Azure Tools 1.8 for VS2012 and installed everything including the dependencies. What was the result? The whole Azure integration in Visual Studio 2012 stopped working. The Azure templates completely disappeared and Visual Studio only offered me downloading the Azure Toolkit, which failed, because it was already installed. I ended up completely uninstalling everything with the name containing Azure and installing the Azure toolkit again using the link from Visual Studio.

Why cannot this work better?

<!--more-->
