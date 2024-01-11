import { defineStore } from "pinia";
import { LoginKeys } from "@types";
import router from "@router";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const useAuthStore = defineStore("authStore", {
 state: () => ({
  logged_in: false,
  user_role: undefined,
 }),
 actions: {
  login(request: LoginKeys): boolean {
   if (request.username === ADMIN_USERNAME && request.password === ADMIN_PASSWORD) {
    this.logged_in = true;
    router.push("/admin");
    return true;
   }
   alert("Your username or password is incorrect");
   return false;
  },
 },
 persist: true,
});
