<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { RouteNames } from "@enums";
import { useRouter, useRoute } from "vue-router";

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
 <footer class="mt-20 xl:mt-32 mx-auto w-full relative text-center bg-black text-white">
  <div class="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
   <h2 class="font-bold text-3xl xl:text-4xl leading-snug">Get Your Cedula Today!<br />Your convenience is our priority.</h2>
   <PrimaryButton
    v-if="routeName === RouteNames.REGISTRATION_ROUTE"
    :light-theme="true"
    id="home-footer-cta-btn"
    text="Sign in to your account"
    class="mt-8 mx-auto"
    @click="router.push({ name: RouteNames.LOGIN_ROUTE })"
   />
   <PrimaryButton
    v-else
    :light-theme="true"
    id="home-footer-cta-btn"
    text="Create an account"
    class="mt-8 mx-auto"
    @click="router.push({ name: RouteNames.REGISTRATION_ROUTE })"
   />
   <div class="mt-14 xl:mt-20">
    <nav class="flex flex-wrap justify-center text-lg font-medium">
     <div class="px-5 py-2"><a href="#">Contact</a></div>
     <div class="px-5 py-2"><a href="#">Developers</a></div>
     <div class="px-5 py-2"><a href="#">Privacy</a></div>
     <div class="px-5 py-2"><a href="#">Terms</a></div>
    </nav>
    <p class="mt-7 text-base">© 2023 ADFC Tacloban City - Information Technology</p>
   </div>
  </div>
 </footer>
</template>
