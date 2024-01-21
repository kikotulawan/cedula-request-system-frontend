import { createApp } from "vue";
import App from "./App.vue";

// IMPORT THIRD-PARTY LIBS
import router from "@router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import { globalLoader } from "vue-global-loader";

// IMPORT CSS
import "@assets/styles/main.css";
import "animate.css";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(globalLoader);
app.use(Vue3Toasity, {
 hideProgressBar: true,
} as ToastContainerOptions);
app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.mount("#app");
