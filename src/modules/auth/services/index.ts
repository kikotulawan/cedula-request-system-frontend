import { AxiosResponse } from "axios";
import { UserAccountInfoState } from "@types";

export type LoginKeys = {
 email: string;
 password: string;
};

export type RegistrationKeys = {
 first_name: string;
 phone_number: string;
 middle_name: string;
 surname: string;
 sex: string;
 civil_status: string;
 citizenship: string;
 date_of_birth: string;
 place_of_birth: string;
 profession_occupation: string;
 tax_identification_number: string;
 address: string;
 baranggay: string;
 height: string;
 weight: string;
 email: string;
 password: string;
 confirm_password: string;
};

export interface AuthInterface {
 login(request: LoginKeys): Promise<AxiosResponse>;
 register(request: RegistrationKeys): Promise<AxiosResponse>;
 getUserInfo(): Promise<AxiosResponse>;
 updateUserInfo(request: UserAccountInfoState, id: number): Promise<AxiosResponse>;
 logout(): void;
}

export { default as AuthService } from "./AuthService";
