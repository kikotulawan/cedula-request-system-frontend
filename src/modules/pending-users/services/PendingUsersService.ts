import HttpClient from "@lib/http";
import { PendingUsersInterface } from ".";
import { ListRequestParams } from "@types";
import { AxiosResponse } from "axios";

const GET_PENDING_USERS_ENDPOINT = "/admin/pending-users";
const APPROVE_USER_ENDPOINT = "/admin/approve-user";
const DECLINE_USER_ENDPOINT = "/admin/decline-user";

class PendingUsersService implements PendingUsersInterface {
 private readonly http: HttpClient;

 public static new() {
  return new PendingUsersService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async getAllPendingUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
  try {
   const response = await this.http.list(GET_PENDING_USERS_ENDPOINT, { ...requestParams });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async approveUser(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${APPROVE_USER_ENDPOINT}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async declineUser(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.delete(`${DECLINE_USER_ENDPOINT}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
}

export default PendingUsersService;
