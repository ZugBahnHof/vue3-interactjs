import Interact from "./Interact.vue";
import { App, Plugin } from "vue";

const install = (app: App): void => {
  app.component("Interact", Interact);
};

const plugin: Plugin = {
  install,
};
export default plugin;
