---
title: Dialog helper for Universal Apps the easy way
author: Igor Kulman
layout: post
date: 2014-12-24
url: /dialog-helper-for-universal-apps/
twitterCardType:
  - summary
cardImageWidth:
  - 280
cardImageHeight:
  - 150
dsq_thread_id:
  - 3355663322
categories:
  - Windows Phone
  - WinRT
tags:
  - 'c#'
  - Windows Phone
  - windows store
  - winrt
  - xaml
---
Today I read Joost van Schaik&#8217;s blog post called [A behavior to show a MessageDialog from a MVVMLight viewmodel in Universal apps–with callbacks][1]. I am not a MVVMLight guy (I use Caliburn.Micro) and I personally use an approach that uses a little less code, employing a helper class.

**Helper class**

with a simple usage in ViewModel

and in the View (making use of Caliburn.Micro mapping the AppBarButton with x:Name=&#8221;Message&#8221; to the Message method in the ViewModel

If you want to show a dialog with just the Ok button, set cancelText to null and do not process the helper method&#8217;s result.

**Simple service**

If you do not like static classes, just make it service

the usage in the ViewModel will change just slightly

and you can easily mock the service and test the ViewModel.

You can find the complete code in a sample solution on GitHub: <https://github.com/igorkulman/SampleMessagePopup>.

 [1]: http://dotnetbyexample.blogspot.nl/2014/12/a-behavior-to-show-messagedialog-from.html