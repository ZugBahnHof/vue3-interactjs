import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  bundler: viteBundler(),
  locales: {
    "/": {
      lang: "en-US",
      title: "VueInteractjs",
      description: "VueInteractjs for Vue3",
    },
  },
  theme: defaultTheme({
    repo: "/vue-interactjs",
    docsDir: "docs",
    locales: {
      "/": {
        editLinkText: "Edit this page on GitHub",
        sidebar: ["/installation.md", "/started.md"],
      },
    },
  }),
});
