+++
title = "Creating a fake splashscreen for your Universal App"
author = "Igor Kulman"
date = "2014-12-23"
url = "/creating-a-fake-splashscreen-for-your-universal-app/"
categories = ["Windows Phone","WinRT"]
tags = ["Csharp","Windows Phone","Windows Store","WinRT","XAML"]
+++
Sometimes you may want your app to display the startup splashscreen a bit longer, so you can initialize or fetch some data necessary for the app to run. To achieve this, you can create a fake splaschreen, a View that looks just like the splashscreen, does all the work and redirects to the real main View afterwards. 

In theory, it is quite simple:

  * Create a SplashScreenView with just the right background and the splashscreen image
  * Set the app to display SplashScreenView at startup
  * Do all the initializing and data fetching in SplashScreenViewModel and redirect to there real MainView

This works quite well with Windows 8.1, but on Windows Phone 8.1 there is a problem. When you run the Windows Phone 8.1 app, you will see a page transition happen between the real splashscreen and your SplashScreenView. This looks strange, so it is better to get rid of it. 

<!--more-->

**Managing the Frame transitions on Windows Phone 8.1**

To fix this issue, you can disable the transitions on the frame and add them manually to each View other than SplashScreenView, but there is a better way. You can disable the transitions when creating the frame and the enable them after navigating from the SplashScreenView. Do not forget the [#ifdefs, because it is one of those many things that are Windows Phone specific in the Universal Apps][1].

{{< highlight csharp >}}
#if WINDOWS_PHONE_APP
frame.ContentTransitions = null;
frame.Navigated += (s, e) =>
{
    if (e.SourcePageType != typeof (SplashScreenView))
    {
        var rootFrame = s as Frame;
        rootFrame.ContentTransitions = new TransitionCollection() {new NavigationThemeTransition()};
        rootFrame.Navigated -= this.RootFrame_FirstNavigated;
    }
};
#endif
{{< / highlight >}}

This makes the illusion of the fake splashscreen perfect, but I would recommend adding a ProgressBar or ProgressRing to the SplashScreenView so the users do not have the feeling that your app froze.

 [1]: http://blog.kulman.sk/why-universal-apps-as-not-as-universal-as-you-may-think/ "Why Universal Apps as not as universal as you may think"
