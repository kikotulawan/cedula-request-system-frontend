import { useCookies } from "@vueuse/integrations/useCookies.mjs";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ListRequestParams } from "@types";
import { toast } from "vue3-toastify";
import { stringify } from "qs";
import { AuthService } from "@modules/auth/services";

const AUTH_TOKEN = useCookies().get("auth");

class HttpClient {
 private readonly client: AxiosInstance;

 public static new = () => new HttpClient();

 constructor() {
  this.client = axios.create({
   baseURL: "http://localhost:8000/api",
   headers: {
    "Content-Type": "application/json; charset=UTF-8",
   },
  });

  if (AUTH_TOKEN) {
   this.client.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
  }
 }

 async get(url: string, config = {}): Promise<AxiosResponse> {
  try {
   const response = await this.client.get(url, config);
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 async list(url: string, requestParams?: ListRequestParams, config = {}): Promise<AxiosResponse> {
  const requestQuery = stringify({
   page: requestParams?.page,
   limit: requestParams?.limit,
   keyword: requestParams?.keyword,
   cedula_status: requestParams?.cedula_status,
  });
  try {
   const response = await this.client.get(`${url}?${requestQuery}`, config);
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 async post(url: string, data = {}, config = {}): Promise<AxiosResponse> {
  try {
   const response = await this.client.post(url, data, config);
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 async file(url: string, file: FormData): Promise<AxiosResponse> {
  try {
   const response = await this.client.post(url, file, {
    headers: {
     "Content-Type": "multipart/form-data",
    },
   });
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 async put(url: string, data = {}, config = {}): Promise<AxiosResponse> {
  try {
   const response = await this.client.put(url, data, config);
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 async delete(url: string, config = {}): Promise<AxiosResponse> {
  try {
   const response = await this.client.delete(url, config);
   return response;
  } catch (error) {
   console.error(error);
   throw error;
  }
 }

 axiosErrorResponse(error: unknown, custom_err_msg?: string): void {
  if (axios.isAxiosError(error)) {
   const err_response: AxiosError = error;
   const error_response_msg = (err_response.response?.data as { error?: string })?.error ?? (err_response.response?.data as { message?: string })?.message;
   if (err_response.response?.status === 500) {
    toast.error(error_response_msg ?? "500 Server Error, please try again later.");
   } else if (err_response.response?.status === 404) {
    toast.error("404 Route is not found");
   } else if (err_response.response?.status === 401) {
    if (error_response_msg === "Unauthenticated.") return AuthService.new().logout();
    toast.error(error_response_msg ?? "Unauthorized, please try again later.");
   } else {
    toast.error(custom_err_msg ?? "Something went wrong, please try again later.");
   }
  }
 }
}

export default HttpClient;
