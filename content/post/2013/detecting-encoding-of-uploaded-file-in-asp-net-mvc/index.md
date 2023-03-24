+++
title = "Detecting encoding of uploaded file in ASP.NET MVC"
author = "Igor Kulman"
date = "2013-02-05"
url = "/detecting-encoding-of-uploaded-file-in-asp-net-mvc/"
categories = ["Programming in general"]
tags = ["Web", "ASP","Csharp"]
+++
Uploading a file in ASP.NET MVC is very easy, but there is no easy way to detect the encoding of a uploaded text file. However you can use the fact if you try to read the file with a wrong encoding, you get an DecoderFallbackException. So how do you put everything together?

First, get a stream of the uploaded file.

```csharp
[HttpPost]
public ActionResult FromCSV(HttpPostedFileBase file)
{
    if (file != null && file.ContentLength > 0)
    {
        var stream = file.InputStream;
        ...
    }
}
```

<!--more-->

Next, read the whole file to a byte array

```csharp
public static byte[] ReadFully(Stream input)
{
    byte[] buffer = new byte[16 * 1024];
    using (MemoryStream ms = new MemoryStream())
    {
        int read;
        while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
        {
            ms.Write(buffer, 0, read);
        }
        return ms.ToArray();
     }
}
```

Finally the trick is to try all the encodings you think the file may be in and chech if if fails or not

```csharp
private static string[] GetFileContent(Stream input)
{
    Encoding[] encodings = new Encoding[]{
        Encoding.GetEncoding("UTF-8", new EncoderExceptionFallback(), new DecoderExceptionFallback()),
        Encoding.GetEncoding(1250, new EncoderExceptionFallback(), new DecoderExceptionFallback())
    };
    var inputArr = ReadFully(input);
    String result = null;

    foreach (Encoding enc in encodings)
    {
        try
        {
            result = enc.GetString(inputArr);
            break;
        } catch (DecoderFallbackException e){}
     }

     return result;
}
```
