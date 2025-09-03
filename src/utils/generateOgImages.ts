import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import fs from "fs";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Get dirname
const __dirname = new URL(".", import.meta.url).pathname;

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

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(
  post: CollectionEntry<"blog"> | CollectionEntry<"projects">,
) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
