import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter }: Props) {
  const { title, pubDatetime, modDatetime } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-medium no-underline decoration-dashed hover:underline",
  };

  return (
    <li className="my-6 flex place-content-between">
      <a
        href={href}
        className="text-accent mr-2 inline-block text-lg font-medium no-underline! focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <h2 {...headerProps}>{title}</h2>
      </a>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        icon={false}
        className="text-right"
      />
    </li>
  );
}
