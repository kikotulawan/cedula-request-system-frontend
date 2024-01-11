import { ref, Ref, watch } from "vue";
import { z, ZodFormattedError } from "zod";

const UserDataKeys = z
 .object({
  full_name: z
   .string({ required_error: "Your name is required" })
   .regex(/^[A-Z].*/, { message: "Your name must start with capital letter" })
   .min(3, { message: "Your name must be 3 or more characters long" }),
  phone_number: z
   .string()
   .startsWith("09", { message: "Please enter a valid phone number e.g. 09123456789" })
   .min(11, { message: "Please enter a valid phone number e.g. 09123456789" })
   .max(11, { message: "Please enter a valid phone number e.g. 09123456789" }),
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
 const formSubmitted = ref<boolean>(false);
 const userAccountData: Ref<UserData> = ref({
  full_name: "",
  phone_number: "",
  address: "",
  baranggay: "",
  email: "",
  password: "",
  confirm_password: "",
 });

 const userAccountDataErrors: Ref<{
  [K in keyof UserData]: string[] | undefined;
 }> = ref({
  full_name: undefined,
  phone_number: undefined,
  address: undefined,
  baranggay: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
 });

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

 function executeValidation(keys: UserData) {
  formSubmitted.value = true;
  keys.phone_number = keys.phone_number.toString();
  const result = UserDataKeys.safeParse(keys);

  if (result.success) return;

  const formatted = result.error.format();
  assignErrors(formatted);
 }

 watch(
  () => userAccountData.value,
  (values) => {
   if (formSubmitted.value) {
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
 };
}
