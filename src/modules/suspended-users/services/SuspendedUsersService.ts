import HttpClient from "@lib/http";
import { SuspendedUsersInterface } from ".";
import { ListRequestParams } from "@types";
import { AxiosResponse } from "axios";

const GET_SUSPENDED_USERS_ENDPOINT = "/admin/suspended-users";
const UNSUSPEND_USER_ENDPOINT = "/admin/unsuspend-user";
const DELETE_USER_ENDPOINT = "/admin/decline-user";

class SuspendedUsersService implements SuspendedUsersInterface {
 private readonly http: HttpClient;

 public static new() {
  return new SuspendedUsersService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async getAllSuspendedUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
  try {
   const response = await this.http.list(GET_SUSPENDED_USERS_ENDPOINT, { ...requestParams });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async unsuspendUser(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${UNSUSPEND_USER_ENDPOINT}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async deleteUser(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.delete(`${DELETE_USER_ENDPOINT}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
}

export default SuspendedUsersService;
