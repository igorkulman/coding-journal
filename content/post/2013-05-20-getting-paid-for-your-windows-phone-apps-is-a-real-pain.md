---
title: Windows Phone Store and problems with payments
author: Igor Kulman
layout: post
date: 2013-05-20
url: /getting-paid-for-your-windows-phone-apps-is-a-real-pain/
dsq_thread_id:
  - 1401926592
categories:
  - Windows Phone
tags:
  - 'c#'
  - Windows Phone
---
I have been a Windows Phone developer for over a year now and my paid apps made me some money. The small amount of money made is not interesting, more interesting is that getting the money from Microsoft has been a real pain. Maybe because I live **outside the US**, maybe it is a geographically independent problem. If you are a developer and live outside the US, I really want to hear your experience.

**No exact info about payment rules?**

First, there is no exact information about how often a developer gets paid. The [getting paid section][1] in the Windows Phone Dev Center only informs you about tax and bank info, that you need to provide to get paid. I remember that I once heard that developers get paid when their earnings get pass $200, but I was not able to get any official info about this. The first payment I got from Windows Phone Store was $52.50 and I know a developer with $900 earned and no money sent to him, so I guess the $200 limit is not true.

The [$200 limit should be true for Windows Store][2], but Windows Phone Store is a different store with different rules.

<!--more-->

**No info about pending payments**

Suppose the $200 limit is true. (Windows Store states: &#8220;To get paid from the Windows Store, you must have at least $200 in app sales pending payment&#8221;) It would be really useful to know how much money your apps have made in total and from the last payout, or in other words, the pending payments. Microsoft does not provide such info. Even the support is not able (or willing) to tell you this info.

The only info you get is the number of paid downloads of your apps. You need to multiple this per-app numbers by the price of your apps and subtract the 30% cut that Microsoft keeps for themselves. If you changed the price of your apps at some point, or have different pricing for different countries, the math becomes really overwhelming.

**Distimo to the rescue?**

[Distimo][3] is a great app analytics service that supports Windows Phone Store. You give it your credentials and it downloads and displays all the data from Windows Phone Store for you. And guess what, it can display the amount of money you made. I do not know how they do it. Maybe they use the exports that Windows Phone Store offers, but when I try to download them, they are always empty. Maybe they just do the math I mentioned&#8230; Anyway, it really sucks that you have to use a 3rd party tool to get the info that Microsoft has and should provide to a developer.

**Really getting paid**

Only my first payment of the strange $52.50 was automatic. When my next earnings according to my calculations crossed the limit of $200 (or $252.50 taking the $52.50 payment into account), I was expecting to get paid. The payment did not come for months. I asked my local Microsoft branch for more info, but I did not get any useful answers. So I tried another tactic.

I made a bit of a fuss about this issue on Twitter, where many developers from my country joined with their complaints about being in the same situation, mentioning our local Microsoft evangelist in their tweets. In two weeks, we all got our payments from Microsoft (coincidence?).

The payment did not come in $ but in CZK. Its value was approximately $240. The Windows Phone Store now shows me I received two payments in two different currencies and in some statistics adds the two payments up as they were both in CZK ($52.50 + 4,806.88 CZK = 4859.38 CZK in their world).

**Answers from Microsoft**

I contacted my local Microsoft branch and sent the following **questions**to two evangelists, hoping to get answers for me and other developers:

When does a developer get paid from Windows Phone Store? Is there any limit that needs to be crossed (like $200 in Windows Store)?

Are these getting paid rules officialy stated anywhere? The [MSDN page][1] does not contain any useful info.

Is there a way to know how much I have made in total / since last payout? I mean other way that doing the math from app downloads and prices. (A fellow developer told me that even your support does not know / want to give the info.)

Are payments automatic? (If there are exact rules)

To get my last payment I needed to contact out local MS branch, do I need to do it every time I feel I made $200 since my last payment (which is now)? 

I got the following **answers** (after involving other developers and putting some pressure on them):

7b of the APA: Application Proceeds will be calculated on a monthly basis by deducting the Store Fee from Net Receipts for the applicable month. If total Application Proceeds payable to you for a month exceed USD$200 (or its equivalent in local currency), then Microsoft will remit payment to you in
  
accordance with this Section 7.

Can you clarify what you mean by rules? As long as a dev has over $200, and has valid bank & tax, then they will be attempted in payout.

Currently we do not have a report that provides the total of the settled transactions for a developer.

Payments are automatically attempted once the developer reaches the threshold

No, payments are automatically attempted once the developer reaches the threshold

**Conclusion**

Microsoft confirmed the $200 limit for getting paid altough my experience does not corespond to this statement. I still wonder why this information is not available somewhere on AppHub or MSDN. They sent me a file called Windows-Phone-Store-Application-Provider-Agreement.pdf but I was not able to find any reference to it anywhere, just the whole file at a [strange url][4]. Having this crucial info hidden in a PDF file where no developer can ever find it does not seem ok to me. The whole payments process does not look very transparent. 

They also confirmed that there is no way to know how much money you made, so you have to rely on Distimo. They assured me that my next payment will be automatic, so I guess I just have to wait and see &#8230;

 [1]: http://msdn.microsoft.com/en-us/library/windowsphone/help/jj206722(v=vs.105).aspx
 [2]: http://msdn.microsoft.com/en-us/library/windows/apps/jj193593.aspx
 [3]: http://www.distimo.com/
 [4]: http://cmsresources.windowsphone.com/devcenter/en-us/legal/Windows-Phone-Store-Application-Provider-Agreement.pdf