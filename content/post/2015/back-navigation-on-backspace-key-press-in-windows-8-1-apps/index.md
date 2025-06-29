+++
title = "Back navigation on Backspace key press in Windows 8.1 apps"
author = "Igor Kulman"
date = "2015-03-03"
url = "/back-navigation-on-backspace-key-press-in-windows-8-1-apps/"
Tags = ["Windows Phone", "Windows Store", "Navigation", "Keyboard Shortcuts", "UX"]
+++
I am not a mouse or a touch person, I like using the keyboard and keyboard shortcuts for everything. So when I (have to) use a Windows 8.1 Metro app, I always miss when the app does not navigate back when I press the Backspace key, just like the browser does.

Implementing this functionality is really simple, you just need to handle the KeyUp event and listen for the Backspace key. You can implement the KeyUp event handler on every View in your app, but that is not necessary. You can just hook up the global Window.Current.CoreWindow.KeyUp event after you app starts.

<!--more-->

```csharp
 Window.Current.CoreWindow.KeyUp += (_, args) =>
{
    if (args.VirtualKey == VirtualKey.Back)
    {
        var element = FocusManager.GetFocusedElement();
        if (element is TextBox || element is PasswordBox)
        {
            return; //do not disturb user when typing
        }

        var frame = (Frame)Window.Current.Content;
        if (frame.CanGoBack)
        {
            frame.GoBack();
        }
    }
};
```

If you implement this in your app, I am sure you will make some of your users more happy.
