---
title: 'C# scripting console for ASP.NET MVC application'
author: Igor Kulman
layout: post
date: 2014-01-09
url: /c-scripting-console-for-asp-net-mvc-application/
dsq_thread_id:
  - 2102443109
categories:
  - Windows Azure
tags:
  - azure
  - 'c#'
  - mvc
  - roslyn
---
In a recent larger ASP.NET MVC project running in Windows Azure I needed to provide the advanced users a way to execute custom scripts directly through the webbrowser. A kind of a scripting console where users can create and execute their own scripts, that interact with the project and automate some tasks (that would otherwise require too many clicks).

**Choosing the language**

I thought about using Lua but I needed an easy way to integrate with some classes (repositories) used in the project. I decided to use C# as the scripting language and implement the scripting console using [Roslyn][1]. Roslyn is a really neat project and I recommend taking a look at it, if you do not already know it.

I extracted the main idea of my implementation of the scripting console and [posted it on GitHub][2]. I will walk you through it in this blog post.

<!--more-->

**Basic implementation**

My basic solution consists of a Textarea the user writes the script to, the script then gets executed by Roslyn and the final result is shown. I also included a basic Repository class to show, that the scripts can use classes from the project. In the real implementation I have a logger class showing the ongoing logs and results but as I said, the Github repo is just an extracted basic idea of the scripting console.

To execute a C# script in your ASP.NET MVC (or any other) application, you first need to install the Roslyn package and its dependencies

<script src="https://gist.github.com/igorkulman/8159321.js?file=roslyn-nuget.ps"></script>

Let&#8217;s suppose you have the C# script you want to execute in a string variable called command obtained from the mentioned Textarea. First, you need to create the scripting engine and a session

There are ScriptEngine classes, one for C# and one for VB.NET so choose the one for C#. You can use any class as the context for the scripts. In the sample, I have a ScriptingContext class containing one public property of a type DataRepository. If you use a class as the context for the scripts, you can access all its properties (Repository of type DataRepository in my case) in the scripts.

To use a class as the context for the scripts, just pass it to the Roslyn session

<script src="https://gist.github.com/igorkulman/8159321.js?file=roslyn-session.cs"></script>

If you want to use more than the core C# libraries, you need to do some referencing and importing. If you are using a class as the context for the scripts, you need to reference its assembly. Suppose you want to use classes and methods from System.Xml and System.Xml.Linq in your scripts. First, you need to add references to the session

<script src="https://gist.github.com/igorkulman/8159321.js?file=roslyn-context.cs"></script>

and then import them to the session

<script src="https://gist.github.com/igorkulman/8159321.js?file=roslyn-import.cs"></script>

Everything is set up now, so just execute the script and get the result

<script src="https://gist.github.com/igorkulman/8159321.js?file=roslyn-exec.cs"></script>

The result of the script is the result of the last expression of the script so I recommend using a logger class in the context if you want to get more information about the execution of your script.

**Conclusion**

Thanks to Roslyn, I was able to create a really usable scripting console for the project and allow users to automate many tasks using C# scripts. This article and the demo project describe just the basics, there are many ways to make the experience better. I for example use the [CodeMirror][3] editor to provide C# syntax highlighting, to allow users to upload ZIP files they can process in their scripts, etc.

Source code: [WebConsole][4]

 [1]: http://msdn.microsoft.com/en-us/vstudio/roslyn.aspx
 [2]: http://igorkulman.github.io/WebConsole/
 [3]: http://codemirror.net/
 [4]: https://github.com/igorkulman/WebConsole