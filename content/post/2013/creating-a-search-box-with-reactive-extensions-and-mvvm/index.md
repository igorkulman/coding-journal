+++
title = "Creating a Search box with Reactive Extensions and MVVM"
author = "Igor Kulman"
date = "2013-12-02"
url = "/creating-a-search-box-with-reactive-extensions-and-mvvm/"
categories = ["Windows Phone"]
tags = ["Csharp","Caliburn-Micro","Windows Phone","XAML"]
+++
Having a Search box in a Windows Phone app is a common use-case but it is only rarely done right. A good Search box does not have a Search button associated with it that the users have to click when they are finished typing and want to start the search. A good Search box starts the search immediately when the user stops typing (for a certain period of time). 

You can implement this functionality with some nasty code using a DispatcherTimer, or you can use [Reactive Extensions][1]. You can use Reactive Extensions directly on a TextBox representing the Search box, but if you use MVVM (and you should) you need to attach to the property associated with the Search box instead.

Suppose the ViewModel contains a string property called SearchTerm (with two-way binding to the Search box) and an event called PropertyChanged (used for the INotifyPropertyChanged implementation). We need to observe the changes of the SearchTerm property. There is no way to do it directly, we need to observe the PropertyChanged event instead. 

<!--more-->

We need to create an observable from the PropertyChanged event, subscribe to it filtering only the PropertyChanged calls regarding the SearchTerm property, throttling for 0.5 seconds

Using the throttle operator we will get exactly the desired behaviour of executing the Search method 0.5 seconds after the user stopped typing. 

{{< highlight csharp >}}
var observable = Observable.FromEvent<PropertyChangedEventArgs>(this, "PropertyChanged");
observable.Where(e => e.EventArgs.PropertyName == "SearchTerm").Throttle(TimeSpan.FromSeconds(.5)).ObserveOn(Deployment.Current.Dispatcher).Subscribe(e => Search());
{{< / highlight >}}

However, there is a small problem. The SearchTerm property changes (and fires the PropertyChanged event) only when the Search box loses focus. We need to make the SearchTerm property change after each letter typed instead. In WPF that would be trivial using UpdateTrigger, but Windows Phone does not support UpdateTrigger. 

We need to create a custom binding utility

{{< highlight csharp >}}
public class BindingUtility
{
    public static bool GetUpdateSourceOnChange(DependencyObject d)
    {
        return (bool)d.GetValue(UpdateSourceOnChangeProperty);
    }

    public static void SetUpdateSourceOnChange(DependencyObject d, bool value)
    {
        d.SetValue(UpdateSourceOnChangeProperty, value);
    }

    // Using a DependencyProperty as the backing store for …
    public static readonly DependencyProperty
      UpdateSourceOnChangeProperty =
        DependencyProperty.RegisterAttached(
        "UpdateSourceOnChange",
        typeof(bool),
        typeof(BindingUtility),
        new PropertyMetadata(false, OnPropertyChanged));

    private static void OnPropertyChanged(DependencyObject d,DependencyPropertyChangedEventArgs e)
    {
        var textBox = d as TextBox;
        if (textBox == null)
            return;
        
        if ((bool)e.NewValue)
        {
            textBox.TextChanged += OnTextChanged;
        }
        else
        {
            textBox.TextChanged -= OnTextChanged;
        }
    }
    
    static void OnTextChanged(object s, TextChangedEventArgs e)
    {
        var textBox = s as TextBox;
        if (textBox == null)
            return;

        var bindingExpression = textBox.GetBindingExpression(TextBox.TextProperty);
        if (bindingExpression != null)
        {
            bindingExpression.UpdateSource();
        }
    }
}
{{< / highlight >}}

and apply it to the Search box

{{< highlight xml >}}
 <TextBox Text="{Binding SearchTerm, Mode=TwoWay}" c:BindingUtility.UpdateSourceOnChange="True"  />
{{< / highlight >}}

 [1]: http://msdn.microsoft.com/en-us/data/gg577609.aspx
