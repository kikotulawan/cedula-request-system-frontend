<script setup lang="ts">
defineProps<{
 id: string;
 text: string;
 lightTheme: boolean;
 loading?: boolean;
 disabled?: boolean;
}>();
</script>

<template>
 <button
  :id="id"
  :disabled="disabled || loading"
  class="font-medium border-2 p-3 transition-all enabled:active:scale-95 select-none disabled:cursor-not-allowed flex justify-center"
  :class="lightTheme ? 'border-white text-white enabled:hover:bg-white enabled:hover:text-black' : 'border-black text-black enabled:hover:bg-black enabled:hover:text-white'"
 >
  <span v-if="!loading">
   {{ text }}
  </span>
  <div
   v-if="loading"
   class="custom-loader"
  ></div>
 </button>
</template>

<style scoped>
.custom-loader {
 width: 24px;
 height: 24px;
 border-radius: 50%;
 border: 4px solid;
 border-color: #ffffff;
 border-right-color: #000000;
 animation: s2 1s infinite linear;
}
@keyframes s2 {
 to {
  transform: rotate(1turn);
 }
}
</style>
