<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouteNames } from "@enums";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@modules/auth/store";
import { storeToRefs } from "pinia";

const { user_info, userRole } = storeToRefs(useAuthStore());

const router = useRouter();
const route = useRoute();
const scrolled = ref<boolean>(false);

const routeName = computed(() => {
 return route.name;
});

function navOnScroll() {
 if (window.scrollY > 60) {
  scrolled.value = true;
 } else {
  scrolled.value = false;
 }
}

onMounted(() => {
 document.addEventListener("scroll", navOnScroll);
});

onUnmounted(() => {
 document.removeEventListener("scroll", navOnScroll);
});
</script>

<template>
 <div
  class="h-[70px] w-full fixed top-0 transition-all z-[100]"
  :class="scrolled && ' bg-white shadow'"
 >
  <div class="container h-full mx-auto flex justify-between items-center p-3">
   <div class="inline-flex items-center gap-2">
    <img
     @click="router.push({ name: RouteNames.HOMEPAGE_ROUTE })"
     class="cursor-pointer"
     src="@assets/images/San-Miguel-Logo.png"
     alt="sml logo"
     width="30"
    />
    <a
     href="/"
     class="font-bold text-lg"
     >EasyCedula.</a
    >
   </div>
   <router-link
    v-if="routeName !== RouteNames.LOGIN_ROUTE && !user_info"
    :to="{ name: RouteNames.LOGIN_ROUTE }"
    class="hover:text-blue-500 hover:font-semibold transition-all"
   >
    Sign In
   </router-link>
   <router-link
    v-if="user_info && userRole === 1"
    :to="{ name: RouteNames.LOGIN_ROUTE }"
    class="hover:text-blue-500 hover:font-semibold transition-all"
   >
    Admin Dashboard
   </router-link>
   <router-link
    v-if="user_info && userRole === 2"
    :to="{ name: RouteNames.LOGIN_ROUTE }"
    class="hover:text-blue-500 hover:font-semibold transition-all"
   >
    My Requests
   </router-link>
  </div>
 </div>
</template>
