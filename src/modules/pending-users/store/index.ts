import { defineStore } from "pinia";
import { ListRequestParams, UserAccountInfoState } from "@types";
import { AxiosResponse } from "axios";
import { PendingUsersService } from "../services";
import { toast } from "vue3-toastify";

interface PaginationConfig {
 totalItems: number;
 rowsPerPage: number;
 currentPage: number;
}

type State = {
 pending_users: UserAccountInfoState[];
 is_loading: boolean;
 paginationConfig: PaginationConfig;
 selected_user: UserAccountInfoState | undefined;
};

export const usePendingUsersStore = defineStore("pendingUsersStore", {
 state: (): State => ({
  pending_users: [],
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
  async getAllPendingUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
   this.is_loading = true;
   const res = await PendingUsersService.new().getAllPendingUsers(requestParams);
   if (res.data.data) {
    this.pending_users = res.data.data;
    this.paginationConfig.currentPage = requestParams.page!;
    this.paginationConfig.rowsPerPage = requestParams.limit!;
    this.paginationConfig.totalItems = res.data.total;
   }
   this.is_loading = false;
   return res;
  },
  async approveUser(): Promise<AxiosResponse> {
   this.is_loading = true;
   toast.info("Approving user...");
   const res = await PendingUsersService.new().approveUser(this.selected_user!.user_id);
   if (res.status === 200) {
    toast.success(res.data.success);
    this.selected_user = undefined;
   }
   this.is_loading = false;
   return res;
  },
  async declineUser(): Promise<AxiosResponse> {
   this.is_loading = true;
   toast.loading("Declining user...", { toastId: "declining_user" });
   const res = await PendingUsersService.new().declineUser(this.selected_user!.user_id);
   if (res.status === 200) {
    toast.success(res.data.success);
    toast.remove("declining_user");
    this.selected_user = undefined;
   }
   this.is_loading = false;
   return res;
  },
 },
 persist: true,
});
