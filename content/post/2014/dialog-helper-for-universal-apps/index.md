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

```csharp
/// <summary>
/// Helper class for showing message dialogs
/// </summary>
public static class DialogHelper
{
    /// <summary>
    /// Shows a dialog with given message and ok/cancel buttons. 
    /// </summary>
    /// <param name="message">Message</param>
    /// <param name="title">Title</param>
    /// <param name="okText">OK text (optional)</param>
    /// <param name="cancelText">Cancel text (optional)</param>
    /// <returns>True if ok pressed, false otherwise</returns>
    public static async Task<bool> ShowMessageDialog(string message, string title, string okText, string cancelText)
    {
        bool result = false;
        var dialog = new MessageDialog(message, title);

        if (!string.IsNullOrWhiteSpace(okText))
        {
            dialog.Commands.Add(new UICommand(okText, cmd => result = true));
        }

        if (!string.IsNullOrWhiteSpace(cancelText))
        {
            dialog.Commands.Add(new UICommand(cancelText, cmd => result = false));
        }

        await dialog.ShowAsync();            
        return result;
    }
}
```

with a simple usage in ViewModel

<!--more-->

```csharp
public async void Message()
{
    var res = await DialogHelper.ShowMessageDialog("Do you really want to do this?","My Title","Hell yeah!","No way");
    if (res)
    {
        Result = "Hell yeah!";
    } else 
    {
       Result = "NOOOO!";
    }
}
```

and in the View (making use of Caliburn.Micro mapping the AppBarButton with x:Name=&#8221;Message&#8221; to the Message method in the ViewModel

```xml
<Page.BottomAppBar>
<CommandBar>
  <AppBarButton Icon="Accept" Label="go ask!"  x:Name="Message" />
</CommandBar>
</Page.BottomAppBar>
```

If you want to show a dialog with just the Ok button, set cancelText to null and do not process the helper method&#8217;s result.

**Simple service**

If you do not like static classes, just make it service

```csharp
/// <summary>
/// Helper class for showing message dialogs
/// </summary>
public class DialogHelperService
{
    /// <summary>
    /// Shows a dialog with given message and ok/cancel buttons. 
    /// </summary>
    /// <param name="message">Message</param>
    /// <param name="title">Title</param>
    /// <param name="okText">OK text (optional)</param>
    /// <param name="cancelText">Cancel text (optional)</param>
    /// <returns>True if ok pressed, false otherwise</returns>
    public async Task<bool> ShowMessageDialog(string message, string title, string okText, string cancelText)
    {
        bool result = false;
        var dialog = new MessageDialog(message, title);
 
        if (!string.IsNullOrWhiteSpace(okText))
        {
            dialog.Commands.Add(new UICommand(okText, cmd => result = true));
        }
 
        if (!string.IsNullOrWhiteSpace(cancelText))
        {
            dialog.Commands.Add(new UICommand(cancelText, cmd => result = false));
        }
 
        await dialog.ShowAsync();            
        return result;
    }
}
```

the usage in the ViewModel will change just slightly

```csharp
public async void Message()
{
    var res = await _dialogHelperService.ShowMessageDialog("Do you really want to do this?","My Title","Hell yeah!","No way");
    if (res)
    {
        Result = "Hell yeah!";
    } else 
    {
       Result = "NOOOO!";
    }
}
```

and you can easily mock the service and test the ViewModel.

You can find the complete code in a sample solution on GitHub: <https://github.com/igorkulman/SampleMessagePopup>.

{{% github-repo "igorkulman/SampleMessagePopup" %}}

 [1]: http://dotnetbyexample.blogspot.nl/2014/12/a-behavior-to-show-messagedialog-from.html
