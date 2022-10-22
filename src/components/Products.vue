<script setup lang="ts">
    import offer from './Offer.vue';
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import  moment from "moment";

    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer} = storeToRefs(softStore);
    
    const selectedVal = ref("All");
    const products = ref([]);

    const categoryChanged = (e) => {
        selectedVal.value = e.target.value;
        if (e.target.value == "All") {
            products.value = allProducts.value;
        } 
        else if (e.target.value == "Recent") {
            products.value = allProducts.value.filter((product) => ((moment(new Date()).diff(moment(product.date),'days')) <= 3));
        }
        else {
            products.value = allProducts.value.filter((result) => result.category == e.target.value);
        }
    }
    const search = (e) => {
        var key = e.target.value.toLowerCase();
        products.value = allProducts.value.filter(p => (p.name.toLowerCase().includes(key)) || (p.searchKey.toLowerCase().includes(key)));
    }
    onMounted(() => {
        products.value = allProducts.value;
    })
</script>
<template>
    <div>
        
                <!--featured products-->
    <div class="small-container">
        <div class="title">{{selectedVal}} Products</div>
        <div class="row-3">
            <p>Select by Category</p>
            <select @change="categoryChanged($event)" v-if="categoryArr.length">
                <option value="All">All</option>
                <option value="Recent">Most Recent</option>
                <option v-for="c in categoryArr" :key="c" :value="c">{{c}}</option>
            </select>
            <div class="search">
                <input v-on:keyup="search" type="text" placeholder="search for products">
                <i class="fa fa-search" ></i>
            </div>
        </div>

        <div class="row productImg">
            <div v-for="product in products" :key="product.id" class="col-4">
                <router-link  :to="{name : 'productDetails', params:{id: product.id}}" >
                    <img :src="product.imageUrl" alt="product-1">
                    <h4>{{product.name}}</h4>
                    <div v-if="product.isNew" class="rating" v-for="i in 5" :key="i">
                        <i class="fa fa-star"></i>
                    </div>
                    <div v-else class="rating" v-for="j in 3" :key="j">
                        <i class="fa fa-star"></i>
                    </div>
                    <p>{{parseCurrency(product.price)}}</p>
                </router-link>
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

    <div v-if="_offer">
        <offer :offer="_offer"/>
    </div>

    </div>
</template>