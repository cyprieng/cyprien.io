/**
 * API endpoint to generate the default Open Graph image for the site.
 */

import { generateOgImageForSite } from "@utils/generateOgImages";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () =>
  new Response(await generateOgImageForSite(), {
    headers: { "Content-Type": "image/png" },
  });
