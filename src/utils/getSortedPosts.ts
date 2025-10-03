import postFilter from "./postFilter";
import type { AnyCollectionEntry } from "./contentConfig";

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
