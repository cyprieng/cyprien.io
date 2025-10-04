import type { AnyCollectionEntry } from "./contentConfig";

const postFilter = ({ data }: AnyCollectionEntry) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.publicationDatetime).getTime();
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
