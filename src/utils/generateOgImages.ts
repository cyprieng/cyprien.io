import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import type { AnyCollectionEntry } from "./contentConfig";

// Get dirname
const __dirname = new URL(".", import.meta.url).pathname;

/**
 * Loads the JetBrains Mono fonts required for OG image generation.
 * @returns {Promise<{jetBrainsMonoRegular: Buffer, jetBrainsMonoBold: Buffer}>} Object containing regular and bold font buffers
 */
const fetchFonts = async () => {
  const jetBrainsMonoRegular = await fs.promises.readFile(
    `${__dirname}../../src/utils/og-templates/fonts/JetBrainsMono-Regular.ttf`,
  );
  const jetBrainsMonoBold = await fs.promises.readFile(
    `${__dirname}../../src/utils/og-templates/fonts/JetBrainsMono-Bold.ttf`,
  );
  return { jetBrainsMonoRegular, jetBrainsMonoBold };
};

const { jetBrainsMonoRegular, jetBrainsMonoBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "JetBrains Mono",
      data: jetBrainsMonoRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "JetBrains Mono",
      data: jetBrainsMonoBold,
      weight: 700,
      style: "normal",
    },
  ],
};

/**
 * Converts an SVG string to a PNG buffer.
 * @param {string} svg - The SVG markup string to convert
 * @returns {Buffer} PNG image buffer
 */
function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

/**
 * Generates an Open Graph image for a specific post or project.
 * @param {AnyCollectionEntry} post - The blog post or project entry to generate an OG image for
 * @returns {Promise<Buffer>} PNG buffer of the generated OG image
 */
export async function generateOgImageForPost(post: AnyCollectionEntry) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

/**
 * Generates the default Open Graph image for the site.
 * @returns {Promise<Buffer>} PNG buffer of the generated site OG image
 */
export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
