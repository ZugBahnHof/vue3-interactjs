// vite.config.js
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  base: "./",
  plugins: [vue(), peerDepsExternal()],
  build: {
    lib: {
      /* eslint-env node */
      entry: resolve(__dirname, "src/index.js"),
      name: "vue-interactjs",
    },
    output: [
      {
        format: "esm",
        file: "dist/vue-draggable-grid.esm.js",
      },
      {
        format: "cjs",
        file: "dist/vue-draggable-grid.common.js",
      },
    ],
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
