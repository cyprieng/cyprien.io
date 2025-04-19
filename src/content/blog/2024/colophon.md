---
author: Cyprien
pubDatetime: 2024-09-26T06:12:00.000Z
modDatetime: 2024-09-26T06:12:00.000Z
title: How I Built My Corner of the Web
slug: colophon
featured: false
draft: false
description: A detailed look at the technologies and process behind creating this blog
tags:
  - development
---
After years of wanting to build my blog, here it is finally

The first post of this blog will be a quick description of how I built it.

## Choosing the Tech Stack

When deciding how to build this blog, my primary requirements were:

1. Blog posts should be written in Markdown for simplicity and portability.
2. The blog should consist solely of static content, making it lightweight and easy to host anywhere.

With these criteria, I identified several popular static site generators as potential candidates:

- Hugo
- Jekyll
- Astro
- Gatsby
- Eleventy

I was particularly interested in frameworks from the JavaScript ecosystem. This narrowed my choice to **Astro** and **Eleventy**. I finally chose Astro as it offers more built-in features and is slightly more popular.

## Building the Blog

Next came the challenge of building the blog. Since I wanted to focus on the content rather than the technical details, I decided not to reinvent the wheel. Instead, I started with a pre-existing Astro theme: [astro-paper](https://github.com/satnaing/astro-paper).

In just **five minutes**, the blog was up and running on my local machine. After tweaking it to suit my needs, here it is!  
The source code is freely available here: [github.com/cyprieng/cyprien.io](https://github.com/cyprieng/cyprien.io).

## Adding Comments

To allow you to interact with posts, I integrated comments using [Giscus](https://giscus.app/). It’s:

- Free and open source.
- Easy to integrate without needing a server.
- Powered by GitHub Discussions, avoiding vendor lock-in.

## Hosting the Blog

I chose **Cloudflare Pages** for hosting because:

1. It automatically builds and deploys changes whenever I push to the main branch.
2. It offers preview environments for the development branch.
3. It’s completely free for my use case.

## Analytics

While analytics might not be critical for a blog, I'm curious to have basic visitor trends. I opted for [Goatcounter](https://www.goatcounter.com). It’s:

- Free.
- Lightweight and respectful of user privacy.
- Can be self-hosted easily (with a simple [Dockerfile](https://github.com/cyprieng/goatcounter-dockerfile) hosted on a hetzner server with kubernetes).

## Performance and Accessibility

Optimizing performance and accessibility was a key goal. Here are some highlights:

- **Performance testing:**  
  ![Performance](assets/images/posts/2024/colophon/performance.png)
  _Tested with [pagespeed.web.dev](https://pagespeed.web.dev/)._

- **Accessibility testing:**  
  I used these tools to ensure accessibility compliance:

  - [WAVE Evaluation Tool](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
  - [axe DevTools](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

- **Environmental impact:**  
  ![Carbon impact](assets/images/posts/2024/colophon/carbon.png)
  _Tested with [websitecarbon.com](https://www.websitecarbon.com/)._

## License

The LICENSE for this kind of project is a bit tricky, here is mine: [LICENSE](https://github.com/cyprieng/cyprien.io/blob/main/LICENSE).
The license is split in two parts:

- Blog content: Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Technical components: Licensed under [MIT License](https://opensource.org/licenses/MIT).

This split licensing allows others to freely use the technical parts while requiring attribution for the content.

## Why "colophon" in the URL?

A **colophon** is a term from publishing. According to [Wikipedia](<https://en.wikipedia.org/wiki/Colophon_(publishing)>):

> In publishing, a colophon is a brief statement containing information about the publication of a book, such as its place of publication, publisher, and date.

I discovered this term from [this blog post](https://eva.town/colophon) and found it fitting for a post about the blog itself.

## Feedback and Suggestions

Your feedback is invaluable! If you notice any issues or have suggestions, you can:

1. File an issue on [GitHub](https://github.com/cyprieng/cyprien.io/issues/new).
2. Contact me directly via email (link in the footer).

