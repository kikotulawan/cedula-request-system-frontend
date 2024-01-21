import HttpClient from "@lib/http";
import { ApprovedUsersInterface } from ".";
import { ListRequestParams } from "@types";
import { AxiosResponse } from "axios";

const GET_APPROVED_USERS_ENDPOINT = "/admin/approved-users";
const SUSPEND_USER_ENDPOINT = "/admin/suspend-user";

class ApprovedUsersService implements ApprovedUsersInterface {
 private readonly http: HttpClient;

 public static new() {
  return new ApprovedUsersService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async getAllApprovedUsers(requestParams: ListRequestParams): Promise<AxiosResponse> {
  try {
   const response = await this.http.list(GET_APPROVED_USERS_ENDPOINT, { ...requestParams });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async suspendUser(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${SUSPEND_USER_ENDPOINT}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
}

export default ApprovedUsersService;
