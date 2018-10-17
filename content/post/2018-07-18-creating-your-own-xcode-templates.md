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

Having to create files with the same structure over and over again manually is a waste of time, a much better solution is creating Xcode file templates for those files.

## Xcode file templates

### File template location

All the Xcode custom file templates are located in `~/Library/Developer/Xcode/Templates/File Templates` and grouped into sections by their folder name. If you want Xcode to show a "Custom" section at the bottom of the new file dialog, just create a `~/Library/Developer/Xcode/Templates/File Templates/Custom` folder.

{{% img-responsive "/images/XcodeTemplates.png" %}}

### File template structure

Each file template is a separate folder with a name ending in `.xctemplate`. If you want to create a simple "Swift Class" file template, you have to create a folder named `Swift Class.xctemplate` in `~/Library/Developer/Xcode/Templates/File Templates/Custom`. 

Each file template folder should contain at least 3 files:

- `TemplateInfo.plist` - describing the template
- `TemplateIcon.png` - icon shown in the Xcode new file dialog
- `___FILEBASENAME___.swift` - the actual template file

<!--more-->

You are not limited to just 1 template file, you can create more. This can be useful if you want to create a `UIViewController` [together with a XIB or a ViewModel](https://github.com/igorkulman/xcode-templates/tree/master/Templates/ViewController%20and%20ViewModel.xctemplate).

#### Template description

The `TemplateInfo.plist` file contains basic template description. The important thing is template `Kind` and the `MainTemplateFile`. You can also set a default filename with `DefaultCompletionName`

{{< highlight plist >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Kind</key>
	<string>Xcode.IDEFoundation.TextSubstitutionFileTemplateKind</string>
	<key>Description</key>
	<string>Swift Class</string>
	<key>Summary</key>
	<string>Swift Class</string>
	<key>SortOrder</key>
	<string>30</string>
	<key>AllowedTypes</key>
	<array>
		<string>public.swift-source</string>
	</array>
	<key>DefaultCompletionName</key>
	<string>Class</string>
	<key>MainTemplateFile</key>
	<string>___FILEBASENAME___.swift</string>
</dict>
</plist>

{{< / highlight >}}


#### Template file

You can put basically anything into the actual template file. You can use text macros like `___FILENAME___` to reference the filename,  `___FILEBASENAMEASIDENTIFIER___` to reference the filename without extension, etc. A full list of text macros you can use [is available on the Xcode help website](https://help.apple.com/xcode/mac/9.0/index.html?localePath=en.lproj#/dev7fe737ce0).

My template for a Swift class looks like this

{{< highlight swift >}}
//
//  ___FILENAME___
//  ___PROJECTNAME___
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  ___COPYRIGHT___
//

import Foundation

class ___FILEBASENAMEASIDENTIFIER___ {
        
        init() {
                
        }
}
{{< / highlight >}}

If you do not want to start from scratch, take a look at [my sample Xcode templates on Github](https://github.com/igorkulman/xcode-templates).
