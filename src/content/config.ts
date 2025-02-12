import { SITE } from "@config";
import { defineCollection, z, type ImageFunction } from "astro:content";

const schema = ({ image }: { image: ImageFunction }) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine((img) => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    logo: z.string().optional(),
    link: z.string().optional(),
  });

const blog = defineCollection({
  type: "content",
  schema,
});

const projects = defineCollection({
  type: "content",
  schema,
});

export const collections = { blog, projects };
