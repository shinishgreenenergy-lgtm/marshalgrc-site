import { defineConfig, devices } from "@playwright/test";

const PORT = 3400;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`, trace: "off" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Serves the exported site, so the tests check what actually ships.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx --yes serve out -l ${PORT}`,
        port: PORT,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});
