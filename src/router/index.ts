import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Products from "../components/Products.vue";
import Logistics from "../components/Logistics.vue";
import CustomerCare from "../components/CustomerCare.vue";
import Data from "../components/Data.vue";
import Logs from "../components/Logs.vue";
import Cart from "../components/Cart.vue";
import Orders from "../components/Orders.vue";
import Offer from "../components/Offer.vue";
import Dashboard from "../components/Dashboard.vue";
import Users from "../components/Users.vue";
import Cashout from "../components/Cashout.vue";
import SetOffer from "../components/SetOffer.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import PaymentInfo from "@/components/PaymentInfo.vue";
import AllProducts from "@/components/AllProducts.vue";
import NotFound from "@/components/404.vue";


const router = createRouter({
  history: createWebHashHistory(),//import.meta.env.BASE_URL
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
      path: "/productDetails/:id",
      name: "productDetails",
      component: ProductDetails,
      props: true
    },
    {
      path: "/orderDetails/:orders",
      name: "orderDetails",
      component: OrderDetails,
      props : true
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
      path: "/users",
      name: "users",
      component:Users,
    },
    {
      path: "/cashout",
      name: "cashout",
      component:Cashout,
    },
    {
      path: "/paymentInfo/:id",
      name: "paymentInfo",
      component: PaymentInfo,
      props : true
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
    {
      path: "/allProducts",
      name: "allProducts",
      component:AllProducts,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component:Dashboard,
    },
  ],
});

export default router;
