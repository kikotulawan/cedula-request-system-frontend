import { defineStore } from "pinia";
import { ListRequestParams, UserAccountInfoState } from "@types";
import { AxiosResponse } from "axios";
import { ApprovedUsersService } from "../services";
import { toast } from "vue3-toastify";

interface PaginationConfig {
 totalItems: number;
 rowsPerPage: number;
 currentPage: number;
}

type State = {
 approved_users: UserAccountInfoState[];
 is_loading: boolean;
 paginationConfig: PaginationConfig;
 selected_user: UserAccountInfoState | undefined;
};

export const useApprovedUsersStore = defineStore("approvedUsersStore", {
 state: (): State => ({
  approved_users: [],
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
  async getAllApprovedUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
   this.is_loading = true;
   const res = await ApprovedUsersService.new().getAllApprovedUsers(requestParams);
   if (res.data.data) {
    this.approved_users = res.data.data;
    this.paginationConfig.currentPage = requestParams.page!;
    this.paginationConfig.rowsPerPage = requestParams.limit!;
    this.paginationConfig.totalItems = res.data.total;
   }
   this.is_loading = false;
   return res;
  },
  async suspendUser(): Promise<AxiosResponse> {
   this.is_loading = true;
   toast.info("Suspending user...");
   const res = await ApprovedUsersService.new().suspendUser(this.selected_user!.user_id);
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
