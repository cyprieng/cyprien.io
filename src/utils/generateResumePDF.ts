import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";

// Get script dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Wait for server to be ready
 *
 * @param url url to check
 * @param [timeout=30000] timeout to wait
 */
async function waitForServer(url: string, timeout = 30000) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Server did not start in time");
}

/**
 * Generate PDF
 */
export default async function () {
  // Start dev server
  const devServer = spawn("npm", ["run", "dev"], {
    stdio: "inherit",
  });

  try {
    // Wait for server to be ready
    await waitForServer("http://localhost:4321");

    // Open browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Go to resume page
    await page.goto("http://localhost:4321/resume/raw");
    await page.waitForNetworkIdle();

    // Save to pdf
    await page.pdf({
      path: `${__dirname}/../../dist/assets/resume.pdf`,
      format: "A4",
      printBackground: true,
      pageRanges: "1",
    });

    // Close browser
    await browser.close();
  } finally {
    // Kill dev server
    devServer.kill();
  }
}
