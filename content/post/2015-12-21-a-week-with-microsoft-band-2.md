+++
Categories = [ "Micorosft Band", "iOS" ]
Description = "About a week ago I got a Microsoft Band 2. I really wanted to try out the device, because this second generation does not look as hideous as the first one, there are new sensors added and generally it should be a visible improvement over the original Band. I have been an iPhone users for about two years now (approximately the time since last good Windows Phone device was released), currently using iPhone 6s so I was also curious to know how well the Band 2 works with iOS. This blog post sums up my impressions after a week of using the Microsoft Band 2 with my iPhone."
Tags = []
author = "Igor Kulman"
date = "2015-12-21T09:29:12+01:00"
title = "A week with Microsoft Band 2"
url = "/a-week-with-microsoft-band-2"
publishdate = "2015-12-21T09:29:12+01:00"

+++

About a week ago I got a Microsoft Band 2. I really wanted to try out the device, because this second generation does not look as bad as the first one, there are new sensors added and generally it should be a visible improvement over the original Band. I have been an iPhone users for about two years now (approximately the time since last good Windows Phone device was released), currently using iPhone 6s so I was also curious to know how well the Band 2 works with iOS. This blog post sums up my impressions after a week of using the Microsoft Band 2 with my iPhone.

**Expectations and habits**

First I have to state that I am not a notifications junkie. I do not like being interrupted all the time. On my phone, only phone calls and SMS ale allowed to notify me with a sound and stay in the notifications center. Other few selected apps like Outlook, Twitter, Messenger, Sunrise are allowed to use iOS badges on my phone, just to let me know that there is a Twitter message or something I may be interested in. Other than that, no notifications for me. I guess I am not a typical user when it comes to notifications.

As you may have already guessed, I was interested in the Microsoft Band 2 primarily as a health device, not as a smartwatch or distractions device. My expectation and goal is to move and exercise more and sleep better, not to immediately know about every new Facebook post (I do not even have the Facebook app installed).

<!--more-->

**Look and feel**

I always thought the first Microsoft Band was big, bulky and did not look very good. The Band 2 is nicer, the area around the display is not as bulky, the main mass of the device was moved to the other side. This makes you wear the device with the display inside your wrist, "military style", the opposite of how you usually wear a watch. Event the guy in a video ad I saw wore it this way. 

Wearing the band on the inside allows a nice feature, turning the watch face on when you flip your wrist. This can save you precious battery compared to having the watch faces always visible, until you realize you turn your wrist a lot during the day, for example while eating. The band is made of rubber and it scratches quite easily. The scratches are visible when you look at the band from up close.

The device feels solid, I did not feel uncomfortable wearing. I though using the keyboard while wearing it maybe be a problem and it partially was. I could use the keyboard while using my desktop computer, but I had to be careful not to scratch the display on the edge when using my Thinkpad notebook. Using the Thinkpad while wearing the Band was not really comfortable, I had to position my hands differently that I am used to.

**Initial setup**

After I installed the Microsoft Health app for iOS on my phone, the pairing was quick without any problems. The app installed a firmware updated to the Band 2 while pairing. The next day the Microsoft Health app was updated and it updated the firmware in the Band 2 again. This time  the firmware update brought two new functions: controlling the music playback and inactivity reminder. I do not much care about the music controls, I can pause my podcasts using the button on my headphones. Inactivity reminder is a great feature, reminding you to wake up and take a few steps when sitting idle for a long time. I really do not know why this function was not in the Band from the beginning. 

<img src="/images/BandSetup.png" class="pure-img-width">
<img src="/images/BandUI2.png" class="pure-img-width">

**Microsoft Health and Health Dashboard**

Microsoft Health is the app you use to configure and manage your Band. It has a "windowsy" look and feel event on iOS (including messed up margins on some screens). It can import data from the iOS Health app, so it can show you number of steps that the iPhone records. But it cannot export the data back to iOS Health. This means that data like the data about your sleep can be accessed only from the Microsoft Health app and are not propagated to other iOS app that can import data from iOS Health. 

<img src="/images/BandDashboard1.png" class="pure-img">

You can connect the Microsoft Health app to the Microsoft Health Vault, which has a nice web dashboard. This dashboard is more detailed and more simple to use that the app in the phone. But you have to be ok with your data being exported to some Microsoft data center. If you choose to use the Health Vault you can compare your data to groups of other people. I do not know about any other platforms that allows you to do this. And it is always nice to compare your data to people of similar age, height and weight and see that you condition is not as bad as you may have thought. 

<img src="/images/BandDashboard2.png" class="pure-img">

**Apps and Web Tiles**

There are not many 3rd party iOS apps, except big fitness apps like Strava, that can use the Band, but this is not a surprise. Band apps are maybe the only platform where Windows Phone has an advantage. Also there are not so many Web Tiles available, except for a couple of sports tiles made by the Bing team. 

So I decided to write [my own tile, showing the schedule of three Czech cinemas](mshealth-webtile://?action=download-manifest&url=https://dl.dropboxusercontent.com/u/73642/kinoklub.webtile). The documentation for the Web Tiles is short and concise, the samples are ok, but there is no way to test your tiles other than deploying them to the real device. No data validity checker, no emulator and no good error messages. If you make a mistake, any mistake, be it an icon with wrong dimensions or invalid JSON manifest, the Microsoft Health app just gives you a generic error when trying to deploy the app to the Band.

**Steps and Sleep tracking**

The Band counts your steps, distance traveled, floors climbed and checks your heart rate while at it. If you go for a run you can enable GPS and track your route.

<img src="/images/BandSteps.png" class="pure-img-width">
<img src="/images/BandGPS.png" class="pure-img-width">

I could not have the Band on me while going to my Wing Chun practice. It would get destroyed. No similar devices are meant to be used when doing martial arts. It is a shame, I would be really interested to see my heart rate history doing the practice. 

The best feature for me was the already mentioned inactivity timer. I left it on the default setting, reminding me to wake up and take some steps after an hour of sitting at the computer. 

Sleep tracking is the feature I was looking forward to the most. The Band track the time it takes you to fall asleep, the length and quality of your sleep (deep and light sleep cycles), the number of times you wake up and your heart rate. It can function as an alarm, waking you up in the morning by vibrating on your wrist. The alarm can be set to a specific time or you can use the smart alarm feature. The smart alarm monitors your sleep cycle and always wakes you up in a light sleep phase, up to 30 minutes before the time you set. For me it basically meant getting up 30 minutes earlier every day.

<img src="/images/BandSleep1.png" class="pure-img-width">
<img src="/images/BandSleep2.png" class="pure-img-width">

**Notifications**

I set the Band to show me notifications for incoming calls and SMS, nothing more. When a notification is invoked, the Band vibrates. The default medium intensity is not very intense, so I had to set it to high to be aware of it. When you receive a SMS, the band can "read" it to you by showing it on the screen quickly, so you do not have to scroll. 

I did not bother to set up notifications for other apps. But the Microsoft Health app also offered me notifications for Calendar, Facebook, Facebook Messenger, Twitter and a generic one called Notifications Center. 

<img src="/images/BandUI1.png" class="pure-img-width">

**Battery usage**

The Microsoft Band 2 will stay charged for 2 days when not using the GPS. It is long as typical smartwatches, but if you are used to classical watches like I am, it is a very short time. It means another device to check status and charge. The Band will tell you to charge it long in advance. One day, I got a message to charge it at about 1 PM. By the time I got home after 6 PM the band battery indicator was red, but the Band was still working. 

The Band charges really slow, compared to a phone or basically any other device. It wants you to think the process is faster, adding a percentage points every minute but then it gets stuck at 99% for about 40 minutes. You will always need at least two hours to charge it.

**Annoyances**

All the notifications and all the data are take from the phone and not really configurable. There is one thing that got me really annoyed when I discovered it. The iOS calendar app creates a calendar of peoples' birthdays. I have this calendar turned of in the iOS Calendar app and also in Sunrise, my calendar app of choice. But the Band does not respect this settings and also there is not configuration possible. So your calendar gets littered with birthdays and possible birthday notifications and there is nothing that you can do about it. Except disabling the calendar functionality on the Band. I know, I contacted Microsoft support (half an hour with probably an Indian guy, no solution, just my heart rate rising - Band told me).

Another annoyance is also related to notifications. If you turn on the Band, open a tile or go to some menu, turn off the Band, go on with your day and a notification approves, guess what happens? The Band vibrates, you turn it on and you are still in the last menu or tile and have no idea, what the notification was about. 

If you switch your phone to a do not disturb mode, the Band completely ignores it and still notifies you about event, although your phone does not. You have to Switch the Band to a do not disturb mode separately every time. 

**Problems**

The one problem with the Band I had was the broken UV sensor. I could not immediately exchange the Band for a new one because I live in a country where the Bands is not sold and supported. It looks like [broken UV sensor is a common problem on both Band and Band 2](https://answers.microsoft.com/en-us/band/forum/msband-band_hardware/microsoft-band-uv-sensor-does-not-seem-to-work/97a7c92c-f135-48cd-8945-3781434d309c). If you can buy it in a Microsoft Store (I was not), try if the UV sensor works, it may not.

I called my local Microsoft technical support and the operator did not even know what Microsoft Band 2 was! After a while, maybe binging the name, she told me to get lost because they do not support it. Nice customer service as always, Microsoft Czech Republic. So I tried the UK support web page. I tried for three days and I always got the same response, telling me that they are busy chatting with someone else and that I can give them a UK phone number and they will call me back. Of course I do nod have a UK phone number. My next step will be contacting the US support after  see how that goes ...

**Conclusion**

The Microsoft Band 2 is a great health device. If you expectation are similar than mine than by all means get one. If you live in the US, go buy it to a Microsoft Store and test if everything works as supposed to. It may not. If you live outside the US, be aware that you may be on your own when something goes wrong. If you want a smartwatch or a device to keep track of notification, the Band is not for you. 

**Update**: I finally manage to chat with the UK support. I got a UPS label and sent the Band to Germany for repairs. After 6 work days I got a new Band.