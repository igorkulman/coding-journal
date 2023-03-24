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

```csharp
/// <summary>
/// Custom DateTime JSON serializer/deserializer
/// </summary>
public class CustomDateTimeConverter :  DateTimeConverterBase
{
    /// <summary>
    /// DateTime format
    /// </summary>
    private const string Format = "dd. MM. yyyy HH:mm";

    /// <summary>
    /// Writes value to JSON
    /// </summary>
    /// <param name="writer">JSON writer</param>
    /// <param name="value">Value to be written</param>
    /// <param name="serializer">JSON serializer</param>
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        writer.WriteValue(((DateTime)value).ToString(Format));
    }

    /// <summary>
    /// Reads value from JSON
    /// </summary>
    /// <param name="reader">JSON reader</param>
    /// <param name="objectType">Target type</param>
    /// <param name="existingValue">Existing value</param>
    /// <param name="serializer">JSON serialized</param>
    /// <returns>Deserialized DateTime</returns>
    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        if (reader.Value == null)
        {
            return null;
        }

        var s = reader.Value.ToString();
        DateTime result;
        if (DateTime.TryParseExact(s, Format, CultureInfo.InvariantCulture,DateTimeStyles.None, out result))
        {
            return result;
        }

        return DateTime.Now;
    }
}
```

If you want to use your custom converter to serialize or deserialize a property you just need to decorate it with the right attribute.

```csharp
[JsonConverter(typeof(CustomDateTimeConverter))]
public DateTime? PurchaseDate { get; set; }
```
