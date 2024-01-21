<script setup lang="ts">
import { useUserAccountValidation } from "@composables/useUserAccountValidation";

// COMPONENTS
import HomeNavbar from "@components/HomeNavbar.vue";
import HomeFooter from "@components/HomeFooter.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import PrimaryInput from "@/components/PrimaryInput.vue";
import BrgySelect from "@/components/BrgySelect.vue";
import GenderSelect from "@/components/GenderSelect.vue";
import CivilStatusSelect from "@/components/CivilStatusSelect.vue";

const { userAccountData, userAccountDataErrors, registerAccount, is_loading } = useUserAccountValidation();

async function submitForm() {
 await registerAccount();
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
     class="mx-auto mb-0 mt-8 max-w-[700px] space-y-4 animate__animated animate__fadeInUp"
    >
     <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div class="flex flex-col gap-3">
       <PrimaryInput
        v-model="userAccountData.first_name"
        type="text"
        id="first_name"
        placeholder="Enter your first name"
        :errors="userAccountDataErrors.first_name"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.middle_name"
        type="text"
        id="middle_name"
        placeholder="Enter your middle name"
        :errors="userAccountDataErrors.middle_name"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.surname"
        type="text"
        id="surname"
        placeholder="Enter your surname"
        :errors="userAccountDataErrors.surname"
        :disabled="is_loading"
       />
       <GenderSelect
        v-model="userAccountData.sex"
        :errors="userAccountDataErrors.sex"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.citizenship"
        type="text"
        id="citizenship"
        placeholder="Enter your citizenship"
        :errors="userAccountDataErrors.citizenship"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.date_of_birth"
        type="date"
        id="date_of_birth"
        placeholder="Enter your date of birth"
        :errors="userAccountDataErrors.date_of_birth"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.place_of_birth"
        type="text"
        id="place_of_birth"
        placeholder="Enter your place of birth"
        :errors="userAccountDataErrors.place_of_birth"
        :disabled="is_loading"
       />
       <div class="inline-flex lg:flex-col gap-3 w-full">
        <PrimaryInput
         class="w-full"
         v-model="userAccountData.height"
         type="text"
         id="height"
         placeholder="Enter your height (cm)"
         :errors="userAccountDataErrors.height"
         :disabled="is_loading"
        />
        <PrimaryInput
         class="w-full"
         v-model="userAccountData.weight"
         type="text"
         id="weight"
         placeholder="Enter your weight (kg)"
         :errors="userAccountDataErrors.weight"
         :disabled="is_loading"
        />
       </div>
      </div>
      <div class="flex flex-col gap-3">
       <PrimaryInput
        v-model="userAccountData.profession_occupation"
        type="text"
        id="profession_occupation"
        placeholder="Enter your profession/occupation/business"
        :errors="userAccountDataErrors.profession_occupation"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.tax_identification_number"
        type="text"
        id="tax_identification_number"
        placeholder="Enter your tax identification number"
        :errors="userAccountDataErrors.tax_identification_number"
        :disabled="is_loading"
       />
       <CivilStatusSelect
        v-model="userAccountData.civil_status"
        :errors="userAccountDataErrors.civil_status"
        :disabled="is_loading"
       />
       <PrimaryInput
        v-model="userAccountData.phone_number"
        type="text"
        id="phone"
        placeholder="Enter your phone number"
        :errors="userAccountDataErrors.phone_number"
        :disabled="is_loading"
       />
       <div>
        <PrimaryInput
         v-model="userAccountData.address"
         type="text"
         id="address"
         placeholder="Enter your full address"
         :errors="userAccountDataErrors.address"
         :disabled="is_loading"
        />
       </div>
       <BrgySelect
        v-model="userAccountData.baranggay"
        :errors="userAccountDataErrors.baranggay"
        :disabled="is_loading"
       />
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
       <PrimaryInput
        v-model="userAccountData.confirm_password"
        type="password"
        id="confirm_password"
        placeholder="Confirm your password"
        :errors="userAccountDataErrors.confirm_password"
        :disabled="is_loading"
       />
      </div>
     </div>
     <div class="flex flex-col items-center justify-between gap-6">
      <PrimaryButton
       type="submit"
       class="w-full"
       :light-theme="false"
       id="register-btn"
       text="Create Account"
       :loading="is_loading"
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
