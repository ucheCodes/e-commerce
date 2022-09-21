<script setup lang="ts">
    import offer from './Offer.vue';
    import { onMounted } from "vue";
    import  showSlides  from "../assets/slideshow.js";

    onMounted(() => {
        showSlides();
    })
</script>
<template>
    <div>
        
            <!--Logistics Panel-->
    <div class="logistics">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div class="slideshow-container">
                        <div class="mySlides fade">
                        <img src="../images/log1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/log2.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/log3.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/log4.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/log5.jpg" style="width:100%">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <h2 class="title">Make a Logistics Booking</h2>
                    <div class="form-container">
                        <form>
                            <input type="text" placeholder="Enter Product name here">
                            <input type="text" placeholder="Mobile number">
                            <input type="email" placeholder="email">
                            <input type="text" placeholder="product description">
                            <input type="file" placeholder="upload product image">
                            <button class="btn" type="submit">Submit</button>
                        </form>
                    </div>
            </div>
            </div>
        </div>
    </div>
    <div>
        <offer/>
    </div>

    </div>
</template>