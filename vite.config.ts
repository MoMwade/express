import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react({
      jsxImportSource: "@dbfu/react-directive",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  build: {
    manifest: true,
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrigin: true,
      },
      "/file": {
        target: "http://localhost:9002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/file/, ""),
      },
      "/ws": {
        target: "ws://localhost:7001",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
});