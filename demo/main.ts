import { createApp } from "vue";
import plugin from "../src/index";
import Demo from "./Demo.vue";

export const app = createApp(Demo).use(plugin).mount("#app");
