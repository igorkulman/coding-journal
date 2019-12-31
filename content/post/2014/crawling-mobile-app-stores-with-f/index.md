+++
title = "Crawling mobile app stores with F#"
author = "Igor Kulman"
date = "2014-04-07"
url = "/crawling-mobile-app-stores-with-f/"
categories = ["Functional programming"]
tags = ["Fsharp","Windows Phone","Windows Store"]
+++
Some time ago I needed a way to programatically search the Apple AppStore and Google Play Store to get some info about apps for a project. I decided to write an F# script for that task and later added support for Windows Phone Store.

**Types**

I wanted the script to be easily usable from outside of F# so first I created a type for the app.

{{< highlight fsharp >}}
type App = { Name: string; Package: string; IconUrl : string; StoreUrl: string}
{{< / highlight >}}

I also needed a helper function to download data from the web. I used a classic WebClient with user agent set to Chrome, because the Windows Phone Store API requires a user agent header

<!--more-->

{{< highlight fsharp >}}
let http (url : string) =
    let wc = new WebClient()
    wc.Headers.Add("user-agent","Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36")
    let html = wc.DownloadString url
    html
{{< / highlight >}}

**Apple AppStore**

Searching in Apple AppStore is easy, because Apple provides a simple search API that returns JSON. Thanks to the JsonProvider from FSharp.Data, the code is really simple

{{< highlight fsharp >}}
type AppStoreData = JsonProvider<"http://itunes.apple.com/search?term=LEMA&entity=software&country=CZ">

let searchAppStore (term:string) (country:string) =
    let data = http (sprintf "http://itunes.apple.com/search?term=%s&entity=software&country=%s" term country)
    let res = AppStoreData.Parse data
    res.Results
    |> Seq.map (fun x-> {Name=x.TrackName; Package=x.BundleId; IconUrl=x.ArtworkUrl60; StoreUrl = ""})   
{{< / highlight >}}

Just downloading the JSON transforming the data to our type.

**Google Play Store**

Searching in Google Play Store is a bit more of a challenge. There is no API I could found so I had to parse the html returned from the web version of Google Play Store. The web can change at any time so I need to be aware of this fact and fix the method if it happens.

{{< highlight fsharp >}}
 let searchAppStore term =   
        let data = http (sprintf "https://play.google.com/store/search?q=%s&c=apps&num=100" term)
        let doc = new HtmlDocument()
        doc.LoadHtml(data)        
        seq {
            for div in doc.DocumentNode.SelectNodes("//div") do
                if (div.Attributes.Contains("class") && div.Attributes.["class"].Value="card no-rationale square-cover apps small") then
                    let a = div.Descendants("a") |> Seq.filter (fun x->x.Attributes.Contains("class") && x.Attributes.["class"].Value="title") |> Seq.head
                    let img = div.Descendants("img") |> Seq.filter( fun x->x.Attributes.Contains("class") && x.Attributes.["class"].Value="cover-image") |> Seq.head
                    yield { Name = a.Attributes.["title"].Value; Package = div.Attributes.["data-docid"].Value; IconUrl = img.Attributes.["src"].Value; StoreUrl="https://play.google.com"+a.Attributes.["href"].Value}
            }
{{< / highlight >}}

Another problem with parsing the web is that there is no way to return search result for a specific country like for Apple AppStore. The web always shows results according to your IP address.

**Windows Phone Store**

There is no official API for searching the Windows Phone Store but I was given a tip obtained after sniffing the traffic from a Windows Phone, so I did not have to parse the web. The code is as simple as for Apple AppStore thanks to XmlProvider.

{{< highlight fsharp >}}
type AppStoreData = XmlProvider<"http://marketplaceedgeservice.windowsphone.com/v8/catalog/apps?os=8.0.10521.0&cc=CZ&lang=en-US&chunkSize=50&q=igor%20kulman">

    let searchAppStore term country=   
        let data = http (sprintf "http://marketplaceedgeservice.windowsphone.com/v8/catalog/apps?os=8.0.10521.0&cc=%s&lang=en-US&chunkSize=50&q=%s" country term)
        let res = AppStoreData.Parse data
        res.Entries
            |> Seq.map (fun x-> {Name=x.Title.Value; Package=x.Id.Replace("urn:uuid:",""); StoreUrl=(sprintf "http://windowsphone.com/s?appid=%s" (x.Id.Replace("urn:uuid:",""))); IconUrl = (sprintf "http://cdn.marketplaceimages.windowsphone.com/v8/images/%s&imagetype=icon_small" (x.Id.Replace("urn:uuid:","")))})
{{< / highlight >}}

**Conclusion**

Using F# is fun and processing data is really simple thanks to type provides. You can find it whole code at <https://github.com/igorkulman/AppStoreCrawler>.

{{% github-repo "igorkulman/AppStoreCrawler" %}}
