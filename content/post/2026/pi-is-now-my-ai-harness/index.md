+++
title = "Why Pi is my AI coding harness"
description = "Why I use Pi as a stable, model-agnostic coding harness, with my own Xcode integration and reusable workflow skills."
author = "Igor Kulman"
date = "2026-09-02T05:29:12+01:00"
tags = ["AI", "Coding Agents", "Developer Tools", "Xcode", "Swift"]
keywords = ["Pi", "AI coding harness", "coding agents", "Xcode MCP", "AI developer workflow"]
url = "/pi-is-now-my-ai-harness"
+++

I want to experiment with AI models without rebuilding my coding workflow every time I switch. Pi has become the stable layer around those experiments.

By “harness”, I mean the command-line environment, tools, extensions, and instructions around the model.

I have been experimenting with AI models and coding tools quite a lot lately. At the moment, I pay $20/month for ChatGPT Plus and $20/month for Claude Pro. I get GitHub Copilot Pro for free as an open-source maintainer, and I sometimes use OpenCode Zen to try the models it offers for free. I also subscribed to OpenCode Go for a month for $10 to try some of the newer open-weight models.

I have also been running models locally. Most recently, I tried Qwen on my MacBook Pro M5 Pro, which I wrote about in [Running a Local LLM Coding Server on MacBook Pro M5 Pro 48 GB](/running-local-llm-coding-server).

Every provider wants me to use its own tool. Anthropic has Claude Code, OpenAI has Codex CLI, GitHub has Copilot CLI, and so on. I did not want every model experiment to mean switching tools. I wanted one harness that would work with basically anything.

For a while, I thought [OpenCode](https://opencode.ai/) might be it. It supports almost every provider and makes it easy to use OpenAI-compatible endpoints, including local models. I used it for a while, but it never clicked for me. It felt too heavy, and I found it harder than I expected to extend and bend to the way I work.

I still use Claude Code from time to time. It works well with Claude, obviously, but I do not particularly like it as a piece of software. It feels increasingly bloated, and I do not want my whole workflow tied to Anthropic just because I happen to prefer some of its models right now.

Then I found Pi.

## Pi

Pi is a minimal coding agent by Mario Zechner. What immediately appealed to me was its philosophy. Instead of trying to implement every possible feature, integration, and workflow itself, Pi gives the model four basic tools:

- `read`
- `write`
- `edit`
- `bash`

And that is pretty much it.

That can look too limited next to something like Claude Code, but an agent with shell access can already do a lot. It does not need a dedicated grep tool when it can run `rg`, or special Git tooling when it can run `git`. Everything else can be added through extensions and skills when I actually need it.

Mario explains Pi and that philosophy in [this video](https://www.youtube.com/watch?v=RjfbvDXpFls). It is worth watching if you are interested in why Pi is designed this way.

The other important part for me is that Pi is not tied to one model provider. I can use Claude, OpenAI models, GitHub Copilot, OpenCode Zen, local OpenAI-compatible endpoints, and whatever else I want to experiment with. Changing the model does not mean changing the tool and rebuilding my workflow around it.

## My setup

My Pi installation has accumulated a few extensions:

```text
❯ pi list
User packages:
  npm:@juicesharp/rpiv-web-tools
  npm:pi-mono-figma (filtered)
  npm:pi-xcode-mcp (filtered)
  npm:pi-paster
  npm:@gotgenes/pi-anthropic-auth
  npm:@juicesharp/rpiv-ask-user-question
```

`rpiv-web-tools` gives Pi web search using the Brave API, `pi-mono-figma` gives it access to Figma, and `pi-paster` makes it easy to paste or drag images into a session. I also use `rpiv-ask-user-question`, which gives the agent a proper way to ask me questions when it needs a decision or more information instead of guessing.

`pi-anthropic-auth` is particularly useful because it lets me use my existing Claude subscription from Pi. I can pay the normal $20/month subscription and use Claude through the same harness instead of paying API-token prices just because I do not want to use Claude Code.

`pi-xcode-mcp` and `pi-mono-figma` show as filtered because I disable them globally and enable them only in projects that actually use them. There is no point in loading Xcode tools when I am working on a website, for example.

### Project-specific tools

For one iOS project, I take this a step further with a small project-local extension. It starts the agent with only the handful of Figma and Xcode tools it needs most often, then lets it search for and activate a specific extra capability when needed—running a particular kind of test, extracting Figma assets, or searching Apple documentation, for example.

This keeps the tool list and the agent's context focused without giving up the larger integrations. The configuration lives with the project, so it is available where it is useful and nowhere else. That is another small thing I like about Pi: project-specific workflow changes can be a little TypeScript extension instead of something every project has to inherit.

### Xcode integration

One extension in my setup is my own: [pi-xcode-mcp](https://github.com/igorkulman/pi-xcode-mcp).

Recent Xcode versions expose an MCP server with useful functionality such as building projects, running tests, getting diagnostics, searching Apple documentation, and rendering SwiftUI previews. I wanted all of that in Pi, so I built an extension for it. Using Pi, of course.

The extension connects to Xcode's MCP server and exposes the functionality I actually care about. The agent can build a project through Xcode and see real compiler errors and warnings, run tests, or search Apple's documentation without me copying anything back and forth.

The main reason I built it, though, was verifying UI implementations against Figma designs. The agent can retrieve the relevant design from Figma, ask Xcode to render the matching SwiftUI preview, and inspect both images. Instead of treating a successful build as proof that the work is done, it can check the actual layout, spacing, typography, colours, and states against the design.

> **A successful build proves the code compiles. It does not prove the UI matches the design.**

When I ask Pi to implement a Figma screen in the iOS app, the SwiftUI workflow becomes:

1. Read the Figma design.
2. Implement the SwiftUI screen.
3. Render its Xcode preview.
4. Compare the two, fix visible differences, and repeat.

The model can actually see the UI it is changing rather than reasoning about SwiftUI code alone.

This is a good example of why I like Pi. Xcode integration was something I wanted and Pi did not have it. Instead of waiting for the harness itself to support it, I could add it—and combine it with the Figma tools I already use.

### My workflow as skills

Extensions add the tools I need, but I also do not want to explain my workflow every time I start a new session. So I keep my own collection of [Pi skills](https://github.com/igorkulman/pi-skills).

The skills cover things I repeatedly do: analysing a task before implementation, working with GitHub issues, creating implementation plans, reviewing code, working with Xcode, creating commits and pull requests, and so on.

This has turned out to be more useful to me than having all those workflows built into the coding tool. They are just Markdown files. I can see exactly what instructions the model gets, change them whenever I want, and keep them in Git. If I decide tomorrow that I want my code-review workflow to work differently, I change the skill instead of looking for a configuration option or waiting for a tool to support it.

It also means I can keep the same workflow regardless of the model. I can start with Claude, switch to an OpenAI model, try something new through OpenCode Zen, or point Pi at a local model. The rest of my setup stays the same.

## The harness stays, the models change

This is probably the main reason Pi has stuck for me while the other tools have not.

AI models are changing ridiculously quickly. I do not know which one I will prefer six months from now, and I do not need to decide today. I can try something new without moving to a different coding tool.

With Pi, the harness is the boring, stable part. My extensions, Xcode integration, and skills define how I want the agent to work. The model underneath is interchangeable.

That is pretty much what I wanted from an AI coding tool in the first place.
