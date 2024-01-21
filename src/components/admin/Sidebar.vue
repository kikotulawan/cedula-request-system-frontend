<script setup lang="ts">
import { RouteNames } from "@enums";
import { useRoute } from "vue-router";

const route = useRoute();

const activeRouteClass: string = "text-white bg-yellow-500 p-2 rounded cursor-pointer font-normal";
const unactiveRouteClass: string = "text-white p-2 cursor-pointer font-normal hover:bg-yellow-500 rounded transition-colors";

const activeRoute = (routeName: string) => {
 if (routeName === route.name) return activeRouteClass;
 return unactiveRouteClass;
};
</script>
<template>
 <div class="fixed left-0 inset-y-0 w-[280px] bg-slate-900 z-[2] p-6">
  <div class="flex flex-col items-center text-white">
   <img
    src="@assets/images/San-Miguel-Logo.png"
    alt="sml logo"
    width="170"
   />
   <h5 class="font-semibold mt-2">EasyCedula.</h5>
   <h5 class="text-xs text-center border-t">Simple Online Process, Fast and Efficient, Secure and Reliable, Accessible Anywhere.</h5>
  </div>

  <div class="mt-7">
   <ul class="flex flex-col gap-px">
    <router-link
     :to="{ name: RouteNames.ADMIN_DASHBOARD_ROUTE }"
     class="inline-flex items-center gap-2"
     :class="activeRoute(RouteNames.ADMIN_DASHBOARD_ROUTE)"
    >
     <span>
      <img
       src="@assets/images/dashboard.png"
       alt="dashboard"
       width="24"
      />
     </span>
     Dashboard
    </router-link>
    <router-link
     :to="{ name: RouteNames.ADMIN_CEDULA_REQUESTS_ROUTE }"
     class="inline-flex items-center gap-2"
     :class="activeRoute(RouteNames.ADMIN_CEDULA_REQUESTS_ROUTE)"
    >
     <span>
      <img
       src="@assets/images/request.png"
       alt="request"
       width="24"
      />
     </span>
     Cedula Requests
    </router-link>
    <router-link
     :to="{ name: RouteNames.ADMIN_PENDING_USERS_ROUTE }"
     class="inline-flex items-center gap-2"
     :class="activeRoute(RouteNames.ADMIN_PENDING_USERS_ROUTE)"
    >
     <span>
      <img
       src="@assets/images/new-user.png"
       alt="new-user"
       width="24"
      />
     </span>
     Pending Users
    </router-link>
    <router-link
     :to="{ name: RouteNames.ADMIN_APPROVED_USERS_ROUTE }"
     class="inline-flex items-center gap-2"
     :class="activeRoute(RouteNames.ADMIN_APPROVED_USERS_ROUTE)"
    >
     <span>
      <img
       src="@assets/images/verified.png"
       alt="verified"
       width="24"
      />
     </span>
     Verified Users
    </router-link>
    <router-link
     :to="{ name: RouteNames.ADMIN_SUSPENDED_USERS_ROUTE }"
     class="inline-flex items-center gap-2"
     :class="activeRoute(RouteNames.ADMIN_SUSPENDED_USERS_ROUTE)"
    >
     <span>
      <img
       src="@assets/images/suspended.png"
       alt="suspended"
       width="24"
      />
     </span>
     Suspended Users
    </router-link>
   </ul>
  </div>
 </div>
</template>
