+++
Categories = ["iOS", "Xcode"]
Description = ""
Tags = ["iOS", "Xcode"]
Keywords = ["iOS", "Xcode"]
author = "Igor Kulman"
date = "2020-04-22T05:29:12+01:00"
title = "Logging error messages from assert and fatalerror"
url = "/logging-error-messages-from-assert-and-fatalerror"

+++

I often use `fatalerror(message:)` in my codeb ase to to deal with invalid states when the application cannot continue. A typical example can be a method that requires to be called only after the user has logged in:

{{< highlight swift >}}
guard let loggedUser = dataStore.user else {
	fatalerror("Invalid use before signup is complete")
}
{{< / highlight >}}

The problem is that the message from the fatalerror called does not get logged into the crash log. You can of course see the stack trace to but seeing the message in the crash log immediately would be much better when you get it from a user.

I [use `PLCCrashReporter` to store crash log locally](https://blog.kulman.sk/logging-ios-app-crashes/) so users can export them from the application together with all the logs.

I tried logging the message every time before calling fatal error

{{< highlight swift >}}
guard let loggedUser = dataStore.user else {
	Log.error?.message("Invalid use before signup is complete")
	fatalerror("Invalid use before signup is complete")
}
{{< / highlight >}}

but this is really not ideal, it is just writing boilerplate code you can easily forget.

I have not found a way to directly log the `fatalerror` message, so I created my own fail method

{{< highlight swift >}}
func fail(_ message: String, file: String = #file, function: String = #function, line: Int = #line) -> Never {
    let formattedMessage = "[\(filename):\(line) \(function)]: \(message)"
    Log.error?.message(formattedMessage, log: OSLog.conditions, type: .error)
    fatalError(formattedMessage)
}
{{< / highlight >}}

Instead of `fatalerror(message:)` I now call `fail(message:)` instead in all the places it is needed and the message is always logged. 

As a downside if you have debugger attached it stops in the actual `fatalerror` call not on the fail method call so you need to move one method application in the stack trace to see the actually place your application failed. 

For me it is worth it, I am much ore interested in the error messages from crash logs that this.

In my code base I also define a `failDebug(message:)` method with the same code just replacing `fatalerror(message:)` with `assertionFailure(message:)`.

<!--more-->

{{< highlight swift >}}
func failDebug(_ message: String, file: String = #file, function: String = #function, line: Int = #line) -> Never {
    let formattedMessage = "[\(filename):\(line) \(function)]: \(message)"
    Log.error?.message(formattedMessage, log: OSLog.conditions, type: .error)
    assertionFailure(formattedMessage)
}
{{< / highlight >}}

You can also implement a `notImplemented` method in a similar way

{{< highlight swift >}}
func notImplemented(file: String = #file, function: String = #function, line: Int = #line) -> Never {
    fail("Method not implemented.", file: file, function: function, line: line)
}
{{< / highlight >}}

or a custom `assertDebug` method with a condition

{{< highlight swift >}}
func assertDebug(_ condition: @autoclosure () -> Bool, _ logMessage: String, file: String = #file, function: String = #function, line: Int = #line) {
    if !condition() {
        failDebug(logMessage)
    }
}
{{< / highlight >}}