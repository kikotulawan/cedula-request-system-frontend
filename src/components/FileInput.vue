<script setup lang="ts">
import { reactive, ref } from "vue";

const props = defineProps<{
 id: string;
 disabled?: boolean;
 required?: boolean;
 errors?: string[];
 label?: string;
}>();

type FileUploadState = {
 selectedFile: File | null;
};

const fileInput = ref<HTMLInputElement | null>();
const state = reactive<FileUploadState>({
 selectedFile: null,
});

const modelValue = defineModel();

const onChange = async () => {
 if (fileInput.value!.files!.length <= 0) return;
 state.selectedFile = fileInput.value?.files ? fileInput.value.files[0] : null;
 modelValue.value = state.selectedFile;
};

function openFileUpload() {
 fileInput.value?.click();
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
   <button
    @click="openFileUpload"
    type="button"
    :disabled="disabled"
    class="p-5 border w-full rounded-lg border-dashed text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
   >
    {{ state.selectedFile ? state.selectedFile.name : "Select a file" }}
   </button>
   <input
    ref="fileInput"
    @change="onChange"
    :id="props.id"
    type="file"
    :disabled="disabled"
    required
    class="hidden"
   />
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
