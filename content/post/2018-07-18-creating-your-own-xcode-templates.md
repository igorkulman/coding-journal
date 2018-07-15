+++
Categories = ["Swift", "iOS", "Xcode"]
Description = ""
Tags = ["Swift", "iOS", "Xcode"]
Keywords = ["Swift", "iOS", "Xcode"]
author = "Igor Kulman"
date = "2018-07-18T08:29:12+01:00"
title = "Creating and using your own Xcode file templates"
url = "/creating-your-own-xcode-templates"
share_img = "/images/XcodeTemplates.png"

+++

Working on an iOS or macOS project in Xcode you typically create classes with the same structure over and over again. 

I [use coordinators](architecting-ios-apps-coordinators) so I am creating new `UIViewControllers`, each time referencing RxSwift, having methods for setting up UI, bindings .. most of the time also containing a delegate for the coordinator. 

Having to crate files with the same structure over and over again manually is a waste of time, a much better solution is creating Xcode file templates for those files.

## Xcode file templates

### File template location

All the Xcode custom file templates are located in `~/Library/Developer/Xcode/Templates/File Templates` and grouped into sections by their folder name. If you want Xcode to show a "Custom" section at the bottom of the new file dialog, just create a `~/Library/Developer/Xcode/Templates/File Templates/Custom` folder.

{{% img-responsive "/images/XcodeTemplates.png" %}}

### File template structure

Each file template is a separate folder with a name ending in `.xctemplate`. If you want to create a simle "Swift Class" file template, you have to create a folder named `ViewController with Delegate.xctemplate` in `~/Library/Developer/Xcode/Templates/File Templates/Custom`. 

Each file template folder should contain at least 3 files:

- `TemplateInfo.plist` - describing the template
- `TemplateIcon.png` - icon shown in the Xcode new file dialog
- `___FILEBASENAME___.swift` - the actual template file

<!--more-->

You are not limited to just 1 template file, you can create more. This can be useful if you want to create a `UIViewController` [together with a XIB or a ViewModel](https://github.com/igorkulman/xcode-templates/tree/master/Templates/ViewController%20and%20ViewModel.xctemplate).

#### Template description

The `TemplateInfo.plist` file contains basic template description. The important thing is template `Kind` and the `MainTemplateFile`. You can also set a default filename with `DefaultCompletionName`

{{% gist id="c518c66de96b1c9d8c879414089fb7e6" file="TemplateInfo.plist" %}}


#### Template file

You can put basically anything into the actual template file. You can use text macros like `___FILENAME___` to reference the filename,  `___FILEBASENAMEASIDENTIFIER___` to reference the filename without extension, etc. A full list of text macros use can use [is available on the Xcode help website](https://help.apple.com/xcode/mac/9.0/index.html?localePath=en.lproj#/dev7fe737ce0).

My template for a `UIViewController` with a delegate looks like this

{{% gist id="c518c66de96b1c9d8c879414089fb7e6" file="___FILEBASENAME___.swift" %}}

If you do not want to start from scratch, take a look at [my sample Xcode templates on Github](https://github.com/igorkulman/xcode-templates).