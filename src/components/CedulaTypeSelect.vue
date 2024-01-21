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
  <label for="request-type-select">For Individual or Business Owners?</label>
  <select
   v-model="modelValue"
   :disabled="disabled"
   :required="required"
   id="request-type-select"
   class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 text-sm shadow-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
  >
   <option
    disabled
    selected
    value=""
   >
    Select one
   </option>
   <option value="Individual">Individual</option>
   <option value="Business Owner">Business Owner</option>
  </select>
 </div>
</template>
