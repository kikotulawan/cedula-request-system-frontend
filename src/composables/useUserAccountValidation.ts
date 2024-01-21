import { ref, Ref, watch } from "vue";
import { RouteNames } from "@enums";
import { z, ZodFormattedError } from "zod";
import { useAuthStore } from "@modules/auth/store";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const { register } = useAuthStore();

const UserDataKeys = z
 .object({
  first_name: z
   .string({ required_error: "Your first name is required" })
   .regex(/^[A-Z].*/, { message: "Your first name must start with capital letter" })
   .min(3, { message: "Your name must be 3 or more characters long" }),
  middle_name: z
   .string({ required_error: "Your middle name is required" })
   .regex(/^[A-Z].*/, { message: "Your middle name must start with capital letter" })
   .min(3, { message: "Your name must be 3 or more characters long" }),
  surname: z
   .string({ required_error: "Your surname is required" })
   .regex(/^[A-Z].*/, { message: "Your surname must start with capital letter" })
   .min(3, { message: "Your name must be 3 or more characters long" }),
  sex: z.string({ required_error: "Your sex gender is required" }).min(3, { message: "Your sex gender is required" }),
  civil_status: z.string({ required_error: "Your civil status is required" }).min(3, { message: "Your civil status is required" }),
  citizenship: z
   .string({ required_error: "Your citizenship is required" })
   .regex(/^[A-Z].*/, { message: "Your citizenship must start with capital letter" })
   .min(3, { message: "Your citizenship is required" }),
  date_of_birth: z.string({ required_error: "Your date of birth is required" }).min(10, { message: "Your date of birth is required" }),
  place_of_birth: z
   .string({ required_error: "Your place of birth is required" })
   .regex(/^[A-Z].*/, { message: "Your place of birth must start with capital letter" })
   .min(3, { message: "Your place of birth is required" }),
  profession_occupation: z.string({ required_error: "Your profession/occupation/business is required" }).min(3, { message: "Your profession/occupation/business is required" }),
  phone_number: z
   .string()
   .startsWith("09", { message: "Please enter a valid phone number e.g. 09123456789" })
   .min(11, { message: "Please enter a valid phone number e.g. 09123456789" })
   .max(11, { message: "Please enter a valid phone number e.g. 09123456789" }),
  tax_identification_number: z.string().min(9, { message: "Please enter valid tax identification number" }).max(12, { message: "Please enter valid tax identification" }),
  height: z.string().min(2, { message: "Please enter your height in cm" }).max(6, { message: "Please enter a valid height in cm" }),
  weight: z.string().min(2, { message: "Please enter your weight in kg" }).max(6, { message: "Please enter a valid weight in kg" }),
  address: z
   .string()
   .regex(/^[A-Z].*/, { message: "Your address must start with capital letter" })
   .min(4, { message: "Your address must be 4 or more characters long" }),
  baranggay: z.string().min(1, { message: "Your baranggay is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Your password must be 8 or more characters long" }),
  confirm_password: z.string().min(8, { message: "Please confirm your new password" }),
 })
 .refine((data) => data.password === data.confirm_password, {
  message: "Your passwords does not match",
  path: ["confirm_password"],
 });

type UserData = z.infer<typeof UserDataKeys>;

export function useUserAccountValidation() {
 const router = useRouter();
 const form_submitted = ref<boolean>(false);
 const is_loading = ref<boolean>(false);
 const userAccountData: Ref<UserData> = ref({
  first_name: "",
  phone_number: "",
  middle_name: "",
  surname: "",
  sex: "",
  civil_status: "",
  citizenship: "",
  date_of_birth: "",
  place_of_birth: "",
  profession_occupation: "",
  tax_identification_number: "",
  address: "",
  baranggay: "",
  height: "",
  weight: "",
  email: "",
  password: "",
  confirm_password: "",
 });

 const userAccountDataErrors: Ref<{
  [K in keyof UserData]: string[] | undefined;
 }> = ref({
  first_name: undefined,
  phone_number: undefined,
  middle_name: undefined,
  surname: undefined,
  sex: undefined,
  civil_status: undefined,
  citizenship: undefined,
  date_of_birth: undefined,
  place_of_birth: undefined,
  profession_occupation: undefined,
  height: undefined,
  weight: undefined,
  tax_identification_number: undefined,
  address: undefined,
  baranggay: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
 });

 function resetFields() {
  for (const key in userAccountData.value) {
   if (Object.prototype.hasOwnProperty.call(userAccountData.value, key)) {
    (userAccountData.value as { [key: string]: string })[key] = "";
   }
  }
 }

 function resetErrors() {
  for (const key in userAccountDataErrors.value) {
   (userAccountDataErrors.value as Record<string, undefined>)[key] = undefined;
  }
 }

 function assignErrors(formatted: ZodFormattedError<UserData, string>) {
  for (const key in userAccountDataErrors.value) {
   (userAccountDataErrors.value as Record<string, undefined>)[key] = (formatted as any)[key]?._errors;
  }
 }

 function executeValidation(keys: UserData): boolean {
  keys.phone_number = keys.phone_number.toString();
  const result = UserDataKeys.safeParse(keys);

  if (result.success) return true;

  const formatted = result.error.format();
  assignErrors(formatted);
  return false;
 }

 function successRegistration(success_msg: string) {
  form_submitted.value = false;
  resetFields();
  toast.success(success_msg);
  toast.loading("Redirecting you to login...");
  setTimeout(() => {
   router.push({ name: RouteNames.LOGIN_ROUTE });
  }, 5000);
 }

 const registerAccount = async () => {
  form_submitted.value = true;
  if (!executeValidation(userAccountData.value)) return;

  is_loading.value = true;
  const res = await register(userAccountData.value);
  if (res.status === 200) return successRegistration(res.data.success);
  is_loading.value = false;
 };

 watch(
  () => userAccountData.value,
  (values) => {
   if (form_submitted.value) {
    resetErrors();
    executeValidation(values);
   }
  },
  { deep: true },
 );

 return {
  userAccountData,
  userAccountDataErrors,
  executeValidation,
  registerAccount,
  is_loading,
 };
}
