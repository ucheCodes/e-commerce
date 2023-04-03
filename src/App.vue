<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
import {storeToRefs} from "pinia";
import {useSoftStore} from "./stores/soft-store";
    const softStore = useSoftStore();
    const {getUserId, encrypt, decrypt, getAllCategory, getChats, getAllProducts, getAllOrders, getAllOffers, getOffer, getLogistics} = useSoftStore();
    const {isAdmin, paystack_secret_key, paystack_public_key, isAllProductsLoaded} = storeToRefs(softStore);

  function menuToggle(){
    var menuItems = document.getElementById("menuItems");
    if(menuItems != null){
        if (menuItems.style.maxHeight == "0px") {
                menuItems.style.maxHeight = "340px"; 
        } 
        else {
                menuItems.style.maxHeight = "0px";
        }
    }
  }
  const goToCart = () => {
    router.push({ path: '/cart' });
  }

  onMounted(() => {
    menuToggle();
    getAllProducts();
    getUserId();
    getAllCategory();
    getAllOffers();
    getLogistics();
    getAllOrders();
    getChats();
    setInterval(() => {
      if (!isAllProductsLoaded.value) {
        getAllProducts();
      }
    },30000);

    /*encrypt("Encryption","paystack",{ // just comment this out when ready
            public_key : paystack_public_key.value,
            secret_key : paystack_secret_key.value,
            id : "b14ca5898a4e4133bbce2ea2315a1916"
        }).then(r => console.log(r.data));*/

    decrypt("Encryption","paystack").then( 
      response => {
          paystack_public_key.value = response.data.public_key;
          paystack_secret_key.value = response.data.secret_key;
      }
    );
    });

  //create paystack inline popup element
    const popup = document.createElement('script');
    popup.setAttribute('src', 'https://js.paystack.co/v1/inline.js');
    popup.async = true;
    document.head.appendChild(popup);
</script>
<template>
    <div class="header">
        <div class="container">
            <div class="navbar">
                <div class="logo">
                    <span class="txt">Peter's Soft</span>
                    <span><i class='fa fa-shopping-cart'></i></span>
                </div>
                <nav>
                    <ul @click="menuToggle" id="menuItems">
                      <li><RouterLink to="/">Home</RouterLink></li>
                      <li><RouterLink to="/products">Products</RouterLink></li>
                      <li><RouterLink to="/logistics">Logistics</RouterLink></li>
                      <li><RouterLink to="/customerCare">Customer Care</RouterLink></li>
                      <li><RouterLink to="/data">Login</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/orders">Orders</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/logs">Logs</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/setOffer">Set Offer</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/allProducts">All Products</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/users">Users</RouterLink></li>
                      <li v-if="isAdmin"><RouterLink to="/cashout">Cashout</RouterLink></li>
                    </ul>
                </nav>
                <img src="./images/cart.png" alt="cart" class="cart-icon" @click="goToCart"/>
                <img src="./images/menu.png" alt="menu" class="menu-icon" v-on:click="menuToggle()">
            </div>
        </div>
    </div>

  <RouterView />
</template>