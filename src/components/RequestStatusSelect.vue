<script setup lang="ts">
const modelValue = defineModel();
defineProps<{
 disabled?: boolean;
}>();
</script>
<template>
 <div>
  <select
   v-model="modelValue"
   :disabled="disabled"
   id="request-status-select"
   class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 pe-12 text-sm shadow-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
  >
   <option value="">No Filter</option>
   <option value="ON PROCESS">ON PROCESS</option>
   <option value="FOR RELEASE">FOR RELEASE</option>
   <option value="REJECTED">REJECTED</option>
   <option value="RELEASED">RELEASED</option>
  </select>
 </div>
</template>
