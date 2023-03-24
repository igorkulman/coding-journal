+++
Categories = ["iOS", "Xcode", "UIWebView"]
Description = "Apple has deprecated UIWebView and will not be accepting new apps with UIWebView starting April 2020 and app updates with UIWebView starting December 2020. If your app uses UIWebView you should replace it with WKWebView."
Tags = ["iOS", "Xcode", "UIWebView"]
Keywords = ["iOS", "Xcode", "UIWebView"]
author = "Igor Kulman"
date = "2020-03-18T05:29:12+01:00"
title = "Determining which frameworks use UIWebView"
url = "/determining-which-frameworks-use-uiwebview"

+++

Apple has deprecated `UIWebView` and will not be accepting new apps with `UIWebView` starting April 2020 and app updates with `UIWebView` starting December 2020. If your app uses `UIWebView` you should replace it with `WKWebView`. 

The check for `UIWebView` has already been implemented as a warning after a build submission:

> **ITMS-90809: Deprecated API Usage** - Apple will stop accepting submissions of app updates that use UIWebView APIs starting from December 2020. See https://developer.apple.com/documentation/uikit/uiwebview for more information.

Removing `UIWebView` from your app might seem quite straightforward, but you probably use some 3rd party libraries and they might also contain `UIWebView`. You need to find all of them and update them, if available, or replace them. This process is not exactly trivial.

If you use 3rd party libraries as code, for example via `Cocoapods`, you can just do a text search for `UIWebView` in their sources. 

For example doing `grep -r 'UIWebView' .` in `RxSwift` sources prior to `5.1.0` gives you a lot of results as `RxSwift` has included UIWebView binding before `5.1.0`.

```bash
❯ grep -r 'UIWebView' .
./RxCocoa/iOS/UIWebView+Rx.swift://  UIWebView+Rx.swift
./RxCocoa/iOS/UIWebView+Rx.swift:    extension Reactive where Base: UIWebView {
./RxCocoa/iOS/UIWebView+Rx.swift:        public var delegate: DelegateProxy<UIWebView, UIWebViewDelegate> {
./RxCocoa/iOS/UIWebView+Rx.swift:                .methodInvoked(#selector(UIWebViewDelegate.webViewDidStartLoad(_:)))
./RxCocoa/iOS/UIWebView+Rx.swift:                .methodInvoked(#selector(UIWebViewDelegate.webViewDidFinishLoad(_:)))
./RxCocoa/iOS/UIWebView+Rx.swift:                .methodInvoked(#selector(UIWebViewDelegate.webView(_:didFailLoadWithError:)))
./RxCocoa/iOS/Proxies/RxWebViewDelegateProxy.swift:extension UIWebView: HasDelegate {
./RxCocoa/iOS/Proxies/RxWebViewDelegateProxy.swift:    public typealias Delegate = UIWebViewDelegate
...
```

If your 3rd party libraries come as a `.framework` file without sources, there is a different way to check for `UIWebView`. 

You can use `nm` to get the symbols table of the executable in a `.framework` and do a `grep` there

```bash
❯ nm AWSDK.framework/AWSDK | grep -i UIWebView
                 U _OBJC_CLASS_$_UIWebView
                 U _OBJC_CLASS_$_UIWebView
0000000000002a00 S __OBJC_LABEL_PROTOCOL_$_UIWebViewDelegate
0000000000002998 D __OBJC_PROTOCOL_$_UIWebViewDelegate
0000000000002348 s l_OBJC_$_PROTOCOL_INSTANCE_METHODS_OPT_UIWebViewDelegate
00000000000023b0 s l_OBJC_$_PROTOCOL_METHOD_TYPES_UIWebViewDelegate
0000000000002330 s l_OBJC_$_PROTOCOL_REFS_UIWebViewDelegate
000000000000aaa0 S __OBJC_LABEL_PROTOCOL_$_UIWebViewDelegate
000000000000a858 D __OBJC_PROTOCOL_$_UIWebViewDelegate
0000000000005780 s l_OBJC_$_PROTOCOL_INSTANCE_METHODS_OPT_UIWebViewDelegate
00000000000057e8 s l_OBJC_$_PROTOCOL_METHOD_TYPES_UIWebViewDelegate
0000000000005768 s l_OBJC_$_PROTOCOL_REFS_UIWebViewDelegate
AWSDK.framework/AWSDK(UIWebView+LongPress.o):
...
```

<!--more-->