import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import baseUrlEnv from "./utils/base-url-env";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "bugbank-app",
      use: {
        ...devices["Desktop Chrome"],
        screenshot: `on`,
        video: `on`,
        trace: `off`,
        baseURL: baseUrlEnv.baseURL_app,
      },
    },
    /**
     *     {
     *       name: "bugbank-local",
     *       use: {
     *         baseURL: baseUrlEnv.baseURL_local,
     *         ...devices["Desktop Chrome"],
     *       },
     *     },
     */
  ],
});
