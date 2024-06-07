import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.cyprien.io/",
  author: "Cyprien",
  desc: "",
  title: "Cyprien",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 50,
  height: 50,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/cyprieng",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@cyprien.io",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://x.com/cyprien_g",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cyprien__g/",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
];
