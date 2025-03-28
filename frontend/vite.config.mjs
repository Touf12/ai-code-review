import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      proxy: {
        "/ai": env.VITE_BACKEND_URL || "http://localhost:3000",
      },
    },
  };
});
