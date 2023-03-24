+++
Categories = ["iOS", "Xcode", "MapKit"]
Description = ""
Tags = ["iOS", "Xcode", "MapKit"]
Keywords = ["iOS", "Xcode", "MapKit"]
author = "Igor Kulman"
date = "2020-06-10T05:29:12+01:00"
title = "A few reason why your MKMapView unexpectedly crashes and how to fix them"
url = "/few-reasons-mkmapview-crashes"
series = "Using MKMapView and MapKit on iOS"

+++

In the last few months I have been working more intensively with `MapKit`, doing more advanced operations like [clustering map annotations](/clustering-annotations-in-mkpampview) or [animating annotation position changes](/animating-annotation-position-change-on-ios). 

I have encountered a few problem resulting in `MKMapView` quite unexpectedly crashing the whole application that I had to fix, or maybe better to say, work around.

### MKMapView crashing the view controller on dismiss

During the application testing I noticed a very strange bug. Sometimes when I dismissed the view controller with `MKMapView` the application just crashed. 

Debugging I noticed that it happened when the annotations on the map were updated just a short while before dismissing the view controller and the crash log pointed to `mapView(_:viewFor:)`. 

I guessed that `MKMapView` was processing annotation changes when the view controller was already `deallocated`. The `MKMapView` was still alive, tried to call its delegate, which was that deallocated view controller, and crashed.

The fix for this problem was setting the `MKMapView`'s delegate to `nil` in the view controller's `deinit` method.

```swift
deinit {
    mapView.delegate = nil
}
```

### Crashing when animating annotation position changes

The second crash I encountered was a bit more tricky. The application started crashing when I implemented [animating the annotation position changes](/animating-annotation-position-change-on-ios).

The way this works is you have a collection of your annotation objects, each has a `coordinate` property that needs to be `@objc dynamic` because `MKMapView` uses KVO to observe it. When you update this property the annotation changes its position on the map.

If you want to animate the position change on the map, you need to wrap the `coordinate` property assignment into `UIView.animate`. Doing this the application started crashing when the user moved the map, or zoomed it, or sometimes just after a while with the user not doing anything a all

The exception said

```
Collection was mutated while being enumerated.
```

but the annotation collection was not really mutated as a whole, some annotation in that collection was mutated by updating its `coordinate` property.

#### Theory about the crash

The circumstances of the crash led me to believe that there was some timing issue, my code updating the annotation at the same the `MKMapView` processes it in some way. 

Which would make sense, when the user moves the map or zooms it there might be some processing needed to bring annotations into view or hide them.

The interesting thing was **this only happened when using annotation clustering**. It never happened with "plain" annotations. 

With this observation it looked like `MKMapView` trying to recompute the clusters causing the crash.

<!--more-->

#### First idea: ignore the exception

The first idea was to just catch and ignore the exception, the annotation data gets updated quite frequently in the application so loosing a few data points that will later get updated anyway does not have to be a big deal.

But how do you catch an Objective-C runtime exception in Swift so you can ignore it? Turns out there is a way. 

You can write a simple **Objective-C method that catches and ignores `NSException`s**

```objc
NS_INLINE NSException * _Nullable tryBlock(void(^_Nonnull tryBlock)(void)) {
    @try {
        tryBlock();
    }
    @catch (NSException *exception) {
        return exception;
    }
    return nil;
}
```

and call it from Swift

```swift
UIView.animate(withDuration: 0.3) { [weak self] in
    let exception = tryBlock { [weak self] in
        self?.coordinate = data.coordinate
    }

    if let exception = exception {
        Log.error?.message("Updating live location coordinate failed with \(exception)")
    }
}
```

Not exactly a great solution but it was a start.

#### Second idea: not processing the data when user interaction is in progress

A much better solution would be to **detect when the user actually interacts with the map and not do any data updates while that happens**.

I needed some kind of flag telling me if it was safe to perform data updates. I could set it to `false` in `mapView(_:regionWillChangeAnimated:)` and back to `true` in `mapView(_:regionDidChangeAnimated:)`.

The simple data update code now had to become more complicated

- when updated data for an annotations arrives, check if it is safe to update the annotation data
- if yes, update the annotation data
- if no, add the updated data to a queue to be process when it becomes safe

Then when it becomes safe to update the annotation data again

- start processing updated data in the queue one by one
- before processing each data check again if it is still safe
- if it is still safe, update the annotation data and move to next data in the queue
- if it is no longer safe, return, not processing the rest of the queue

This worked quite well but I was still not able to completely remove the previous code as the user might have started moving the map when processing a single data item was in progress. It was not common, but not impossible.

#### Improving the queue performance

The main problem with this solution was that with the user interacting a lot with the map and with lots of data updates coming to the application the queue became long and slow to fully process.

In my specific case there was an easy optimization I could make. When the application receives a data update for a specific annotation it can first remove a data update for the same annotation from the queue.

The reason is that the user only cares about the final position of the annotations. There is no point moving an annotation to some intermediate position just to move it again to the final position a while later on the next queue pass. 

With this optimization the queue can never be bigger that the total number of annotations.