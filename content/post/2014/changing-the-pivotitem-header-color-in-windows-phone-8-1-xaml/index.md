+++
title = "Changing the PivotItem header color in Windows Phone 8.1 XAML"
author = "Igor Kulman"
date = "2014-12-29"
url = "/changing-the-pivotitem-header-color-in-windows-phone-8-1-xaml/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone","WinRT","XAML"]
+++
Windows Phone 8.1 XAML contains a Pivot control that looks like the one from Windows Phone 7/8 and also should behave the same way, but does not. You will find the first problem with the new Pivot when you want to change the PivotItem header color.

**Windows Phone 7/8**

If you want to change the PivotItem header color in Windows Phone 7/8, you just define the color in the Header template:

{{< highlight xml >}}
<controls:PivotItem.Header> 
  <TextBlock Text="{Binding}" Foreground="{StaticResource PhoneAccentBrush}"/> 
</controls:PivotItem.Header> 
{{< / highlight >}}

This works great, changing the color of the active PivotItem Header to the color you want and applying some opacity to the inactive PivotItem Headers.

{{% post-image "header78.png" %}}

<!--more-->

**Windows Phone 8.1 XAML**

If you apply the same Header template to PivotItem in Windows Phone 8.1 XAML, you will find that there is a bug in the control. The inactive PivotItem Headers do not get opacity change applied.

{{% post-image "header81.png" %}}

This is obviously a problem, if you do not want to do same SelectedIndex manipulation to change the color programatically for all the inactive PivotItem headers. 

Luckily, there is a way to fix this. You can redefine the PivotHeaderForegroundUnselectedBrush and PivotHeaderForegroundSelectedBrush to the active and inactive colors of your choice.

{{< highlight xml >}}
<SolidColorBrush
    x:Key="PivotHeaderForegroundUnselectedBrush"
    Color="#B3DCF1" />
<SolidColorBrush
    x:Key="PivotHeaderForegroundSelectedBrush"
    Color="#3ab2e1" />
{{< / highlight >}}
