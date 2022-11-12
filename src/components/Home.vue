<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import axios from "axios";
    import  showSlides  from "../assets/slideshow.js";
    import Offer from "./Offer.vue";
    import {storeToRefs} from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import {v4 as uuid} from "uuid";
    import moment from "moment";
    import SpinnerVue from "./Spinner.vue";

    const softStore = useSoftStore();
    const {setTableName,getUserId, create, read, readAll, getOffer, del, delAll, exists, parseCurrency, verifyTrans, encrypt} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, _offer, allProducts, paystack_public_key, paystack_secret_key} = storeToRefs(softStore);
    
    const isProductLoaded = ref<boolean>(false);
    const products = ref([] as any);
    const _products = ref([] as any);
    const counter = ref(0);
    const timerCarousel = () => {
        if (((_products.value.length - 1) - counter.value) > 3) {//product counts from 0
            products.value = [];
            for (let i = 0; i <  3; i++) {
                const p = _products.value[counter.value];
                products.value.push(p);
                counter.value++;
            }
        }
        else{
            products.value = [];
            var count = (_products.value.length) - 3;
            for (let i = 0; i <  3; i++) {
                const p = _products.value[count];
                products.value.push(p);
                count++;
            }
            counter.value = 0;
        }
    }
    const timeProducts = () => {
        if (_products.value.length) {
            timerCarousel();
        }
        setInterval(() => {
            if (_products.value.length) {
                timerCarousel();
            }
        }, 10000);
    }
    const getProducts = () => {
        readAll("Products").then(
            response => {
            if (Array.isArray(response.data) && response.data.length) {
                response.data.forEach(element => {
                    var product = JSON.parse(element.value);
                    if ((moment(new Date()).diff(moment(product.date),'days')) <= 30) {
                    _products.value = [..._products.value,product];
                    }
                });
                isProductLoaded.value = true;
            }});
    }
    const filterHomeProducts = () => {
        if (allProducts.value.length) {
            _products.value = allProducts.value.filter(product =>  ((moment(new Date()).diff(moment(product.date),'days')) <= 30))
            isProductLoaded.value = true;
            //use only when I want to automatically update gold from this end
           /* tempGoldModifier(18,41000);
            tempGoldModifier(22,48000);*/
        }
    }
    const tempGoldModifier = (karats : number, price : number) => {
        var gold = allProducts.value.filter(p => p.category == 'luxury' && p.name.toLowerCase().includes(karats+' karats'));
        gold.forEach(element => {
            element.price = price
            create("Products",element.id,element);
        });
    }
    const populateHomeProducts = () => {
        setInterval(() => {
            if (!_products.value.length) {
                filterHomeProducts();
            }
        },3000);
    }
    onMounted(() => {
        showSlides();
        getOffer();
        filterHomeProducts();
        populateHomeProducts();
        timeProducts();
        

        // setInterval(() => {
        //    console.log(counter.value += 3) 
        // }, 1000);
        //console.log(isAdmin.value);
        //getUserId();
       // console.log(uuid());
        // var isDeleted = del("Fruits","apple");//delete passed
        // console.log(isDeleted);

        // var isAllDeleted = delAll("Fruits");//passed
        // isAllDeleted.then(res => console.log(res.data));

        // var isExists = exists("Cars","volvo");//exists passed
        // isExists.then(response => console.log(response.data));

        //  var car = read("Cars","volvo");//read success
          //car.then(response => console.log(response.data));
        //  car.then(response => console.log(`${JSON.parse(response.data.key)} : ${JSON.parse(response.data.value)}`));

         //var data = readAll("Fruits");//read all passed
         //console.log(data);
        //  data.then(
        //     response => response.data.forEach(result => {
        //         console.log(`${JSON.parse(result.key)} \n ${JSON.parse(result.value)}`);
        //     })   
        //     );

        // create("Fruits","apple","Apple");// create passed
        // create("Fruits","strawberry","Strawberry");
        // create("Cars","volvo","Volvo");
        //create("array","books",["mangoes love","apple tree","orange bananas"]);
    });
</script>
<template>
    <div>
        <div class="row">
                <div class="col-2">
                    <h1>Peter's Soft Digital Store </h1>
                    <p>Shop <i class='fa fa-shopping-cart'></i> swiftly <i class="fa fa-star"></i> with Peter's digital Store and Logistics <i class="fa fa-bus"> </i></p>
                        <router-link to="/products">
                            <button class="btn">Shop Now</button>
                        </router-link>
                </div>
                <div class="col-2">
                    <div class="slideshow-container">
                        <div class="mySlides fade">
                        <img src="../images/log1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/cust4.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/comm1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/comm3.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home2.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home3.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home4.jpeg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home5.jpeg" style="width:100%">
                        </div>

                        <div class="mySlides fade">
                        <img src="../images/home6.jpeg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home7.jpeg" style="width:100%">
                        </div>
                    </div>
                </div>
        </div>

        <!--featured categories-->
        <div class="categories">
            <div class="small-container" v-if="products.length">
                <h2 class="title">Latest Products</h2>
                <div class="row productImg" id="products">
                    <div v-for="product in products" :key="product.id" class="col-3">
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
                <div class="text-center">
                    <router-link to="/products">
                            <button class="btn">Explore More</button>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <div class="spin-home"></div>
            </div>
        </div>

        <div v-if="_offer">
            <offer :offer="_offer"/>
        </div>
    </div>
</template>