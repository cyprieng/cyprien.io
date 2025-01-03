---
author: Cyprien
pubDatetime: 2024-10-24T13:40:00.000Z
modDatetime: 2024-10-24T13:40:00.000Z
title: My homelab
slug: homelab
featured: false
draft: false
description: My simple homelab
tags:
  - devops
---
I have had a homelab for many years, which has evolved many times.  
Previously, I mainly used my homelab to experiment and learn how some tech worked: Kubernetes, Proxmox, etc.

But I now do those kinds of things during my day job, so now my homelab only needs to be useful (even though learning is obviously still a nice side effect of my homelab).  
At least more useful than what it costs me in electricity.

Here is my current setup:

![Photo of the homelab](assets/images/posts/homelab/photo.png)

The homelab lives in an [Ikea Kallax](https://www.ikea.com/fr/fr/p/kallax-etagere-brun-noir-60275812/#content), with a [door](https://www.ikea.com/fr/fr/p/kallax-bloc-porte-brun-noir-60278170/#content). I have removed the back of the door to allow some airflow at the back.

Here is a simplified schema of the homelab:

![Schema of the homelab](assets/images/posts/homelab/homelab.png)

## Freebox Pop

This is the box provided by my ISP. It does a decent job and has a 2.5Gbps RJ45 port.  
For me, it is too limited, so I only use it as a bridge for my network.

## OPNsense router (**Glovary N100**)

This is my main router.  
Very overkill with 6 RJ45 ports, but you never know.

It runs OPNsense: [https://opnsense.org/](https://opnsense.org/)

It also runs Adguard Home ([https://0x2142.com/how-to-set-up-adguard-on-opnsense/](https://0x2142.com/how-to-set-up-adguard-on-opnsense/)), which is one of the most important services I run.  
It allows me to block all trackers and ads from my network.

I also run a WireGuard VPN on the router to get access to my homelab from anywhere.  
This is the only exposed service of my homelab and the only entry point for remote access.

OPNsense is an amazing piece of software. You can do pretty much anything you want with a nice UI.

I’m lucky to have a pretty good connection speed. Here is a test directly made from OPNsense:

![Speedtest from OPNsense](assets/images/posts/homelab/speedtest.png)

## Switch (**Davuaz Da-K9801WP**)

I use a cheap Chinese switch with 6 2.5Gbps RJ45 ports and PoE (needed for a security camera, even though a single PoE injector would have also done the job).  
It does the job even if it is a cheap one.

## Synology DS1522+

I used to have a homemade computer with ZFS to host my files, but I got a little worried about the lack of ECC RAM on my last server.

I hesitated between building a new custom PC with ECC RAM or going with Synology.  
As I stated at the beginning of this post, learning wasn’t the main priority anymore. This removed the biggest advantage of the custom build.  
Synology seems to be very reliable, easy to use, and not very vendor lock-in. You can always easily get your data out of it if needed.  
A custom build would have cost pretty much the same but would require more maintenance and setup time, which is a sparse resource.  
So I bought a DS1522+. It has ECC RAM and enough drive bays for me (2x4TB drives and 2x3TB drives).

I use it only for storage purposes, and every night it syncs all the data to a Hetzner storage box ([https://www.hetzner.com/storage/storage-box/](https://www.hetzner.com/storage/storage-box/)).  
Every month I manually sync all the data to an external drive after having manually checked some data on the Synology, the presence of daily snapshots, and the data on the Hetzner storage box. This usually only takes a few minutes per month (not counting the copy duration).  
Like this, I validate the 3-2-1 process for my data: [https://www.backblaze.com/blog/the-3-2-1-backup-strategy/](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/).

I am currently pretty happy with it. Everything works well, and I must confess I am more confident with it than myself handling all my files. All the tasks run every day with a nice notification. I have never had any incident on anything. It's connected to my UPS to shut down when the battery is low and send me a notification during a power outage (and when the power is back on, which is nice to check if the freezer has been off for too long).

## NUC N100 (**NiPoGi AK2 Plus N100**)

This is a small and cheap NUC with a Coral attached ([https://coral.ai/products/](https://coral.ai/products/)). I use it to run [Frigate](https://frigate.video/).  
Frigate, for me, is the best open-source software for security cameras, and I have tested a lot (ZoneMinder, MotionEye, Shinobi, etc.).  
It uses AI with the Coral to detect only the stuff you want, and that’s a game-changer compared to the other alternatives that send you a notification as soon as a leaf moves an inch.  
All the recordings from this server are sent directly to the Synology.

## NUC AMD (Nipogi **AMD Ryzen 7 5800U**)

This is a more powerful NUC that handles a bigger workload.  
It runs Proxmox ([https://www.proxmox.com/en/](https://www.proxmox.com/en/)), which is one of the few pieces of software that I have run in my homelab for many years, and I am very happy with it.

It has two VMs:

- One for Home Assistant: [https://www.home-assistant.io/](https://www.home-assistant.io/), the best software to handle home automation.
- One basic Ubuntu VM running a lot of Docker containers for my homelab:
  - [Heimdall](https://heimdall.site/): nice homepage for my homelab.
  - [Portainer](https://www.portainer.io/): web UI to monitor all Docker containers.
  - [Vaultwarden](https://github.com/dani-garcia/vaultwarden): open-source reimplementation of the Bitwarden server.
  - [Plex](https://www.plex.tv/): media server.
  - [Jackett](https://github.com/Jackett/Jackett): torrent indexer.
  - [Transmission VPN](https://github.com/haugene/docker-transmission-openvpn) with [Proton VPN](https://protonvpn.com/): torrent client linked to a Proton VPN.
  - [Calibre](https://github.com/janeczku/calibre-web): book library management.

I have a custom domain name that points to all my services.  
For example, if I go to OPNsense.xxx.xx, it redirects me to my service if I’m on the LAN or remotely through the WireGuard VPN.

## Netgear Orbi RBK752

I use it only as a WiFi AP.  
I used it for a while as my main router before the OPNsense, but it was terrible.  
The configurations are very limited.  
The CPU goes off the roof all the time, throttling the whole connection.  
But as an AP, it does a decent job. Here is a speed test example done on my MacBook connected to WiFi through the Orbi:

![Speedtest from MacBook connected to the Orbi](assets/images/posts/homelab/speedtest-wifi.png)

The speed is limited by the 1Gbps-only port on the Orbi.  
To be honest, that’s probably the next thing that will be replaced, preferably by something with 2.5Gbps RJ45 and WiFi 7. But that stuff is too expensive right now.

## Eaton 3S 700

All of these devices are plugged into the Eaton 3S 700 UPS, which provides around 30 minutes of autonomy in case of a power outage.

## Energy

Energy is obviously a concern, even if I didn’t really look into detail before buying each part of this homelab.  
I bought a cheap Tapo smart outlet ([Tapo P110](https://www.tp-link.com/en/home-networking/smart-plug/tapo-p110/)) to measure the power consumption.  
It turns out all this stuff consumes around 100W, which costs me around 20 EUR/month (75 kWh).  
It could be better, but it’s reasonable with all the hardware and software involved.

## Sound

Sound is also a major concern as my homelab is inside an Ikea Kallax, which is in my living room. So if it’s too loud, my wife would probably just unplug it. At 10 cm from the homelab, the sound level is around 20 dB.  
The noisiest parts are the hard drives in the Synology, which cause a lot of scratching noise.  
It’s not perfect, but the noise is mostly unnoticeable. That’s still one thing I want to improve.

## Conclusion

My homelab is very simple, relying mostly on commercial appliances without custom builds. It works very reliably, providing me with all the features I want, and without taking me more than a few minutes per month of support. I only need 5 minutes per month to check backups and back up to an external hard drive. Every 3 months, I take 2 hours to update all the software.

So I’m very happy with this setup, and I probably won’t change it anytime soon.

If you have specific questions on how to set up some of the stuff I use, do not hesitate to contact me (see the email icon in the footer).

