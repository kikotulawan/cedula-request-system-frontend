import { ref, Ref, watch } from "vue";
import { z, ZodFormattedError } from "zod";

const UserDataKeys = z.object({
 email: z.string().min(1, { message: "Your email is required" }).email({ message: "Please enter a valid email" }),
 password: z.string().min(1, { message: "Your password is required" }),
});

type UserData = z.infer<typeof UserDataKeys>;

export function useLoginValidation() {
 const formSubmitted = ref<boolean>(false);
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

 function executeValidation(keys: UserData) {
  formSubmitted.value = true;
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
