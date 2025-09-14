---
author: Cyprien
publicationDatetime: 2025-08-28T00:00:00.000Z
updateDatetime: 2025-08-28T00:00:00.000Z
title: Easily publish your Obsidian notes through GitHub
slug: obsidian-github-publisher
featured: false
draft: false
description: ''
tags:
  - tech
  - notes
---
I recently migrated from Notion to Obsidian.
One thing that I miss from Notion is the ability to share some notes.
For example, I have a list of recipes I want to share with my wife.

Notion allows me to share with an account at no extra cost.
But for Obsidian there is no free and easy solution for this, as I don't really need their publish offering, which is more for sharing your notes publicly.

So I built my own free publish chain.

## GitHub repo

I created a repository using <https://github.com/jackyzha0/quartz>
It's far too powerful for my use case, but it's awesome.

I just needed to do:

```shell
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

I then pushed this to my repo.
Then I needed to retrieve the notes from Obsidian.

## Obsidian

I built a little Obsidian extension: <https://github.com/cyprieng/obsidian-github-publisher>  
It allows you to select a GitHub repo with a folder, and some folders/notes from your vault, and it will automatically sync your notes to the given repo in the given folder:

![Plugin settings](assets/images/posts/2025/obsidian-github-publisher/settings.png)

So in my case, every 15 minutes it syncs my notes to the content directory of my GitHub repo.
`content` is the directory Quartz uses for markdown files.

## Hosting

I used Cloudflare Pages to build my website.
I set up an automatic deployment whenever there is a new commit on my repo.

It runs `npx quartz build` for every push, and then publishes it to the Cloudflare CDN.

I have a custom domain set up to point to this. And I use Cloudflare Zero Trust to create a strategy that allows only specific people to access my notes.

## Conclusion

This whole setup allows me to edit my notes naturally in Obsidian.
And on a schedule, my Obsidian plugin pushes the changes to my repo, which then triggers the Cloudflare build, which uses Quartz to build the website with the new content, and then Cloudflare Pages serves the website.

In my case, I restrict access with Cloudflare Zero Trust because I don't want my notes to be public.

I use GitHub instead of a generic Git process so the plugin is easier to maintain, and it can rely on the GitHub API, allowing me to have something fully functional whatever the OS (Linux, Mac, Windows, Android, iOS, etc…). The other alternatives using git sometimes have issues with iOS, for example.

My solution perfectly fits my workflow; it allows me to never think about my notes website, everything is updated seamlessly. And everything is free.

If you have any ideas for improvements to better fit your particular workflow, do not hesitate to send me your ideas on the issues: <https://github.com/cyprieng/obsidian-github-publisher/issues> or by email.

