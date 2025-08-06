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
      name: "vue3-interactjs",
    },
    output: [
      {
        format: "esm",
        file: "dist/vue3-interactjs.esm.js",
      },
      {
        format: "cjs",
        file: "dist/vue3-interactjs.common.js",
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
