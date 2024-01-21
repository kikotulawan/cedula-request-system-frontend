<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { RouteNames } from "@enums";
import { AuthService } from "@modules/auth/services";
import { useRoute, useRouter } from "vue-router";
import Avatar from "vue3-avatar";
import { useAuthStore } from "@modules/auth/store";
import { storeToRefs } from "pinia";
import { useGlobalLoader } from "vue-global-loader";

const { userFullName, userRole } = storeToRefs(useAuthStore());
const { displayLoader } = useGlobalLoader();

const route = useRoute();
const router = useRouter();
const scrolledDown = ref<boolean>(false);
const avatarContainer = ref<HTMLDivElement>();
const openMenu = ref<boolean>(false);
const routeNavbarTitle = computed(() => route.meta.navbarTitle ?? "");

const isAdmin = computed(() => userRole.value === 1);

const handleScroll = () => {
 scrolledDown.value = window.scrollY > 0;
};

const handleAvatarClick = (event: any) => {
 if (avatarContainer.value && !avatarContainer.value.contains(event.target)) {
  if (openMenu.value) openMenu.value = false;
 }
};

const logoutAccount = () => {
 displayLoader();
 setTimeout(() => {
  AuthService.new().logout();
 }, 2000);
};

function goToSettings() {
 const currentRole = userRole.value === 1 ? RouteNames.ADMIN_ACCOUNT_SETTINGS_ROUTE : RouteNames.USER_ACCOUNT_SETTINGS_ROUTE;
 router.push({ name: currentRole });
 openMenu.value = false;
}

function goToRequests() {
 router.push({ name: RouteNames.USER_REQUESTS_ROUTE });
 openMenu.value = false;
}

onMounted(() => {
 window.addEventListener("scroll", handleScroll);
 document.body.addEventListener("click", handleAvatarClick);
});

onBeforeUnmount(() => {
 window.removeEventListener("scroll", handleScroll);
 document.body.removeEventListener("click", handleAvatarClick);
});
</script>
<template>
 <div
  class="sticky top-0 w-full py-4 bg-slate-50 z-[1] transition-all inline-flex justify-between items-center"
  :class="[scrolledDown && isAdmin ? 'shadow pr-6 pl-[290px] bg-white' : !scrolledDown && isAdmin ? 'pl-[300px] pr-8' : scrolledDown && !isAdmin ? 'shadow bg-white px-8' : 'px-5']"
 >
  <div class="inline-flex items-center gap-2">
   <img
    v-if="!isAdmin"
    @click="router.push({ name: RouteNames.HOMEPAGE_ROUTE })"
    class="cursor-pointer"
    src="@assets/images/San-Miguel-Logo.png"
    alt="sml logo"
    width="30"
   />
   <h5
    class="font-semibold text-sm lg:text-base"
    :class="!isAdmin && 'cursor-pointer'"
    @click="!isAdmin && router.push({ name: RouteNames.HOMEPAGE_ROUTE })"
   >
    {{ isAdmin ? routeNavbarTitle : "EasyCedula." }}
   </h5>
  </div>
  <div
   class="relative inline-flex items-center gap-1"
   ref="avatarContainer"
  >
   <h5 class="text-nowrap leading-none text-sm lg:text-base hidden md:inline-block">{{ userFullName }}</h5>
   <Avatar
    :name="userFullName"
    class="cursor-pointer hover:scale-110 active:scale-100 transition-all"
    @click="openMenu = !openMenu"
   />
   <div
    v-if="openMenu"
    class="absolute top-10 right-0 z-10 bg-slate-900 shadow-md mt-2 p-2 rounded-lg"
   >
    <ul class="text-right text-nowrap flex flex-col gap-1">
     <li
      v-if="!isAdmin"
      class="text-white p-2 cursor-pointer font-normal hover:bg-yellow-500 rounded transition-colors"
      @click="goToRequests"
     >
      My Cedula Requests
     </li>
     <li
      class="text-white p-2 cursor-pointer font-normal hover:bg-yellow-500 rounded transition-colors"
      @click="goToSettings"
     >
      Account Settings
     </li>
     <li
      class="text-white p-2 cursor-pointer font-normal hover:bg-yellow-500 rounded transition-colors"
      @click="logoutAccount"
     >
      Sign-out
     </li>
    </ul>
   </div>
  </div>
 </div>
</template>
