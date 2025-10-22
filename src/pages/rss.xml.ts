/**
 * API endpoint to generate RSS feed for blog posts.
 */

import rss from "@astrojs/rss";
import config from "@config";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: config.title,
    description: config.description,
    site: config.hostname,
    stylesheet: "/pretty-feed-v3.xsl",
    items: sortedPosts.map(({ data, slug, body }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.updateDatetime ?? data.publicationDatetime),
      content: sanitizeHtml(parser.render(body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
  });
}
