<script setup lang="ts">
defineProps<{
 id: string;
 text: string;
 lightTheme: boolean;
}>();
</script>

<template>
 <button
  :id="id"
  class="font-medium border-2 p-3 transition-all active:scale-95 select-none"
  :class="lightTheme ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'"
 >
  {{ text }}
 </button>
</template>
