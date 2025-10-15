import { useEffect, useState } from "react";

/**
 * Props for the ThemeImage component
 */
interface ThemeImageProps {
  lightSrc: string; // URL of the image to display in light mode
  darkSrc: string; // URL of the image to display in dark mode
  alt: string; // Alt text for the image
  height?: string; // Height of the image
  width?: string; // Width of the image
  class?: string; // CSS class names to apply to the image
}

/**
 * A React component that displays different images based on the current theme.
 * Automatically switches between light and dark images when the theme changes.
 *
 * The component monitors the `data-theme` attribute on the document root element
 * and updates the displayed image accordingly.
 *
 * @example
 * ```tsx
 * <ThemeImage
 *   client:load
 *   lightSrc="/images/logo-light.svg"
 *   darkSrc="/images/logo-dark.svg"
 *   alt="Logo"
 *   width="200px"
 *   height="100px"
 * />
 * ```
 */
export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  height,
  width,
  class: className,
}: ThemeImageProps) {
  // Initialize with undefined to prevent flash, will be set on mount
  const [theme, setTheme] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get initial theme
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
    setMounted(true);

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme =
            document.documentElement.getAttribute("data-theme") || "light";
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Don't render until mounted to prevent flash
  if (!mounted) {
    return null;
  }

  return (
    <img
      src={theme === "dark" ? darkSrc : lightSrc}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
