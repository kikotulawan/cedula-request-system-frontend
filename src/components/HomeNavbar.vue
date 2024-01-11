<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouteNames } from "@enums";
import { useRoute, useRouter } from "vue-router";

import PrimaryButton from "@components/PrimaryButton.vue";

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
  class="h-[70px] w-full border-black fixed top-0 transition-all z-[100]"
  :class="scrolled && ' bg-black'"
 >
  <div class="container h-full mx-auto flex justify-between items-center p-3">
   <a
    href="/"
    class="font-bold text-lg"
    :class="scrolled && 'text-white'"
    >EasyCedula.</a
   >
   <PrimaryButton
    v-if="routeName !== RouteNames.LOGIN_ROUTE"
    :light-theme="scrolled"
    id="home-nav-register-btn"
    text="Sign In"
    @click="router.push({ name: RouteNames.LOGIN_ROUTE })"
   />
  </div>
 </div>
</template>
