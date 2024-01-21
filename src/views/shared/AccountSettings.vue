<script setup lang="ts">
import { useAuthStore } from "@modules/auth/store";
import { storeToRefs } from "pinia";

import PrimaryInput from "@/components/PrimaryInput.vue";
import BrgySelect from "@/components/BrgySelect.vue";
import GenderSelect from "@/components/GenderSelect.vue";
import CivilStatusSelect from "@/components/CivilStatusSelect.vue";
import { computed } from "vue";

const { user_info, is_loading, userRole } = storeToRefs(useAuthStore());

const isUser = computed(() => userRole.value === 2);

const { updateUserInfo } = useAuthStore();
</script>
<template>
 <main class="w-full min-h-screen py-1">
  <div class="p-2 md:p-4">
   <div class="w-full px-6 pb-8 sm:rounded-lg bg-white pt-3 lg:px-8 shadow">
    <div class="grid mt-8 w-full">
     <h5 class="font-semibold">Manage your account</h5>
     <form
      @submit.prevent="updateUserInfo"
      class="mb-0 mt-8 space-y-4"
     >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
       <PrimaryInput
        v-model="user_info!.first_name"
        type="text"
        id="first_name"
        placeholder="Enter your first name"
        label="First Name"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-model="user_info!.middle_name"
        type="text"
        id="middle_name"
        label="Middle Name"
        placeholder="Enter your middle name"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-model="user_info!.surname"
        type="text"
        id="surname"
        label="Surname"
        placeholder="Enter your surname"
        :disabled="is_loading"
        required
       />
       <GenderSelect
        v-if="isUser"
        v-model="user_info!.sex"
        label="Sex"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        v-model="user_info!.citizenship"
        type="text"
        id="citizenship"
        label="Citizenship"
        placeholder="Enter your citizenship"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        v-model="user_info!.date_of_birth"
        type="date"
        id="date_of_birth"
        label="Date of Birth"
        placeholder="Enter your date of birth"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        v-model="user_info!.place_of_birth"
        type="text"
        id="place_of_birth"
        label="Place of Birth"
        placeholder="Enter your place of birth"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        class="w-full"
        v-model="user_info!.height"
        type="text"
        id="height"
        label="Height (cm)"
        placeholder="Enter your height (cm)"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        class="w-full"
        v-model="user_info!.weight"
        type="text"
        id="weight"
        label="Weight (kg)"
        placeholder="Enter your weight (kg)"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        v-model="user_info!.profession_occupation"
        type="text"
        id="profession_occupation"
        label="Profession/occupation/business"
        placeholder="Enter your profession/occupation/business"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-if="isUser"
        v-model="user_info!.tax_identification_number"
        type="text"
        id="tax_identification_number"
        label="Tax Identification Number"
        placeholder="Enter your tax identification number"
        :disabled="is_loading"
        required
       />
       <CivilStatusSelect
        v-if="isUser"
        v-model="user_info!.civil_status"
        label="Civil Status"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-model="user_info!.phone_number"
        type="text"
        id="phone"
        label="Phone Number"
        placeholder="Enter your phone number"
        :disabled="is_loading"
        required
       />
       <PrimaryInput
        v-model="user_info!.address"
        type="text"
        id="address"
        label="Home Address"
        placeholder="Enter your full address"
        :disabled="is_loading"
        required
       />
       <BrgySelect
        v-model="user_info!.baranggay"
        label="Baranggay"
        required
        disabled
       />
       <PrimaryInput
        v-model="user_info!.account.email"
        type="email"
        id="email"
        label="Email Address"
        placeholder="Enter your email"
        disabled
       />
      </div>
      <div class="flex flex-col items-start gap-6">
       <button
        type="submit"
        :disabled="is_loading"
        class="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded shadow active:scale-95 transition-all disabled:cursor-not-allowed"
       >
        <p class="text-sm font-medium leading-none text-white">Update Account</p>
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 </main>
</template>
