<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "./router";

  function menuToggle(){
    var menuItems = document.getElementById("menuItems");
    if(menuItems != null){
        if (menuItems.style.maxHeight == "0px") {
                menuItems.style.maxHeight = "230px"; 
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
  });
</script>
<template>
    <div class="header">
        <div class="container">
            <div class="navbar">
                <div class="logo">
                    <img src="./images/logo-white.png"/>           
                </div>
                <nav>
                    <ul id="menuItems">
                      <li><RouterLink to="/">Home</RouterLink></li>
                      <li><RouterLink to="/products">Products</RouterLink></li>
                      <li><RouterLink to="/logistics">Logistics</RouterLink></li>
                      <li><RouterLink to="/customerCare">Customer Care</RouterLink></li>
                      <li><RouterLink to="/data">Data | Account</RouterLink></li>
                      <li><RouterLink to="/orders">Orders</RouterLink></li>
                      <li><RouterLink to="/logs">Logs</RouterLink></li>
                      <li><RouterLink to="/setOffer">Set Offer</RouterLink></li>
                    </ul>
                </nav>
                <img src="./images/cart.png" alt="cart" class="cart-icon" @click="goToCart"/>
                <img src="./images/menu.png" alt="menu" class="menu-icon" v-on:click="menuToggle()">
            </div>
        </div>
    </div>

  <RouterView />
</template>