<script setup lang="ts">
import { useLoginValidation } from "@composables/useLoginValidation";

import HomeNavbar from "@components/HomeNavbar.vue";
import HomeFooter from "@components/HomeFooter.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryInput from "@/components/PrimaryInput.vue";

const { userAccountData, userAccountDataErrors, loginAccount, is_loading } = useLoginValidation();

async function submitForm() {
 await loginAccount();
}
</script>

<template>
 <HomeNavbar class="animate__animated animate__slideInDown" />
 <main class="min-h-screen h-full container mx-auto pt-32">
  <section>
   <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
     <img
      class="animate__animated animate__fadeInDown animate__slow mx-auto mb-2"
      src="@assets/images/San-Miguel-Logo.png"
      alt="San Miguel Leyte Logo"
      width="130"
     />
     <h1 class="text-2xl font-bold sm:text-3xl animate__animated animate__zoomIn">Sign in to your account.</h1>

     <p class="mt-4 text-gray-500 animate__animated animate__zoomIn">Simple Online Process, Fast and Efficient, Secure and Reliable, Accessible Anywhere.</p>
    </div>

    <form
     @submit.prevent="submitForm"
     class="mx-auto mb-0 mt-8 max-w-md space-y-4 animate__animated animate__fadeInUp"
    >
     <PrimaryInput
      v-model="userAccountData.email"
      type="email"
      id="email"
      placeholder="Enter your email"
      :errors="userAccountDataErrors.email"
      :disabled="is_loading"
     />
     <PrimaryInput
      v-model="userAccountData.password"
      type="password"
      id="password"
      placeholder="Enter your password"
      :errors="userAccountDataErrors.password"
      :disabled="is_loading"
     />

     <div class="flex flex-col items-center justify-between gap-6">
      <PrimaryButton
       type="submit"
       class="w-full"
       :light-theme="false"
       id="login-btn"
       text="Sign In"
       :loading="is_loading"
      />
      <p class="text-sm text-gray-500 flex-none">
       No account?
       <a
        class="underline"
        href="/create-account"
        >Sign up</a
       >
      </p>
     </div>
    </form>
   </div>
  </section>
 </main>
 <HomeFooter />
</template>
