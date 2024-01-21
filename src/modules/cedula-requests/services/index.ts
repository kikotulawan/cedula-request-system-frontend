import { ListRequestParams } from "@/lib/utils/types";
import { AxiosResponse } from "axios";

export interface CedulaRequestInterface {
 createNewCedulaRequest(request: any): Promise<AxiosResponse>;
 updateCedulaRequest(request: any): Promise<AxiosResponse>;
 approveCedulaRequest(request: any): Promise<AxiosResponse>;
 rejectCedulaRequest(request: any): Promise<AxiosResponse>;
 markAsReleased(request: any): Promise<AxiosResponse>;
 uploadCedulaRequirements(file: FormData, cedula_req_id: number): Promise<AxiosResponse>;
 getUserCedulaRequests(): Promise<AxiosResponse>;
 getAllCedulaRequests(requestParams: ListRequestParams): Promise<AxiosResponse>;
}

export { default as CedulaRequestService } from "./CedulaRequestService";
