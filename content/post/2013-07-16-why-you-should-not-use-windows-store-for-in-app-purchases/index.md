+++
title = "Why you should not use Windows Store for in-app purchases"
author = "Igor Kulman"
date = "2013-07-16"
url = "/why-you-should-not-use-windows-store-for-in-app-purchases/"
categories = ["WinRT"]
tags = ["Csharp","Windows Store","WinRT"]
+++
I often wonder how can something as crucial as in-app purchases be so badly implemented in Windows Store. I really do not recommend anyone to use Windows Store&#8217;s built in in-app purchases. Use a third party provider or implement your own purchase mechanism, Microsoft is ok with that. You will be better of than using the built-in one. Here is why.

**Limited number of in-app purchases per app**

I previously wrote about the fact that [Windows Store limits the number of in-app purchases you can define for an app][1]. The current limit is 200. If you need more, say you sell a daily newspaper, you are out of luck and Windows Store&#8217;s in app-purchases are not for you.

<!--more-->

**Complicated receipt validation outside of .NET**

If you use in-app purchases you surely want to validate them on your server, especially considering the very weak security that Windows 8 offers to Windows Store apps. If you are not using .NET on your server, there is no guide on how to do it. Microsoft only offers a code sample in C#, nothing else. Good luck finding a solution for say PHP, I could not find any.

**Half-baked purchases restoration**

If a user uninstalls your app and installs it again you typically do not want him to need to buy everything again. You need a way to restore the purchases. If you do not use server-side receipt validation, it is trivial, even more trivial than cracking your application and getting everything for free. If you use server-side receipt validation, things get complicated.

Restoring purchases is typically done in a very simple way. You request all the receipts from the app store and send them to your server for validation. The server then enables the bought items for the user. I would not be Windows Store if there were no catch. 

The problem is that you can get the receipt just once, when the users makes the in-app purchase. There is no way to get the receipt at any later time. There is a method called [GetProductReceiptAsync][2] but it throws an NotImplementedException. Looks like Microsoft did not really think that anyone would want to restore purchases in combination with server-side validation (Typical use-case in say AppStore).

The only way to implement this is storing all the receipts on the server and sending the server receipt ids when restoring purchases. You can get the receipt ids from [GetAppReceiptAsync][3] after some XML parsing. Just make sure the receipt gets to the server after the purchase, because there is no way to get it again. 

**No sandbox for testing**

You cannot do any &#8220;real&#8221; testing with Windows Store. It does not provide any sanbox. The only way to test the in-app purchases is to use the primitive [CurrentAppSimulator][4] that can basically just simulate if the users cliked ok or cancel in the buy dialog or if there was an error. You cannot use it to test you server-side receipt validation.

There is no way to &#8220;pair&#8221; your app running form Visual Studio to you app defined in Windows Store for testing purposes. You really need to trust your implementation and you can test it only after the app is published and live in Windows Store.

 [1]: http://blog.kulman.sk/windows-store-limits-the-number-of-in-app-purchases-for-an-app/
 [2]: http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.store.currentapp.getproductreceiptasync.aspx
 [3]: http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.store.currentapp.getappreceiptasync.aspx
 [4]: http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.store.currentappsimulator
