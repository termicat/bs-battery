import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { semiTheming } from "vite-plugin-semi-theming";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  preview: {
    port: 3000,
  },
  plugins: [
    react(),
    semiTheming({
      theme: "@semi-bot/semi-theme-feishu-dashboard",
    }),
  ],
});
