+++
title = "Converting HEX color to SolidColorBrush"
author = "Igor Kulman"
date = "2012-11-22"
url = "/converting-hex-color-to-solidcolorbrush/"
categories = ["WinRT"]
tags = ["Csharp","WinRT"]
+++
XAML supports stating color definitions as hexa strings (starting with #) but there is no built-in way to do it in C#, you must write your own method to do it, that might look like this

{{< highlight csharp >}}
public static class ColorHelper
{
    public static SolidColorBrush GetColorFromHexa(string hexaColor)
    {
        return new SolidColorBrush(
            Color.FromArgb(
                255,
                Convert.ToByte(hexaColor.Substring(1, 2), 16),
                Convert.ToByte(hexaColor.Substring(3, 2), 16),
                Convert.ToByte(hexaColor.Substring(5, 2), 16)
            )
        );
    }
}
{{< / highlight >}}

<!--more-->
