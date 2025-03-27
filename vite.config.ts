import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  server: { host: "0.0.0.0" },
  plugins: [tsconfigPaths(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/app/styles/mixins.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve("/src"),
    },
  },
});
