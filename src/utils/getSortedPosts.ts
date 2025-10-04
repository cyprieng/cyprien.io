import postFilter from "./postFilter";
import type { AnyCollectionEntry } from "./contentConfig";

/**
 * Filters and sorts posts by their publication or update date in descending order.
 * @param {AnyCollectionEntry[]} posts - Array of blog or project posts to sort
 * @returns {AnyCollectionEntry[]} Filtered and sorted posts, with most recent posts first
 */
function getSortedPosts(posts: AnyCollectionEntry[]) {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(
            b.data.updateDatetime ?? b.data.publicationDatetime,
          ).getTime() / 1000,
        ) -
        Math.floor(
          new Date(
            a.data.updateDatetime ?? a.data.publicationDatetime,
          ).getTime() / 1000,
        ),
    );
}

export default getSortedPosts;
