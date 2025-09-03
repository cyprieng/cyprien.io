import rss from "@astrojs/rss";
import config from "@config";
import getSortedPosts from "@utils/getSortedPosts";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: config.title,
    description: config.description,
    site: config.hostname,
    items: sortedPosts.map(({ data, slug }) => ({
      link: `posts/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
