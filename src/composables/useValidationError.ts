import { Ref } from "vue";
import { z, ZodFormattedError } from "zod";

export function useValidationError(data: Ref<any>, formData: z.AnyZodObject) {
 type dataType = z.infer<typeof formData>;
 function resetErrors() {
  for (const key in data.value) {
   (data.value as unknown as Record<string, undefined>)[key] = undefined;
  }
 }

 function assignErrors(formatted: ZodFormattedError<dataType, string>) {
  for (const key in data.value) {
   (data.value as unknown as Record<string, undefined>)[key] = (formatted as any)[key]?._errors;
  }
 }

 return {
  resetErrors,
  assignErrors,
 };
}
