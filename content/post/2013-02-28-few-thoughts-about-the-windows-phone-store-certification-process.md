---
title: Few thoughts about the Windows (Phone) Store certification process
author: Igor Kulman
layout: post
date: 2013-02-28
url: /few-thoughts-about-the-windows-phone-store-certification-process/
dsq_thread_id:
  - 1179172989
categories:
  - Windows Phone
tags:
  - Windows Phone
  - windows store
---
Passing the certification in Windows Phone Store and Windows Store can be a very painful process, but after a few tries you get enough experience to pass your apps on the first try. You may sometimes get a tester who is really dumb and fails your app for a made up reason but usually it is just enough to submit it again so another testers gets to test it. Lately I have been seeing a strange shift in the testing quality done in the certification process. 

**Windows Phone Store**

The certification process used to discover bugs I overlooked, so it was quite useful sometimes. But it is not anymore. Let me give you an example. I wanted to change one of my Windows Phone apps from free to paid with a 3 day trial. I have this functionality implemented in another of my apps so I simply copied the trial page, set is as the start page. I tested it in trial mode, it showed, in purchased mode, the app showed the real start page. I was under the impression that everything worked just fine.

The app update passed the certification process without problems although it had one serious flaw discovered by new users. When a user started the app in trial mode, the trial page was shown. The trial page consisted of two buttons. One button to buy the app and another button to continue the trial. The button to continue the trial made the app crash. It is definitely my fault for not testing it properly but what did the Microsoft tester do for 5 days that they did not discover this bug? They may have tested in in purchased mode only, but that does not make any sense. I am inclined to believe the did not test it at all, just held it for 5 days.

**Windows Store**

The certification requirements for Windows Store apps are more strict that the ones in the Windows Phone Store. The testers can fail you for reasons like &#8220;the app does not do anything useful&#8221;. And they sometimes do when they do not get what your app is supposed to do, usually when your app is not in English. The rule that the app should do something useful is a great rule in my opinion. But take a look at the Windows Store, there are tons of trashy apps that are not useful.

Another problematic rule is the rule that your app must be (or seem) finished, especially when you combine this rule with a dumb tester. I had problems with this rule with my tv guide app. It got rejected many times because the tester complained he could not watch tv using the app. I had to write a note explaining what a tv guide means and keep resubmitting it until I found an intelligent tester. 

On the other hand when I updated one Windows Store app and broke half the functionality in the process (I am not a very thorough tester) nobody complained and the app passed the certification process in a few hours.

My experience is that the certification process in both store works very strange. They fail you for made up reasons and pass your apps when they are broke. Maybe there is something broken with the process.