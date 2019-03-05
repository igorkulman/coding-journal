+++
Categories = ["iOS", "Xcode", "RxSwift"]
Description = "Almost every iOS application uses UITableView to display some kind of data and in many cases the data can be missing. In such situation you typically want to display some kind of no data placeholder. The placeholder fills in the empty space and can tell the user what needs to be done to get the data."
Tags = ["iOS", "Xcode", "RxSwift"]
Keywords = ["iOS", "Xcode", "RxSwift"]
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

{{< highlight swift >}}
extension UITableView {
    func setNoDataPlaceholder(_ message: String) {
        let label = PlaceholderLabel(frame: CGRect(x: 0, y: 0, width: self.bounds.size.width, height: self.bounds.size.height))
        label.text = message
        label.sizeToFit()

        self.isScrollEnabled = false
        self.backgroundView = label
        self.separatorStyle = .none
    }
}
{{< / highlight >}}

`PlaceholderLabel` is a `UILabel` subclass with some custom styling. I am not a fan of inheritance but you just cannot do stuff like `UILabel` padding without subclassing it

{{< highlight swift >}}
final class PlaceholderLabel: UILabel {
    private let padding: CGFloat = 8.0

    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets(top: padding, left: padding, bottom: padding, right: padding)
        setNeedsLayout()
        return super.drawText(in: rect.inset(by: insets))
    }

    override init(frame: CGRect) {
        super.init(frame: frame)

        textColor = .black
        numberOfLines = 0
        textAlignment = .center
        font = UIFont.preferredFont(forTextStyle: .body)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
{{< / highlight >}}

To hide it when no longer needed I created another extension method

<!--more-->

{{< highlight swift >}}
extension UITableView {
    func removeNoDataPlaceholder() {
        self.isScrollEnabled = true
        self.backgroundView = nil
        self.separatorStyle = .singleLine
    }
}
{{< / highlight >}}

With this I would have to call those two extension method manually depending on the data in the `UITableView` which is unnecessary manual work. 

## Making the placeholder bindable

I use `RxSwift` in the project so I made it bindable.

{{< highlight swift >}}
extension Reactive where Base: UITableView {
    func isEmpty(message: String) -> Binder<Bool> {
        return Binder(base) { tableView, isLoading in
            if isLoading {
                tableView.setNoDataPlaceholder(message)
            } else {
                tableView.removeNoDataPlaceholder()
            }
        }
    }
}
{{< / highlight >}}

This extension ads an `isEmpty` function to every `UITableView` that you can call with the desired "no data" message and get back a property that you can use for binding

{{< highlight swift >}}
let isEmpty = tableView.rx.isEmpty(message: L10n.noResponses)
viewModel.responses.map({ $0.count <= 0 }).distinctUntilChanged().bind(to: isEmpty).disposed(by: disposeBag)
{{< / highlight >}}

The `L10n.noResponses` is just a [safer way to use translated strings](/using-ios-strings-in-a-safer-way/) and `viewModel.responses` is a [and observble backing the `UITableView` data](/using-mvvm-with-tables-in-ios/).

With this binding you can be sure the placeholder is only shown when needed, without any manual calls to the two extension methods.