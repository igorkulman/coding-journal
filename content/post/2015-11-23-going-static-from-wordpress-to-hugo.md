+++
Categories = ["Web"]
Description = ""
Tags = [ "hugo", "static", "wordpress"]
author = "Igor Kulman"
date = "2015-11-23T13:13:55+01:00"
title = "Going static: From Wordpress to Hugo"
url = "/going-static-from-wordpress-to-hugo"

+++

As you may have noticed, [static site generation is the next big think](http://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/?utm_content=buffer882bd&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer). When I created this blog a few years ago I choose Wordpress, because it seemed like a good choice. Now I have grown tired with updating plugins, exchanging broken plugins for alternative ones and so one. So I decided to try to go the static site generation route to make the blog easier to maintain.

**Jekyll? Octopress? FsBlog? Hugo!**

There are [quite a few static site generators](https://www.staticgen.com/) out there, so choosing the right one is quite a challenge. [Jekyll](https://jekyllrb.com/) or [Octopress](http://octopress.org/) seemed like the obvious choice. Jekyll requires Ruby, which is ok even on Windows, but Octopress had a few dependencies that I did not manage to get working on Windows. [FsBlog](https://github.com/fsprojects/FsBlog) seemed interesting, especially for me being a F# enthusiast, but frankly it is not yet very usable. So I choose Hugo.

<!--more-->

[Hugo](https://gohugo.io/) is a static site generator written in Go. That means no dependencies, just one binary you download and use. On Windows, you can even [get it using Chocolatey](https://chocolatey.org/packages/hugo). It has a [nice tutorial](https://gohugo.io/overview/quickstart/), a lively community and a few ready made themes. 

**Getting the content from Wordpress**

If you are coming to Hugo from Wordpress, there is a [plugin to export all the content for you](https://github.com/SchumacherFM/wordpress-to-hugo-exporter). The only problem with the plugin is that it completely ignores Gists you reference in your posts. So after you export your posts, you have to manually edit one by one and add the Gists. Some Hugo themes offer you ready made shortcodes for embedding Gists.

**Hosting on Github Pages**

One of the things I wanted to try after switching to a static website was hosting it on [Github Pages](https://pages.github.com/), because the Git deployment story is more comfortable than copying or syncing the generated content over FTP to my hosting provider. Github Pages also offer kind of a CDN for your content. Setting it all up is not very complicated, there is a [tutorial in Hugo documentation that will walk you through the process](https://gohugo.io/tutorials/github-pages-blog/). 

However, there are a few limitations when using with Github Pages. There are no redirects, so I could not redirect my RRS feed to the new one. A much bigger problem is that there is no way to set caching time for static resources like CSS and JS files.