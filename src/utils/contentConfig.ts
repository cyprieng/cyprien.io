import type { CollectionEntry } from "astro:content";

export const CONTENT_TYPES = {
  posts: {
    collection: "blog",
    title: "Posts",
  },
  projects: {
    collection: "projects",
    title: "Projects",
  },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;
export type CollectionName = (typeof CONTENT_TYPES)[ContentType]["collection"];

export type AnyCollectionEntry =
  | CollectionEntry<"blog">
  | CollectionEntry<"projects">;

/**
 * Type guard to check if a value is a valid content type.
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is a valid ContentType, false otherwise
 */
export function isValidContentType(value: unknown): value is ContentType {
  return typeof value === "string" && value in CONTENT_TYPES;
}

/**
 * Retrieves the Astro collection name for a given content type.
 * @param {ContentType} contentType - The content type ("posts" or "projects")
 * @returns {CollectionName} The corresponding Astro collection name ("blog" or "projects")
 */
export function getCollectionForContentType(
  contentType: ContentType,
): CollectionName {
  return CONTENT_TYPES[contentType].collection;
}

/**
 * Retrieves the display title for a given content type.
 * @param {ContentType} contentType - The content type ("posts" or "projects")
 * @returns {string} The display title for the content type ("Posts" or "Projects")
 */
export function getTitleForContentType(contentType: ContentType): string {
  return CONTENT_TYPES[contentType].title;
}
