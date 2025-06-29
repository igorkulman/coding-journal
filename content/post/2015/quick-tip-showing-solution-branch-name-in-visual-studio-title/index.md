+++
title = "Quick Tip: Showing solution branch name in Visual Studio title"
author = "Igor Kulman"
date = "2015-07-21"
url = "/quick-tip-showing-solution-branch-name-in-visual-studio-title/"
Tags = ["Git", "Visual Studio", "Productivity", "Tips"]
+++
By default, Visual Studio shows the name of the opened solution name in the title. This makes it easier to navigate among multiple instances of Visual Studio. You see the solution name next to the Visual Studio icon in the taskbar and also in the task manager, when you have to (and we all sometimes have to) kill the right Visual Studio because it stopped responding.

I work with Git, switching branches frequently, especially working on features and bug fixes. In this situation, it would be nice if Visual Studio showed not only the solution name but also the current branch in its title. No problem, there is an extension for that.

The extension is called [Rename Visual Studio Window][1] and it works with Visual Studio 2015, 2013, 2012, 2010. This extension supports Git, so you can easily add the branch name to the title with a config like mine using [gitBranchName].

![Rename Visual Studio Window](rename.png)

<!--more-->

Your taskbar will then look like this

![Multiple projects in tray](trayalya.png)

 [1]: https://visualstudiogallery.msdn.microsoft.com/f3f23845-5b1e-4811-882f-60b7181fa6d6
