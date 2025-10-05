import postFilter from "./postFilter";
import { slugifyStr } from "./slugify";
import type { AnyCollectionEntry } from "./contentConfig";

interface Tag {
  tag: string;
  tagName: string;
}

/**
 * Extracts and returns a sorted array of unique tags from all posts.
 * @param {AnyCollectionEntry[]} posts - Array of blog or project posts to extract tags from
 * @returns {Tag[]} Sorted array of unique tag objects, each containing the slugified tag and original tag name
 */
const getUniqueTags = (posts: AnyCollectionEntry[]): Tag[] => {
  const tags: Tag[] = posts
    .filter(postFilter)
    .flatMap((post) => post.data.tags)
    .map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex((tag) => tag.tag === value.tag) === index,
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
