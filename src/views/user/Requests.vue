<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { CedulaRequestService } from "@/modules/cedula-requests/services";
import { useAuthStore } from "@modules/auth/store";
import { storeToRefs } from "pinia";
import moment from "moment";

import RequestForm from "@components/RequestForm.vue";
import RequirementsModal from "@components/RequirementsModal.vue";

const { userFullName } = storeToRefs(useAuthStore());
const user_requests = ref<any[]>([]);
const is_loading = ref<boolean>(true);
const create_new_request = ref<boolean>(false);
const open_request = ref<boolean>(false);
const req_info = ref<any>();

async function getUserCedulaRequests() {
 const res = await CedulaRequestService.new().getUserCedulaRequests();
 user_requests.value = res.data;
 is_loading.value = false;
}

function openRequest(item: any) {
 req_info.value = item;
 open_request.value = true;
}

watch(
 () => create_new_request.value,
 async () => {
  is_loading.value = true;
  await getUserCedulaRequests();
 },
);

watch(
 () => open_request.value,
 (value) => {
  if (!value) {
   req_info.value = undefined;
  }
 },
);

onMounted(async () => {
 await getUserCedulaRequests();
});
</script>
<template>
 <RequirementsModal
  v-if="open_request"
  @close-modal="(val) => (open_request = val)"
  :request-info="req_info"
 />
 <div class="sm:px-6 w-full">
  <div class="px-4 md:px-10 py-4 md:py-7">
   <div class="flex items-center justify-between">
    <p
     tabindex="0"
     class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl leading-normal text-gray-800"
    >
     Good day,
     <strong> {{ userFullName }} </strong>!
    </p>
   </div>
  </div>
  <RequestForm
   v-if="create_new_request"
   @close-form="(val) => (create_new_request = val)"
  />
  <div
   v-else
   class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10"
  >
   <div class="sm:flex items-center justify-between">
    <button
     @click="create_new_request = true"
     class="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded shadow active:scale-95 transition-all"
    >
     <p class="text-sm font-medium leading-none text-white">New Request</p>
    </button>
   </div>
   <div class="mt-7 overflow-x-auto">
    <table class="w-full whitespace-nowrap">
     <tbody>
      <th></th>
      <tr
       tabindex="0"
       class="h-16 border border-gray-100 rounded hover:cursor-pointer hover:bg-gray-100 transition-all"
       v-if="user_requests.length > 0 && !is_loading"
       v-for="(item, index) in user_requests"
       :key="index"
       @click="openRequest(item)"
      >
       <td class="">
        <div class="flex items-center pl-5">
         <p class="text-base font-medium leading-none text-gray-700 mr-2">Req #{{ item.request_uuid }}</p>
        </div>
       </td>
       <td class="px-24">
        <div
         class="center relative inline-block select-none whitespace-nowrap rounded-lg py-2 px-3.5 align-baseline text-xs uppercase leading-none text-white"
         :class="item.status === 'ON PROCESS' ? 'bg-amber-500' : item.status === 'REJECTED' ? 'bg-red-500' : item.status === 'FOR RELEASE' ? 'bg-blue-500' : 'bg-green-500'"
        >
         <div class="mt-px">{{ item.status }}</div>
        </div>
       </td>
       <td class="px-10">
        <div class="flex items-center min-w-[300px] xl:min-w-0">
         <svg
          class="shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
         >
          <path
           d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></path>
          <circle
           cx="7.50004"
           cy="7.49967"
           r="1.66667"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></circle>
         </svg>
         <p class="text-sm leading-none text-gray-600 ml-2 text-wrap max-w-sm py-5">
          {{ item.type }}
         </p>
        </div>
       </td>
       <td class="px-10">
        <div class="flex items-center min-w-[300px] xl:min-w-0">
         <svg
          class="shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
         >
          <path
           d="M3.33331 17.4998V6.6665C3.33331 6.00346 3.59671 5.36758 4.06555 4.89874C4.53439 4.4299 5.17027 4.1665 5.83331 4.1665H14.1666C14.8297 4.1665 15.4656 4.4299 15.9344 4.89874C16.4033 5.36758 16.6666 6.00346 16.6666 6.6665V11.6665C16.6666 12.3295 16.4033 12.9654 15.9344 13.4343C15.4656 13.9031 14.8297 14.1665 14.1666 14.1665H6.66665L3.33331 17.4998Z"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></path>
          <path
           d="M10 9.1665V9.17484"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></path>
          <path
           d="M6.66669 9.1665V9.17484"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></path>
          <path
           d="M13.3333 9.1665V9.17484"
           stroke="#52525B"
           stroke-width="1.25"
           stroke-linecap="round"
           stroke-linejoin="round"
          ></path>
         </svg>
         <p class="text-sm leading-none text-gray-600 ml-2 text-wrap max-w-sm py-5">{{ item.staff_comment ?? "No staff comment" }}</p>
        </div>
       </td>
       <td class="px-10">
        <span
         class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 bg-red-100 rounded"
         v-if="item.pick_up_date"
         >Pick Up @{{ moment(item.pick_up_date).format("MMM DD, YYYY") }} {{ moment(item.pick_up_time, "HH:mm:ss").format("h:mmA") }}</span
        >
       </td>
      </tr>
      <tr v-if="user_requests.length <= 0 && !is_loading">
       <td
        colspan="5"
        class="text-center p-10 text-red-500 font-semibold text-opacity-50"
       >
        NO REQUESTS FOUND
       </td>
      </tr>
      <tr
       v-if="is_loading"
       v-for="loading_key in 5"
       :key="loading_key"
      >
       <td colspan="5">
        <div
         class="relative min-h-[70px] mb-3 overflow-hidden space-y-5 rounded-lg bg-gray-100 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent"
        ></div>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 </div>
</template>
