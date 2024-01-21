import { defineStore } from "pinia";
import { LoginKeys, RegistrationKeys } from "@/modules/auth/services";
import { AuthStoreState } from "@types";
import { AxiosResponse } from "axios";
import { AuthService } from "../services";
import moment from "moment";
import { toast } from "vue3-toastify";

export const useAuthStore = defineStore("authStore", {
 state: (): AuthStoreState => ({
  user_info: undefined,
  is_loading: false,
 }),
 getters: {
  userFullName: (state): string | undefined => {
   return state.user_info?.first_name + " " + state.user_info?.surname;
  },
  userBirthdate: (state): string => {
   return moment(state.user_info?.date_of_birth).format("YYYY-MM-DD");
  },
  userRole: (state): number => {
   return state.user_info?.account.user_role_id ?? 1;
  },
 },
 actions: {
  async login(data: LoginKeys): Promise<AxiosResponse> {
   const res = await AuthService.new().login(data);
   return res;
  },
  async register(data: RegistrationKeys): Promise<AxiosResponse> {
   const res = await AuthService.new().register(data);
   return res;
  },
  async updateUserInfo(): Promise<AxiosResponse> {
   this.is_loading = true;
   const res = await AuthService.new().updateUserInfo(this.user_info!, this.user_info!.user_id);
   if (res.status === 200) toast.success(res.data.success);
   this.is_loading = false;
   return res;
  },
  async getUserInfo(): Promise<AxiosResponse> {
   const res = await AuthService.new().getUserInfo();
   this.user_info = res.data;
   this.user_info!.date_of_birth = moment(res.data.date_of_birth).format("YYYY-MM-DD");
   return res;
  },
 },
 persist: true,
});
