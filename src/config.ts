import github from "./assets/images/icons/github.svg?raw";
import linkedin from "./assets/images/icons/linkedin.svg?raw";
import email from "./assets/images/icons/email.svg?raw";
import hackernews from "./assets/images/icons/hackernews.svg?raw";
import whatsapp from "./assets/images/icons/whatsapp.svg?raw";
import facebook from "./assets/images/icons/facebook.svg?raw";
import x from "./assets/images/icons/x.svg?raw";
import telegram from "./assets/images/icons/telegram.svg?raw";

// Social link
interface SocialLink {
  name: string; // Name of the social platform
  icon: string; // Icon SVG as string
  href: string; // Link to the social profile
}

// Config interface
interface Config {
  hostname: string; // Hostname of the site
  author: string; // Author name
  title: string; // Title of the site
  description: string; // Description of the site
  locale: string; // Locale of the site
  socials: SocialLink[]; // Array of social links
  sharingSocials: SocialLink[]; // Array of sharing social links
}

// Configuration object
const config: Config = {
  hostname: "https://www.cyprien.io/",
  author: "Cyprien",
  description: "Personal site of a software engineer from Montpellier, France",
  title: "Cyprien",
  locale: "en-US",
  socials: [
    {
      name: "GitHub",
      icon: github,
      href: "https://github.com/cyprieng",
    },
    {
      name: "HackerNews",
      icon: hackernews,
      href: "https://news.ycombinator.com/user?id=cyprien_g",
    },
    {
      name: "Email",
      icon: email,
      href: "mailto:hello@cyprien.io",
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      href: "https://www.linkedin.com/in/cyprien-guillemot/",
    },
  ],
  sharingSocials: [
    {
      name: "WhatsApp",
      href: "https://wa.me/?text={{title}}%20-%20{{url}}",
      icon: whatsapp,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/sharer.php?u={{title}}%20-%20{{url}}",
      icon: facebook,
    },
    {
      name: "X",
      href: "https://x.com/intent/tweet?url={{title}}%20-%20{{url}}",
      icon: x,
    },
    {
      name: "Telegram",
      href: "https://t.me/share/url?url={{url}}",
      icon: telegram,
    },
    {
      name: "Mail",
      href: "mailto:?subject=See%20this%20post&body={{title}}%20-%20-{{url}}",
      icon: email,
    },
    {
      name: "HackerNews",
      href: "https://news.ycombinator.com/submitlink?u={{url}}&t={{title}}",
      icon: hackernews,
    },
  ],
};

export default config;
