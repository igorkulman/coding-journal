+++
title = "Free AI models for the small stuff"
description = "How I use free AI models with Pi for simple tasks, and the limits and privacy trade-offs that come with them."
author = "Igor Kulman"
date = "2026-10-14T05:29:12+01:00"
tags = ["AI", "Coding Agents", "Developer Tools"]
keywords = ["free AI models", "OpenCode Zen", "Gemini API", "Mistral API", "AI coding", "coding agents"]
url = "/ai-models-i-use-for-free"
+++

In [Why Pi is my AI coding harness](/pi-is-now-my-ai-harness), I wrote that I wanted the harness to stay the same while the models changed. One practical benefit is that I can try a new model without also adopting its provider's coding tool.

I already pay for ChatGPT and Claude, so this is not an attempt to move all my AI usage to free tiers. Most coding tasks cost very little through an API anyway. I use free models for the small jobs that do not require much thinking: renaming files, fixing a configuration problem, or correcting grammar in a blog post.

At the moment I get that free access from three places: [OpenCode Zen](https://opencode.ai/docs/zen/), the [Gemini API](https://ai.google.dev/gemini-api/docs/pricing), and [Mistral Studio](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key).

They are all "free" in different ways:

| Provider | What is free | Main limitation |
|---|---|---|
| OpenCode Zen | A rotating selection of models with free input and output | Models are usually promotional and can disappear |
| Google Gemini | Selected models on the official API free tier | Model-specific rate limits |
| Mistral | API access in Free mode | Limited usage and throughput |

Pi supports all three providers directly. I can add each key with `/login`, select a model with `/model`, and keep the rest of my setup unchanged. No custom provider configuration is needed.

## OpenCode Zen

[OpenCode Zen](https://opencode.ai/docs/zen/) is a gateway with a curated list of models intended for coding agents. Most of them are paid, but Zen also has models whose input and output are both listed as **Free**.

At the time of writing, that list includes MiMo V2.5 Free and NVIDIA's free Nemotron variants, among others. I am deliberately not making this post a catalogue because the list changes. Zen describes most of these models as available for a limited time while their teams collect feedback.

This is the option I use when I want to try something I would probably not seek out on its own. The model appears in Pi's selector next to everything else, so I can ask it to rename some files or fix a configuration problem in a real repository, then inspect the result. That tells me more than another benchmark table.

There are two catches.

First, free models can stop being free. I check Zen's current pricing before using one and do not build any workflow around its continued availability. Zen accounts also support automatic credit reloads, so it is worth checking that setting if the goal is to spend nothing.

Second, the privacy policy is model-specific. Zen's normal providers follow its stated retention rules, but several promotional models are explicit exceptions: prompts and completions may be collected to improve the model. Zen's own documentation warns against submitting personal or confidential data to some of the free NVIDIA endpoints.

I therefore use these models only with code I am comfortable sharing under those terms.

## Google Gemini

Google's offer is less temporary. The [Gemini API has an official free tier](https://ai.google.dev/gemini-api/docs/pricing) for selected models, with free input and output tokens up to their rate limits.

I created a key in Google AI Studio, added it to Pi, and the supported Gemini models appeared in the model selector. There is no initial credit balance that I have to preserve. If I hit a quota, I wait or switch models.

The free tier is useful for small, mechanical tasks where the expected result is obvious. I am not trying to run a whole day of development through it, so the limits have rarely mattered to me.

The important distinction between Gemini's free and paid tiers is data handling. Google's pricing page marks free-tier content as usable to improve its products, while paid-tier content is not. Its terms contain some regional differences, but I still treat the unpaid tier as unsuitable for confidential or commercial source code.

## Mistral

[Mistral Studio's Free mode](https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key) enables API access without a credit card. I created an API key, added it to Pi, and could use Mistral models in exactly the same way as Zen and Gemini.

Mistral limits free usage rather than charging for every token. The account dashboard shows the limits that apply; depending on the model and account, these can include request and token limits. For occasional coding tasks, that is enough for me.

Mistral is particularly interesting because it offers models aimed at software development. I may not choose one as my default coding model, but free API access makes it easy to find out how it behaves with my prompts, tools, and repositories instead of judging it through Mistral's own interface.

Free mode can also allow API inputs and outputs to be used for model training. Unlike Gemini, Mistral provides a separate opt-out for Studio and API usage in the Admin panel. The API toggle is independent of the one for its chat product, so changing one does not change the other.

## The kind of work I give them

I use free models mostly as a convenient pair of hands. The task should be simple, low-risk, and have an obvious result, for example:

- renaming a group of files and updating the references;
- finding and fixing a small configuration problem;
- correcting grammar in a blog post;
- cleaning up Markdown formatting;
- making the same simple edit across several files.

None of these tasks requires much reasoning. A more capable paid model would probably do them better or faster, but using one often feels unnecessary.

If a free model gets stuck on something this basic, I switch models and move on. I do not spend time trying to find the perfect prompt to save a few cents.

For work involving architecture, an unclear bug, or a change that touches a large part of the codebase, I still reach for one of the paid models I trust. I also do not use free tiers for employer or client code unless their data terms have been approved. Whatever model I use, I inspect the result and run any relevant checks.

> **Free means no token charge. It does not mean unlimited usage, permanent availability, or no data trade-off.**

## Good enough is enough

The money saved is not significant. A small task on a reasonably priced model often costs pennies. The point is not to find a free replacement for Claude or ChatGPT.

For renaming files or fixing a typo in a configuration file, I do not need the smartest model available. I need one that can understand a straightforward instruction, use the tools correctly, and produce a change I can verify in a minute.

These small jobs are also an easy way to try unfamiliar models on real work. If one turns out to be useful, I know where it fits. If not, nothing in my workflow changes.

That reinforces why I settled on Pi. OpenCode Zen can replace its free models, Google can change its quotas, and Mistral can change its limits. I replace the model. The harness stays the same.
