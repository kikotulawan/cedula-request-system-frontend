<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@modules/auth/store";
import { useGlobalLoader } from "vue-global-loader";
import Navbar from "@components/shared/Navbar.vue";

const { getUserInfo } = useAuthStore();
const { displayLoader, destroyLoader, isLoading } = useGlobalLoader();

onMounted(async () => {
 displayLoader();
 await getUserInfo();
 destroyLoader();
});
</script>
<template>
 <Navbar v-if="!isLoading" />
 <div
  v-if="!isLoading"
  class="min-h-screen container mx-auto bg-slate-50"
 >
  <div class="p-5">
   <router-view />
  </div>
 </div>
</template>
