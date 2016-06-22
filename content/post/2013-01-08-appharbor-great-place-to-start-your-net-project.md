+++
title = "AppHarbor: great place to start your .NET project"
author = "Igor Kulman"
date = "2013-01-08"
url = "/appharbor-great-place-to-start-your-net-project/"
categories = ["Programming in general","Windows Azure"]
tags = ["web","c#"]
+++
If you want to host your .NET project on the Internet, there are classic ASP.NET webhosting on one side of the spectrum and Microsoft Azure on the other. If you are looking for something in the middle, take a look at [AppHarbor][1]. 

**AppHarbor**

AppHarbor is a flexible and scalable .NET Platform-as-a-Service, that you can even [use for free][2], limited to one web or worker role. It runs in AWS and is quite similiar to Heroku.

**Variety of Add-ons**

There are [many add-on supported by AppHarbor][3], including SQL Server, MongoDB, RavenDB, MySQL, Memcacher &#8230; Many of these ad-ons offer free versions so you can test them for free. If you run into some problems, you can use [the support forums][4] or [StackOverflow][5].

<!--more-->

**Flexible deployment**

The thing I like best about AppHarbor are the deployment options. You can push your .NET code to AppHarbor using Git, Mercurial, Subversion or Team Foundation Server with the complimentary Git service or through integrations offered in collaboration with [Bitbucket][6], [CodePlex][7] and [GitHub][8]. 

When AppHarbor receives your code it will be built by a platform build server. If the code compiles, any unit tests contained in the compiled assemblies will be run. If the code builds and all tests execute successfully, the application is deployed to the AppHarbor application servers.

**Compatibility**

The majority of .NET code runs just fine in AppHarbor without any changes. If you use Nuget, you need to enabled Nuget Package Restore for your solution.

Let the continous deployment begin &#8230; my first AppHarbor project is hosted at [http://myexpenses.apphb.com][9].

 [1]: https://appharbor.com/
 [2]: https://appharbor.com/pricing
 [3]: https://appharbor.com/addons
 [4]: http://support.appharbor.com/
 [5]: http://stackoverflow.com/questions/tagged/appharbor
 [6]: http://support.appharbor.com/kb/api/integrating-with-bitbucket
 [7]: http://support.appharbor.com/kb/api/integrating-with-codeplex
 [8]: http://blog.appharbor.com/2011/10/13/announcing-github-support
 [9]: http://myexpenses.apphb.com/
