import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/ai": "http://localhost:3000",
    },
  },
});
