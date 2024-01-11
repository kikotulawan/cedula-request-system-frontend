<script setup lang="ts">
import { useUserAccountValidation } from "@composables/useUserAccountValidation";

// COMPONENTS
import HomeNavbar from "@components/HomeNavbar.vue";
import HomeFooter from "@components/HomeFooter.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryInput from "@/components/PrimaryInput.vue";
import BrgySelect from "@/components/BrgySelect.vue";

const { userAccountData, userAccountDataErrors, executeValidation } = useUserAccountValidation();

function submitForm() {
 executeValidation(userAccountData.value);
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
     <h1 class="text-2xl font-bold sm:text-3xl animate__animated animate__zoomIn">Create your EasyCedula account.</h1>

     <p class="mt-4 text-gray-500 animate__animated animate__zoomIn">Simple Online Process, Fast and Efficient, Secure and Reliable, Accessible Anywhere.</p>
    </div>

    <form
     @submit.prevent="submitForm"
     class="mx-auto mb-0 mt-8 max-w-md space-y-4 animate__animated animate__fadeInUp"
    >
     <PrimaryInput
      v-model="userAccountData.full_name"
      type="text"
      id="full_name"
      placeholder="Enter your full name"
      :errors="userAccountDataErrors.full_name"
     />
     <PrimaryInput
      v-model="userAccountData.phone_number"
      type="text"
      id="phone"
      placeholder="Enter your phone number"
      :errors="userAccountDataErrors.phone_number"
     />
     <PrimaryInput
      v-model="userAccountData.address"
      type="text"
      id="address"
      placeholder="Enter your full address"
      :errors="userAccountDataErrors.address"
     />
     <small class="text-gray-400 pl-2">Must be residing within San Miguel, Leyte only.</small>
     <BrgySelect
      v-model="userAccountData.baranggay"
      :errors="userAccountDataErrors.baranggay"
     />
     <PrimaryInput
      v-model="userAccountData.email"
      type="email"
      id="email"
      placeholder="Enter your email"
      :errors="userAccountDataErrors.email"
     />
     <PrimaryInput
      v-model="userAccountData.password"
      type="password"
      id="password"
      placeholder="Enter your password"
      :errors="userAccountDataErrors.password"
     />
     <PrimaryInput
      v-model="userAccountData.confirm_password"
      type="password"
      id="confirm_password"
      placeholder="Confirm your password"
      :errors="userAccountDataErrors.confirm_password"
     />
     <div class="flex flex-col items-center justify-between gap-6">
      <PrimaryButton
       type="submit"
       class="w-full"
       :light-theme="false"
       id="register-btn"
       text="Create Account"
      />
      <p class="text-sm text-gray-500 flex-none">
       Already have an account?
       <a
        class="underline"
        href="/login"
        >Sign in</a
       >
      </p>
     </div>
    </form>
   </div>
  </section>
 </main>
 <HomeFooter />
</template>
