import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import { astroImageTools } from "astro-imagetools";
import compress from "astro-compress";

const SITE = "https://dylangattey.com";

// Listing of all pages in `/pages` for sitemap generation
const PAGES = ["/"];

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    preact(),
    partytown({}),
    astroImageTools,
    prefetch(),
    robotsTxt(),
    sitemap({ customPages: PAGES.map((p) => `${SITE}${p}`) }),
    compress(),
  ],
});
