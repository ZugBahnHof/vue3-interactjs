import VueInteractJS from "../../src/index.js";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance({ app }) {
    app.use(VueInteractJS);
  },
});
