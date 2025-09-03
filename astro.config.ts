import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import config from "./src/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: config.hostname,
  integrations: [react(), sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [tailwindcss()],
  },
  scopedStyleStrategy: "where",
});
