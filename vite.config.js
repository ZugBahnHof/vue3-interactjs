// vite.config.js
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), peerDepsExternal()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "Vue3Interactjs",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es"
          ? "vue3-interactjs.esm.js"
          : "vue3-interactjs.common.js",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "auto",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
