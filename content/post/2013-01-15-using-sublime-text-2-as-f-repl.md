---
title: 'Using Sublime Text 2 as F# REPL'
author: Igor Kulman
layout: post
date: 2013-01-15
url: /using-sublime-text-2-as-f-repl/
onswipe_thumb:
  - SKIP
dsq_thread_id:
  - 1179173080
categories:
  - Functional programming
tags:
  - 'f#'
  - repl
  - sublime text
---
[Sublime Text 2][1] is a great multi-purpose text editor that you can run on Windows, MacOS and Linux. You can configure Sublime Text 2 to higlight and compile F# files and even to use F# Interactive and make it a F# REPL. Using Sublime Text 2 as F# REPL is useful when you work on MacOS and Linux (F# 3.0 works great with [Mono][2]) and cannot use Visual Studio 2012. If you are new to Sublime Text 2, check out the [Perfect Workflow in Sublime Text: Free Course][3].

**Installing necessary packages**

In order to use F# Interactive in Sublime Text 2, you have to install a few packages first. All the packages can be installed using [Sublime Package Control][4]. You need to install the following packages:

  * **F#**
  * **SublimeREPL**

<!--more-->

**Configuration**

The first package add F# support to Sublime Text 2 and the second one is a multipurpose REPL that can be used with many programming languages. After installing these packages, the F# REPL should immediately work if yoz have FSI in your path. Go to _Tools | SublimeREPL | F#_ to test it out. The F# REPL always starts with its working directory set to the directory of the currently opened and selected file.

If you do not have FSI in your path, go to _Preferences | Browse Packages_, find _SublimeREPL / Config / F_, open the _Main.sublime-menu_ file and change the path to the FSI. 

**Keyboard shortcut**

You can configure Sublime Text 2 to run F# REPL when you invoke a shortcut like _Ctrl+Alt+F_ (Visual Studio 2012 default shortcut for FSI) instead of going to _Tools | SublimeREPL | F#_. Go to _Preferences | Key bindings &#8211; user_ and change it to

{{< gist 5849427>}}

You can also configure Sublime Text 2 to set selected code to the F# REPL (_Tools | SublimeREPL | Eval in REPL | Selection_) when you press Ctrl+Shift+Enter just like in Visual Studio 2012 by adding 

{{< gist 5849431>}}

to the _Preferences | Key bindings &#8211; user_. All the settings files in Sublime Text 2 are JSON, so you need to paste this code into the array, just after the shortcut for F# REPL, separating them by a comma

{{< gist 5849442>}}

 [1]: http://www.sublimetext.com/
 [2]: http://www.mono-project.com/Main_Page
 [3]: http://net.tutsplus.com/articles/news/perfect-workflow-in-sublime-text-free-course/
 [4]: http://wbond.net/sublime_packages/package_control