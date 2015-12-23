+++
title = "Implementing Google login in Universal Apps"
author = "Igor Kulman"
date = "2015-07-01"
url = "/implementing-google-login-in-universal-apps/"
categories = ["WinRT"]
tags = ["c#","Google","windows store","winrt","xaml"]
+++
In a recent project I had to implement Google login to an Universal App. I decided to use the native [WebAuthenticationBroker][1] control and the implementation was not as straightforward as I hoped. By implementing Google login I mean getting the authentication token that you can then use with your server API.

WebAuthenticationBroker is a good idea but it is implemented rather poorly. It works differently on Windows 8.1 and Windows Phone 8.1 due to the &#8220;AndContinue&#8221; pattern that Windows Phone 8.1 forces on you. You can solve this with [some ifdefs and platform specific code, as always][2].

The real problem s that the [MSDN sample][3] states it works with Google login but it does not. The sample thinks it gets the authentication token but it does not, it just gets the success code that you have to exchange for the authentication token yourself. 

<!--more-->

Lets start with a basic config

<script src="https://gist.github.com/igorkulman/65a406f7f3cff48be3c5.js?file=config.cs"></script>

The important things here are your Google app id and Google app secret. The GoogleStartUri also contains permissions that you want to get (profile, https://www.googleapis.com/auth/plus.login and https://www.googleapis.com/auth/plus.me email in my case).

You use this config with a WebAuthenticationBroker call

<script src="https://gist.github.com/igorkulman/65a406f7f3cff48be3c5.js?file=login.cs"></script>

on Windows 8.1 you get the response data immediately. On Windows Phone 8.1, you have to implement the &#8220;AndContinue&#8221; pattern. 

You use the response data to parse out the success code

<script src="https://gist.github.com/igorkulman/65a406f7f3cff48be3c5.js?file=GetGoogleSuccessCode.cs"></script>

Now that you have the success code, you can exchange it for the authentication token

And now you finally have a way to get the authentication token and implement Google login.

<script src="https://gist.github.com/igorkulman/65a406f7f3cff48be3c5.js?file=GetToken.cs"></script>

 [1]: https://msdn.microsoft.com/en-us/library/windows.security.authentication.web.webauthenticationbroker.aspx
 [2]: http://blog.kulman.sk/why-universal-apps-as-not-as-universal-as-you-may-think/
 [3]: https://code.msdn.microsoft.com/windowsapps/Web-Authentication-d0485122
