---
author: Cyprien
pubDatetime: 2024-06-07T00:47:00.000Z
modDatetime: 2024-06-07T00:47:00.000Z
title: How this blog is built
slug: colophon
featured: false
draft: false
description: A short description of the technologies used to make this blog
tags:
  - dev
---

After years of wanting to build my own personal site, here it is.

One of my two first requirements, were:

- Blog post should be written in markdown
- The blog should be hostable with only static content

With this two requirements, a list of obvious contenders was:

- Hugo
- Jekyll
- Astro
- ...

I review all of them and I finally settled for Astro, as it seems to gain a lot of popularity recently, and I wanted to stay in the Javascript ecosystem.

Then came the normally hard part, building the blog from the ground up.
I think the value come more from the content than the tech side of the blog.
Moreover I have a lot of more interestsing projects on the shelf.
So I decided to not start from scratch and instead start with an existing Astro theme.
I settled for this one: [astro-paper](https://github.com/satnaing/astro-paper).
I didn't like that much the design, but it had all the functionnality that I wanted.

5min later my blog was up and running on my laptop.
After some customization, here it is.
All the source code is freely available here: [github.com/cyprieng/cyprien.io](https://github.com/cyprieng/cyprien.io).

The LICENSE for this kind of project is a bit tricky, here is mine: [LICENSE](https://github.com/cyprieng/cyprien.io/blob/main/LICENSE).
All the files in the content directory (ie the blog posts) are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
And all the other files are freely usable by anyone under the MIT license.
Like this all the technical part can be used by anyone, but the content cannot be copied without attribution.
