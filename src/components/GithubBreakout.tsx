import { useState, type FormEvent } from "react";
import { generateSVG } from "github-breakout";

// Github Breakout form to try the svg generation
export default function GithubBreakoutForm() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [svg, setSvg] = useState<string | null>(null);
  const [svgDark, setSvgDark] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate SVGs based on the provided username and token
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      setSvg(await generateSVG(username, token, false));
      setSvgDark(await generateSVG(username, token, true));
    } catch (err: any) {
      setError(
        err?.message ||
          "Failed to generate SVG. Please check your credentials and try again.",
      );
      setSvg(null);
      setSvgDark(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while SVGs are being generated
  if (isLoading) {
    return <div className="mt-4 text-center text-gray-500">Loading SVG...</div>;
  }

  return (
    <div>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {!svg || !svgDark ? (
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="mb-2">
              <p className="m-0">GitHub username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="mb-2">
              <p className="m-0">Token:</p>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                autoComplete="off"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Generate SVG
          </button>
        </form>
      ) : (
        <div>
          <div
            className="svg-full-width w-full block dark:hidden"
            dangerouslySetInnerHTML={{
              __html: svg,
            }}
          />
          <div
            className="svg-full-width w-full hidden dark:block"
            dangerouslySetInnerHTML={{
              __html: svgDark,
            }}
          />
          <style>
            {`
            .svg-full-width svg {
              width: 100% !important;
              height: auto !important;
              display: block;
            }
          `}
          </style>

          <button
            className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={() => setSvg(null)}
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
