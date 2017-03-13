+++
title = "F# on Azure: using Table Storage for logging"
author = "Igor Kulman"
date = "2013-02-26"
url = "/f-on-azure-using-table-storage-for-logging/"
categories = ["Functional programming","Windows Azure"]
tags = ["Azure","Fsharp"]
+++
Windows Azure finally has a good F# support. Creating F# Worker Roles is supported right from the wizzard in Visual Studio and you can create a F# Web Role using the [F# C# MVC template][1]. I decided to try it out and the first thing I needed to implement was logging. I decided for logging to Azure Table Storage.

I assume you have a basic idea of how Azure Table Storage works. If not, there is a [good guide on the Windows Azure website][2].

The first thing you need to do is to define your log entry class. You need to create a class, Azure Table Storage does not work with F# records. In my case I want to store a timestamp, message and severity. 

{{< gist 5822037>}}

<!--more-->

Alternatively you can make your class inherit from TableEntity that already contains the PartitionKey and RowKey properties. The Severity property is in my case just a simple discriminated union

{{< gist 5822042>}}

You can access the Azure API in C# way but you do not need to, there is a great library called [Fog by Dan Mohl][3] that makes using Azure API from F# more comfortable.

First you create a Azure Table Storage client using a connection string defined in the Windows Azure Cloud Service Configuration file for a role

{{< gist 5822066>}}

Saving a log entry is then very simple thanks to Fog

{{< gist 5822061>}}

Saving data to Azure Table Storage may be a slow operation if you do it a lot, so you may want to log asynchronously

{{< gist 5822056>}}

As you may have noticed, I use the date as the partiotion key. The thing with Azure Table Storage is, that you can get the data by partition key, row key, or all the data. The log date seems like a reasonable partition key that allows you to get log by days

{{< gist 5822053>}}

**Update:** there is a more way to create the LogEntity using the CLIMuttableAttribte

{{< gist 5822050>}}

 [1]: http://visualstudiogallery.msdn.microsoft.com/3d2bf938-fc9e-403c-90b3-8de27dc23095
 [2]: http://www.windowsazure.com/en-us/develop/net/how-to-guides/table-services/
 [3]: http://dmohl.github.com/Fog/
