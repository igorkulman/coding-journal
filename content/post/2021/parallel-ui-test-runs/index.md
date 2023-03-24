+++
Categories = ["CI", "Xcode", "iOS"]
Description = ""
Tags = ["CI", "Xcode", "iOS"]
Keywords = ["CI", "Xcode", "iOS"]
author = "Igor Kulman"
date = "2021-05-19T05:29:12+01:00"
title = "Allowing parallel iOS UI tests runs in CI"
url = "/parallel-ui-test-runs"

+++

If you have your CI machine set up to run multiple jobs in parallel you might have encountered a problem. You cannot run multiple iOS UI tests in the same simulator at the same time. They will fail.

## The problem

Imagine this scenario. You have one CI machine that allows two or more jobs to run in parallel. You have a UI tests job set up. Two of your developers push changes to their branches at (almost) the same time. The CI machine then tries to run two UI tests at the same time in the same simulator and at least one of them fails and has to be retried.

You can of course solve this problem by not allowing parallel jobs on the CI machine, but that slows down the CI process. There is a better way.

## The solution

You can create a brand new iOS simulator instance for every job, run the UI tests in this new simulator instance and then delete it when you are done. This way no matter how many iOS UI tests jobs you run in parallel they will all use a separate iOS simulator instance and not affect each other.

### Creating a new iOS simulator instance

The first step is to choose a unique simulator name for each job. You can generate some random `guid` for example. In `Gitlab CI` I just use the ID of the `Gitlab CI` job that is stored in the `${CI_PIPELINE_ID}` environment variable

First you need to create the new iOS simulator instance at the start of the CI job

```bash
xcrun simctl create ${CI_PIPELINE_ID} com.apple.CoreSimulator.SimDeviceType.iPhone-11 `xcrun simctl list runtimes | grep iOS | awk '{print $NF}'`
```

This command creates a new iOS simulator instance with the given name using the iPhone 11 device and the latest simulator runtime. Using the latest simulator runtime makes sure that when you update Xcode on the CI machine you do not have to do any changes to you CI scripts.

### Using the new iOS simulator instance

Now that you have a new iOS simulator instance created you can use it to run your iOS UI tests. You can simply pass the name to the `xcodebuild` command if you use it directly or use it instead of the device type when using `Fastlane`

<!--more-->

```ruby
desc "Run all iOS UI tests"
lane :ios_ui_tests do
  simulator_name = ENV["CI_PIPELINE_ID"]
  scan(scheme: "your-app-scheme",     
    devices: [simulator_name],
    clean: true)
end
```

### Deleting the new iOS simulator instance

You do not want all the iOS simulator instances to just live on the CI machine forever, you should delete them after use. You just need the name to do that

```bash
xcrun simctl delete ${CI_PIPELINE_ID}
```

Make sure that you do this not only when the CI job succeeds but also when it fails. For example in `Gitlab CI` you can use the `after_script` for that.