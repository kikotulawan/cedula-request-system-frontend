import HttpClient from "@lib/http";
import { AdminServiceInterface } from ".";
import { AxiosResponse } from "axios";

const GET_TOTAL_APPROVED_USERS_ENDPOINT = "/admin/total-approved-users";
const GET_TOTAL_SUSPENDED_USERS_ENDPOINT = "/admin/total-suspended-users";

class AdminService implements AdminServiceInterface {
 private readonly http: HttpClient;

 public static new() {
  return new AdminService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async getTotalApprovedUsers(): Promise<AxiosResponse> {
  try {
   const response = await this.http.get(GET_TOTAL_APPROVED_USERS_ENDPOINT);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
 public async getTotalSuspendedUsers(): Promise<AxiosResponse> {
  try {
   const response = await this.http.get(GET_TOTAL_SUSPENDED_USERS_ENDPOINT);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
}

export default AdminService;
