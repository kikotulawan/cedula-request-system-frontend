import { AxiosResponse } from "axios";
import { ListRequestParams } from "@types";

export interface SuspendedUsersInterface {
 getAllSuspendedUsers(requestParams: ListRequestParams): Promise<AxiosResponse>;
 unsuspendUser(id: number): Promise<AxiosResponse>;
 deleteUser(id: number): Promise<AxiosResponse>;
}

export { default as SuspendedUsersService } from "./SuspendedUsersService";
