import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.cyprien.io/",
  author: "Cyprien",
  desc: "Personal site of a software engineer from Montpellier, France",
  title: "Cyprien",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerPage: 20,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/cyprieng",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@cyprien.io",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/cyprien-guillemot/",
    linkTitle: `${SITE.title} on LinkedIn`,
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
