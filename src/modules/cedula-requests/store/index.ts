import { defineStore } from "pinia";
import { ListRequestParams, UserAccountInfoState } from "@types";
import { AxiosResponse } from "axios";
import { CedulaRequestService } from "../services";

interface PaginationConfig {
 totalItems: number;
 rowsPerPage: number;
 currentPage: number;
}

type State = {
 cedula_requests: any[];
 cedula_status: string;
 is_loading: boolean;
 paginationConfig: PaginationConfig;
 selected_user: UserAccountInfoState | undefined;
};

export const useCedulaRequestStore = defineStore("cedulaRequestStore", {
 state: (): State => ({
  cedula_requests: [],
  paginationConfig: {
   totalItems: 0,
   rowsPerPage: 10,
   currentPage: 1,
  },
  cedula_status: "",
  is_loading: false,
  selected_user: undefined,
 }),
 getters: {},
 actions: {
  async getAllCedulaRequests(requestParams: ListRequestParams): Promise<AxiosResponse> {
   this.is_loading = true;
   const res = await CedulaRequestService.new().getAllCedulaRequests(requestParams);
   if (res.data.data) {
    this.cedula_requests = res.data.data;
    this.paginationConfig.currentPage = requestParams.page!;
    this.paginationConfig.rowsPerPage = requestParams.limit!;
    this.paginationConfig.totalItems = res.data.total;
   }
   this.is_loading = false;
   return res;
  },
 },
 persist: true,
});
