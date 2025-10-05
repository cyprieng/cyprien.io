/**
 * API endpoint to generate Open Graph images for individual posts and projects.
 */

import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { CONTENT_TYPES, type AnyCollectionEntry } from "@utils/contentConfig";

/**
 * Generates static paths for all post and project OG images
 */
export async function getStaticPaths() {
  const paths = [];

  for (const [contentType, config] of Object.entries(CONTENT_TYPES)) {
    const posts = await getCollection(config.collection).then((p) =>
      p.filter(({ data }) => !data.draft),
    );

    const postPaths = posts.map((post) => ({
      params: { content: contentType, slug: slugifyStr(post.data.title) },
      props: post,
    }));

    paths.push(...postPaths);
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImageForPost(props as AnyCollectionEntry);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
