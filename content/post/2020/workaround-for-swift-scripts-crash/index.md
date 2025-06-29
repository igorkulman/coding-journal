+++
Description = "If you updated to Xcode 11.4 that ships with Swift 5.2 you might have noticed that your Swift scripts all started crashing when accessing anything related to URL. Luckily I found a workaround!"
Tags = ["Swift", "Scripting", "Crash", "Workaround"]
author = "Igor Kulman"
date = "2020-03-26T05:29:12+01:00"
title = "Workaround for Swift scripts crashing after update to Xcode 11.4"
url = "/workaround-for-swift-scripts-crash"
images = ["/workaround-for-swift-scripts-crash/Swift_logo.png"]

+++

If you have already updated to Xcode 11.4 that ships with Swift 5.2 you might have noticed that your Swift scripts all started crashing when accessing anything related to `URL`.

I use a script to [generate a list of libraries used in the app and their licenses](/generating-a-list-of-libraries-your-ios-app-uses/) and running it now results in

```bash
Stack dump:
0.	Program arguments: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift -frontend -interpret test.swift -enable-objc-interop -stack-check -sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.15.sdk -color-diagnostics -module-name test
1.	Apple Swift version 5.2 (swiftlang-1103.0.32.1 clang-1103.0.32.29)
2.	While running user code "fetch_licenses.swift"
0  swift                    0x000000010e62d4ea PrintStackTraceSignalHandler(void*) + 42
1  swift                    0x000000010e62ccc0 SignalHandler(int) + 352
2  libsystem_platform.dylib 0x00007fff71c8242d _sigtramp + 29
3  libsystem_platform.dylib 0x0000000000004936 _sigtramp + 2386044198
4  libsystem_platform.dylib 0x00000001172ce020 _sigtramp + 2774842384
5  swift                    0x000000010a3b09ba llvm::MCJIT::runFunction(llvm::Function*, llvm::ArrayRef<llvm::GenericValue>) + 458
6  swift                    0x000000010a3b7a2b llvm::ExecutionEngine::runFunctionAsMain(llvm::Function*, std::__1::vector<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >, std::__1::allocator<std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > > > const&, char const* const*) + 2011
7  swift                    0x000000010a38caea performCompileStepsPostSILGen(swift::CompilerInstance&, swift::CompilerInvocation&, std::__1::unique_ptr<swift::SILModule, std::__1::default_delete<swift::SILModule> >, bool, llvm::PointerUnion<swift::ModuleDecl*, swift::SourceFile*>, swift::PrimarySpecificPaths const&, bool, int&, swift::FrontendObserver*, swift::UnifiedStatsReporter*) + 14362
8  swift                    0x000000010a3814a5 swift::performFrontend(llvm::ArrayRef<char const*>, char const*, void*, swift::FrontendObserver*) + 55813
9  swift                    0x000000010a2f74d3 main + 1283
10 libdyld.dylib            0x00007fff71a847fd start + 1
11 libdyld.dylib            0x000000000000000b start + 2388113423
fish: '/usr/bin/env xcrun swift fetch_…' terminated by signal SIGSEGV (Address boundary error)
```

This is a Swift bug [that has been already reported](https://bugs.swift.org/browse/SR-12403).

Luckily **I found a workaround!**.

If you do not run the script directly with `swift` but instead compile it first with `swiftc` and then run the binary, everything works just fine.

**Update**: The problem is caused by having other tools that bundle Swift libraries installed on the system, like `swiftlint` and uninstalling them solves the crash.

<!--more-->