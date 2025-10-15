import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { slugifyArtistName } from "@components/LastfmWidget";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LASTFM_USER = "Gunners91";
const LASTFM_API_KEY = "ca8768077c99fac0d3c427b0ae3847a3";
const OUTPUT_DIR = path.join(
  __dirname,
  "../../public/assets/images/about/music",
);

// Image optimization settings
const IMAGE_SIZE = 128; // 2x the display size (64px) for better quality on retina displays
const IMAGE_QUALITY = 85; // Optimized quality setting

/**
 * Represents an artist from the Last.fm API
 */
interface Artist {
  name: string; // Artist name
  mbid: string; // MusicBrainz ID - unique identifier for the artist
  url: string; // Last.fm profile URL for the artist
  playcount: string; // Total number of plays for this artist
  "@attr": {
    rank: string; // Artist's rank in the top artists list
  };
}

/**
 * Represents a Wikidata relation from MusicBrainz
 */
interface WikidataRelation {
  type: string; // Type of relation
  url: {
    resource: string; // URL resource containing Wikidata ID
  };
}

/**
 * Represents MusicBrainz artist data
 */
interface MusicBrainzData {
  relations?: WikidataRelation[]; // Array of relations including Wikidata links
}

/**
 * Represents Wikidata search results
 */
interface WikidataSearchResult {
  search?: Array<{
    id: string; // Wikidata entity ID
    description?: string; // Entity description (e.g., "Finnish heavy metal band")
  }>; // Array of search results with Wikidata IDs
}

/**
 * Represents a Wikidata entity with image claims
 */
interface WikidataEntity {
  claims?: {
    P154?: Array<{
      // P154: logo image property
      mainsnak?: {
        datavalue?: {
          value?: string; // Wikimedia Commons filename
        };
      };
    }>;
    P18?: Array<{
      // P18: image property
      mainsnak?: {
        datavalue?: {
          value?: string; // Wikimedia Commons filename
        };
      };
    }>;
  };
}

/**
 * Represents a Wikidata API response
 */
interface WikidataResponse {
  entities: {
    [key: string]: WikidataEntity; // Entities indexed by Wikidata ID
  };
}

/**
 * Represents Last.fm API response for top artists
 */
interface LastFmResponse {
  topartists: {
    artist: Artist[]; // Array of top artists
  };
}

/**
 * Fetches artist image from Wikidata/Wikimedia Commons
 * Uses two strategies: MusicBrainz ID lookup (preferred) and name search (fallback)
 *
 * @param artistName - Name of the artist
 * @param mbid - MusicBrainz ID of the artist
 * @returns URL to the artist's image on Wikimedia Commons, or null if not found
 */
async function fetchArtistImage(
  artistName: string,
  mbid: string,
): Promise<string | null> {
  try {
    let wikidataId: string | null = null;

    // Strategy 1: Use MusicBrainz ID to get Wikidata ID (most reliable)
    if (mbid) {
      const mbResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=url-rels`,
      );

      if (mbResponse.ok) {
        const mbData = (await mbResponse.json()) as MusicBrainzData;
        const wikidataRel = mbData.relations?.find(
          (rel) => rel.type === "wikidata",
        );

        if (wikidataRel) {
          wikidataId = wikidataRel.url.resource.split("/").pop() || null;
        }
      }
    }

    // Strategy 2: Search Wikidata by artist name
    if (!wikidataId) {
      const searchResponse = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(artistName)}&language=en&format=json&origin=*`,
      );

      if (!searchResponse.ok) return null;

      const searchData = (await searchResponse.json()) as WikidataSearchResult;
      if (!searchData.search || searchData.search.length === 0) return null;

      // Try to find a music-related entity (band, musician, musical group, etc.)
      const musicRelatedDescriptions = [
        "band",
        "musician",
        "musical group",
        "singer",
        "artist",
        "music group",
        "heavy metal",
        "rock band",
        "pop group",
        "rapper",
        "composer",
      ];

      const musicEntity = searchData.search.find((result) => {
        const description = result.description?.toLowerCase() || "";
        return musicRelatedDescriptions.some((keyword) =>
          description.includes(keyword),
        );
      });

      // Use music-related entity if found, otherwise fall back to first result
      wikidataId = musicEntity ? musicEntity.id : searchData.search[0].id;
    }

    // Fetch the entity's claims
    const response = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&props=claims&format=json&origin=*`,
    );

    if (!response.ok) return null;

    const data = (await response.json()) as WikidataResponse;
    const entity = data.entities[wikidataId];

    // Try logo first (P154)
    const logoClaim = entity?.claims?.P154?.[0];
    const logoFilename = logoClaim?.mainsnak?.datavalue?.value;

    if (logoFilename) {
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(logoFilename)}?width=800`;
    }

    // Fallback to regular image (P18)
    const imageClaim = entity?.claims?.P18?.[0];
    const imageFilename = imageClaim?.mainsnak?.datavalue?.value;

    if (imageFilename) {
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageFilename)}?width=800`;
    }
  } catch (error) {
    console.error(
      `Error fetching image for ${artistName}:`,
      error instanceof Error ? error.message : "Unknown error",
    );
    return null;
  }

  return null;
}

/**
 * Downloads an image from URL, converts it to JPG, and saves it locally
 * The image is resized to 128x128px (2x display size for retina) and optimized
 *
 * @param url - URL of the image to download
 * @param filepath - Local filesystem path where the JPG image will be saved
 * @throws {Error} If the download fails or image conversion fails
 */
async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Optimize image: resize to 128x128px, convert to JPG with white background
  // Using 'inside' fit to maintain aspect ratio without cropping
  await sharp(buffer)
    .resize(IMAGE_SIZE, IMAGE_SIZE, {
      fit: "inside", // Maintain aspect ratio, fit within dimensions
      withoutEnlargement: false, // Allow upscaling if needed
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Add white background for transparency
    .jpeg({
      quality: IMAGE_QUALITY,
      progressive: true, // Progressive JPG for better perceived loading
      mozjpeg: true, // Use mozjpeg for better compression
    })
    .toFile(filepath);
}

/**
 * Main function that orchestrates the artist image download process
 *
 * Workflow:
 * 1. Creates output directory if it doesn't exist
 * 2. Fetches top 10 artists from Last.fm API
 * 3. For each artist, checks if image already exists (skips if found)
 * 4. Fetches artist image from Wikidata/Wikimedia Commons
 * 5. Downloads and converts image to JPG format with white background
 *
 * @throws {Error} If Last.fm API request fails or other critical errors occur
 */
async function main() {
  console.log("🎵 Downloading artist images from Last.fm...\n");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}\n`);
  }

  // Fetch top artists from Last.fm
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=10`,
  );

  if (!response.ok) {
    console.error("❌ Failed to fetch artists from Last.fm");
    process.exit(1);
  }

  const data = (await response.json()) as LastFmResponse;
  const artists = data.topartists.artist;

  console.log(`Found ${artists.length} top artists\n`);

  // Download images for each artist
  for (const artist of artists) {
    const slug = slugifyArtistName(artist.name);

    // Check if image already exists (JPG only now)
    const filepath = path.join(OUTPUT_DIR, `${slug}.jpg`);

    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping ${artist.name} (already exists: ${slug}.jpg)`);
      continue;
    }

    const imageUrl = await fetchArtistImage(artist.name, artist.mbid);

    if (!imageUrl) {
      console.log(`⚠️  No image found for: ${artist.name}`);
      continue;
    }

    try {
      // Download and convert to JPG
      await downloadImage(imageUrl, filepath);
      console.log(`✓ Downloaded: ${artist.name} → ${slug}.jpg`);
    } catch (error) {
      console.error(
        `❌ Failed to download ${artist.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  console.log("\n✨ Done!");
}

main().catch(console.error);
