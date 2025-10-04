import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";
import type { AnyCollectionEntry } from "./contentConfig";

/**
 * Filters posts by a specific tag and returns them sorted.
 * @param {AnyCollectionEntry[]} posts - Array of blog or project posts to filter
 * @param {string} tag - The slugified tag to filter by
 * @returns {AnyCollectionEntry[]} Sorted array of posts that contain the specified tag
 */
const getPostsByTag = (posts: AnyCollectionEntry[], tag: string) =>
  getSortedPosts(
    posts.filter((post) => slugifyAll(post.data.tags).includes(tag)),
  );

export default getPostsByTag;
