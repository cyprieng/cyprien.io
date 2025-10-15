import { useEffect, useState } from "react";

/**
 * Represents an artist from the Last.fm API
 */
interface Artist {
  name: string; // Artist name
  mbid: string; // MusicBrainz ID - unique identifier for the artist
  url: string; // Last.fm profile URL for the artist
  playcount: string; // Total number of plays for this artist
  image?: string | null; // URL to artist image
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
 * Generates a filename slug from an artist name
 *
 * @param artistName - Name of the artist
 * @returns Slugified filename
 */
export function slugifyArtistName(artistName: string): string {
  return artistName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Gets the local image URL for an artist
 * All images are stored as JPG in public/images/music/ directory
 *
 * @param artistName - Name of the artist
 * @returns Local image URL
 */
function getLocalImageUrl(artistName: string): string {
  const slug = slugifyArtistName(artistName);
  return `/assets/images/about/music/${slug}.jpg`;
}

/**
 * Widget component that displays a user's top artists from Last.fm
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
     * Fetches the user's top artists from Last.fm and uses local images
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

        // Enrich each artist with their local image
        const enrichedArtists = artistsData.map((artist: Artist) => {
          return {
            ...artist,
            image: getLocalImageUrl(artist.name),
          };
        });

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
        const imageUrl = artist.image;
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
