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

{{< highlight fsharp >}}
[<DataServiceKey("PartitionKey", "RowKey")>]
type LogEntity() =    
    let mutable partitionKey = ""
    let mutable rowKey = ""
    let mutable message = ""
    let mutable timestamp = DateTime.Now
    let mutable severity = ""  
    member x.PartitionKey with get() = partitionKey and set v = partitionKey <- v
    member x.RowKey with get() = rowKey and set v = rowKey <- v
    member x.Message with get() = message and set v = message <- v
    member x.Timestamp with get() = timestamp and set v = timestamp <- v
    member x.Severity with get() = severity and set v = severity <- v
{{< / highlight >}}

<!--more-->

Alternatively you can make your class inherit from TableEntity that already contains the PartitionKey and RowKey properties. The Severity property is in my case just a simple discriminated union

{{< highlight fsharp >}}
type Severity =
    | Debug
    | Information
    | Error   
        with 
            member this.toString() =
                match this with
                | Debug -> "Debug"
                | Information -> "Information"
                | Error -> "Error"
{{< / highlight >}}

You can access the Azure API in C# way but you do not need to, there is a great library called [Fog by Dan Mohl][3] that makes using Azure API from F# more comfortable.

First you create a Azure Table Storage client using a connection string defined in the Windows Azure Cloud Service Configuration file for a role

{{< highlight csharp >}}
let client = BuildTableClientWithConnStr "TableStorageConnectionString"  
{{< / highlight >}}

Saving a log entry is then very simple thanks to Fog

{{< highlight fsharp >}}
let log (severity:Severity) message =       
    let entry = LogEntity(PartitionKey = DateTime.Now.ToString("yyyy-MM-dd"), RowKey = Guid.NewGuid().ToString(), Timestamp = DateTime.Now, Message = message, Severity = string severity)
    CreateEntityWithClient client "LogEntity" entry      
{{< / highlight >}}

Saving data to Azure Table Storage may be a slow operation if you do it a lot, so you may want to log asynchronously

{{< highlight fsharp >}}
let log (severity:Severity) message =       
        async {
            let entry = LogEntity(PartitionKey = DateTime.Now.ToString("yyyy-MM-dd"), RowKey = Guid.NewGuid().ToString(), Timestamp = DateTime.Now, Message = message, Severity = severity.ToString())
            CreateEntityWithClient client  "LogEntity" entry         
        } |> Async.Start
{{< / highlight >}}

As you may have noticed, I use the date as the partiotion key. The thing with Azure Table Storage is, that you can get the data by partition key, row key, or all the data. The log date seems like a reasonable partition key that allows you to get log by days

{{< highlight fsharp >}}
let getLogs (date:DateTime) = seq {
         for e in client.GetDataServiceContext().CreateQuery<LogEntity>("LogEntity") do
            if e.PartitionKey = date.ToString("yyyy-MM-dd") then
                yield e
    }
{{< / highlight >}}

**Update:** there is a more way to create the LogEntity using the CLIMuttableAttribte

{{< highlight fsharp >}}
[<CLIMutable>]
[<DataServiceKey("PartitionKey", "RowKey")>]
type LogEntity =   
    {
        Message: string
        Timestamp: DateTime
        Severity: string
        PartitionKey: string
        RowKey: string
    }
{{< / highlight >}}

 [1]: http://visualstudiogallery.msdn.microsoft.com/3d2bf938-fc9e-403c-90b3-8de27dc23095
 [2]: http://www.windowsazure.com/en-us/develop/net/how-to-guides/table-services/
 [3]: http://dmohl.github.com/Fog/
