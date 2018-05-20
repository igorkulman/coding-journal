+++
title = "Custom DateTime deserialization with JSON.NET"
author = "Igor Kulman"
date = "2015-05-06"
url = "/custom-datetime-deserialization-with-json-net/"
categories = ["Programming in general"]
tags = ["JSON"]
keywords = ["JSON", "CSharp"]
+++
Sometimes you cannot influence the design of the API you have to use and wonder, why the API uses so strangely serialized DateTime and how to handle it using JSON.NET. 

Luckily, JSON.NET makes plugging in custom serializers / deserializes quite easy. There are a few base classes to help you write your own converter, when dealing with DateTime you want to inherit the DateTimeConverterBase class.

<!--more-->

There are two methods in this class to override, WriteJson and ReadJson. All you custom serialization and deserialization logic should be placed there. 

Here is a sample implementation:

{{% gist id="31c91704fa93870de4ee" file="CustomDateTimeConverter.cs" %}}

If you want to use your custom converter to serialize or deserialize a property you just need to decorate it with the right attribute.

{{% gist id="31c91704fa93870de4ee" file="usage.cs" %}}
