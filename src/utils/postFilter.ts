import type { CollectionEntry } from "astro:content";

const postFilter = ({
  data,
}: CollectionEntry<"blog"> | CollectionEntry<"projects">) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.publicationDatetime).getTime();
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
