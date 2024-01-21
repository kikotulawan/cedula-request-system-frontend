import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { UserRoles, RouteNames } from "@enums";
import { useCookies } from "@vueuse/integrations/useCookies";

const Homepage = () => import("@views/homepage/Homepage.vue");
const Login = () => import("@views/auth/Login.vue");
const Register = () => import("@views/auth/Register.vue");

const AdminIndex = () => import("@views/admin/Index.vue");
const AdminDashboard = () => import("@views/admin/Dashboard.vue");
const AdminPendingUsers = () => import("@views/admin/PendingUsers.vue");
const AdminApprovedUsers = () => import("@views/admin/ApprovedUsers.vue");
const AdminSuspendedUsers = () => import("@views/admin/SuspendedUsers.vue");
const AdminCedulaRequests = () => import("@views/admin/CedulaRequests.vue");

const UserIndex = () => import("@views/user/Index.vue");
const UserRequests = () => import("@views/user/Requests.vue");

const AccountSettings = () => import("@views/shared/AccountSettings.vue");

const cookies = useCookies();

const routes: RouteRecordRaw[] = [
 {
  path: "/",
  name: RouteNames.ROOT_ROUTE,
  meta: { title: "EasyCedula" },
  children: [
   {
    path: "/",
    name: RouteNames.HOMEPAGE_ROUTE,
    component: Homepage,
    meta: { title: "EasyCedula - Home" },
   },
   {
    path: "/login",
    name: RouteNames.LOGIN_ROUTE,
    component: Login,
    meta: { hasUser: true, title: "EasyCedula - Login to your account" },
   },
   {
    path: "/create-account",
    name: RouteNames.REGISTRATION_ROUTE,
    component: Register,
    meta: { hasUser: true, title: "EasyCedula - Create your account" },
   },
   {
    path: "/admin",
    name: RouteNames.ADMIN_INDEX_ROUTE,
    component: AdminIndex,
    meta: { isAdmin: true, requiresLogin: true, title: "EasyCedula - Admin" },
    redirect: "/admin/dashboard",
    children: [
     {
      path: "dashboard",
      name: RouteNames.ADMIN_DASHBOARD_ROUTE,
      component: AdminDashboard,
      meta: { title: "EasyCedula - Admin Dashboard", navbarTitle: "Dashboard" },
     },
     {
      path: "pending/users",
      name: RouteNames.ADMIN_PENDING_USERS_ROUTE,
      component: AdminPendingUsers,
      meta: { title: "EasyCedula - Pending Users", navbarTitle: "Pending Users" },
     },
     {
      path: "approved/users",
      name: RouteNames.ADMIN_APPROVED_USERS_ROUTE,
      component: AdminApprovedUsers,
      meta: { title: "EasyCedula - Approved Users", navbarTitle: "Approved Users" },
     },
     {
      path: "suspended/users",
      name: RouteNames.ADMIN_SUSPENDED_USERS_ROUTE,
      component: AdminSuspendedUsers,
      meta: { title: "EasyCedula - Suspended Users", navbarTitle: "Suspended Users" },
     },
     {
      path: "cedulas",
      name: RouteNames.ADMIN_CEDULA_REQUESTS_ROUTE,
      component: AdminCedulaRequests,
      meta: { title: "EasyCedula - Cedula Requests", navbarTitle: "Cedula Requests" },
     },
     {
      path: "account",
      name: RouteNames.ADMIN_ACCOUNT_SETTINGS_ROUTE,
      component: AccountSettings,
      meta: { title: "EasyCedula - Account Settings", navbarTitle: "Account Settings" },
     },
    ],
   },
   {
    path: "/user",
    name: RouteNames.USER_INDEX_ROUTE,
    component: UserIndex,
    meta: { isUser: true, requiresLogin: true, title: "EasyCedula - User" },
    redirect: "/user/dashboard",
    children: [
     {
      path: "dashboard",
      name: RouteNames.USER_REQUESTS_ROUTE,
      component: UserRequests,
      meta: { title: "EasyCedula - My Requests", navbarTitle: "My Cedula Requests" },
     },
     {
      path: "account",
      name: RouteNames.USER_ACCOUNT_SETTINGS_ROUTE,
      component: AccountSettings,
      meta: { title: "EasyCedula - Account Settings", navbarTitle: "Account Settings" },
     },
    ],
   },
  ],
 },
];

const router = createRouter({
 history: createWebHistory(),
 scrollBehavior(_to, _from, _savedPosition) {
  return { top: 0 };
 },
 routes,
});

router.beforeEach((to, _from, next) => {
 const USER_ROLE: string = cookies.get("role");
 const AUTH_TOKEN: string = cookies.get("auth");
 const title = to.meta.title as string;

 const ADMIN_AUTHENTICATED = AUTH_TOKEN && USER_ROLE === UserRoles.ADMIN_ROLE;
 const USER_AUTHENTICATED = AUTH_TOKEN && USER_ROLE === UserRoles.USER_ROLE;

 const isAdmin = (to.matched.some((record) => record.meta.hasUser) && ADMIN_AUTHENTICATED) || (to.matched.some((record) => record.meta.isUser) && ADMIN_AUTHENTICATED);
 const isUser = (to.matched.some((record) => record.meta.hasUser) && USER_AUTHENTICATED) || (to.matched.some((record) => record.meta.isAdmin) && USER_AUTHENTICATED);

 if (title) {
  document.title = title;
 }

 if (to.matched.some((record) => record.meta.requiresLogin) && !AUTH_TOKEN) {
  next({ name: RouteNames.LOGIN_ROUTE });
 } else if (isAdmin) {
  next({ name: RouteNames.ADMIN_INDEX_ROUTE });
 } else if (isUser) {
  next({ name: RouteNames.USER_INDEX_ROUTE });
 } else {
  next();
 }
});

export default router;
