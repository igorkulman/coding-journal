+++
title = "Developing Windows Store apps with Caliburn Micro Part 3: saving and restoring state"
author = "Igor Kulman"
date = "2013-08-13"
url = "/developing-windows-store-apps-with-caliburn-micro-part-3-saving-and-restoring-state/"
categories = ["WinRT"]
tags = ["Csharp","Caliburn-Micro","Windows Store","WinRT","XAML"]
+++
In the [previous post][1] I stated that a well-behaved Windows Store app should remeber the View the user navigated to before suspension and navigate to this View upon next run. The View can contain some input that the user can fill in. A well-behaved Windows Store app should remember the user&#8217;s input and restore it after suspension. 

**Saving and restoring state**

Implementation of the above-mentioned scenario is not very complicated, thanks to the project setup. If you want your ViewModel to be able to save and restore state, implement the IHaveState interface. It contains two method that you can override; SaveState and LoadState. In bith method you have access to a page state dictionary that you can use to save and load the state. 

<!--more-->

Let us reuse the SecondPageViewModel from the last post. Implement IHaveState, add two string properties and use the SaveState and LoadState method to save and load them using the page state dictionary

{{< highlight csharp >}}
[ImplementPropertyChanged]
public class SecondPageViewModel: ViewModelBase, IHaveState
{
    public string Title { get; set; }
    public string Property1 { get; set; }
    public string Property2 { get; set; }

    public SecondPageViewModel(INavigationService navigationService) : base(navigationService)
    {
        Title = "Second Page";
    }

    public void GoBack()
    {
        this.navigationService.GoBack();
    }

    public override void LoadState(string Parameter, Dictionary<string, object> statePageState)
    {
        Property1 = (string)statePageState["Property1"];
        Property2 = (string)statePageState["Property2"];
    }

    public override void SaveState(Dictionary<string, object> statePageState, List<Type> knownTypes)
    {
        statePageState.Add("Property1", Property1);
        statePageState.Add("Property2", Property2);
    }
}
{{< / highlight >}}

To test it, first add two TextBoxes to the SecondPageView with two-way binding

{{< highlight xml >}}
 <Grid Background="Red">
  <TextBlock x:Name="Title" />
  <Button Content="Go back" x:Name="GoBack" HorizontalAlignment="Left" Margin="10,58,0,0" VerticalAlignment="Top"/>

<TextBox HorizontalAlignment="Left" Margin="80,201,0,0" TextWrapping="Wrap" Text="{Binding Property1, Mode=TwoWay}" VerticalAlignment="Top" Width="170" />
  <TextBlock HorizontalAlignment="Left" Margin="10,210,0,0" TextWrapping="Wrap" Text="Property1:" VerticalAlignment="Top"/>
  <TextBox HorizontalAlignment="Left" Margin="80,238,0,0" TextWrapping="Wrap" Text="{Binding Property2, Mode=TwoWay}" VerticalAlignment="Top" Width="170" />
  <TextBlock HorizontalAlignment="Left" Margin="10,248,0,0" TextWrapping="Wrap" Text="Property2:" VerticalAlignment="Top"/>
</Grid>
{{< / highlight >}}

Now run the application, navigate to the SecondPageViewModel and fill in the TextBoxes. Switch to Visual Studio and invoke the Suspend and Shutdown command. When you run the application again, you will see the SecondPageViewModel with TextBoxes with the same values as before the suspension.

The code is again [available at Github][2]. If you are interested in the implementation of saving and loading state, read [this article][3].

 [1]: http://blog.kulman.sk/developing-windows-store-apps-with-caliburn-micro-part-2-navigation/ "Developing Windows Store apps with Caliburn Micro Part 2: navigation"
 [2]: https://github.com/igorkulman/CaliburnDemoWinRT
 [3]: http://nybbles.blogspot.cz/2013/02/winrt-caliburnmicro-and-ioc-part-3.html

{{% github-repo "igorkulman/CaliburnDemoWinRT" %}}
