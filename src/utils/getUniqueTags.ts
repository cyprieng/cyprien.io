import postFilter from "./postFilter";
import { slugifyStr } from "./slugify";
import type { AnyCollectionEntry } from "./contentConfig";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: AnyCollectionEntry[]) => {
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
