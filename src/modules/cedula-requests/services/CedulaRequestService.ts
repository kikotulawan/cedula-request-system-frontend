import HttpClient from "@lib/http";
import { CedulaRequestInterface } from ".";
import { AxiosResponse } from "axios";
import { ListRequestParams } from "@/lib/utils/types";

const GET_USER_CEDULA_REQUESTS = "/cedula/user-cedula-requests";
const GET_ALL_CEDULA_REQUESTS = "/cedula/all-cedula-requests";
const CREATE_NEW_CEDULA_REQUEST = "/cedula/user-new-cedula";
const UPLOAD_CEDULA_REQUIREMENTS = "/cedula/upload-user-cedula-requirements";
const UPDATE_REQUEST = "/cedula/update-request";
const APPROVE_REQUEST = "/cedula/approve-request";
const REJECT_REQUEST = "/cedula/reject-request";
const RELEASE_REQUEST = "/cedula/release-request";

class CedulaRequestService implements CedulaRequestInterface {
 private readonly http: HttpClient;

 public static new() {
  return new CedulaRequestService(HttpClient.new());
 }

 constructor(http: HttpClient) {
  this.http = http;
 }

 public async createNewCedulaRequest(request: any): Promise<AxiosResponse> {
  try {
   const response = await this.http.post(CREATE_NEW_CEDULA_REQUEST, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async updateCedulaRequest(request: any): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${UPDATE_REQUEST}/${request.id}`, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async approveCedulaRequest(request: any): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${APPROVE_REQUEST}/${request.id}`, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async rejectCedulaRequest(request: any): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${REJECT_REQUEST}/${request.id}`, { ...request });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async markAsReleased(id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.put(`${RELEASE_REQUEST}/${id}`);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async getAllCedulaRequests(requestParams: ListRequestParams): Promise<AxiosResponse> {
  try {
   const response = await this.http.list(GET_ALL_CEDULA_REQUESTS, { ...requestParams });

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async getUserCedulaRequests(): Promise<AxiosResponse> {
  try {
   const response = await this.http.get(GET_USER_CEDULA_REQUESTS);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }

 public async uploadCedulaRequirements(file: FormData, cedula_req_id: number): Promise<AxiosResponse> {
  try {
   const response = await this.http.file(`${UPLOAD_CEDULA_REQUIREMENTS}/${cedula_req_id}`, file);

   return response;
  } catch (error) {
   this.http.axiosErrorResponse(error);
   return error as AxiosResponse;
  }
 }
}

export default CedulaRequestService;
