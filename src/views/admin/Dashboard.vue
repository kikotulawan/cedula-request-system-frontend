<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { AdminService } from "@modules/admin/services";
import { PendingUsersService } from "@modules/pending-users/services";
import { SuspendedUsersService } from "@modules/suspended-users/services";
import { UserAccountInfoState } from "@types";
import { storeToRefs } from "pinia";
import { usePendingUsersStore } from "@/modules/pending-users/store";
import { useSuspendedUsersStore } from "@/modules/suspended-users/store";
import { RouteNames } from "@enums";

import Avatar from "vue3-avatar";
import UserInfo from "@/components/UserInfo.vue";
import { useRouter } from "vue-router";

const pendingStoreRef = storeToRefs(usePendingUsersStore());
const suspendedStoreRef = storeToRefs(useSuspendedUsersStore());
const router = useRouter();

const is_loading = ref<boolean>(true);
const totalApprovedUsers = ref<number>(0);
const totalSuspendedUsers = ref<number>(0);
const recent_pending_users = ref<UserAccountInfoState[]>([]);
const recent_suspended_users = ref<UserAccountInfoState[]>([]);
const selected_user = ref<UserAccountInfoState>();

async function getMostRecentPendingUsers() {
 const res = await PendingUsersService.new().getAllPendingUsers({ page: 1, limit: 20 });
 recent_pending_users.value = res.data.data;
}

async function getMostRecentSuspendedUsers() {
 const res = await SuspendedUsersService.new().getAllSuspendedUsers({ page: 1, limit: 20 });
 recent_suspended_users.value = res.data.data;
}

async function getTotalApprovedUsers() {
 const approvedUsersRes = await AdminService.new().getTotalApprovedUsers();
 totalApprovedUsers.value = approvedUsersRes.data;
}

async function getTotalSuspendedUsers() {
 const suspendedUsersRes = await AdminService.new().getTotalSuspendedUsers();
 totalSuspendedUsers.value = suspendedUsersRes.data;
}

async function loadDashboardData() {
 is_loading.value = true;
 await getTotalApprovedUsers();
 await getTotalSuspendedUsers();
 await getMostRecentPendingUsers();
 await getMostRecentSuspendedUsers();
 is_loading.value = false;
}

function setPendingStoreSelectedUser(item: UserAccountInfoState) {
 pendingStoreRef.selected_user.value = item;
 selected_user.value = item;
}

function setSuspendedtoreSelectedUser(item: UserAccountInfoState) {
 suspendedStoreRef.selected_user.value = item;
 selected_user.value = item;
}

watch(
 () => pendingStoreRef.selected_user.value,
 async (value) => {
  if (!value) {
   selected_user.value = undefined;
   await loadDashboardData();
  }
 },
);

watch(
 () => suspendedStoreRef.selected_user.value,
 async (value) => {
  if (!value) {
   selected_user.value = undefined;
   await loadDashboardData();
  }
 },
);

onMounted(async () => {
 pendingStoreRef.selected_user.value = undefined;
 suspendedStoreRef.selected_user.value = undefined;
 await loadDashboardData();
});
</script>
<template>
 <UserInfo
  v-if="selected_user"
  :user-status="selected_user.account.account_activated"
 />
 <div
  class="min-h-screen h-full"
  v-if="!selected_user"
  v-auto-animate
 >
  <section
   v-if="is_loading"
   class="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
  >
   <div
    v-for="skel in 4"
    :key="skel"
    class="relative min-h-[130px] overflow-hidden space-y-5 rounded-lg bg-gray-100 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent"
   ></div>
  </section>
  <section
   v-if="!is_loading"
   class="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
  >
   <div class="flex items-center p-8 bg-white shadow rounded-lg">
    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
     <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
     >
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
     </svg>
    </div>
    <div>
     <span class="block text-2xl font-bold">{{ totalApprovedUsers }}</span>
     <span class="block text-gray-500">Total Verified Users</span>
    </div>
   </div>
   <div class="flex items-center p-8 bg-white shadow rounded-lg">
    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
     <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
     >
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
     </svg>
    </div>
    <div>
     <span class="block text-2xl font-bold">0</span>
     <span class="block text-gray-500">New Cedula Requests</span>
    </div>
   </div>
   <div class="flex items-center p-8 bg-white shadow rounded-lg">
    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
     <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
     >
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
     </svg>
    </div>
    <div>
     <span class="inline-block text-2xl font-bold">{{ totalSuspendedUsers }}</span>
     <span class="block text-gray-500">Suspended Users</span>
    </div>
   </div>
   <div class="flex items-center p-8 bg-white shadow rounded-lg">
    <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
     <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6"
     >
      <path
       stroke-linecap="round"
       stroke-linejoin="round"
       stroke-width="2"
       d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
     </svg>
    </div>
    <div>
     <span class="block text-2xl font-bold">0</span>
     <span class="block text-gray-500">Total Cedula Released</span>
    </div>
   </div>
  </section>

  <section class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
   <div
    v-if="is_loading"
    class="relative min-h-[400px] overflow-hidden space-y-5 rounded-lg bg-gray-100 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent"
   ></div>
   <div
    v-if="!is_loading"
    class="row-span-3 min-h-[400px] bg-white shadow rounded-lg relative"
   >
    <div
     class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400"
     v-if="recent_pending_users.length <= 0"
    >
     No pending accounts to approve
    </div>
    <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
     <span>Pending Accounts</span>
     <button
      v-if="recent_pending_users.length > 0"
      @click="router.push({ name: RouteNames.ADMIN_PENDING_USERS_ROUTE })"
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded active:scale-95 transition-all"
     >
      View All
     </button>
    </div>
    <div
     class="overflow-y-auto"
     style="max-height: 24rem"
    >
     <ul>
      <li
       class="flex items-center hover:bg-gray-100 py-3 px-5 cursor-pointer transition-all"
       v-for="item in recent_pending_users"
       :key="item.id"
       @click="setPendingStoreSelectedUser(item)"
      >
       <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
        <Avatar
         :name="`${item.first_name} ${item.surname}`"
         :size="40"
        />
       </div>
       <span class="text-gray-600">{{ item.first_name }} {{ item.surname }}</span>
       <span class="ml-auto font-semibold">{{ item.sex }}</span>
      </li>
     </ul>
    </div>
   </div>
   <div
    v-if="is_loading"
    class="relative min-h-[400px] overflow-hidden space-y-5 rounded-lg bg-gray-100 p-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent"
   ></div>
   <div
    v-if="!is_loading"
    class="row-span-3 min-h-[400px] bg-white shadow rounded-lg relative"
   >
    <div
     class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400"
     v-if="recent_suspended_users.length <= 0"
    >
     No suspended accounts to activate
    </div>
    <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
     <span>Suspended Accounts</span>
     <button
      v-if="recent_suspended_users.length > 0"
      @click="router.push({ name: RouteNames.ADMIN_SUSPENDED_USERS_ROUTE })"
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded active:scale-95 transition-all"
     >
      View All
     </button>
    </div>
    <div
     class="overflow-y-auto"
     style="max-height: 24rem"
    >
     <ul>
      <li
       class="flex items-center hover:bg-gray-100 py-3 px-5 cursor-pointer transition-all"
       v-for="item in recent_suspended_users"
       :key="item.id"
       @click="setSuspendedtoreSelectedUser(item)"
      >
       <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
        <Avatar
         :name="`${item.first_name} ${item.surname}`"
         :size="40"
        />
       </div>
       <span class="text-gray-600">{{ item.first_name }} {{ item.surname }}</span>
       <span class="ml-auto font-semibold">{{ item.sex }}</span>
      </li>
     </ul>
    </div>
   </div>
  </section>
 </div>
</template>
