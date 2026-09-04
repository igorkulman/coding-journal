+++
title = "Using the same hostnames at home and over Tailscale"
description = "How I combine AdGuard Home, Tailscale split DNS, and a subnet router to use the same device hostnames at home and away."
author = "Igor Kulman"
date = "2026-09-30T05:29:12+01:00"
tags = ["Networking", "Tailscale", "AdGuard Home", "Self-Hosting"]
keywords = ["Tailscale", "AdGuard Home", "split DNS", "subnet router", "home.arpa", "MagicDNS"]
url = "/same-hostnames-at-home-and-over-tailscale"
+++

In [my previous post about my terminal-native setup for coding agents](/terminal-native-setup-for-parallel-coding-agents), I described using [Heeler](https://github.com/ZingerLittleBee/Heeler) to connect from my iPhone to [Herdr](https://herdr.dev/) running on my Mac. Heeler connects over SSH through Tailscale, but that setup left me with one small annoyance: the hostname depended on where I was.

At home, with Tailscale disabled, Bonjour made the Mac available as:

```text
cookiebook.local
```

Away from home, with Tailscale enabled, I used its Tailscale hostname instead.

I wanted one hostname that would work in both places without making my local network depend on Tailscale. It turned out I already had everything I needed: [AdGuard Home](https://adguard.com/en/adguard-home/overview.html) for local DNS and [Tailscale](https://tailscale.com/) for remote access.

The key is that DNS always returns the Mac's private LAN address. At home that address is directly reachable; away from home Tailscale provides a route to it.

## The setup

My home server, [`thinkserver`](https://github.com/igorkulman/thinkserver), runs AdGuard Home in Docker and has two relevant addresses:

```text
LAN:       192.168.1.187
Tailscale: 100.67.51.17
```

AdGuard Home is already the DNS server for my home network.

My MacBook, `cookiebook`, has a reserved LAN address:

```text
192.168.1.102
```

The goal is for the same lookup to work everywhere:

```text
cookiebook.home.arpa → 192.168.1.102
```

Only the path to that address changes.

## Using home.arpa instead of .local

It would be tempting to make `cookiebook.local` work remotely, but `.local` is reserved for multicast DNS, which is what Bonjour uses to discover devices on the local network. It is not a good namespace for records managed by a normal DNS server.

[`home.arpa`](https://www.rfc-editor.org/rfc/rfc8375.html) is specifically reserved for names with local significance on home networks.

I added DNS rewrites to AdGuard Home:

```text
cookiebook.home.arpa   → 192.168.1.102
teamwirebook.home.arpa → 192.168.1.73
```

I already had a similar record for `thinkserver`.

With Tailscale disabled, a lookup on my home network now returns the reserved LAN address:

```bash
nslookup cookiebook.home.arpa
```

```text
Server:         192.168.1.187
Address:        192.168.1.187#53

Non-authoritative answer:
Name:   cookiebook.home.arpa
Address: 192.168.1.102
```

That solves the problem at home. Two more pieces make the same name work remotely: a route to the home network and a way to send `home.arpa` queries back to AdGuard Home.

## Routing the home network through Tailscale

Resolving the hostname is not enough when I am away. If AdGuard Home tells my iPhone that `cookiebook.home.arpa` is `192.168.1.102`, the phone still needs a way to reach the private `192.168.1.0/24` network.

A [Tailscale subnet router](https://tailscale.com/docs/features/subnet-routers/how-to/setup) provides that route. I use `thinkserver` because it is always running at home.

On the server I advertised the home subnet:

```bash
sudo tailscale set --advertise-routes=192.168.1.0/24
```

Tailscale requires IP forwarding on a Linux subnet router. It was already enabled on my server, which I confirmed with:

```bash
sysctl net.ipv4.ip_forward
```

```text
net.ipv4.ip_forward = 1
```

I then approved the advertised `192.168.1.0/24` route for `thinkserver` in the Tailscale admin console.

To test it independently of DNS, I disabled Wi-Fi on my iPhone, connected through mobile data and Tailscale, and reached `192.168.1.102` directly. The routing half was working.

## Sending home.arpa queries to AdGuard Home

The remaining problem was remote DNS resolution.

When connected to Tailscale, my devices can reach AdGuard Home through the Tailscale address of `thinkserver`, `100.67.51.17`. In the Tailscale DNS settings, I added that address as a [restricted nameserver](https://tailscale.com/docs/reference/dns-in-tailscale) for `home.arpa`:

```text
home.arpa → 100.67.51.17
```

This is split DNS: only queries under `home.arpa` go to AdGuard Home. Other DNS queries continue to use the device's normal resolvers.

The lookup path while I am away is therefore:

```text
cookiebook.home.arpa
        ↓
Tailscale split DNS
        ↓
AdGuard Home @ 100.67.51.17
        ↓
192.168.1.102
```

The connection then follows the subnet route:

```text
iPhone
  ↓
Tailscale
  ↓
thinkserver
  ↓
192.168.1.0/24
  ↓
cookiebook @ 192.168.1.102
```

After adding the split DNS configuration, I had to disconnect and reconnect Tailscale on the iPhone before it picked up the change.

## One name, two network paths

The final setup is small:

```text
AdGuard Home
  └── local home.arpa records

Tailscale
  ├── split DNS: home.arpa → AdGuard Home
  └── subnet route: 192.168.1.0/24 → thinkserver
```

At home, my router provides AdGuard Home as the DNS server and the returned LAN address is reached directly over Wi-Fi. Tailscale can be completely disabled.

Away from home, Tailscale sends the same DNS query to AdGuard Home through its Tailscale address, then routes the connection back to the private LAN address.

DNS does not need to know where I am. It always returns `192.168.1.102`; only the route changes.

The original reason for setting this up was Heeler. Its SSH connection can now always use `cookiebook.home.arpa`, whether my iPhone is at home with Tailscale disabled or away with Tailscale connected.

The same name also works from a normal terminal:

```bash
ssh cookiebook.home.arpa
```

There is one stable name to remember, local traffic stays local, and remote access continues to work without exposing anything publicly.
