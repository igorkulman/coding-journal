+++
Description = "Almost every iOS application uses UITableView to display some kind of data and in many cases the data can be missing. In such situation you typically want to display some kind of no data placeholder. The placeholder fills in the empty space and can tell the user what needs to be done to get the data."
Tags = ["iOS", "Xcode", "RxSwift"]
author = "Igor Kulman"
date = "2019-03-13T05:29:12+01:00"
title = "Simple bindable \"no data\" placeholder for UITableView"
url = "/simple-bindable-no-data-placeholder"

+++

Almost every iOS application uses `UITableView` to display some kind of data and in many cases the data can be missing. In such situation you typically want to display some kind of "no data" placeholder. The placeholder fills in the empty space and can tell the user what needs to be done to get the data.

There are many ways wo implement such "no data" placeholder, including using libraries like [UIEmptyState](https://github.com/luispadron/UIEmptyState). If you just need to display a simple text message, there is an really easy way to implement it yourself, as I did in a recent project.

## Showing and hiding the placeholder

The easiest way to create a "no data" placeholder for `UITableView` is to set it as the background view. It will be shown when there is no data in the `UITableView` so it will not be hidden under any other wiew.

I created a simple `UITableView` extension to show the placeholder with a specific message

```swift
extension UITableView {
    func setNoDataPlaceholder(_ message: String) {
        let label = UILabel(frame: CGRect(x: 0, y: 0, width: self.bounds.size.width, height: self.bounds.size.height))
        label.text = message
        // styling
        label.sizeToFit()

        self.isScrollEnabled = false
        self.backgroundView = label
        self.separatorStyle = .none
    }
}
```

To hide it when no longer needed I created another extension method

```swift
extension UITableView {
    func removeNoDataPlaceholder() {
        self.isScrollEnabled = true
        self.backgroundView = nil
        self.separatorStyle = .singleLine
    }
}
```

With this I would have to call those two extension method manually depending on the data in the `UITableView` which is unnecessary manual work. 

<!--more-->

## Making the placeholder bindable

I use `RxSwift` in the project so I made it bindable.

```swift
extension Reactive where Base: UITableView {
    func isEmpty(message: String) -> Binder<Bool> {
        return Binder(base) { tableView, isEmpty in
            if isEmpty {
                tableView.setNoDataPlaceholder(message)
            } else {
                tableView.removeNoDataPlaceholder()
            }
        }
    }
}
```

This extension adds an `isEmpty` function to every `UITableView` that you can call with the desired "no data" message and get back a property that you can use for binding

```swift
let isEmpty = tableView.rx.isEmpty(message: L10n.noResponses)
viewModel.responses.map({ $0.count <= 0 }).distinctUntilChanged().bind(to: isEmpty).disposed(by: disposeBag)
```

The `L10n.noResponses` is just a [safer way to use translated strings](/using-ios-strings-in-a-safer-way/) and `viewModel.responses` is a [and observable backing the `UITableView` data](/using-mvvm-with-tables-in-ios/).

With this binding you can be sure the placeholder is only shown when needed, without any manual calls to the two extension methods.