+++
Categories = ["macOS", "Git"]
Description = ""
Tags = ["macOS", "Xcode"]
Keywords = ["macOS", "Git"]
author = "Igor Kulman"
date = "2020-12-02T05:29:12+01:00"
title = "Using different Git config for personal and work projects"
url = "/different-git-config-for-work-projects"

+++

I use the same machines to work on both personal and work projects. I usually have to use a different `Git` identity for the work projects than for my personal projects. 

Previously I had my personal `Git` identity set globally and then used local `Git` configs to override it in work projects. This worked just fine but it was too much work. There is a better solution.

`Git` config allows you to use, or better to say include, another `Git` config for a specific directory and all its subdirectories. I have all my projects stored in `~/Projects` and subdirectories like `~/Projects/open-source` and work projects in `~/Projects/CompanyName`.

I created a `~/.companyName.gitconfig` that overrides just the name, email and GPG signing key to match the work identity

{{< highlight bash >}}
[user]
    name = Igor Kulman
    email = igor@company.name
    signingkey = ABC
{{< /highlight >}}

I then included this config in my main `~/.gitconfig` just for the `~/Projects/CompanyName` directory

{{< highlight bash >}}
[user]
	name = Igor Kulman
	email = igor@kulman.sk
    signingkey = DEF
...
[includeIf "gitdir:~/Projects/CompanyName/"]
    path = ~/.companyName.gitconfig
{{< /highlight >}}

to achieve exactly what I needed.

To verify and quickly check which `Git` identity is being used in a specific `Git` repository you can use this simple `Git` alias

{{< highlight bash >}}
[alias]    
    whoami = "! git var -l | grep '^GIT_.*_IDENT'"
{{< /highlight >}}

<!--more-->