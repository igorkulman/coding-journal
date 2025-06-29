+++
Description = ""
Tags = ["Swift", "iOS"]
author = "Igor Kulman"
date = "2022-04-21T05:29:12+01:00"
title = "Correctly playing audio in iOS applications"
url = "/correctly-playing-audio-in-ios-apps"

+++

When you look for a way to play audio in your iOS application you usually find code like this

```swift
player = try AVAudioPlayer(contentsOf: url)
player.prepareToPlay()
player.play()
```

While this code works and will play the given audio file it does not deal with all the nuances of audio playback. 

Imagine the user is playing a podcast or music, do you want the sound in your app to stop that playback? Or play over it? 

The key to correct audio playback is understanding `AVAudioSession` categories. Let's take it by example

## Playing ambient sounds over existing audio

If you want to play an audio file in your application without affecting the existing music or podcast playback that might be going on you should use the `.ambient` category. 

You use this category for example to play sound effects like the sound of a message being sent in a chat application where the sound is not that important and definitely not worth affecting other playback in iOS.

You set the category on the shared `AVAudioSession` instance

```swift
try AVAudioSession.sharedInstance().setCategory(.ambient, mode: .default)
```

and make it active

```swift
try AVAudioSession.sharedInstance().setActive(true)
```

All the sounds you now play using `AVAudioPlayer` will be played as ambient sounds.

## Stopping existing audio to play your sound

If the audio file you want to play in your application is important, for example playing a received voice message in a chat application, you can stop existing audio that is playing on iOS.

You can achieve this by setting the category to `.playback` 

```swift
try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
try AVAudioSession.sharedInstance().setActive(true)
```

Remember, setting a category makes it persist for all the consecutive audio playback until you set it to a different value.

When you play a sound now using `AVAudioPlayer` it will stop the music or podcast the user might be listening to.

But what if you want the users music or podcast to continue after you play your sound? 

<!--more-->

## Resetting audio category and notifying other applications they can resume

It is a good practice to deactivate the `AVAudioSession` and send, notification to all the other applications when you are finished playing your sound

```swift
try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
```

and reset the session back to the ambient category

```swift
try AVAudioSession.sharedInstance().setCategory(.ambient, mode: .default)
try AVAudioSession.sharedInstance().setActive(true)
```

Well behaved music or podcast applications should listen for that notification and resume playback when they receive it. 

The problem is that not all the applications do it correctly, not even the ones from Apple, so the result will vary depending on the application used.

## Ducking existing audio to play your audio

There is an more approach you can use that is something like a hybrid between the two approaches already mentioned. You can set the category to `.playback` with `.duckOthers` as an option.

```swift
try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [.duckOthers])
try AVAudioSession.sharedInstance().setActive(true)
```

If you now play your audio file iOS will "duck" the existing audio playback, so making it less loud but not stopping it, and play your sound file over it.

This will make sure the music or podcast the user might be playing is not stopped but at the same time that the audio you play in your application is more or less clearly heard by the user.

### Knowing when `AVAudioPlayer` finished playing

To reset the `AVAudioSession` back to the ambient category and notify other applications about finished playback you need to know when `AVAudioPlayer` finished playback of the sound file you gave it to play. 

You can easily do this with the `AVAudioPlayerDelegate`, its delegate method `audioPlayerDidFinishPlaying(_: AVAudioPlayer, successfully _: Bool)` fill fire when audio playback is finished. 

I would recommend to also do the same in the `audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?)` delegate method that fires on error, because if you made changes to `AVAudioSession` before trying to play an audio fail it does not matter if it succeeded or not, you need to do a clean up anyway.