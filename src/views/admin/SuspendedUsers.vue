<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { UserAccountInfoState } from "@types";
import { useSuspendedUsersStore } from "@modules/suspended-users/store";
import { storeToRefs } from "pinia";
import { usePagination } from "@/composables/usePagination";
import { useDebounce } from "@/composables/useDebounce";

import Avatar from "vue3-avatar";
import PrimaryInput from "@/components/PrimaryInput.vue";
import Pagination from "@/components/Pagination.vue";
import UserInfo from "@/components/UserInfo.vue";

const { getAllSuspendedUsers } = useSuspendedUsersStore();
const { suspended_users, is_loading, paginationConfig, selected_user } = storeToRefs(useSuspendedUsersStore());

const page = ref<number>(1);
const limit = ref<number>(10);
const keyword = ref<string>("");

const getFullName = (firstname: string, middlename: string, surname: string) => {
 return firstname + " " + middlename + " " + surname;
};

function setSelectedUser(user: UserAccountInfoState) {
 selected_user.value = user;
}

const { numberOfPages } = usePagination({
 totalItems: paginationConfig.value.totalItems,
 rowsPerPage: paginationConfig.value.rowsPerPage,
 currentPage: paginationConfig.value.currentPage,
});

watch(
 () => page.value,
 async () => await getAllSuspendedUsers({ page: page.value, limit: limit.value, keyword: keyword.value }),
);

watch(
 () => selected_user.value,
 async () => {
  if (!selected_user.value) await getAllSuspendedUsers({ page: page.value, limit: limit.value, keyword: keyword.value });
 },
);

const searchKeyword = useDebounce(async () => {
 await getAllSuspendedUsers({ page: page.value, limit: limit.value, keyword: keyword.value });
}, 500);

onMounted(async () => {
 selected_user.value = undefined;
 await getAllSuspendedUsers({ page: page.value, limit: limit.value, keyword: keyword.value });
});
</script>
<template>
 <div v-auto-animate>
  <UserInfo
   v-if="selected_user"
   :user-status="selected_user.account.account_activated"
  />
  <div
   v-else
   class="flex flex-wrap -mx-3 mb-5"
  >
   <div class="w-full max-w-full px-3 mb-6 mx-auto">
    <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
     <div class="relative flex flex-col min-w-0 break-words shadow bg-clip-border rounded-2xl bg-light/30">
      <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
       <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
        <span class="mr-3 font-semibold text-dark">Suspended User Accounts</span>
        <span class="mt-1 font-normal text-secondary-dark text-sm">Manage all suspended accounts registered here.</span>
       </h3>
       <div class="relative flex flex-wrap items-center my-2">
        <PrimaryInput
         v-model="keyword"
         @input="searchKeyword"
         type="text"
         id="keyword"
         placeholder="Search by name"
         :disabled="is_loading"
        />
       </div>
      </div>
      <!-- end card header -->
      <!-- card body  -->
      <div class="flex-auto block py-8 pt-6 px-9">
       <div :class="is_loading ? 'overflow-hidden' : 'overflow-x-auto'">
        <table class="w-full my-0 align-middle text-dark border-neutral-200">
         <thead class="align-bottom">
          <tr class="font-semibold text-[0.95rem] text-secondary-dark">
           <th class="pb-3 text-start min-w-[175px]">Full Name</th>
           <th class="pb-3 text-end min-w-[100px]">Email</th>
           <th class="pb-3 text-end min-w-[100px]">Contact</th>
           <th class="pb-3 pr-12 text-end min-w-[175px]">Address</th>
          </tr>
         </thead>
         <tbody>
          <tr v-if="is_loading">
           <td
            colspan="6"
            class="text-center p-10"
           >
            Loading data...
           </td>
          </tr>
          <tr v-if="!is_loading && suspended_users.length <= 0">
           <td
            colspan="6"
            class="text-center p-10 text-red-500"
           >
            No data found
           </td>
          </tr>
          <tr
           v-for="item in suspended_users"
           v-if="!is_loading && suspended_users.length > 0"
           :key="item.id"
           class="border-b border-dashed last:border-b-0 text-sm hover:bg-gray-100 transition-all cursor-pointer"
           @click="setSelectedUser(item)"
          >
           <td class="p-3 pl-0">
            <div class="flex items-center">
             <div class="relative inline-block shrink-0 me-3">
              <Avatar :name="`${item.first_name} ${item.surname}`" />
             </div>
             <div class="flex flex-col justify-start">
              <span class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary">
               {{ getFullName(item.first_name, item.middle_name, item.surname) }}
              </span>
             </div>
            </div>
           </td>
           <td class="p-3 pr-0 text-end">
            <span class="text-light-inverse text-md/normal">{{ item.account.email }}</span>
           </td>
           <td class="p-3 pr-0 text-end">
            <span class="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center text-base/none text-success bg-success-light rounded-lg">
             {{ item.phone_number }}
            </span>
           </td>
           <td class="p-3 pr-8 text-end">
            <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{{ item.address }}</span>
           </td>
          </tr>
         </tbody>
        </table>
       </div>
      </div>

      <Pagination
       v-if="!is_loading && suspended_users.length > 0"
       :number-of-pages="numberOfPages"
       v-model="page"
       :disable-click="is_loading"
      />
     </div>
    </div>
   </div>
  </div>
 </div>
</template>
