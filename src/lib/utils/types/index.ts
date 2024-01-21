export type AuthStoreState = {
 user_info: UserAccountInfoState | undefined;
 is_loading: boolean;
};

export type UserAccountState = {
 id: number;
 user_role_id: number;
 account_activated: number;
 email: string;
 created_at: string;
 updated_at: string;
};

export type UserAccountInfoState = {
 id: number;
 user_id: number;
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
 created_at: string;
 updated_at: string;
 account: UserAccountState;
};

export type ListRequestParams = {
 page?: number;
 limit?: number;
 keyword?: string;
 cedula_status?: string;
};
