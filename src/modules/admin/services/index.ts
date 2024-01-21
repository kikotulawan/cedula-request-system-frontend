import { AxiosResponse } from "axios";

export interface AdminServiceInterface {
 getTotalApprovedUsers(): Promise<AxiosResponse>;
 getTotalSuspendedUsers(): Promise<AxiosResponse>;
}

export { default as AdminService } from "./AdminService";
