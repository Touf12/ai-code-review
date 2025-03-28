import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);

  return {
    server: {
      proxy: {
        "/ai": env.VITE_BACKEND_URL || "http://localhost:3000",
      },
    },
  };
});
