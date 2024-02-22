import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react({
      jsxImportSource: "@dbfu/react-directive",
    }),
    WindiCSS(),
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
        target: "http://192.168.68.174:8090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
