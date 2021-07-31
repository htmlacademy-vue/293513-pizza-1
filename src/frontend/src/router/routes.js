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
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
];
