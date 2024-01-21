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
  <label
   for="cs-select"
   v-if="label"
   >{{ label }}</label
  >
  <select
   v-model="modelValue"
   :disabled="disabled"
   :required="required"
   id="cs-select"
   class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 pe-12 text-sm shadow-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
   :class="{ 'border-red-500': !!errors }"
  >
   <option
    disabled
    selected
    value=""
   >
    Select your civil status
   </option>
   <option value="Single">Single</option>
   <option value="Married">Married</option>
   <option value="Widowed">Widowed</option>
   <option value="Legally Separated">Legally Separated</option>
  </select>
  <small
   class="text-red-400 pl-2"
   v-if="!!errors"
  >
   {{ errors[0] }}
  </small>
 </div>
</template>
