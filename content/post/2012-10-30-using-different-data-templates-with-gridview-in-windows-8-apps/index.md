+++
title = "Using different data templates with GridView in Windows 8 apps"
author = "Igor Kulman"
date = "2012-10-30"
url = "/using-different-data-templates-with-gridview-in-windows-8-apps/"
categories = ["WinRT"]
tags = ["Csharp","WinRT"]
+++
GridView and ListView are the two of the most commonly used components in Windows 8 apps. Items in these two components are displayed according to the DataTemplate give as the ItemTemplate property. If you do not want to display all the items the same way, you need to use a custom ItemTemplateSelector.

Using ItemTemplateSelector in Windows 8 apps is easier and more straightforward that in Windows Phone 7 (I wrote about that [here in Slovak][1]). All you need to do is to create a class inheriting from the DataTemplateSelector and set the ItemTemplateSelector property of GridView (or ListView) to this new class.

<!--more-->

When inheriting from the DataTemplateSelector you need to override the SelectTemplateCore method. In this method you have accees to the binded item and and you can use it to decide which DataTemplate to return. You can define your DataTemplates in the App.xaml and access them via the Application.Current.Resources array with casting, but that is a bad habbit. A better solution would be to define public DataTemplate properties in your class and assign them in XAML.

A custom DataTemplateSelector class may look like this

{{< highlight csharp >}}
public class MainGridTemplateSelector : DataTemplateSelector
{
        public DataTemplate MagazineTemplate { get; set; }
        public DataTemplate BigMagazineTemplate { get; set; }

        protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
        {
            return (item is MagazineViewModel).IsTop ? BigMagazineTemplate : MagazineTemplate;
        }
}
{{< / highlight >}}

This class chooses one of two DataTemplates (MagazineTemplate, BigMagazineTemplate) according to the item&#8217;s IsTop boolean property.

In your XAML, first declare the MainGridTemplateSelector and set the DataTemplate properties class

{{< highlight xml >}}
<common:MainGridTemplateSelector x:Key="MainGridTemplateSelector"
    MagazineTemplate="{StaticResource MagazineTemplate}"
    BigMagazineTemplate="{StaticResource BigMagazineTemplate}" />
{{< / highlight >}}

Where MagazineTemplate and BigMagazineTemplate are DataTemplates defined in your XAML. Then simply set the ItemTemplateSelector property of the GridView (ListView)

{{< highlight xml >}}
<GridView
     ItemTemplateSelector="{StaticResource MainGridTemplateSelector}"
    …
/>
{{< / highlight >}}

 [1]: http://www.kulman.sk/sk/content/wp7-ako-zobrazovat-objekty-roznych-typov-v-listboxe
