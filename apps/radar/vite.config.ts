import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000,
    proxy: {
      "/radar": {
        // target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/radar/, ""),
      },
    },
  },
  plugins: [react()],
});
