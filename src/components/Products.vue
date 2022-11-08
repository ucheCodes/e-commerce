<script setup lang="ts">
    import offer from './Offer.vue';
    import SpinnerVue from './Spinner.vue';
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import  moment from "moment";

    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, _offer, cart, allProducts} = storeToRefs(softStore);
    
    const isProductLoaded = ref<boolean>(false);
    const _allProducts = ref([]);
    const selectedVal = ref("All");
    const products = ref([]);
    const _products = ref([]);
    const luxury = ref([]);
    const _luxury = ref([]);
    const luxuryStart = ref<number>(0);
    const luxuryEnd = ref<number>(4);
    const luxuryIncrement = 4;
    const luxuryCount = ref<number>(0);
    const luxurySubDiv = ref<number>();

    const productStart = ref<number>(0);
    const productEnd = ref<number>(8);
    const productIncrement = 8;
    const productCount = ref<number>(0);
    const productSubDiv = ref<number>();

    const categoryChanged = (e) => {
        selectedVal.value = e.target.value;
        if (e.target.value == "All") {
            products.value = _allProducts.value;
        } 
        else if (e.target.value == "Recent") {
            products.value = _allProducts.value.filter((product) => ((moment(new Date()).diff(moment(product.date),'days')) <= 3));
        }
        else {
            products.value = _allProducts.value.filter((result) => result.category == e.target.value);
        }
    }
    const search = (e) => {
        var key = e.target.value.toLowerCase();
        products.value = _allProducts.value.filter(p => (p.name.toLowerCase().includes(key)) || (p.searchKey.toLowerCase().includes(key)));
    }
    const getProducts = () => {
        if (_allProducts.value) {
             _products.value = _allProducts.value.filter(p => p.category != 'luxury');
            _luxury.value = _allProducts.value.filter(p => p.category == 'luxury'); 
            trimProducts(_products.value, productStart.value, productEnd.value,'forward');        
            trimLuxury(_luxury.value, luxuryStart.value, luxuryEnd.value,'forward');        
        }
    }
    const trimProducts = (product : any, start : number, end : number, direction : string) => {
        products.value = [];
        if (product.length > productIncrement) {
            productSubDiv.value = Math.floor(product.length/productIncrement);
            const modulo = product.length % productIncrement;
            if(modulo > 0) {
                productSubDiv.value += 1
            } 

            if (start < 0) {
                start = product.length - productIncrement;
                end = product.length;
                productStart.value = product.length - productIncrement;
                productEnd.value = product.length; 
            }
            else if (end > product.length){
                start = 0;
                end = productIncrement;
                productStart.value = 0;
                productEnd.value = productIncrement; 
            }
            if (direction == 'forward') {
                productStart.value += productIncrement;
                productEnd.value += productIncrement; 
                if (productCount.value < productSubDiv.value) {
                    productCount.value++;
                }
                else{productCount.value = 1;}
            }
            else{
                productStart.value -= productIncrement;
                productEnd.value -= productIncrement;
                if (productCount.value > 1) {
                    productCount.value--;
                }
                else{productCount.value = productSubDiv.value;}
            }
            for (let i = start; i < end; i++) {
                products.value.push(product[i]);           
            }

        }
        else{
            products.value = product;
        }
    }
    const trimLuxury = (product : any, start : number, end : number, direction : string) => {
        luxury.value = [];
        if (product.length > luxuryIncrement) {
            luxurySubDiv.value = Math.floor(product.length/luxuryIncrement);
            const modulo = product.length % luxuryIncrement;
            if(modulo > 0) {
                luxurySubDiv.value += 1
            } 

            if (start < 0) {
                start = product.length - luxuryIncrement;
                end = product.length;
                luxuryStart.value = product.length - luxuryIncrement;
                luxuryEnd.value = product.length; 
            }
            else if (end > product.length){
                start = 0;
                end = luxuryIncrement;
                luxuryStart.value = 0;
                luxuryEnd.value = luxuryIncrement; 
            }
            if (direction == 'forward') {
                luxuryStart.value += luxuryIncrement;
                luxuryEnd.value += luxuryIncrement; 
                if (luxuryCount.value < luxurySubDiv.value) {
                    luxuryCount.value++;
                }
                else{luxuryCount.value = 1;}
            }
            else{
                luxuryStart.value -= luxuryIncrement;
                luxuryEnd.value -= luxuryIncrement;
                if (luxuryCount.value > 1) {
                    luxuryCount.value--;
                }
                else{luxuryCount.value = luxurySubDiv.value;}
            }
            for (let i = start; i < end; i++) {
                luxury.value.push(product[i]);           
            }

        }
        else{
           luxury.value = product;
           luxurySubDiv.value = 0;
        }
    }

    const addToCart = (product : any) => {
        var filtered = cart.value.filter(p => p.id == product.id);
        if (filtered.length) {
            alert("This product is already in your cart");
        }
        else{
            product = {...product, quantity : 1};
            cart.value = [...cart.value,product];
            alert(product.name+" added to cart.")
        }
    }

    const getAllProducts = () => {
        readAll("Products").then(
            response => {
            if (Array.isArray(response.data) && response.data.length) {
                response.data.forEach(element => {
                _allProducts.value.push(JSON.parse(element.value));
                });
            };
            if (_allProducts.value.length) {
                _allProducts.value.sort(function (x ,y) {
                    const a : any = new Date(x.date);
                    const b : any = new Date(y.date);
                    return b - a;
                });
                clearInterval(refresh);
                isProductLoaded.value = true;
             }
            getProducts();
            }
        );
    }
    const refresh = setInterval(() => {
        if(!isProductLoaded.value) {
            window.location.reload();
        }
    },40000);
    onMounted(() => {
        //This repetitive codes is really unnecessary but just in an attempt to have a better user experience
        //I choose to code this way.
       if (allProducts.value.length) {
            _allProducts.value = allProducts.value;
            if (_allProducts.value.length) {
                _allProducts.value.sort(function (x ,y) {
                    const a : any = new Date(x.date);
                    const b : any = new Date(y.date);
                    return b - a;
                });
                clearInterval(refresh);
                isProductLoaded.value = true;
             }
            getProducts();
        }
        else{
            getAllProducts();
            refresh;
        }
    });
</script>
<template>
<div id="top">
  
    <div v-if="luxury.length || products.length">
    <div class="small-container">
        <div class="title">Luxury Goods</div>
        <div class="row"  v-if="luxury.length">
            <div v-for="product in luxury" :key="product.id" class="col-4">
                <router-link  :to="{name : 'productDetails', params:{id: product.id}}" >
                    <img :src="product.imageUrl" alt="product-1">
                    <div class="flex">
                        <small>{{moment(product.date).format('ll')}}</small>
                        <small>{{moment(product.date).format('LT')}}</small>
                    </div>
                    <h4>{{product.name}}</h4>
                    <div v-if="product.isNew" class="rating" v-for="i in 5" :key="i">
                        <i class="fa fa-star"></i>
                    </div>
                    <div v-else class="rating" v-for="j in 3" :key="j">
                        <i class="fa fa-star"></i>
                    </div>
                    <p v-if="product.name.toLowerCase().includes('gold') || product.name.toLowerCase().includes('cuban') || product.name.toLowerCase().includes('karat')">{{parseCurrency(product.price)}} per gram</p>
                    <p v-else>{{parseCurrency(product.price)}}</p>
                </router-link>
            </div>
        </div>
        <div class="page-btn" v-if="luxurySubDiv">
                <span @click="trimLuxury(_luxury, luxuryStart,luxuryEnd,'backward')">&#8592;</span>
                <label for="x">{{luxuryCount}}/{{luxurySubDiv}}</label>
                <span @click="trimLuxury(_luxury, luxuryStart,luxuryEnd,'forward')">&#8594;</span>
        </div>
    </div>            
    <div class="small-container">
        <div class="title">{{selectedVal}} products</div>
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

        <div class="row productImg" v-if="products.length">
            <div v-for="product in products" :key="product.id" class="col-4">
                <router-link  :to="{name : 'productDetails', params:{id: product.id}}" >
                    <img :src="product.imageUrl" alt="product-1">
                    <div class="flex">
                        <small>{{moment(product.date).format('ll')}}</small>
                        <small>{{moment(product.date).format('LT')}}</small>
                    </div>
                    <h4>{{product.name}}</h4>
                    <div v-if="product.isNew" class="rating" v-for="i in 5" :key="i">
                        <i class="fa fa-star"></i>
                    </div>
                    <div v-else class="rating" v-for="j in 3" :key="j">
                        <i class="fa fa-star"></i>
                    </div>
                    <p>{{parseCurrency(product.price)}}</p>
                </router-link>
                <div>
                    <button @click="addToCart(product)" class="btn">Add to cart</button>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <p> No Product found in this category, kindly change selection.</p>
        </div>
        <div v-if="productSubDiv" class="page-btn">
                <span @click="trimProducts(_products, productStart,productEnd,'backward')">&#8592;</span>
                <label for="x">{{productCount}}/{{productSubDiv}}</label>
                <span @click="trimProducts(_products, productStart,productEnd,'forward')">&#8594;</span>
        </div>
    </div>

    </div>

    <div v-else>
        <SpinnerVue/>
    </div>

    <div v-if="_offer">
        <offer :offer="_offer"/>
    </div>

</div>
</template>