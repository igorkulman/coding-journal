+++
title = "Dialog helper for Universal Apps the easy way"
author = "Igor Kulman"
date = "2014-12-24"
url = "/dialog-helper-for-universal-apps/"
categories = ["Windows Phone","WinRT"]
tags = ["c#","Windows Phone","windows store","winrt","xaml"]
+++
Today I read Joost van Schaik&#8217;s blog post called [A behavior to show a MessageDialog from a MVVMLight viewmodel in Universal apps–with callbacks][1]. I am not a MVVMLight guy (I use Caliburn.Micro) and I personally use an approach that uses a little less code, employing a helper class.

**Helper class**

<script src="https://gist.github.com/igorkulman/fda1860b35d5312e9157.js?file=DialogHelper.cs"></script>

with a simple usage in ViewModel

<!--more-->

<script src="https://gist.github.com/igorkulman/fda1860b35d5312e9157.js?file=usage.cs"></script>

and in the View (making use of Caliburn.Micro mapping the AppBarButton with x:Name=&#8221;Message&#8221; to the Message method in the ViewModel

<script src="https://gist.github.com/igorkulman/fda1860b35d5312e9157.js?file=usage.xaml"></script>

If you want to show a dialog with just the Ok button, set cancelText to null and do not process the helper method&#8217;s result.

**Simple service**

If you do not like static classes, just make it service

<script src="https://gist.github.com/igorkulman/fda1860b35d5312e9157.js?file=DialogHelperService.cs"></script>

the usage in the ViewModel will change just slightly

<script src="https://gist.github.com/igorkulman/fda1860b35d5312e9157.js?file=usage2.cs"></script>

and you can easily mock the service and test the ViewModel.

You can find the complete code in a sample solution on GitHub: <https://github.com/igorkulman/SampleMessagePopup>.

 [1]: http://dotnetbyexample.blogspot.nl/2014/12/a-behavior-to-show-messagedialog-from.html
