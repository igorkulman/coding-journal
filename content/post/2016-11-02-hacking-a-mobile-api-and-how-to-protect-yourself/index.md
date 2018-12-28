+++
Categories = [ "Security", "Mobile"]
Description = "Sometimes when I use a mobile app that provides data that I find useful my curiosity awakens and I ask myself a question: how does the communication work and how hard would it be to break their security and access the data outside of the app? Mobile apps I have encountered are generally not very well secured and stealing their data is not much of a challenge. But what can the authors of the app do about it? "
Tags = ["Security", "Mobile"]
Keywords = ["Security", "Mobile", "Sniffer"]
author = "Igor Kulman"
date = "2016-11-02T09:29:12+01:00"
title = "Hacking a mobile API and how to protect yourself"
url = "/hacking-a-mobile-api-and-how-to-protect-yourself"

+++

Sometimes when I use a mobile app that provides data that I find useful my curiosity awakens and I ask myself a question: how does the communication work and how hard would it be to break their security and access the data outside of the app? Mobile apps I have encountered are generally not very well secured and stealing their data is not much of a challenge. But what can the authors of the app do about it? 

Lets take an app and an API and walk through the process. The model app is an app I tried last week and provides TV schedules for many local stations, so data that someone might be interested in stealing. 

<!--more-->

## Attack basics: sniffing the traffic

The first thing I always do is sniffing the communication between the app and the server using a proxy server installed on my computer. I use [Fiddler](http://www.telerik.com/fiddler) but there are many other tools you can use like [Charles](https://www.charlesproxy.com/) or [mitmproxy](https://mitmproxy.org/). I set the proxy server on the phone to the IP address of the computer (they have to be on the same network) and all the packets from the phone now flow through the computer. A classic [man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). 

If the app uses HTTP for communication, I can clearly see the data being exchanged. If the app does not use any other kind of security (they rarely do) this is usually it. **Always use HTTPS instead of HTTP**. It is really easy in 2016.

The app in our example uses HTTPS so I have to try harder. Luckily Fiddler allows you to capture and decrypt HTTPS traffic. You just need open the browser on your device, go to the IP address of the proxy and install the Fiddler certificate. It does not matter that the app in our example uses HTTPS, I can now see the traffic because it does not check for the correct certificate. **When using HTTPS always do SSL pinning**. [SSL pinning](https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning) will enable your app to detect scenarios like this and refuse the connection when the certificate is not the one you expect. 

If the app uses HTTPS and does SSL pining there is nothing more I can do with sniffing the traffic. I usually give up because it is not worth my effort. 

The app in our example does not do SSL pinning but I noticed it uses a security token in the header of every request. I can clearly see how to get the server secret and the refresh token, how to use the refresh token but I do not know how to create the security token for every request form the server secret. **Do not rely only on HTTPS, always use another mechanism to authenticate the app when not doing SSL pinning**. But you should really do SSL pinning. 

## Weak link: Android app

To proceed I need to attack the app itself to find out how the app creates the security token. There is no easy way to attack the iOS app I used with the proxy but attacking the Android app is usually much easier (if it exists). So I google the name of the app plus "APK" and find it. The APK is just a zip file with the compiled Java code that you need to decompile. You usually do not need any special tools for this, just google an [online tool for APK decompilation](http://www.javadecompilers.com/apk).

Finding a method that creates the security token in decompiled Java code is easy when the app is not obfuscated. You just need to do some text search in the Java files. **Always obfuscate your code** to make this harder. On Android you can also **use NDK to protect sensitive parts of the code**. Also do not use something predictable like `md5(server secret + device id)`. 

## Conclusion

Securing your mobile app and the API it uses is not easy and there is frankly not much you can do to protect against a really good attacker, especially when you have an Android app. The attacker can always get the APK, modify it and remove SSL pinning to see the traffic. Or they can create their own VM and run your app in it to see what code it executes. But **security is not absolute**, it always depends on your thread model. If you follow my advices, you can make the attackers lives hard so they would not find it feasible to try to break your app security. 
