import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = <
  T extends CollectionEntry<"blog"> | CollectionEntry<"projects">,
>(
  posts: T[],
) => {
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
};

export default getSortedPosts;
