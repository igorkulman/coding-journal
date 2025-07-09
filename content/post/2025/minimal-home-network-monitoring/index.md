+++
Categories = ["Networking"]
Description = ""
Tags = ["Networking"]
Keywords = ["Networking"]
author = "Igor Kulman"
date = "2025-08-13T05:29:12+01:00"
title = "Minimalist home network monitoring with shell scripts and ntfy.sh"
url = "/minimal-home-network-monitoring"

+++

Running a home server does not have to mean setting up a full-blown monitoring stack. For my needs, a few shell scripts and push notifications are all it takes to keep things simple, reliable, and easy to maintain.

I use [ntfy.sh](https://ntfy.sh/) for notifications. It is a simple, open-source tool that lets you send push notifications to your devices via a single HTTP request. It is lightweight, easy to set up, and fits perfectly with my minimalist approach.

## Why minimal monitoring?

My home server is an old ThinkPad T440s. It is quiet, efficient, and runs everything I need for my home infrastructure. I keep it minimal by only installing Tailscale directly and running everything else in Docker. This includes services like AdGuardHome for network-wide ad blocking, automated backups, and more. I have documented the full setup and all services in detail in my [thinkserver GitHub repository](https://github.com/igorkulman/thinkserver).

I do not want to deal with complex dashboards or heavyweight monitoring tools. I just want to know, right away, if something goes wrong, like low disk space or a network issue.

Here is how I keep tabs on my setup with just cron, shell scripts, and ntfy.sh.

## Low disk space monitoring

Let us start with the basics: disk space. Here is a simple shell script that checks if my root disk has less than 15 GB available. If it does, I get a push notification via ntfy.sh.

```bash
#!/bin/bash

mingigs=15
avail=$(df | awk '$6 == "/" && $4 < '$mingigs' * 1024*1024 { print $4/1024/1024 }')
topicurl=https://ntfy.sh/my_topic

if [ -n "$avail" ]; then
  curl -k \
    -d "Only $avail GB available on the root disk. Better clean that up." \
    -H "Title: Low disk space on $(hostname)" \
    -H "Priority: high" \
    -H "Tags: warning,cd" \
    $topicurl
fi
```

I run this every hour with cron. If something fills up the disk, like runaway logs, Docker images, I get an instant push notification and can act before things break.

## Detecting WAN speed downgrade

Recently, my internet speed dropped from 1 Gbps to 100 Mbps. My EdgeRouterX showed the WAN cable (running two floors down) was the culprit: old, flaky, and sensitive to movement.

The fix? Sometimes just wiggling the cable helps, but I am planning to crimp a new RJ45 connector soon. Meanwhile, I want to know if the link speed drops again.

Here is a script for the EdgeRouterX that checks the WAN port speed and notifies me if it drops to 100 Mbps:

```bash
#!/bin/bash

topicurl=https://ntfy.sh/my_topic
SPEED=$(show interfaces ethernet eth0 physical | grep "Speed: 100Mb/s")

if [ -n "$SPEED" ]; then
  curl -k \
    -d "WAN link speed dropped to 100 Mbps. Check the cable." \
    -H "Title: WAN speed issue on EdgeRouterX" \
    -H "Priority: default" \
    -H "Tags: wan,speed" \
    $topicurl
fi
```

To automate this check, I added it to cron to run every 5 minutes. This ensures I get notified promptly if the link speed drops.

## Simple, no-dependency monitoring

This setup is as simple as it gets: no Prometheus, no Grafana, no InfluxDB. Just cron, a few lines of shell, and ntfy.sh. It is minimal, understandable, and easy to maintain.

With this approach, I can detect real-world issues before they cause downtime. Whether it is low disk space or a flaky Ethernet cable, I get notified instantly and can act quickly. It is a practical, no-fuss solution that works perfectly for my needs.
