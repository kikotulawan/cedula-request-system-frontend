import HttpClient from "@lib/http";
import { LoginKeys, RegistrationKeys, AuthInterface } from ".";
import { UserAccountInfoState } from "@types";
import { AxiosResponse } from "axios";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useAuthStore } from "@modules/auth/store";
import { storeToRefs } from "pinia";

const LOGIN_ENDPOINT = "/auth/login";
const REGISTRATION_ENDPOINT = "/auth/register";
const GET_USER_INFO_ENDPOINT = "/auth/me";
const UPDATE_USER_INFO_ENDPOINT = "/auth/update-account";
const cookies = useCookies();

class AuthService implements AuthInterface {
 private readonly http: HttpClient;

 public static new() {
  return new AuthService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async login(request: LoginKeys): Promise<AxiosResponse> {
  try {
   const response = await this.http.post(LOGIN_ENDPOINT, { ...request });

   // SET USER TOKEN AND ROLE
   cookies.set("auth", response.data.access_token, { path: "/" });
   cookies.set("role", response.data.role, { path: "/" });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async register(request: RegistrationKeys): Promise<AxiosResponse> {
  try {
   const response = await this.http.post(REGISTRATION_ENDPOINT, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async getUserInfo(): Promise<AxiosResponse> {
  try {
   const response = await this.http.post(GET_USER_INFO_ENDPOINT);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async updateUserInfo(request: UserAccountInfoState, id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${UPDATE_USER_INFO_ENDPOINT}/${id}`, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public logout(): void {
  const { user_info } = storeToRefs(useAuthStore());

  cookies.remove("auth", { path: "/" });
  cookies.remove("role", { path: "/" });
  user_info.value = undefined;
  window.location.reload();
 }
}

export default AuthService;
