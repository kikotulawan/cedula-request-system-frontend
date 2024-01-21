<script setup lang="ts">
import GlobalLoader from "vue-global-loader/GlobalLoader.vue";
import WaveSpinner from "vue-global-loader/WaveSpinner.vue";
</script>
<template>
 <GlobalLoader>
  <WaveSpinner />
 </GlobalLoader>
 <router-view />
</template>
