---
title: NancyFX authentication for REST API
author: Igor Kulman
layout: post
date: 2015-01-12
url: /nancyfx-authentication-for-rest-api/
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
dsq_thread_id:
  - 3413002742
categories:
  - Windows Azure
tags:
  - azure
  - 'c#'
  - NancyFX
  - security
---
NancyFX is a great .NET framework well suited for creating REST APIs. There are many ways how to approach authentication, the simplest one is the good old Forms Authentication. The idea of Forms Authentication is that the user logs in with a username and password and gets a cookie, the protected endpoints then check the cookie. NancyFX supports Forms Authentication with the [Nancy.Authentication.Forms][1] package. The [documentation describes how to use it on a web page][2], but to use it with a REST API a few changes are needed.

**Forms Authentication differences for REST API**

There are things you want to do differently in a REST API than on a web page. If a user tries to access a protected endpoint, the Forms Authentication on a normal web page redirects him to the login page. In REST API, you typically want the endpoint just to return HTTP 401, no redirects. Also, when a user successfully logs in, you just typically want to return HTTP 200, no redirects.

<!--more-->

**Disabling redirects**

Suppose you have Forms Authentication set up according to the documentation, with a IUserMapper and IUserIdentity implementation. Disabling the redirects is easy, just set a flag on the FormsAuthenticationConfiguration in your Bootstrapper:

<script src="https://gist.github.com/igorkulman/2430a948fe6c426cdd01.js?file=Bootstrapper.cs"></script>

**Changing Login and Logout methods**

The login implementation from the documentation uses the LoginAndRedirect method. There is also LoginWithoutRedirect method you want to use, but I found out it does not set the authentication cookie (when it does not think the request is an AJAX request), so the login basically does not work. A workaround I found is to call the LoginAndRedirect method, but only get the authentication cookie from the response ad return it manually:

<script src="https://gist.github.com/igorkulman/2430a948fe6c426cdd01.js?file=login.cs"></script>

The logout implementation just needs to call LogoutWithoutRedirect and return HTTP 200:

<script src="https://gist.github.com/igorkulman/2430a948fe6c426cdd01.js?file=logout.cs"></script>

 [1]: https://www.nuget.org/packages/Nancy.Authentication.Forms/
 [2]: https://github.com/NancyFx/Nancy/wiki/Forms-Authentication