import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import fs from "fs";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Get dirname
const __dirname = new URL(".", import.meta.url).pathname;

const fetchFonts = async () => {
  // Regular Font
  const fontRegular = fs.readFileSync(
    `${__dirname}/../../assets/fonts/inter/Inter-Regular.ttf`
  );

  // Bold Font
  const fontBold = fs.readFileSync(
    `${__dirname}/../../assets/fonts/inter/Inter-Bold.ttf`
  );

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Inter",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
