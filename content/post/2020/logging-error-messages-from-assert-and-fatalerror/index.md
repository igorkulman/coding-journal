+++
Categories = ["iOS", "Xcode"]
Description = ""
Tags = ["iOS", "Xcode"]
Keywords = ["iOS", "Xcode"]
author = "Igor Kulman"
date = "2020-04-15T05:29:12+01:00"
title = "Logging error messages from assert and fatalerror"
url = "/logging-error-messages-from-assert-and-fatalerror"

+++

I often use `fatalerror(message:)` in my code base to deal with invalid states when the application cannot continue. A typical example can be a method that requires to be called only after the user has logged in:

{{< highlight swift >}}
guard let loggedUser = dataStore.user else {
	fatalerror("Invalid use before signup is complete")
}
{{< / highlight >}}

The problem is that the `fatalerror` message does not appear in the crash log. You can of course take a look at the whole stack trace to figure out where the `fatalerror` originated but seeing the message in the logs yout get from your uses immediately would be much better.

I [use `PLCrashReporter` to store crash logs locally](https://blog.kulman.sk/logging-ios-app-crashes/) so users can export them from the application together with all the logs.

I tried logging the message every time before calling `fatalerror`

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

Instead of calling `fatalerror(message:)` I now call `fail(message:)` instead in all the places it is needed and the message is always logged. 

As a downside if you have debugger attached it stops in the actual `fatalerror` call not on the `fail` method call, so you need to move one method up in the stack trace to see the actual place your application failed. 

For me it is worth it, I am much more interested in the error messages in the logs than this.

In my code base I also define a `failDebug(message:)` method with the same code just replacing `fatalerror(message:)` with `assertionFailure(message:)`.

<!--more-->

{{< highlight swift >}}
func failDebug(_ message: String, file: String = #file, function: String = #function, line: Int = #line) -> Never {
    let formattedMessage = "[\(filename):\(line) \(function)]: \(message)"
    Log.error?.message(formattedMessage, log: OSLog.conditions, type: .error)
    assertionFailure(formattedMessage)
}
{{< / highlight >}}

You can also add a `notImplemented` method in a similar way

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
