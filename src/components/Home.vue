<script setup lang="ts">
    import { onMounted } from "vue";
    import  showSlides  from "../assets/slideshow.js";
    import Offer from "./Offer.vue";

    onMounted(() => {
        showSlides();
    })
</script>
<template>
    <div>
        <div class="row">
                <div class="col-2">
                    <h1>Peter's Soft Digital Store </h1>
                    <p>Shop <i class='fa fa-shopping-cart'></i> swiftly <i class="fa fa-star"></i> with Peter's digital Store and Logistics <i class="fa fa-bus"></i></p>
                    <button class="btn">
                        <router-link to="/products">Shop Now</router-link>
                    </button>
                </div>
                <div class="col-2">
                    <div class="slideshow-container">
                        <div class="mySlides fade">
                        <img src="../images/log1.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/log6.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/log7.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/cust4.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/comm1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/comm2.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/cargo1.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/bus1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/comm3.jpg" style="width:100%">
                        </div>
                    </div>
                </div>
        </div>

        <!--featured categories-->
        <div class="categories">
            <div class="small-container">
                <h2 class="title">Categories</h2>
                <div class="row">
                    <div class="col-3">
                        <img src="../images/category-1.jpg" alt="category-1">
                    </div>
                    <div class="col-3">
                        <img src="../images/category-2.jpg" alt="category-2">
                    </div>
                    <div class="col-3">
                        <img src="../images/category-3.jpg" alt="category-3">
                    </div>
                </div>
            </div>
        </div>

        <div>
            <offer/>
        </div>
    </div>
</template>