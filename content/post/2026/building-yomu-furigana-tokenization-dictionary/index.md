+++
Description = ""
Tags = ["iOS", "Swift", "Japanese", "Development", "Yomu"]
author = "Igor Kulman"
date = "2026-01-28T05:29:12+01:00"
title = "Building Yomu: furigana, tokenization, and offline dictionaries on iOS"
url = "/building-yomu-furigana-tokenization-dictionary"
series = "Building Yomu"

+++

This is the second part of a short series about building [Yomu](https://yomuapp.kulman.sk), an iOS app for reading Japanese text with adaptive furigana.
In the [first post](/japanese-reading-problem), I described the reading problem that motivated the project. This one focuses on the technical core: how the app actually processes and renders Japanese text.

I am intentionally skipping large parts of the app here — UI, persistence, OCR, monetization. They are either standard iOS work or not particularly interesting in the context of Japanese text processing. What follows are the parts that turned out to be non-trivial.

## Constraints first

Before getting into specific implementation details, it is worth stating a few constraints that shaped most decisions:

- The app should work fully offline.
- Text should render quickly and predictably.
- Dependencies should be kept to a minimum.
- The solution should be conservative rather than clever.

Many approaches that look attractive on paper (cloud APIs, large linguistic models, aggressive heuristics) become much less appealing once you apply those constraints.

## An offline dictionary

For dictionary data, I chose **JMdict**, which is the obvious choice for a Japanese–English dictionary. Instead of working with the raw JMdict XML, I used the [Yomitan-converted version](https://github.com/yomidevs/jmdict-yomitan).

This format consists of a large number of JSON files, which is convenient for tooling but not ideal for runtime use in a mobile app.

Rather than parsing JSON at runtime, I converted the data ahead of time into a single SQLite database using a small Python script. At runtime, the app only performs simple SQLite queries.

Dictionary lookups are done using raw SQLite APIs. The access patterns are straightforward, and adding an ORM or database abstraction layer would not add much value here.

The resulting database is roughly **70 MB** in size. That is large, but acceptable for an offline-first reading app. In practice, the tradeoff is worth it to avoid any network dependency while reading.

## Rendering furigana on iOS

Rendering furigana correctly is one of those problems that sounds easy until you try to do it.

On iOS, furigana rendering is supported via attributed strings using ruby annotations. However, this functionality is [undocumented]( https://developer.apple.com/documentation/coretext/ctrubyannotation). There is no official API reference describing how ruby attributes are expected to behave, which attributes are supported, or what edge cases exist.

As a result, most of the implementation here was empirical: experimenting with attributed string attributes, testing on different OS versions, and validating behavior with real text rather than contrived examples.

I chose this approach over custom text layout for a simple reason: despite its rough edges, the system text engine handles line breaking, selection, accessibility, and performance far better than a custom renderer would. Even with the lack of documentation, it was the most robust option available.

## Why Japanese text needs tokenization at all

If you are used to working with English or other space-separated languages, it is easy to underestimate how much work is hidden behind “finding a word” in Japanese text.

In English, this is trivial:

> I ate lunch
→ `I` / `ate` / `lunch`

Spaces already tell you where words begin and end.

Japanese does not work like this. A normal sentence looks like this:

> 昨日寿司を食べました

There are no spaces, and several things are happening at once:
- Kanji and kana are mixed
- Verbs are inflected
- Particles are attached to words
- The dictionary form of a word often does not appear in the text at all

For example:

> 食べました
is not a dictionary entry. The dictionary form is
> 食べる

If a user taps inside *食べました*, the app must understand:
- where the word boundaries are
- which part is the verb
- what the base form is
- what reading to show as furigana

This process — turning a raw character sequence into meaningful word units — is called **tokenization** (or morphological analysis).

Without tokenization, none of the core features of Yomu would work reliably:
- tapping a word to look it up
- deciding which characters need furigana
- attaching readings to the correct kanji
- handling verb and adjective inflections

This is why tokenization is not an optional optimization here; it is foundational.

## Tokenization is not a single problem

Once the need for tokenization is clear, the next complication is that there is no single “Japanese tokenizer” that solves all of these needs equally well.

In an ideal world, I would use **UniDic** everywhere. It is the current standard in Japanese linguistic research and produces excellent results. Unfortunately, basic UniDic is roughly **500 MB** in size, full is about **2 GB**, which makes it entirely impractical to bundle with an iOS app.

The smaller **IPADic (via MeCab-Swift)** dictionary is more feasible, at just about **50 MB**, but it has limitations, especially when it comes to producing reliable readings for furigana.

There is also the **system tokenizer** that comes with iOS at no size cost but it is just not usable, it fails even on some very common words.

In the end I decided to used **IPADic** for both text interaction — determining which word a user tapped on so that a lookup can be performed. For example, tapping inside *食べました* should resolve to *食べる*, and also for furigana reading with a reading exception system to the app for some common words that it cannot handle, like irregular readings of minutes.

## JLPT-based furigana decisions

Once text is tokenized and readings are available, the remaining question is whether furigana should be shown at all.

For lower levels (N5–N4), this is relatively straightforward. Well-known kanji lists can be used to decide whether a character should be considered “known” at a given level.

As levels increase, this becomes less clear-cut, and I have deliberately kept the logic conservative. Showing furigana when it is not strictly necessary is less harmful than hiding it incorrectly.

## What I deliberately avoided

Several approaches were considered and intentionally rejected:

- Cloud-based text processing
- Large bundled linguistic models
- Aggressive heuristics for guessing readings
- Custom text rendering engines

All of these could produce impressive demos, but they tend to fail in subtle ways when applied to real-world reading.

The goal here was not to be clever. It was to build something predictable enough to be used every day.

In the next post, I wll focus on a more specific problem that turned out to be surprisingly tricky: copying Japanese text from Safari, ruby markup, and why “plain text” often is not plain at all.
