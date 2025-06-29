+++
Description = ""
Tags = ["Git", "Xcode", "iOS"]
author = "Igor Kulman"
date = "2021-12-21T05:29:12+01:00"
title = "Automatically merging conflicts in Xcode project files"
url = "/automatically-merge-xcode-project-conflicts"
images = ["/automatically-merge-xcode-project-conflicts/kintsugi.png"]

+++

Dealing with code conflicts is somethings every developer is probably used to, but it is never a good experience, especially when dealing with file formats that are not exactly human readable, like Xcode project files.

The Xcode projects files (`project.pbxproj`) are a proper mess with every file appearing multiple times, being referenced by an id, etc .. definitely not something you would want to deal with manually. Luckily there is a better way.

### Kintsugi

[Kintsugi](https://github.com/Lightricks/Kintsugi) is lightweight tool to automatically resolve Git conflicts that occur in Xcode project files. You install the Kintsugi gem with


```bash
gem install kintsugi
```

and then simply calling it a path to a project as a parameter.

For example if you have a merge conflicts in `App/project.pbxproj` you execute

```bash
kintsugi App/project.pbxproj
```

and Kintsugi will take care of the conflicts for you.

I have been using Kintsugi for a few weeks now and I have to say it works really well. There was only one time so far it failed to automatically merge a conflicts I had in an Xcode project file.

<!--more-->