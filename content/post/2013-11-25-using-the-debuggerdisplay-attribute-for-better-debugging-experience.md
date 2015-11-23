---
title: Using the DebuggerDisplay attribute for better debugging experience
author: Igor Kulman
layout: post
date: 2013-11-25
url: /using-the-debuggerdisplay-attribute-for-better-debugging-experience/
dsq_thread_id:
  - 1997766167
categories:
  - Programming in general
tags:
  - 'c#'
  - debug
  - visual studio
---
When debugging a C# program in Visual Studio, I tend to always hover over the variables to glance at their values and structure instead of explicitly writing their names into the watch window. If I want to explore say a collection, I need to unfold each of the items using the + button to get an idea about the data:

{{% img-responsive "/images/debug1.png" %}}

This is not very comfortable, so thankfully, there is a way to make this experience better, using the [DebuggerDisplay][2] attribute. This attribute can be applied to any class (and struct, enum, property, field, delegate, assembly) and allows you to define the information about the class you wanto to see in the debugger. 

<!--more-->

Give the attribute a string to be displayed and in this string you can reference any data from the class:

{{< gist 7640468>}}

When you hover over the data now, you will see a nice readable &#8220;labels&#8221;:

{{% img-responsive "/images/debug2.png" %}}

If you do not want to add the DebuggerDisplay attribute to all your classes manually, you can use the [Visualize][4] addin for [Fody][5]. Visualize will add the DebuggerDisplay atribute to all your classes, using all the classe&#8217;s properties in the &#8220;label&#8221;.

**Warning**: showing this &#8220;labels&#8221; takes some time, so do not reference to many data fields.
 
 [2]: http://msdn.microsoft.com/en-us/library/system.diagnostics.debuggerdisplayattribute(v=vs.110).aspx 
 [4]: https://github.com/Fody/Visualize
 [5]: https://github.com/Fody/Fody