import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        id: "/",
        start_url: "/dashboard",
        scope: "/",
        name: "Mepense, the best expense app for your device",
        short_name: "Mepense",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display_override: "windows-control-overlay",
        description:
          "The best expense app for tracking your day to day incomes and expenses",
        screenshots: [
          {
            src: "screenshots/screenshot.png",
            sizes: "1277x994",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshots/screenshot.png",
            sizes: "1277x994",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
        icons: [
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
