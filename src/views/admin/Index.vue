<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@modules/auth/store";
import { useGlobalLoader } from "vue-global-loader";

import Sidebar from "@components/admin/Sidebar.vue";
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
 <div
  v-if="!isLoading"
  class="min-h-screen w-full bg-slate-50"
 >
  <Sidebar />
  <Navbar />
  <div class="p-5 pl-[300px]">
   <router-view />
  </div>
 </div>
</template>
