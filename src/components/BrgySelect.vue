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
   for="brgy-select"
   v-if="label"
   >{{ label }}</label
  >
  <select
   v-model="modelValue"
   :disabled="disabled"
   :required="required"
   id="brgy-select"
   class="w-full rounded-lg border border-gray-200 focus:outline-none focus:shadow-lg p-4 pe-12 text-sm shadow-sm appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
   :class="{ 'border-red-500': !!errors }"
  >
   <option
    disabled
    selected
    value=""
   >
    Select your baranggay
   </option>
   <option value="Bagacay">Bagacay</option>
   <option value="Bahay">Bahay</option>
   <option value="Bairan">Bairan</option>
   <option value="Cabatianuhan">Cabatianuhan</option>
   <option value="Canap">Canap</option>
   <option value="Capilihan">Capilihan</option>
   <option value="Caraycaray">Caraycaray</option>
   <option value="Libtong">Libtong</option>
   <option value="Guinciaman">Guinciaman</option>
   <option value="Impo">Impo</option>
   <option value="Kinalumsan">Kinalumsan</option>
   <option value="Lukay">Lukay</option>
   <option value="Malaguinabot">Malaguinabot</option>
   <option value="Malpag">Malpag</option>
   <option value="Mawodpawod">Mawodpawod</option>
   <option value="Patong">Patong</option>
   <option value="Pinarigusan">Pinarigusan</option>
   <option value="San Andres">San Andres</option>
   <option value="Santa Cruz">Santa Cruz</option>
   <option value="Santol">Santol</option>
   <option value="Cayare">Cayare</option>
  </select>
  <small
   class="text-red-400 pl-2"
   v-if="!!errors"
  >
   {{ errors[0] }}
  </small>
 </div>
</template>
