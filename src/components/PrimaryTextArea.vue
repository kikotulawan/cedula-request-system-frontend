<script setup lang="ts">
const props = defineProps<{
 id: string;
 placeholder: string;
 disabled?: boolean;
 required?: boolean;
 errors?: string[];
 label?: string;
}>();

const modelValue = defineModel();

function textChanged(e: { target: { value: unknown } }) {
 modelValue.value = e.target.value;
}
</script>
<template>
 <div>
  <label
   :for="props.id"
   v-if="label"
   >{{ label }}</label
  >
  <div class="relative">
   <textarea
    @input="textChanged"
    :id="props.id"
    :disabled="disabled"
    :required="required"
    rows="5"
    class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 pe-4 text-sm shadow-sm"
    :class="{ 'border-red-500': !!errors }"
    :placeholder="props.placeholder"
    >{{ modelValue }}</textarea
   >
   <small
    class="text-red-400 pl-2"
    v-if="!!errors"
   >
    {{ errors[0] }}
   </small>
  </div>
 </div>
</template>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
 -webkit-appearance: none;
 margin: 0;
}

/* Firefox */
input[type="number"] {
 -moz-appearance: textfield;
}
</style>
