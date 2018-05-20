+++
Categories = ["Swift", "iOS"]
Description = "When developing any application it is a good practice not to hard-code your strings but to use some kind of a strings file. In iOS you typically use the standard Localizable.strings file as storage and some string based API to use those strings. This of course works but it is not exactly safe, if you make a typo the compiler has no way to warn you and you, or worse your customers, will find out at runtime. There is a better way."
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS", "Swiftgen"]
author = "Igor Kulman"
date = "2018-04-18T08:29:12+01:00"
title = "Using iOS strings in a safer way"
url = "/using-ios-strings-in-a-safer-way"

+++

When developing any application it is a good practice not to hard-code your strings but to use some kind of a strings file. In iOS you typically use the standard `Localizable.strings` file as storage and some string based API to use those strings, like 

{{% gist id="714ae947643c8c10f55beae582a62e72" file="Extension.swift" %}}

This of course works but it is not exactly "safe", if you make a typo the compiler has no way to warn you and you, or worse your customers, will find out at runtime. There is a better way.

[SwiftGen](https://github.com/SwiftGen/SwiftGen) is a Swift code generator that will help you with that. It can generate enums for your strings, assets, storyboards. With a simple configuration SwiftGen reads your `Localizable.strings` file and generates a `L10n` enum with all the strings

{{% gist id="714ae947643c8c10f55beae582a62e72" file="Strings.swift" %}}

Simple strings are generated as properties and strings with formatting parameters as functions, so you always known how many parameters to use. It also makes it easier to find the correct string by showing the strings in Xcode intellisense

{{% img-responsive "/images/iosstrings.png" %}}

If you want a more complete example, take a look at my [iOS sample app on Github](https://github.com/igorkulman/iOSSampleApp)

<!--more-->