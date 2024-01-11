import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [
  vue({
   script: {
    defineModel: true,
   },
  }),
 ],
 resolve: {
  alias: {
   "@": resolve(__dirname, "./src"),
   "@assets": resolve(__dirname, "./src/assets"),
   "@types": resolve(__dirname, "./src/lib/utils/types"),
   "@enums": resolve(__dirname, "./src/lib/utils/enums"),
   "@stores": resolve(__dirname, "./src/stores"),
   "@router": resolve(__dirname, "./src/router"),
   "@composables": resolve(__dirname, "./src/composables"),
   "@components": resolve(__dirname, "./src/components"),
   "@views": resolve(__dirname, "./src/views"),
  },
 },
});
