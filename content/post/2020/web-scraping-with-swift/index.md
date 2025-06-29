+++
Description = ""
Tags = ["Swift", "Web Scraping", "SwiftSoup", "HTML Parsing", "Hacker News"]
author = "Igor Kulman"
date = "2020-11-18T05:29:12+01:00"
title = "Web scraping with Swift"
url = "/web-scraping-with-swift"

+++

In a few projects in the past I needed to do web scraping to get some data from websites that did not offer access via an API. I was using `C#` at the time and scraping web with [Html Agility Pack](https://html-agility-pack.net/) was quite easy.

I now spend most of my time in macOS because of work projects so when I needed to do some web scraping again I did not want to install and set up `Mono` to do it again in `C#`. I decided to go with `Swift`, as I am now quite comfortable with the language after 4 years of using it daily.

### SwiftSoup

The first thing I need to do was to found some library to parse HTML, some `Swift` equivalent to `Html Agility Pack`. I found [SwiftSoup](https://github.com/scinfu/SwiftSoup).

`SwiftSoup` allows you to access `DOM` in `HTML` documents and also `HTML` fragments. The usage is quite simple, you just need to know a thing or two about `HTML`.

### Example

Let's say you want to parse the [Hacker News](https://news.ycombinator.com/) main page and scrap posts containing some specific keywords.

This is quite an artificial example but the idea is simple. You use the developer tools in your browser of choice to see the `HTML` of the parts of a website that you are interested in and try to get to them descending and filtering the `DOM` using `SwiftSoup`.

You first need to read the website and parse it

```swift
let content = try String(contentsOf: URL(string: "https://news.ycombinator.com/")!)
let doc: Document = try SwiftSoup.parse(content)
```

Looking at the `HTML` you can see it uses a table layout and all the posts are in a rows of a table with a class called `itemlist`.

<!--more-->

```swift
let table = try doc.select("table.itemlist").first()!
let rows = try table.select("tr")
```

You need to find rows that have to cells with a class called `title`, get the second cell and read the text nested in its hyperlink element

```swift
let title = rows.compactMap { row throws -> String? in
    let cells = try row.select("td.title")
    guard cells.count == 2, let link = try cells[1].select("a").first() else {
        return nil // wrong row
    }

    return try link.text()
}
```

Having obtained all the titles you can now process them any way you want, like matching for keywords

```swift
let keywords = ["Apple", "macOS"]
let appleRelated = titles.filter({ title in
    keywords.contains(where: { title.lowercased().contains($0.lowercased()) })
})
```