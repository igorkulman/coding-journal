+++
Categories = ["iOS", "Xcode"]
Description = ""
Tags = ["iOS", "Xcode"]
Keywords = ["iOS", "Xcode"]
author = "Igor Kulman"
date = "2020-10-07T05:29:12+01:00"
title = "Generating boilerplate Swift code with GYB"
url = "/generating-boilerplate-swift-code"
images = ["/generating-boilerplate-swift-code/BuildPhase.png"]

+++

How many times how you copied and pasted some code in your current codebase because there was no good way to abstract it? Maybe because it was some repeating code required by a framework or mapping of some data transfer structures.

Writing such boilerplate code is an error-prone waste of time, especially when there is a much better way: generating that code. 

There are a few tools to help you do that, one of the most flexible of them being `GYB`.

### What is GYB?

`GYB` is a lightweight templating system that allows you to use `Python` to generate text files. Those text files can be `Swift` source code files or anything else you need.  

`GYB` is used in the `Swift` standard library codebase so it works well for generating `Swift` source code and it is a proven technology that works.

You can download `GYB` to your project from the `Swift` repository on Github

```bash
wget https://raw.githubusercontent.com/swiftlang/swift/refs/heads/main/utils/gyb.py
wget https://raw.githubusercontent.com/swiftlang/swift/refs/heads/main/utils/gyb
chmod +x gyb
```

I put it directly to the project directory and include it in the source control for simpler build and CI/CD setup.

### Creating GYB templates

`GYB` templates for generating `Swift` source file look like `Swift` source files with some `Python` snippets for code generation.

This is probably best shown on an actual example. Let's say you have a list of permissions that the app needs to support. Those permissions are then a part of a protocol and of a few structs.

<!--more-->

You can create a template that generates the protocol from a `CSV` with the permissions

```swift
%{
  import csv
  permissions = []

  source_file = open('Data/permissions.csv', 'rb')
  for line in csv.DictReader(source_file, delimiter = ','):
      permissions.append(line["Name"])
}%
import Foundation

public enum Permission {
    case Allow
    case Deny
    case Undefined
}

public protocol Permissions {
    % for permission in permissions:
    var ${permission}: Permission { get }
    % end
}
```

This `GYB` template really looks like a `Swift` source file just with one difference. Instead of manually adding properties for all the permissions you just use a `for` loop to have those properties generated.

You can use `% code: ... % end` to manage control flow, like using the `for` loop in this example, or `%{ code }` to evaluate `Python code`, like printing the permission names read from the `CSV` file.

The resulting `Swift` file might look something like this

```swift
import Foundation

public enum Permission {
    case Allow
    case Deny
    case Undefined
}

public protocol Permissions {
    var accessPhotos: Permission { get }
    var accessVideos: Permission { get }
    var accessMicrophone: Permission { get }
    var accessLocation: Permission { get }
    var accessCalendar: Permission { get }
    var fileSharing: Permission { get }
    var openIn: Permission { get }
    var copyPaste: Permission { get }
    var emailConversation: Permission { get }
    var inviteMembers: Permission { get }
    var leaveConversation: Permission { get }
    var attachments: Permission { get }
}
```

You can then also generate different implementation of this protocol, for example parsing those permissions from the backend or from an MDM

```swift
%{
  import csv

  permissions = []

  source_file = open('Data/permissions.csv', 'rb')
  for line in csv.DictReader(source_file, delimiter = ','):
      permissions.append(line["Name"])
}%
import Foundation

struct AppConfigPermissions: Permissions {
    % for permission in permissions:
    let ${permission}: Permission
    % end

    init(config: [String: Any]) {
        let getPermissionForKey = { (key: String) -> Permission in
            if let value = config[key] as? Bool {
                switch value {
                case true:
                    return .Allow
                case false:
                    return .Deny
                }
            }
            return .Undefined
        }

        % for permission in permissions:
        ${permission} = getPermissionForKey("allow${permission[:1].upper() + permission[1:]}")
        % end
    }
}
```

generates

```swift
import Foundation

struct AppConfigPermissions: Permissions {
    let accessPhotos: Permission
    let accessVideos: Permission
    let accessMicrophone: Permission
    let accessLocation: Permission
    let accessCalendar: Permission
    let fileSharing: Permission
    let openIn: Permission
    let copyPaste: Permission
    let emailConversation: Permission
    let inviteMembers: Permission
    let leaveConversation: Permission
    let attachments: Permission

    init(config: [String: Any]) {
        let getPermissionForKey = { (key: String) -> Permission in
            if let value = config[key] as? Bool {
                switch value {
                case true:
                    return .Allow
                case false:
                    return .Deny
                }
            }
            return .Undefined
        }

        accessPhotos = getPermissionForKey("allowAccessPhotos")
        accessVideos = getPermissionForKey("allowAccessVideos")
        accessMicrophone = getPermissionForKey("allowAccessMicrophone")
        accessLocation = getPermissionForKey("allowAccessLocation")
        accessCalendar = getPermissionForKey("allowAccessCalendar")
        fileSharing = getPermissionForKey("allowFileSharing")
        openIn = getPermissionForKey("allowOpenIn")
        copyPaste = getPermissionForKey("allowCopyPaste")
        emailConversation = getPermissionForKey("allowEmailConversation")
        inviteMembers = getPermissionForKey("allowInviteMembers")
        leaveConversation = getPermissionForKey("allowLeaveConversation")
        attachments = getPermissionForKey("allowAttachments")
    }
}
```

If you then need to add support for a new permission in the future, you **just add it to the CSV file and the Swift code gets regenerated. No need to add the permissions manually** to the protocol or to its different implementations.

### Generating code

With the `GYB` templates created you now need to make Xcode generate the `Swift` source files from those templates. Ideally only when the templates change, not on every build.

I use a script that relies on a naming convention. The template is always called `SomeFile.swift.gyb` and it generated `SomeFile.swift`. 

This script 

```bash
for INFILE in ${!SCRIPT_INPUT_FILE_*};
do
    file=${!INFILE}
    if [ ${file: -4} == ".gyb" ]; then
        echo "Processing template $file"
        "${PROJECT_DIR}/support/gyb" --line-directive '' -o "${file%.gyb}" "$file"
    fi
done
```

is added as a build phase of the Xcode project

![Code generation build phase](BuildPhase.png)

The script traverses all the files given as `Input files` in the Xcode build phase settings. If a file is a `GYB` template, it gets processed into a `Swift` code file.

Properly defining `Input files` and `Output files` is important because Xcode will run this build phase only when any of them changes or is missing. This is also the reason for including the `CSV` file in `Input files` even if it is not a `GYB` template file.

This build phase needs to be added before the `Compile sources` build phase so the files are generated before Xcode tries to build the project.

### Sample project

As you might have noticed, setting up `GYB` generation in Xcode is not exactly trivial so I have created a [sample project on Github](https://github.com/igorkulman/CodeGenerationSample) to help you see everything properly set up and working.
{{% github-repo "igorkulman/CodeGenerationSample" %}}