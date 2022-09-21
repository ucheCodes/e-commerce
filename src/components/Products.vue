<script setup lang="ts">
    import offer from './Offer.vue';
    import router from '@/router';
    const gotoProductDetails = () => {
        router.push({ path: '/productDetails' });
    }
</script>
<template>
    <div>
        
                <!--featured products-->
    <div class="small-container">
        <div class="title">Recent Products</div>
        <div class="row-3">
            <p>Select by Category</p>
            <select>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
                <option value="Computers">Computers</option>
                <option value="Phones">Phones</option>
            </select>
            <div class="search">
                <input type="text" placeholder="search">
                <i class="fa fa-search" ></i>
            </div>
        </div>

        <div class="row">
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-1.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-2.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-3.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-4.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
        </div>

        <h2 class="title">All Products</h2>
        <div class="row">
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-5.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-6.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-7.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-8.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-9.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-10.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-11.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
            <div @click="gotoProductDetails" class="col-4">
                <img src="../images/product-12.jpg" alt="product-1">
                <h4>Red Printed T-shirt</h4>
                <div class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <p>N 2,500</p>
            </div>
        </div>

        <div class="page-btn">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>&#8594;</span>
        </div>
    </div>

    <div>
        <offer/>
    </div>

    </div>
</template>