<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useCedulaRequestStore } from "@modules/cedula-requests/store";
import { useApprovedUsersStore } from "@/modules/approved-users/store";
import { storeToRefs } from "pinia";
import { usePagination } from "@/composables/usePagination";
import { useDebounce } from "@/composables/useDebounce";
import moment from "moment";

import Avatar from "vue3-avatar";
import PrimaryInput from "@/components/PrimaryInput.vue";
import Pagination from "@/components/Pagination.vue";
import RequestStatusSelect from "@/components/RequestStatusSelect.vue";
import CedulaRequestModal from "@/components/CedulaRequestModal.vue";

const { getAllCedulaRequests } = useCedulaRequestStore();
const { selected_user } = storeToRefs(useApprovedUsersStore());
const { cedula_requests, is_loading, paginationConfig, cedula_status } = storeToRefs(useCedulaRequestStore());

const open_request = ref<boolean>(false);
const req_info = ref<any>();
const page = ref<number>(1);
const limit = ref<number>(10);
const keyword = ref<string>("");

const { numberOfPages } = usePagination({
 totalItems: paginationConfig.value.totalItems,
 rowsPerPage: paginationConfig.value.rowsPerPage,
 currentPage: paginationConfig.value.currentPage,
});

watch(
 () => page.value,
 async () => await getAllCedulaRequests({ page: page.value, limit: limit.value, keyword: keyword.value, cedula_status: cedula_status.value }),
);

watch(
 () => cedula_status.value,
 async () => await getAllCedulaRequests({ page: page.value, limit: limit.value, keyword: keyword.value, cedula_status: cedula_status.value }),
);

watch(
 () => open_request.value,
 async (value) => {
  if (!value) {
   req_info.value = undefined;
   selected_user.value = undefined;
   await getAllCedulaRequests({ page: page.value, limit: limit.value, keyword: keyword.value, cedula_status: cedula_status.value });
  }
 },
);

function openRequest(item: any) {
 req_info.value = item;
 open_request.value = true;
}

const searchKeyword = useDebounce(async () => {
 await getAllCedulaRequests({ page: page.value, limit: limit.value, keyword: keyword.value, cedula_status: cedula_status.value });
}, 500);

onMounted(async () => {
 selected_user.value = undefined;
 await getAllCedulaRequests({ page: page.value, limit: limit.value, keyword: keyword.value, cedula_status: cedula_status.value });
});
</script>
<template>
 <CedulaRequestModal
  v-if="open_request"
  @close-modal="(val) => (open_request = val)"
  :request-info="req_info"
 />
 <div
  v-auto-animate
  v-if="!selected_user"
 >
  <div class="flex flex-wrap -mx-3 mb-5">
   <div class="w-full max-w-full px-3 mb-6 mx-auto">
    <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
     <div class="relative flex flex-col min-w-0 break-words shadow bg-clip-border rounded-2xl bg-light/30">
      <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
       <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
        <span class="mr-3 font-semibold text-dark">Cedula Requests</span>
        <span class="mt-1 font-normal text-secondary-dark text-sm">Manage all users cedula requests here.</span>
       </h3>
       <div class="relative flex flex-wrap items-center my-2 gap-2">
        <PrimaryInput
         v-model="keyword"
         @input="searchKeyword"
         type="text"
         id="keyword"
         placeholder="Search by Req#"
         :disabled="is_loading"
        />
        <RequestStatusSelect
         v-model="cedula_status"
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
           <th class="pb-3 text-start min-w-[175px]">Request ID</th>
           <th class="pb-3 text-start min-w-[175px]">Requested by</th>
           <th class="pb-3 text-end min-w-[100px]">Submission Date</th>
           <th class="pb-3 text-end min-w-[100px]">Status</th>
           <th class="pb-3 pr-12 text-end min-w-[175px]">Purpose</th>
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
          <tr v-if="!is_loading && cedula_requests.length <= 0">
           <td
            colspan="6"
            class="text-center p-10 text-red-500"
           >
            No data found
           </td>
          </tr>
          <tr
           v-for="item in cedula_requests"
           v-if="!is_loading && cedula_requests.length > 0"
           :key="item.id"
           class="border-b border-dashed last:border-b-0 text-sm hover:bg-gray-100 transition-all cursor-pointer"
           @click="openRequest(item)"
          >
           <td class="p-3 pl-0 text-start">
            <span class="text-light-inverse text-md/normal font-semibold">#{{ item.request_uuid }}</span>
           </td>
           <td class="p-3 pl-0">
            <div class="flex items-center">
             <div class="relative inline-block shrink-0 me-3">
              <Avatar :name="`${item.owner.user_info.first_name} ${item.owner.user_info.surname}`" />
             </div>
             <div class="flex flex-col justify-start">
              <span class="mb-1 font-semibold transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary">
               {{ item.owner.user_info.first_name + " " + item.owner.user_info.middle_name + " " + item.owner.user_info.surname }}
              </span>
             </div>
            </div>
           </td>
           <td class="p-3 pr-0 text-end">
            <span class="text-light-inverse text-md/normal">{{ moment(item.created_at).format("MMM DD, YYYY") }}</span>
           </td>
           <td class="p-3 pr-0 text-end">
            <span class="text-right align-baseline inline-flex px-2 py-1 mr-auto items-center text-base/none text-success bg-success-light rounded-lg">
             {{ item.status }}
            </span>
           </td>
           <td class="p-3 pr-8 text-end">
            <span class="text-right align-baseline inline-flex px-4 py-3 mr-auto items-center text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">{{ item.type }}</span>
           </td>
          </tr>
         </tbody>
        </table>
       </div>
      </div>

      <Pagination
       v-if="!is_loading && cedula_requests.length > 0"
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
