+++
Categories = [ "iOS", "Swift"]
Description = "When you create a UITableViewCell that you want to use with multiple UITableViews and design its view using a XIB file you know that registering and using it involves the usage of string constants. When you register your custom UITableViewCell with the UITableView you use a string as XIB name and a string as the reuse identifier. Then you use the string reuse identifier again to actually use it. There must be a better, safer way, right? Of course there is, just use Reusable."
Tags = ["iOS", "Swift"]
Keywords = ["iOS", "Swift", "Protocols", "Reusable", "UITableView"]
author = "Igor Kulman"
date = "2017-06-20T09:29:12+01:00"
title = "Simpler and safer iOS custom table view cells with Reusable"
url = "/simpler-and-safer-custom-tableview-cells"

+++

When you create a `UITableViewCell` that you want to use with multiple `UITableView`s and design its view using a XIB file you know that registering and using it involves the usage of string constants. When you register your custom `UITableViewCell` with the `UITableView` you use a string as XIB name and a string as the reuse identifier. Then you use the string reuse identifier again to actually use it. There must be a better, safer way, right? Of course there is, just use [Reusable](https://github.com/AliSoftware/Reusable).

Reusable is a Swift mixin for reusing views easily and in a type-safe way for `UITableViewCell`s, `UICollectionViewCell`s, custom `UIView`s, `ViewController`s, `Storyboard`s. It contains protocols you add to your classes and let the magic (the default implementation for those protocols) happen.

So how do you get rid of all those strings when using custom cells with `UITableView`? First, add the `NibReusable` protocol to you custom cell class

<!--more-->

{{< highlight swift >}}
class UserCell: UITableViewCell, NibReusable
{{< / highlight >}}

This assumes that your XIB for that class has the same name as the Swift class. The protocol adds to properties to your class, one for the XIB name and another one for the reuse identifier. The default implementation takes care of setting them both to the name of your class.

To register the `UITableViewCell` class you just use

{{< highlight swift >}}
tableView.register(cellType: UserCell.self)
{{< / highlight >}}

and the actual usage is also very simple

{{< highlight swift >}}
let cell: UserCell = tableView.dequeueReusableCell(for: indexPath)
{{< / highlight >}}

As promised, both registration and usage of the custom `UITableViewCell` can be done without the use any strings.
