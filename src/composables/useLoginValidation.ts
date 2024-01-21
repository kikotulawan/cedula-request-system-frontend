import { ref, Ref, watch } from "vue";
import { z, ZodFormattedError } from "zod";
import { useAuthStore } from "@modules/auth/store";

const { login } = useAuthStore();

const UserDataKeys = z.object({
 email: z.string().min(1, { message: "Your email is required" }).email({ message: "Please enter a valid email" }),
 password: z.string().min(1, { message: "Your password is required" }),
});

type UserData = z.infer<typeof UserDataKeys>;

export function useLoginValidation() {
 const form_submitted = ref<boolean>(false);
 const is_loading = ref<boolean>(false);
 const userAccountData: Ref<UserData> = ref({
  email: "",
  password: "",
 });

 const userAccountDataErrors: Ref<{
  [K in keyof UserData]: string[] | undefined;
 }> = ref({
  email: undefined,
  password: undefined,
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

 function executeValidation(keys: UserData): boolean {
  const result = UserDataKeys.safeParse(keys);

  if (result.success) return true;

  const formatted = result.error.format();
  assignErrors(formatted);
  return false;
 }

 const loginAccount = async () => {
  form_submitted.value = true;
  if (!executeValidation(userAccountData.value)) return;

  is_loading.value = true;
  const res = await login(userAccountData.value);
  if (res.status === 200) return window.location.reload();
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
  loginAccount,
  is_loading,
 };
}
