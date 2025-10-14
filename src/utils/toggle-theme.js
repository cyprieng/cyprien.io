// Get theme value from local storage or user device preference
function getTheme() {
  // Return theme value in local storage if it is set
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) return currentTheme;

  // Return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Store theme preference in local storage
function setPreference() {
  localStorage.setItem("theme", themeValue);
  applyTheme();
}

// Change giscus theme
function changeGiscusTheme(theme) {
  // Send message to giscus iframe
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
}

// Apply theme
function applyTheme() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  // Set the theme for giscus
  changeGiscusTheme(themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// Theme value
let themeValue = getTheme();

// Set early so no page flashes / CSS is made aware
applyTheme();

// Event for the theme toggle button
window.onload = () => {
  function setThemeFeature() {
    // Set on load so screen readers can get the latest value on the button
    applyTheme();

    // Now this script can find and listen for clicks on the control
    document.querySelector("#theme-btn")?.addEventListener("click", () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
};

// Sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
