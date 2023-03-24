+++
title = "Customizing semantic zoom in Windows 8 apps"
author = "Igor Kulman"
date = "2012-10-24"
url = "/customizing-semantic-zoom-in-windows-8-apps/"
categories = ["WinRT"]
tags = ["Csharp","WinRT"]
+++
Semantic zoom is an important part of all Windows 8 apps, it is a distinctive feature that differentiates them from other platforms. The SemanticZoom component works fine if you want the default experience, but if you want some customization you have to try a bit harder.

The problem with the SemanticZoom component is, that as a child of it&#8217;s Semantic­Zoom.ZoomedIn­View and SemanticZoom.Zo­omedOutView elements, displaying the two states, you can use only two standard components; GridView and ListView. You cannot use the Grid and show mixed content. If you use one of these components, then clicking on any item in the zoomed out state shows you the group in the zoomed in state. You cannot implement any custom behaviour, the ItemClick event gets completely ignored. So how do you customize the SemanticZoom component?

<!--more-->

The key is to notice that both the GridView and the ListView components implement the ISemanticZoomIn­formation interface. Any component implementing this interface can be used as a child of the SemanticZoom.Zo­omedInView and SemanticZoom.ZoomedOutView elements. So lets implement an component called SemanticGrid that inherits from Grid and implements ISemanticZoomInformation

```csharp
public class SemanticGrid: Grid,ISemanticZoomInformation
{
    ...
}
```

Let Visual Studio generate stubs for all the methods and properties in the ISemanticZoomIn­formation inteface. You do not need to implement them, just comment out the throw new NotImplementedException(); from all the methods and change the properties to

```csharp
public bool IsActiveView
{
    get;
    set;
}

public bool IsZoomedInView
{
     get;
     set;
}

public SemanticZoom SemanticZoomOwner
{
     get;
     set;
}
```

And you are done. You can use this component with the SemanticZoom component instead of the GridView or the ListView and customize the semantic zoom according to your needs. Also if you wrap a GridView in this SemanticZoomGrid and place it in the SemanticZoom.ZoomedOutView element, the ItemClick handler in the GridView will work and you can implement custom actions.
