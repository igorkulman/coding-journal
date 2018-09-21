+++
title = "Windows Phone: run background agent every minute"
author = "Igor Kulman"
date = "2013-06-12"
url = "/windows-phone-run-background-agent-every-minute/"
categories = ["Windows Phone"]
tags = ["Background agent","Csharp", "Windows Phone"]
+++
In both Windows Phone 7 and Windows Phone 8 the background agent is executed approximately every 30 minutes. If you want to run your code more often, for example to create an app showing actual time on the live tile, you are out of luck. Are you? 

You can use [ScheduledActionService.LaunchForTest][1] to test your background agent without waiting 30 minutes for the system to run it. What if you use this method in the OnInvoke method of your background agent?

<!--more-->

{{< highlight csharp >}}
protected override void OnInvoke(ScheduledTask task)
{   
    ScheduledActionService.LaunchForTest(task.Name, TimeSpan.FromSeconds(60));
    var toast = new ShellToast {Title = DateTime.Now.ToShortTimeString(), Content = "Task Running"};
    toast.Show();
                        
    NotifyComplete();
}
{{< / highlight >}}

Your background agent gets executed every minute! 

I wonder if this code would pass certification. Has anyone tried to use it?

**Update:** it will **not** work, see [Windows Phone: Don’t call LaunchForTest in Release][3].

 [1]: http://msdn.microsoft.com/en-US/library/windowsphone/develop/microsoft.phone.scheduler.scheduledactionservice.launchfortest(v=vs.105).aspx
 [2]: http://blog.kulman.sk/wp-content/uploads/2013/06/CSWP7ScheduledTaskAgent.zip
 [3]: http://blog.mjfnet.com/2013/01/10/windows-phone-dont-call-launchfortest-in-release/
