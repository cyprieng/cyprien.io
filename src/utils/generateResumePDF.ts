import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn, type ChildProcess } from "child_process";

// Get script dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Wait for server to be ready
 *
 * @param url url to check
 * @param timeout timeout to wait in milliseconds
 */
async function waitForServer(url: string, timeout = 30000): Promise<boolean> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Server did not start in time");
}

/**
 * Generate PDF from resume page
 */
export default async function buildResume(): Promise<void> {
  // Start dev server
  const devServer: ChildProcess = spawn("npm", ["run", "dev"], {
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
      path: `${__dirname}/../../public/assets/resume.pdf`,
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

buildResume();
