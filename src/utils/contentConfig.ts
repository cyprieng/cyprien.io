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

export function isValidContentType(value: unknown): value is ContentType {
  return typeof value === "string" && value in CONTENT_TYPES;
}

export function getCollectionForContentType(
  contentType: ContentType,
): CollectionName {
  return CONTENT_TYPES[contentType].collection;
}

export function getTitleForContentType(contentType: ContentType): string {
  return CONTENT_TYPES[contentType].title;
}
