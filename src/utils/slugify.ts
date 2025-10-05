import { slug as slugger } from "github-slugger";

/**
 * Converts a string into a URL-friendly slug format.
 * @param {string} str - The string to be slugified
 * @returns {string} A lowercase, hyphenated slug suitable for URLs
 */
export const slugifyStr = (str: string): string => slugger(str);

/**
 * Converts an array of strings into URL-friendly slug formats.
 * @param {string[]} arr - Array of strings to be slugified
 * @returns {string[]} Array of lowercase, hyphenated slugs suitable for URLs
 */
export const slugifyAll = (arr: string[]): string[] =>
  arr.map((str) => slugifyStr(str));
