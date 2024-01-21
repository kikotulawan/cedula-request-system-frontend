<script setup lang="ts">
defineProps<{
 errors?: string[];
 label?: string;
 disabled?: boolean;
 required?: boolean;
}>();
const modelValue = defineModel();
</script>
<template>
 <div>
  <label for="request-type-select">What Do You Need a Cedula For?</label>
  <select
   v-model="modelValue"
   :disabled="disabled"
   :required="required"
   id="request-type-select"
   class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 text-sm shadow-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
   :class="{ 'border-red-500': !!errors }"
  >
   <option
    disabled
    selected
    value=""
   >
    Select your reason
   </option>
   <option value="Registering a new business">Registering a new business</option>
   <option value="Renewing a business">Renewing a business</option>
   <option value="Applying for a job">Applying for a job</option>
   <option value="Purchasing a house">Purchasing a house</option>
   <option value="Marriage license requirement">Marriage license requirement</option>
   <option value="Filing Income Tax Returns (ITR)">Filing Income Tax Returns (ITR)</option>
   <option value="Seeking notarization of documents">Seeking notarization of documents</option>
   <option value="Applying for licenses, receipts, and certificates from government offices">Applying for licenses, receipts, and certificates from government offices</option>
   <option value="Receiving payment or salary from government agencies">Receiving payment or salary from government agencies</option>
   <option value="Requirement for Proof of Ownership of Real Estate Properties, Residency, or Payment of Dues to exercise a profession">
    Requirement for Proof of Ownership of Real Estate Properties, Residency, or Payment of Dues to exercise a profession
   </option>
  </select>
  <small
   class="text-red-400 pl-2"
   v-if="!!errors"
  >
   {{ errors[0] }}
  </small>
 </div>
</template>
