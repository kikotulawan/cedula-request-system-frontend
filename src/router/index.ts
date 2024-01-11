import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { UserRoles, RouteNames } from "@enums";
import { useAuthStore } from "@stores/auth";
import { storeToRefs } from "pinia";

const Homepage = () => import("@views/homepage/Homepage.vue");
const Login = () => import("@views/auth/Login.vue");
const Register = () => import("@views/auth/Register.vue");

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
    meta: { title: "EasyCedula - Home", rank: 1 },
   },
   {
    path: "/login",
    name: RouteNames.LOGIN_ROUTE,
    component: Login,
    meta: { hasUser: true, title: "EasyCedula - Login to your account", rank: 2 },
   },
   {
    path: "/create-account",
    name: RouteNames.REGISTRATION_ROUTE,
    component: Register,
    meta: { hasUser: true, title: "EasyCedula - Create your account", rank: 3 },
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
 const { logged_in, user_role } = storeToRefs(useAuthStore());
 const title = to.meta.title as string;

 const is_logged_in = logged_in.value && user_role.value;
 const is_admin = to.matched.some((record) => record.meta.hasUser) && is_logged_in && user_role.value === UserRoles.ADMIN_ROLE;
 const is_user = to.matched.some((record) => record.meta.hasUser) && is_logged_in && user_role.value === UserRoles.USER_ROLE;

 if (title) {
  document.title = title;
 }

 if (to.matched.some((record) => record.meta.requiresLogin) && !logged_in.value) {
  next({ name: RouteNames.LOGIN_ROUTE });
 } else if (is_admin) {
  next({ name: "AdminHome" });
 } else if (is_user) {
  next({ name: "AdminHome" });
 } else {
  next();
 }
});

export default router;
