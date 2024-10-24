---
author: Cyprien
pubDatetime: 2024-09-26T06:12:00.000Z
modDatetime: 2024-09-26T06:12:00.000Z
title: How this blog is built
slug: colophon
featured: false
draft: false
description: A detailed look at the technologies and process behind creating this blog
tags:
  - development
  - web development
---

After years of wanting to build my blog, here it is finally.
The first post of this blog will be a quick description on how I've built it.

## Choose the tech stack

My primary requirements were:

1. Blog posts should be written in markdown
2. The blog should be hostable with only static content

With these two requirements, a list of obvious contenders was:

- Hugo
- Jekyll
- Astro
- Gatsby
- Eleventy

|             | Hugo      | Jekyll | Astro      | Gatsby     | Eleventy   |
| ----------- | --------- | ------ | ---------- | ---------- | ---------- |
| Language    | Go        | Ruby   | JavaScript | JavaScript | JavaScript |
| Year        | 2013      | 2008   | 2021       | 2015       | 2021       |
| Build Speed | Very Fast | Fast   | Fast       | Moderate   | Fast       |
| Ecosystem   | Large     | Large  | Growing    | Large      | Growing    |

I wanted to have a framework in the Javascript ecosystem. And from this, the two best were, in my opinion, Astro and Eleventy.
I finally settled for Astro as it seems to have a slightly bigger community and more features.

## Build it

Then came the normally hard part, building the blog from the ground up.
I think the value comes more from the content than the tech side of the blog.
Moreover, I have a lot of more interesting projects on the shelf.
So I decided not to start from scratch and instead start with an existing Astro theme.
I settled for this one: [astro-paper](https://github.com/satnaing/astro-paper).

5min later my blog was up and running on my laptop.
After some customization, here it is.
All the source code is freely available here: [github.com/cyprieng/cyprien.io](https://github.com/cyprieng/cyprien.io).

## Comments

I've added comments to the blog posts using [Giscus](https://giscus.app/).
It's free, open source, and doesn't require any server.

## Hosting

I use Cloudflare Pages to host the blog.
It's very convenient as it automatically detects push on the main branch, builds it, and deploys it.
It also provides a preview environment that deploys automatically my dev branch.
And the cherry on the cake it's completely free.

## Performance and accessibility

I've made significant efforts to optimize performance, although there's always room for improvement:
![Performance](assets/images/posts/colophon/performance.png)
_Tested with [pagespeed.web.dev](https://pagespeed.web.dev/)_

I've also checked the accessibility using these two Chrome extensions:

- [WAVE Evaluation Tool](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
- [axe DevTools](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

I'm also proud of the site's environmental impact:
![Carbon impact](assets/images/posts/colophon/carbon.png)
_Tested with [websitecarbon.com](https://www.websitecarbon.com/)_

## License

The LICENSE for this kind of project is a bit tricky, here is mine: [LICENSE](https://github.com/cyprieng/cyprien.io/blob/main/LICENSE).
All the files in the content directory (ie the blog posts) are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
And all the other files are freely usable by anyone under the MIT license.
Like this, all the technical parts can be used by anyone, but the content cannot be copied without attribution.

## Why colophon in the url?

Colophon comes from the publishing world.

From [Wikipedia](<https://en.wikipedia.org/wiki/Colophon_(publishing)>):

> In publishing, a colophon is a brief statement containing information about the publication of a book such as an "imprint" (the place of publication, the publisher, and the date of publication).

And I learned about it from [this blog post](https://eva.town/colophon).

## Notice an issue or have an idea?

Your feedback is valuable! If you notice any issues (typos, broken design, etc.) or have suggestions for improvement, please:

1. File an issue on [GitHub](https://github.com/cyprieng/cyprien.io/issues/new)
2. Contact me directly via email (link in the footer)
