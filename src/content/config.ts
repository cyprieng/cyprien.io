import config from "@config";
import { defineCollection, z, type CollectionEntry } from "astro:content";

// Base schema for all collections
const baseSchema = {
  author: z.string().default(config.author), // Author: default from config
  publicationDatetime: z.date(), // Publication date
  updateDatetime: z.date().optional().nullable(), // Update date
  title: z.string(), // Title
  featured: z.boolean().optional(),
  draft: z.boolean().optional(), // Featured post
  tags: z.array(z.string()).default(["others"]), // Tags
  description: z.string(), // Description
  canonicalURL: z.string().optional(), // Url
};

// Blog collection
const blog = defineCollection({
  type: "content",
  schema: z.object(baseSchema),
});

// Projects collection
const projects = defineCollection({
  type: "content",
  schema: z.object({
    ...baseSchema,
    logo: z.string(), // Project logo
    link: z.string().optional(), // Project link
  }),
});

/**
 * Check if a value is a project entry.
 *
 * @param value - The value to check.
 * @returns True if the value is a project entry, false otherwise.
 */
export function isProject(
  value: unknown,
): value is CollectionEntry<"projects"> {
  return typeof (value as CollectionEntry<"projects">)?.data.logo === "string";
}

export const collections = { blog, projects };
