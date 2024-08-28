import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import fs from "fs";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Get dirname
const __dirname = new URL(".", import.meta.url).pathname;

const fetchFonts = async () => {
  const robotoMonoRegular = await fs.promises.readFile(
    `${__dirname}/../../assets/fonts/RobotoMono-Regular.ttf`
  );
  const robotoMonoBold = await fs.promises.readFile(
    `${__dirname}/../../assets/fonts/RobotoMono-Bold.ttf`
  );
  return { robotoMonoRegular, robotoMonoBold };
};

const { robotoMonoRegular, robotoMonoBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Roboto Mono",
      data: robotoMonoRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Roboto Mono",
      data: robotoMonoBold,
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

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
