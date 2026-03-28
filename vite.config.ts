import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    fresh(), 
    tailwindcss(),
    cloudflare(),
  ],
  build: {
    rollupOptions: {
      external: ["cloudflare:workers"],
    },
  },
});
