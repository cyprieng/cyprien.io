import { useEffect, useState } from "react";

/**
 * Represents an artist from the Last.fm API
 */
interface Artist {
  name: string; // Artist name
  mbid: string; // MusicBrainz ID - unique identifier for the artist
  url: string; // Last.fm profile URL for the artist
  playcount: string; // Total number of plays for this artist
  wikidataImage?: string | null; // URL to artist image from Wikidata/Wikimedia Commons
  "@attr": {
    rank: string; // Artist's rank in the top artists list
  };
}

/**
 * Props for the LastFmWidget component
 */
interface LastFmWidgetProps {
  userId: string; // Last.fm username to fetch top artists for
  apiKey: string; // Last.fm API key for authentication
}

/**
 * Fetches an artist's image from Wikidata/Wikimedia Commons
 *
 * @param artistName - Name of the artist
 * @param mbid - MusicBrainz ID of the artist (optional)
 * @returns URL to the artist's image, or null if not found
 */
async function fetchArtistImage(
  artistName: string,
  mbid: string,
): Promise<string | null> {
  try {
    let wikidataId = null;

    // Strategy 1: Use MusicBrainz ID to get Wikidata ID (most reliable)
    if (mbid) {
      const mbResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=url-rels`,
      );

      if (mbResponse.ok) {
        const mbData = await mbResponse.json();

        // Look for the Wikidata relation in the artist's URL relationships
        const wikidataRel = mbData.relations?.find(
          (rel: { type: string; url: { resource: string } }) =>
            rel.type === "wikidata",
        );

        if (wikidataRel) {
          // Extract the Wikidata ID from the URL (e.g., "Q1234" from "https://www.wikidata.org/wiki/Q1234")
          wikidataId = wikidataRel.url.resource.split("/").pop();
        }
      }
    }

    // Strategy 2: Search Wikidata by artist name (fallback when no mbid or mbid lookup fails)
    if (!wikidataId) {
      const searchResponse = await fetch(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(artistName)}&language=en&format=json&origin=*`,
      );

      if (!searchResponse.ok) return null;

      const searchData = await searchResponse.json();
      if (!searchData.search || searchData.search.length === 0) return null;

      // Use the first search result's Wikidata ID
      wikidataId = searchData.search[0].id;
    }

    // Now that we have a Wikidata ID, fetch the entity's claims (properties)
    const response = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&props=claims&format=json&origin=*`,
    );

    if (!response.ok) return null;

    const data = await response.json();
    const entity = data.entities[wikidataId];

    // Priority 1: Try to get the logo image (P154) - cleaner for brands/bands
    const logoClaim = entity?.claims?.P154?.[0];
    const logoFilename = logoClaim?.mainsnak?.datavalue?.value;

    if (logoFilename) {
      // Return the Wikimedia Commons image URL with 500px width
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(logoFilename)}?width=500`;
    }

    // Priority 2: Fallback to regular image property (P18) - photos/portraits
    const imageClaim = entity?.claims?.P18?.[0];
    const imageFilename = imageClaim?.mainsnak?.datavalue?.value;

    if (imageFilename) {
      // Return the Wikimedia Commons image URL with 500px width
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageFilename)}?width=500`;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Widget component that displays a user's top artists from Last.fm
 * with artist images fetched from Wikidata/Wikimedia Commons
 *
 * @param props - Component props
 * @returns React component displaying top artists
 */
export default function LastFmWidget({ userId, apiKey }: LastFmWidgetProps) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches the user's top artists from Last.fm and enriches them with images
     * from Wikidata/Wikimedia Commons
     */
    const fetchTopArtists = async () => {
      try {
        // Fetch top 10 artists from Last.fm API
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${userId}&api_key=${apiKey}&format=json&limit=10`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const artistsData = data.topartists.artist;

        // Enrich each artist with their image from Wikidata
        // All image fetches happen in parallel for better performance
        const enrichedArtists = await Promise.all(
          artistsData.map(async (artist: Artist) => {
            const wikidataImage = await fetchArtistImage(
              artist.name,
              artist.mbid,
            );
            return {
              ...artist,
              wikidataImage,
            };
          }),
        );

        setArtists(enrichedArtists);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, [userId, apiKey]); // Re-fetch when user ID or API key changes

  // Show loading state while fetching data
  if (loading) {
    return <div className="prose text-foreground">Loading...</div>;
  }

  // Show error state if fetch failed
  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error fetching Last.fm artists
      </div>
    );
  }

  // Render the list of top artists
  return (
    <div className="space-y-4">
      {artists.map((artist) => {
        const imageUrl = artist.wikidataImage;
        const hasImage = imageUrl && imageUrl.trim() !== "";

        return (
          <a
            key={artist.mbid || artist.name}
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-skin-card border-skin-line flex items-center gap-4 rounded-lg border p-4 no-underline shadow-md transition-shadow hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600"
          >
            {/* Artist image or fallback music icon */}
            {hasImage ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white p-2">
                <img
                  src={imageUrl}
                  alt={artist.name}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="bg-skin-fill flex h-16 w-16 items-center justify-center rounded-md">
                <span className="text-2xl">🎵</span>
              </div>
            )}

            {/* Artist name and play count */}
            <div className="flex-1">
              <h3 className="text-skin-base text-lg font-semibold">
                {artist.name}
              </h3>
              <p className="text-skin-muted text-sm">
                {artist.playcount} plays
              </p>
            </div>

            {/* Artist rank badge */}
            <div className="text-skin-muted text-3xl font-bold opacity-50">
              #{artist["@attr"].rank}
            </div>
          </a>
        );
      })}
    </div>
  );
}
