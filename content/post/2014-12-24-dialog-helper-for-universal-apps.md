+++
title = "Dialog helper for Universal Apps the easy way"
author = "Igor Kulman"
date = "2014-12-24"
url = "/dialog-helper-for-universal-apps/"
categories = ["Windows Phone","WinRT"]
tags = ["Csharp","Windows Phone","Windows Store","WinRT","XAML"]
+++
Today I read Joost van Schaik&#8217;s blog post called [A behavior to show a MessageDialog from a MVVMLight viewmodel in Universal apps–with callbacks][1]. I am not a MVVMLight guy (I use Caliburn.Micro) and I personally use an approach that uses a little less code, employing a helper class.

**Helper class**

{{% gist id="fda1860b35d5312e9157" file="DialogHelper.cs" %}}

with a simple usage in ViewModel

<!--more-->

{{% gist id="fda1860b35d5312e9157" file="usage.cs" %}}

and in the View (making use of Caliburn.Micro mapping the AppBarButton with x:Name=&#8221;Message&#8221; to the Message method in the ViewModel

{{% gist id="fda1860b35d5312e9157" file="usage.xaml" %}}

If you want to show a dialog with just the Ok button, set cancelText to null and do not process the helper method&#8217;s result.

**Simple service**

If you do not like static classes, just make it service

{{% gist id="fda1860b35d5312e9157" file="DialogHelperService.cs" %}}

the usage in the ViewModel will change just slightly

{{% gist id="fda1860b35d5312e9157" file="usage2.cs" %}}

and you can easily mock the service and test the ViewModel.

You can find the complete code in a sample solution on GitHub: <https://github.com/igorkulman/SampleMessagePopup>.

{{% github-repo "igorkulman/SampleMessagePopup" %}}

 [1]: http://dotnetbyexample.blogspot.nl/2014/12/a-behavior-to-show-messagedialog-from.html
