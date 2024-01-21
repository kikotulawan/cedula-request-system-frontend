import { AxiosResponse } from "axios";
import { ListRequestParams } from "@types";

export interface PendingUsersInterface {
 getAllPendingUsers(requestParams: ListRequestParams): Promise<AxiosResponse>;
 approveUser(id: number): Promise<AxiosResponse>;
 declineUser(id: number): Promise<AxiosResponse>;
}

export { default as PendingUsersService } from "./PendingUsersService";
