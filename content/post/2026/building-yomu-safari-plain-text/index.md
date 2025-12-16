+++
Description = ""
Tags = ["iOS", "Swift", "Japanese", "Development", "Yomu"]
author = "Igor Kulman"
date = "2026-02-11T05:29:12+01:00"
title = "Building Yomu: Safari, furigana, and why “plain text” often isn’t plain"
url = "/building-yomu-safari-plain-text"
series = "Building Yomu"

+++
This is the third part of a short series about building [Yomu](https://yomuapp.kulman.sk), an iOS app for reading Japanese text with adaptive furigana.

In the [previous post](/building-yomu-furigana-tokenization-dictionary), I described how the app tokenizes text, renders furigana, and works with an offline dictionary. This post focuses on a much lower-level problem: getting usable input text in the first place.

It turned out to be one of the most frustrating parts of the project.

## Copying Japanese text is not a solved problem

At a glance, copying text should be trivial. You select it, paste it somewhere else, and move on.

That assumption breaks down quickly with Japanese text, and Safari in particular.

Many Japanese websites use **ruby annotations** to display furigana. Visually, this works well: small kana above kanji that make the text easier to read. What happens when you copy that text, however, depends heavily on the browser and the API used.

Safari behaves very differently from Firefox here.

## Safari copies furigana as content

When copying Japanese text from Safari, two things commonly happen:

1. Furigana may be included directly in the copied text as plain hiragana.
2. The clipboard may also contain HTML with ruby markup, depending on how the text was selected and how it is accessed.

In the best case, the copied data includes proper HTML with `<ruby>` and `<rt>` tags. If that HTML is available, furigana can be stripped reliably by removing ruby annotations before converting the content to plain text.

That part is manageable.

The problem is that this behavior is not consistent.

## Parentheses are easy. Everything else is not.

Some sources include furigana in parentheses:

```
漢字（かんじ）
```

This is relatively easy to clean up. Removing kana enclosed in parentheses is safe and predictable.

Unfortunately, this is not the only pattern.

In other cases, furigana ends up copied inline, without parentheses:

```
漢字かんじ
```

At that point, there is no reliable way to tell where the word ends and the reading begins. Trying to guess quickly turns into heuristic-heavy logic that breaks on verbs, okurigana, names, and edge cases.

After experimenting with increasingly complex cleanup rules, I eventually discarded that approach entirely.

Once the structure is gone, it is gone.

## Copy & paste vs the Share Sheet

Another complication is that copy & paste and the Share Sheet behave differently.

- Copy & paste from Safari often includes HTML or richer clipboard data.
- Share Sheet inputs are much more likely to provide plain text only.

This means that copy & paste generally produces better results than sharing text directly into the app, even though sharing feels like the more correct integration point.

As a result, sharing from Safari is currently a weak point. When the input is already flattened and contains inline furigana, there is no safe way to clean it without risking corruption of the text itself.

The app errs on the side of being conservative: clean what can be cleaned reliably, and leave the rest unchanged.

## Sharing entire websites is harder than it sounds

In theory, sharing an entire webpage into a reading app sounds appealing. In practice, it is extremely fragile.

I experimented with readability-style extraction libraries, but most Japanese websites I tried either lost important content, broke layout assumptions, or produced text that was difficult to read once stripped of structure.

Between ruby markup, vertical text, custom layouts, and mixed scripts, there is no general-purpose solution that works well across sites.

Because of this, sharing full webpages is not something I actively promote. Copying a specific passage produces much more predictable results.


## OCR has the same problem

The same issue appears when scanning physical text.

If the source material includes printed furigana, OCR often captures both the base text and the reading. If the reading is clearly separated, it can be removed. If it is not, the same ambiguity applies as with copied text.

The cleanup logic is shared across all input paths, but it remains deliberately conservative for the same reason.

## A deliberate non-solution

It is tempting to keep adding rules and heuristics here. I tried that. The code became complicated quickly, and the results were still unreliable.

In the end, I settled on a simpler rule:

- Strip ruby markup when structure is available.
- Remove parenthetical readings.
- Do not guess beyond that.

This leaves some imperfect cases unresolved, but it avoids silently damaging the text. In a reading app, preserving correctness matters more than aggressively fixing everything.

## Accepting platform limitations

This part of the project was a reminder that not all problems are algorithmic.

Safari’s clipboard behavior is not something an app can fix. Once text is flattened, there is no API to recover the original structure. The best you can do is recognize where the limits are and design around them.

In practice, this means recommending copy & paste over sharing, and accepting that some sources will never import cleanly.

That is not a satisfying conclusion, but it is an honest one.