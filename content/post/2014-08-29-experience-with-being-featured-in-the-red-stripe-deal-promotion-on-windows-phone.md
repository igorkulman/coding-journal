---
title: Experience with being featured in the Red Stripe Deal promotion on Windows Phone
author: Igor Kulman
layout: post
date: 2014-08-29
url: /experience-with-being-featured-in-the-red-stripe-deal-promotion-on-windows-phone/
dsq_thread_id:
  - 2969995011
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
---
I was offered to to take part in the Red Stripe Deal promotion on Windows Phone with my [Shopping List Simple][1] app from 21st August to 28th August. 

{{% img-responsive "/images/sk.png" %}}

In this promotion, your app has to cost less than half of the normal price. The app normally costs 1.29 USD in most countries and 0.99 USD in Czech Republic, Slovakia and Russia to boost the sales. The minimum price in Windows Phone Store is 0.99 USD so the app had to be made free for the promotion. So I filled in the form saying that I want my app to be free in all the countries during the promotion. When the time of the promotion came, the price was set to free in all the countries except Czech Republic, Slovakia and Russia. First day, first problem.

<!--more-->

**Positives**

The promotion was a success with about 25 000 (free) downloads.

Another positive effect was that I got contacted by users offering translations of the app and acquired Turkish and Ukrainian translations. 

**Negatives**

As soon as the Red Stripe Deal promotion ended, I submitted a new version of the app with the two new translations &#8230; and the problems started. The users started to report that the update fails to install, usually with 80004005 as the error code. If you try to google this code, you find out it is too generic, ranging from Zune to XBOX and that no helpful info can be found about this error code. 

I contacted Microsoft support and they, as usual, were not helpful at all. They replied that everything is ok with the app, the error code indicates WiFi issues, so it is a problem on the users&#8217; end and that they should contact the support.

There was another problem. Users who got the app for free thanks to the Red Stripe Deal and uninstalled it, had to pay for when reinstalling. This really sucks and I am sure that in the past, when you got an app while it was free you never had to pay for it in the future. It looks like things changed, because I got this from Microsoft:

> <del datetime="2014-08-29T17:04:05+00:00">In regards to users having to pay for the app if they re-install it, this works as designed. If the app was free when it was downloaded and the price changes between the time the consumer re-installs they will be charged whatever the “New” price is.</del>

Looks like this was an misinformation from Microsoft, they corrected it:

> Let me correct myself. The only time I see the app being changed is when I use a device that is not tied to the live Id that I purchased it from. If I buy an app under myself@live.com and then login to another device using a different live Id I will have to pay for the app. If I use the same live Id I own the app and will not have to pay even if the price of the app has changed. You will also see a change for the app if I have loaded the app on the maximum number of devices allowed.

The other error code, that the users were experiencing, was c101a7d1. Microsoft support sent my a link to a [discussion suggesting users uninstall the app and install it again][3], meaning they would have to pay for it now (according to users who tried it), maybe all 25 000 of them! This is going to be a real blow to the reviews and ratings! And some people even thing I did it intentionally to make money!

**Conclusion**

So what did the Red Stripe Deal bring me? Many new users, but many of them angry about the update problems and need to buy the app when they uninstall it and it also made some of the &#8220;old&#8221; users angry about the update problem. Was it worth it? 

**Update**: Problem still not solved.

I told the users to contact Microsoft support as Microsoft support told me, but they report the support cannot / will not help them. The support guy I am in contact with did not want to believe this, so I had to ask one user for a screenshot of Microsoft support telling him they cannot help and send it to him. Did not help either.

 [1]: http://shoppinglist.kulman.sk/
 [3]: https://answers.microsoft.com/en-us/winphone/forum/wp7-sync/errors-of-c101a7d1-and-c101a006-on-windows-phone/822ec1be-9d07-4c0a-a4eb-7c6edf63e52d?page=2