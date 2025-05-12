import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vite.dev/config/
export default defineConfig({
  server: { 
    host: "0.0.0.0",
    allowedHosts: ["2fb6-151-0-21-138.ngrok-free.app"]
  },
  plugins: [tsconfigPaths(), react(), nodePolyfills()],
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
