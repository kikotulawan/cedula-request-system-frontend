import { defineStore } from "pinia";
import { ListRequestParams, UserAccountInfoState } from "@types";
import { AxiosResponse } from "axios";
import { SuspendedUsersService } from "../services";
import { toast } from "vue3-toastify";

interface PaginationConfig {
 totalItems: number;
 rowsPerPage: number;
 currentPage: number;
}

type State = {
 suspended_users: UserAccountInfoState[];
 is_loading: boolean;
 paginationConfig: PaginationConfig;
 selected_user: UserAccountInfoState | undefined;
};

export const useSuspendedUsersStore = defineStore("suspendedUsersStore", {
 state: (): State => ({
  suspended_users: [],
  is_loading: false,
  paginationConfig: {
   totalItems: 0,
   rowsPerPage: 10,
   currentPage: 1,
  },
  selected_user: undefined,
 }),
 getters: {},
 actions: {
  async getAllSuspendedUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
   this.is_loading = true;
   const res = await SuspendedUsersService.new().getAllSuspendedUsers(requestParams);
   if (res.data.data) {
    this.suspended_users = res.data.data;
    this.paginationConfig.currentPage = requestParams.page!;
    this.paginationConfig.rowsPerPage = requestParams.limit!;
    this.paginationConfig.totalItems = res.data.total;
   }
   this.is_loading = false;
   return res;
  },
  async unsuspendUser(): Promise<AxiosResponse> {
   this.is_loading = true;
   toast.info("Activating user...");
   const res = await SuspendedUsersService.new().unsuspendUser(this.selected_user!.user_id);
   if (res.status === 200) {
    toast.success(res.data.success);
    this.selected_user = undefined;
   }
   this.is_loading = false;
   return res;
  },
  async deleteUser(): Promise<AxiosResponse> {
   this.is_loading = true;
   toast.info("Deleting user...");
   const res = await SuspendedUsersService.new().deleteUser(this.selected_user!.user_id);
   if (res.status === 200) {
    toast.success(res.data.success);
    this.selected_user = undefined;
   }
   this.is_loading = false;
   return res;
  },
 },
 persist: true,
});
