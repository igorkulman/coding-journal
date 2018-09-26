+++
title = "Encoding two ints into a long to be used as navigation parameter"
author = "Igor Kulman"
date = "2012-12-05"
url = "/encoding-two-ints-into-a-long-to-be-used-as-navigation-parameter/"
categories = ["WinRT"]
tags = ["WinRT"]
+++
When navigating in a Windows Store app, you can specify a navigation parameter. This navigation parameter can be any object but there is a problem. When the application is suspended, this navigation parameter is saved by the LayoutAwarePage. This works only with primitive data types, unless you change the implementation of the class which instances you pass as the navigation parameter.

I use mainly ints (article id, gallery id &#8230;) as navigation parameters but sometimes just on int is not enough. If I want to pass two int parameters, I &#8220;encode&#8221; them into an int and then &#8220;decode&#8221; back on the target page. I have a simple Utils class for this purpose.

<!--more-->

{{< highlight csharp >}}
public static class Utils
{
    public static long MakeLong(int left, int right)
    {
        long res = left;
        res = (res << 32);
        res = res | (long)right;
        return res;
    }

    public static Tuple<int, int> MakeTwoInts(long x)
    {
        int a = (int)(x & 0xffffffffL);
        int b = (int)(x >> 32);
        return Tuple.Create(b, a);
    }
}
{{< / highlight >}}
