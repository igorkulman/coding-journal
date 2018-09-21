+++
title = "Processing JSON in .NET"
author = "Igor Kulman"
date = "2012-11-01"
url = "/processing-json-in-net/"
categories = ["WinRT"]
tags = ["Csharp","JSON","WinRT"]
+++
JSON is a very popular format for exchanging data, especially in the world of web technologies and JavaScript. The .NET platform contains a native support for this format but a better alternative is to use the JSON.NET library.

**JSON.NET**

[JSON.NET][1] is a flexible JSON serializer for .NET with LIQN support. The biggest reason for using this library is its performance in comparison to the standard DataContractJsonSerializer. The easiest way to use the library is to use the [Nuget package][2].

JSON.NET is very easy to use; first you create a JObject instance

{{< highlight csharp >}}
JObject o = JObject.Parse(jsonString);
{{< / highlight >}}

<!--more-->

from which you can get a collection (in our example of type TicketViewModel)

{{< highlight csharp >}}
Tickets = new ObservableCollection<TicketViewModel>((o["tickets"].Select(ticket => new TicketViewModel(ticket)).OrderBy(l => l.City).ToList()));
{{< / highlight >}}

filling the TicketViewModel instance from the JObject

{{< highlight csharp >}}
public TicketViewModel(Newtonsoft.Json.Linq.JToken ticket) 
{
    _city = (string)ticket.SelectToken("city"); 
    _cityCes = (string)ticket.SelectToken("city_ces");      
    _currency = (string)ticket.SelectToken("currency");  
    .... 
} 
{{< / highlight >}}

**DataContractJsonSerializer**

If you do not want or cannot use JSON.NET you can use the already mentioned DataContractJsonSerializer. Before you use it, you have to create a class with the same structure as the JSON. You do not have to create it by hand; you can use the [json2csharp][3] utility.

Using the DataContractJsonSerializer is a less readable than using JSON.NET

{{< highlight csharp >}}
DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Tickets)); 
Tickets tickets; 
using (MemoryStream stream = new MemoryStream(Encoding.Unicode.GetBytes(responseText))) 
{
    root = serializer.ReadObject(stream) as Tickets; 
}
{{< / highlight >}}

 [1]: http://james.newtonking.com/projects/json-net.aspx
 [2]: https://nuget.org/packages/Newtonsoft.Json
 [3]: http://json2csharp.com/
