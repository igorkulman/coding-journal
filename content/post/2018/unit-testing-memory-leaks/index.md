+++
Description = "After adding a new feature to the iOS app I currently works on I noticed an unexpected memory spike after the app was used for a while. This usually means a memory leak; some object not being deallocated after it is no longed need. This is often caused by using `self` without `unowned` / `weak` or by forgetting to make the delegates `weak` can warn you about this case)."
Tags = ["iOS", "Swift", "Unit Tests", "Memory Management", "Testing"]
author = "Igor Kulman"
date = "2018-11-28T05:29:12+01:00"
title = "Unit testing view controller memory leaks"
url = "/unit-testing-memory-leaks"

+++

After adding a new feature to the iOS app I currently works on I noticed an unexpected memory spike after the app was used for a while. This usually means a memory leak; some object not being deallocated after it is no longed need. This is often caused by using `self` without `unowned` / `weak` or by forgetting to make the delegates `weak` (tools like [SwiftLint](https://github.com/realm/SwiftLint) can warn you about this case).

In my case the problem was a `UIViewController` not being deallocated after being removed from the navigation stuck because of a error in a binding. I found the bug using the Instruments in Xcode but it got me ask some questions. What if there are memory leaks in other parts for the app, in flows that are not used so much? Is there a way to somehow automatically test for memory leaks? I found [SpecLeaks](https://github.com/leandromperez/specleaks) as the best way to answer those questions.

### SpecLeaks

[SpecLeaks](https://github.com/leandromperez/specleaks) is a framework build on top of [Quick](https://github.com/Quick/Quick) and [Nimble](https://github.com/Quick/Nimble) that helps you to unit test memory leaks in Swift. You can use it to unit test memory leaks in any kind of objects, I chose to unit test my view controllers because they seemed to be most probable cause of memory leaks in my apps.

SpecLeaks can detect that your are testing a `UIViewController` and also call `viewDidLoad` to fully initialize the `UIViewController`. A simple memory leak test may then look like this

```swift
class SomeViewControllerTests: QuickSpec {
    override func spec() {
        describe("SomeViewController") {
            describe("viewDidLoad") {
                let vc = LeakTest {
                    return SomeViewController()
                }
                it("must not leak"){
                    expect(vc).toNot(leak())
                }
            }
        }
    }
}
```

You can initialize your view controllers using `init` or get them from story boards, it does not matter. The unit tests will fail for every leaking view `UIViewController`.

<!--more-->

If you think some of your methods may be causing a memory leak when being called at same later point (because they use closures for example), you can also test for that

```swift
class SomeViewControllerTests: QuickSpec {
    override func spec() {
        describe("SomeViewController") {
            describe("viewDidLoad") {
                let vc = LeakTest {
                    return SomeViewController()
                }
                it("must not leak"){
                    expect(vc).toNot(leak())
                }
            }
            describe("calling 'suspiciousMethod'") {
                let vc = LeakTest {
                      return SomeViewController()
                }

                let methodCalled : (SomeViewController) -> ()  = { obj in
                  obj.suspiciousMetod()
                }

                expect(vc).toNot(leakWhen(methodCalled))
            }
        }
    }
}
```

#### Practical example

In my project I use [Swinject](https://github.com/Swinject/Swinject) for Dependency Injection, so in my unit test I just need to set up the Dependency Injection container with mocks or stubs instead of real services

```swift
extension ViewControllerLeakTests {
    func setupDependencies() -> Container {
        let container = Container()

        // services
        container.autoregister(SettingsService.self, initializer: SettingsServiceMock.init).inObjectScope(ObjectScope.container)
        container.autoregister(DataService.self, initializer: DataServiceMock.init).inObjectScope(ObjectScope.container)

        ...
        return container
    }
}
```

and then I can initialize the view controllers the exact same way as in the main application.

```swift
class ViewControllerLeakTests: QuickSpec {
    override func spec() {
        let container = setupDependencies()

        describe("AboutViewController") {
            describe("viewDidLoad") {
                let vc = LeakTest {
                    return container.resolveViewController(AboutViewController.self)
                }
                it("must not leak") {
                    expect(vc).toNot(leak())
                }
            }
        }

        describe("LibrariesViewController") {
            describe("viewDidLoad") {
                let vc = LeakTest {
                    return container.resolveViewController(LibrariesViewController.self)
                }
                it("must not leak") {
                    expect(vc).toNot(leak())
                }
            }
        }
        ...
    }
}
```

where `resolveViewController` is an extension method initializing the `UIViewController` from the right story board, settings its view model if needed, etc.

To see the implementation details, check out my [iOSSampleApp in Github](https://github.com/igorkulman/iOSSampleApp).

{{% github-repo "igorkulman/iOSSampleApp" %}}
