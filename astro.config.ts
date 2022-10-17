import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import react from "@astrojs/react";

// Listing of all pages in `/pages` for sitemap generation
const PAGES = ["/"];

const SITE = "https://dylangattey.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    partytown({}),
    prefetch(),
    robotsTxt(),
    sitemap({
      customPages: PAGES.map((p) => `${SITE}${p}`),
    }),
    compress(),
  ],
});
