+++
Categories = [ "Windows Phone", "HockeyApp", "Windows Store" ]
Description = "Distributing Windows Phone apps to testers has always been a pain. The Private Beta in the Windows Store intended for this is not very flexible and it got much worse with Windows 10 (generating promotional code that can take up to 24 hours). One of the better ways to solve the beta build distribution is using a service like [Hockey App](http://hockeyapp.net/), that Microsoft recently acquired. To be able to use Hockey App (or any other service) you need to buy a $299 certificate from Symantec. You then use the certificate to sign the XAP or APPX files of your app. Those signed binaries can be than installed on devices with the correct application enrollment token directly from Hockey App, bypassing the Windows Store."
Tags = [ "Windows Phone", "HockeyApp", "Windows Store"]
Keywords = ["Windows Phone", "Windows Store", "HockeyApp"]
author = "Igor Kulman"
date = "2016-02-16T09:29:12+01:00"
title = "Using Hockey App to distribute Windows Phone apps"
url = "/using-hockey-app-to-distribute-windows-phone-apps"

+++

Distributing Windows Phone apps to testers has always been a pain. The Private Beta in the Windows Store intended for this is not very flexible and it got much worse with Windows 10 (generating promotional code that can take up to 24 hours). 

One of the better ways to solve the beta build distribution is using a service like [Hockey App](http://hockeyapp.net/), that Microsoft recently acquired. To be able to use Hockey App (or any other service) you need to [buy a $299 certificate from Symantec](https://products.websecurity.symantec.com/orders/enrollment/microsoftCert.do). 

You then use the certificate to sign the XAP or APPX files of your app. Those signed binaries can be than installed on devices with the correct application enrollment token directly from Hockey App, bypassing the Windows Store. 

One of my clients got persuaded to try this approach after some problem with the Windows Store Private Beta and bough the certificate. It took a week for the purchase to go through and another week to finally get the certificate in the correct PFX format from Symantec.

<!--more-->

**Adding password to the PFX certificate**

The PFX certificate file I got had an empty password. This is quite a problem for all the Microsoft tools that work with certificates, especially for XapSignTool. I could not make the tools work with an empty password so I had to change the password first. This is done quite easily using using OpenSSL.

{{% gist id="24cb76710fc7d6c9f2cb" file="pwd.bat" %}}

**Generating application enrollment token**

To allow the devices to install the signed XAP (or APPX) you need to generate an application enrollment token that will be installed on the devices. The process is quite simple, just call 

{{% gist id="24cb76710fc7d6c9f2cb" file="aet.bat" %}}

as a result you will get three files: AET.aet, AET.aetx, AET.xml. Get the AET.aetx file and upload it to Hockey App by clicking Add version and drag and dropping the file to the upload dialog. The company profile for your app in Hockey App will get updated using this file. This is done only once.

**Signing the binary**

Each time you submit a new build to Hockey App, you need to sign the binary (XAP in my case) with the certificate. The <a href="https://msdn.microsoft.com/en-us/library/windows/apps/dn168929(v=vs.105).aspx">signing process differs for XAP and APPX files</a>.

For XAP files it is just calling the right PowerShell script with the correct parameters

{{% gist id="24cb76710fc7d6c9f2cb" file="sign.bat" %}}

and the result is .. an error `Signtool Error: This file format cannot be signed because it is not recognized`. So I had to do some research. I found a [developer describing the same problem on StackOverflow](https://stackoverflow.com/questions/20970686/error-signing-windows-phone-xap-file-signtool-error-this-file-format-cannot). The solution was to install [Silverlight 5.1.30514.0](http://downloads.tomsguide.com/silverlight-microsoft,0301-10659.html). This was really strange, it is a Silverlight runtime not an SDK and it does not get installed with Visual Studio or the Windows Phone SDK.

**Distributing the app**

Once you upload a signed binary to Hockey App, your testers can download it using a web browser to their devices. Each device needs to install the company profile (the application enrollment token) once, and then can install the builds you provide.

Installation of the Windows Phone app builds is a bit strange, no install progress or success messages, the app just appears in the list ofter one or two minutes. But it works, and it is much faster and more flexible than the Private Beta provides by the Windows Store.