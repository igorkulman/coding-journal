+++
title = "I wanted async/await but I got a concurrency model"
description = "Swift async/await was supposed to be a simple escape from callback hell. Instead it brought a full concurrency model that everyone has to pay for, whether they need it or not."
author = "Igor Kulman"
date = "2026-05-06T07:00:00+01:00"
tags = ["iOS", "Swift", "Concurrency"]
Keywords = ["iOS", "Swift", "async/await", "Swift concurrency", "actors", "Sendable"]
url = "/i-wanted-async-await"
+++

I remember the moment Swift announced async/await. I was genuinely relieved.

Finally, there was going to be a way out of completion handler pyramids, delegate chains, and the special kind of cognitive overhead that comes from reading code that executes in a completely different order than it is written.

I had worked with C# async/await years earlier, and my mental model came from there. In a UI app, if a `SynchronizationContext` is present, awaiting a `Task` captures it and posts the continuation back to it. In practice, that meant I could `await` something from the UI layer and continue on the UI thread afterwards. When I explicitly did not want that, usually in library code, I used `.ConfigureAwait(false)` and opted out.

That was not the whole of .NET async programming, of course. Console apps, ASP.NET Core, and custom schedulers all have their own details. But for the kind of UI code I was writing, the default felt right: stay where I started, unless I said otherwise.

That experience set my expectations for Swift async/await. I expected a nicer way to express waiting. What I got was something much larger.

## What Swift actually gave us

Swift concurrency is not just async/await. It is a full concurrency model built around actors, isolation domains, `Sendable`, and compiler rules about which code can access which data from which context.

The goal is data-race safety. Swift 6 made that goal much more visible by turning potential data races into compiler errors in the Swift 6 language mode. Code that had previously compiled with warnings under complete strict concurrency checking now had to deal with them.

Some of those errors point to real bugs. Passing non-`Sendable` state between concurrent contexts can absolutely be a problem. Accessing actor-isolated state from the wrong place can absolutely be a problem. The compiler catching those cases is valuable.

But a lot of iOS code is not written like a server or a highly concurrent system. Most of it is UI-bound. Most app state lives on the main actor, even if the code does not always say that explicitly. Background work exists, but it is usually narrow and well-contained: fetch this, decode that, write to disk, come back to the UI.

For that kind of app, the problem I had was not concurrent mutation of shared state. The problem I had was unreadable control flow.

Swift solved the data-race problem with the thoroughness of a systems programming language, then made every app developer pay the conceptual cost.

## The defaults matter

This is where the contrast with C# still feels important to me. In the UI code I used to write, the safe and obvious thing was the default. Await something, then continue in the UI context. If I wanted to avoid that context capture, I had to say so with `.ConfigureAwait(false)`.

Swift started from a different place. Under the semantics clarified by [SE-0338](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0338-clarify-execution-non-actor-async.md), non-actor-isolated async functions formally run on a generic executor. If you call one from actor-isolated code, such as code on the main actor, the function can hop off that actor. When the call returns, the actor-isolated caller resumes on its actor.

That rule is coherent once you understand Swift's model. It is also exactly the kind of rule I did not expect to have to care about when all I wanted was async/await.

Swift 6.2 improves this. [SE-0461](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0461-async-function-isolation.md), shipped as the `NonisolatedNonsendingByDefault` upcoming feature, changes nonisolated async functions so they run in the caller's isolation by default. Swift 6.2 also introduced `@concurrent` as the explicit way to say that an async function should leave the caller's actor and run concurrently.

That moves Swift closer to the model I expected in the first place: stay where you are unless you ask to leave. It is a welcome change, but the fact that it was needed says something about the original defaults.

There is another Swift 6.2 feature, [SE-0466](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0466-control-default-actor-isolation.md), that lets a module infer `@MainActor` isolation by default. That is useful for UI apps and scripts. It is also a separate setting from "Approachable Concurrency", which matters because the behavior of the same code can now depend on compiler settings, language mode, upcoming feature flags, target type, and module boundaries.

That is a lot to know just to understand where an async function runs.

## The complexity leaks everywhere

The difficult part is not one specific keyword. I can learn `@MainActor`, `nonisolated`, `Sendable`, `@unchecked Sendable`, `nonisolated(unsafe)`, `nonisolated(nonsending)`, and `@concurrent`. The difficult part is that these concepts interact.

Adding `Sendable` to one type often creates a chain of requirements through the rest of the model layer. Making a view model `@MainActor` can affect protocol conformances. A protocol that looks harmless can become difficult to satisfy once isolation enters the picture. A type that is fine in one module can behave differently when imported from another module with different concurrency annotations.

This is the part that feels least like the async/await I wanted. The control flow got nicer, but the type system gained a second layer of meaning around every boundary. Is this value allowed to cross here? Is this function isolated? Is this conformance isolated? Does this closure need to be `@Sendable`? Is this warning a real bug, a modeling problem, or just the compiler being conservative?

There are good answers to those questions, but needing the answers has a cost.

Bob Nystrom's essay ["What Color is Your Function?"](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) described the basic async problem: once a function becomes async, that color tends to propagate upward through the call stack.

Swift has that problem, then adds more colors. A function is not only synchronous or asynchronous. It can also be actor-isolated or nonisolated. It can require `Sendable` values or reject them. It can run on the main actor, on another actor, on the caller's actor, or on the generic executor depending on annotations and build settings.

For highly concurrent systems, this can be the right trade-off. For many iOS apps, it mostly feels like extra surface area around code that was already effectively single-threaded.

## The trade-off

I do not think Swift concurrency is bad. It is technically impressive, and compile-time data-race safety is a serious achievement. I would rather have the compiler catch real isolation bugs than discover them as rare crashes in production.

But the cost is unevenly distributed. Developers building complex concurrent systems get the most benefit. Developers building straightforward UI apps still pay the migration cost and the ongoing cognitive overhead, often in exchange for guarantees they were not asking for.

The "Approachable Concurrency" work in Swift 6.2 is a step in the right direction. Progressive disclosure is the right idea: let simple code stay simple, and expose the full model when the code actually needs it.

But it does not remove the underlying complexity. It mostly delays the moment when you have to understand it.

I wanted async/await because I wanted to stop writing callback-shaped code. I got that, but I also got a type-system-enforced concurrency model that requires ongoing fluency in actors, isolation, sendability, and compiler modes.

Maybe that trade-off is justified for Swift as a whole. For the kind of iOS apps I usually build, it still feels much larger than the problem I wanted solved.
