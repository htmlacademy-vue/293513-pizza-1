import { isLoggedIn, auth } from "@/middlewares";

export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: {
      layout: "AppLayoutWithSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
];
