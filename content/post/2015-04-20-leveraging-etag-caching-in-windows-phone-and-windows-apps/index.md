+++
title = "Leveraging ETag caching in Windows Phone and Windows apps"
author = "Igor Kulman"
date = "2015-04-20"
url = "/leveraging-etag-caching-in-windows-phone-and-windows-apps/"
categories = ["Windows Phone","Windows Store"]
tags = ["Windows Phone","Windows Store","WinRT"]
+++
In my previous article I showed you [how to implements server side caching using ETag][1]. HTTP clients on other platforms can usually work with ETag automatically, but of course, the portable HTTP client used on Windows platforms cannot. You have to implement ETag handling yourself.

In [TvTime][2], all the server requests are GET request, so I remember the ETag values for each Url (= each GET request). I store the ETag values in application local settings.

When the app wants to get some data, I perform a GET request including the ETag as the If-None-Match header. If my ETag matches with the ETag on the server, the server returns HTTP 304 Not Modified and I return the cached data from disk. Otherwise I read the response body and return it.

<!--more-->

{{< highlight csharp >}}
/// <summary>
/// Gets stream data from the server. Uses ETag to cache data locally
/// </summary>
/// <param name="url">Url to get data from</param>
/// <returns>Stream data</returns>
[NotNull]
private async Task<Stream> GetData([NotNull] string url)
{
    var client = new HttpClient();

    var key = MD5.GetMd5String(url); //Urls can be long and create strange characters, using a hash instead
    var etag = (string)_settingsService.Get(key); //current ETag for the reques

    var request = new HttpRequestMessage
    {
        Method = HttpMethod.Get,
        RequestUri = new Uri(url)
    };

    if (!String.IsNullOrEmpty(etag)) //if there is a saved ETag, use it
    {
        request.Headers.TryAddWithoutValidation("If-None-Match", etag);
    }

    var response = await client.SendAsync(request);

    if (response.StatusCode == HttpStatusCode.NotModified) //ETag matches, no newer data available
    {
        var file = await ApplicationData.Current.LocalFolder.GetFileAsync(key);
        return await file.OpenStreamForReadAsync().ConfigureAwait(false); //return cached data
    }

    var newFile = await ApplicationData.Current.LocalFolder.CreateFileAsync(key, CreationCollisionOption.ReplaceExisting);
    using (var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false)) //get content
    {
        using (var outputStream = await newFile.OpenStreamForWriteAsync()) //save to cache
        {
            await stream.CopyToAsync(outputStream);
            _settingsService.Set(key, response.Headers.ETag.Tag); //save etag
        }
    }
    return await newFile.OpenStreamForReadAsync().ConfigureAwait(false); //return (fresh) from cache
}
{{< / highlight >}}

This approach works with the portable Http client library, that you can use with Windows Phone 8 (Silverlight), 8.1 (Sliverlight), 8.1 XAML and Windows 8/8.1. If you only need to support Windows Phone 8.1 XAML and Windows 8.1, you may want to look into the Windows.Web.Http.HttpClient.

 [1]: http://blog.kulman.sk/using-etag-to-cache-responses-in-nancyfx/ "Using ETag to cache responses in NancyFX"
 [2]: http://blog.kulman.sk/tvtime-track-your-favorite-tv-shows-on-windows-phone/ "TvTime: track your favorite TV shows on Windows Phone"
