import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Products from "../components/Products.vue";
import Logistics from "../components/Logistics.vue";
import CustomerCare from "../components/CustomerCare.vue";
import Data from "../components/Data.vue";
import Logs from "../components/Logs.vue";
import Cart from "../components/Cart.vue";
import Orders from "../components/Orders.vue";
import Offer from "../components/Offer.vue";
import SetOffer from "../components/SetOffer.vue";
import ProductDetails from "@/components/ProductDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/logistics",
      name: "logistics",
      component: Logistics,
    },
    {
      path: "/customerCare",
      name: "customerCare",
      component: CustomerCare,
    },
    {
      path: "/productDetails",
      name: "productDetails",
      component: ProductDetails,
    },
    {
      path: "/data",
      name: "data",
      component: Data,
    },
    {
      path: "/logs",
      name: "logs",
      component:Logs,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/orders",
      name: "orders",
      component:Orders,
    },
    {
      path: "/offer",
      name: "offer",
      component:Offer,
    },
    {
      path: "/setOffer",
      name: "setOffer",
      component:SetOffer,
    },
  ],
});

export default router;
