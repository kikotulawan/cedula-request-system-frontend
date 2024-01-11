import { createApp } from "vue";
import App from "./App.vue";

// IMPORT THIRD-PARTY LIBS
import router from "@router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

// IMPORT CSS
import "@assets/styles/main.css";
import "animate.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.mount("#app");
