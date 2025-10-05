import type { AnyCollectionEntry } from "./contentConfig";

/**
 * Filters posts based on draft status and publication date.
 * In production, only returns published posts with passed publication dates.
 * In development, returns all non-draft posts regardless of publication date.
 * @param {AnyCollectionEntry} entry - The blog post or project entry to filter
 * @param {Object} entry.data - The entry's data containing draft and publication date
 * @returns {boolean} True if the post should be included, false otherwise
 */
const postFilter = ({ data }: AnyCollectionEntry): boolean => {
  const isPublishTimePassed =
    Date.now() > new Date(data.publicationDatetime).getTime();
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
