import { AxiosResponse } from "axios";
import { ListRequestParams } from "@types";

export interface ApprovedUsersInterface {
 getAllApprovedUsers(requestParams: ListRequestParams): Promise<AxiosResponse>;
 suspendUser(id: number): Promise<AxiosResponse>;
}

export { default as ApprovedUsersService } from "./ApprovedUsersService";
