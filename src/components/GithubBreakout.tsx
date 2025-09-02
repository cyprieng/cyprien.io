import { useState, type FormEvent } from "react";
import { generateSVG } from "github-breakout";
import type { ColorPalette } from "github-breakout/src/svg";

// Github Breakout form to try the svg generation
export default function GithubBreakoutForm() {
  // Generation options
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [ghostBricks, setGhostBricks] = useState(true);
  const [paddleColor, setPaddleColor] = useState("#1F6FEB");
  const [ballColor, setBallColor] = useState("#1F6FEB");
  const [theme, setTheme] = useState<"github_light" | "github_dark" | "custom">(
    themeValue === "light" ? "github_light" : "github_dark",
  );
  const [bricksColors, setBricksColors] = useState(
    "#ebedf0,#9be9a8,#40c463,#30a14e,#216e39",
  );

  const [svg, setSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate SVGs based on the provided username and token
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      setSvg(
        await generateSVG(username, token, {
          enableGhostBricks: ghostBricks,
          paddleColor,
          ballColor,
          bricksColors:
            theme === "custom"
              ? (bricksColors.split(",") as ColorPalette)
              : theme,
        }),
      );
    } catch {
      setError(
        "Failed to generate SVG. Please check your credentials and try again.",
      );
      setSvg(null);
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
      {error && <div className="mb-4 text-center text-red-600">{error}</div>}
      {!svg ? (
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label>
              <p className="mb-0">GitHub username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
                className="w-full"
              />
            </label>
          </div>
          <div className="mb-6">
            <label>
              <p className="mb-0">Token:</p>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                autoComplete="off"
                className="w-full"
              />
            </label>
          </div>
          <div className="mb-6">
            <label>
              <p className="mb-0">
                <span className="inline-flex items-center gap-2">
                  <span>Enable ghost bricks:</span>
                  <input
                    type="checkbox"
                    checked={ghostBricks}
                    onChange={(e) => setGhostBricks(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600 dark:peer-focus:ring-blue-800"></div>
                </span>
              </p>
            </label>

            <h4 className="mb-0">Colors:</h4>
            <label>
              <p className="mb-0">Paddle:</p>
              <input
                type="text"
                value={paddleColor}
                onChange={(e) => setPaddleColor(e.target.value)}
                required
                autoComplete="off"
                className="w-full"
              />
            </label>

            <label>
              <p className="mb-0">Ball:</p>
              <input
                type="text"
                value={ballColor}
                onChange={(e) => setBallColor(e.target.value)}
                required
                autoComplete="off"
                className="w-full"
              />
            </label>

            <label>
              <p className="mb-0">
                Bricks theme:{" "}
                <select
                  value={theme}
                  onChange={(e) =>
                    setTheme(
                      e.target.value as
                        | "github_light"
                        | "github_dark"
                        | "custom",
                    )
                  }
                  required
                  className="w-full"
                >
                  <option value="github_light">GitHub Light</option>
                  <option value="github_dark">GitHub Dark</option>
                  <option value="custom">Custom</option>
                </select>
              </p>
            </label>
            {theme === "custom" && (
              <label>
                <p className="mb-0">Bricks colors:</p>
                <input
                  type="text"
                  value={bricksColors}
                  onChange={(e) => setBricksColors(e.target.value)}
                  required
                  autoComplete="off"
                  className="w-full"
                />
              </label>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Generate SVG
          </button>
        </form>
      ) : (
        <div>
          <div
            className="svg-full-width block w-full"
            dangerouslySetInnerHTML={{
              __html: svg,
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
            className="mt-6 w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            onClick={() => setSvg(null)}
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
