import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";
import type { AnyCollectionEntry } from "./contentConfig";

const getPostsByTag = (posts: AnyCollectionEntry[], tag: string) =>
  getSortedPosts(
    posts.filter((post) => slugifyAll(post.data.tags).includes(tag)),
  );

export default getPostsByTag;
