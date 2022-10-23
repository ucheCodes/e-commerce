<script setup lang="ts">
    import router from '@/router';
    import offer from './Offer.vue';
    import { ref, onMounted} from 'vue';
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import axios from "axios";

    const quantity = ref<number>(1);
    const product = ref({} as any);
    const related = ref([]);
    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists, find} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer, cart, _edit} = storeToRefs(softStore);

    const props = defineProps({
        id : String
    });
    const getRelated = () => {
        related.value = allProducts.value.filter((result) => result.category == product.value.category);
    }
    const setAsProduct = (_product : {}) => {
        product.value = _product;
    }
    const _delete = (id : string, filepath : any) => {
    if(confirm("This product will be deleted permanently")){
        del("Products",id).then(response =>
        {
          if (response.status == 200) {
            allProducts.value = allProducts.value.filter((p) => p.id != id);
            alert(response.data);
            deleteImage(filepath);
            router.push('/products')
          }
        });
    }
    const deleteImage = (filepath : any) => {
        if (filepath) {
          var newPath = filepath.replaceAll(`\\`,"_")
            axios.delete(apiUrl.value+"file/"+newPath)
            .then(response => {
                console.log(response.data);
            }).catch(error => console.error(error));
          }
      }
    }
    const edit = (product : any) => {
        _edit.value = product;
        router.push("/data");
   }
    const addToCart = (product : any) => {
        var filtered = cart.value.filter(p => p.id == product.id);
        if (filtered.length) {
            alert("This product is already in your cart");
        }
        else{
            product = {...product, quantity : quantity.value};
            cart.value = [...cart.value,product];
            alert(product.name+" added to cart.")
        }
    }
    const buy = (product : any) => {
        var filtered = cart.value.filter(p => p.id == product.id);
        if (filtered.length) {
            router.push('/cart');
        }
        else{
            product = {...product, quantity : quantity.value};
            cart.value = [...cart.value,product];
            router.push('/cart');
        }
    }
    const toCart = () => {
        router.push('/cart')
    }
    const toProducts = () => {
        router.push('/products')
    }
    onMounted(() => {
        if (props.id) {
            product.value = find(allProducts.value,props.id);
            getRelated();
        }
    });
</script>

<template>
    <div>

            <!--Product Details Page-->
    <div class="small-container single-product" v-if="product">
        <div class="row">
            <div class="col-2">
                <img :src="product.imageUrl" alt="product">

                <div class="small-img-row">
                    <div class="small-img-col" v-for="i in 4" :key="i">
                        <img :src="product.imageUrl" alt="product">
                    </div>
                </div>
            </div>
            <div class="col-2">
                <p>Product / {{product.name}} </p>
                <h1>{{product.name}}</h1>
                <h4>{{parseCurrency(product.price)}}</h4>
                <input min="1" v-model="quantity" type="number">
                <button @click="addToCart(product)" class="btn">Add to Cart</button>
                <button @click="buy(product)" class="btn">Buy Now</button>
                <h3>Product Description <i class="fa fa-indent"></i></h3><br>
                <p>{{product.desc}}</p>
                <div class="btns" v-if="isAdmin">
                    <button @click="edit(product)" class="btn">Edit</button>
                    <button @click="_delete(product.id, product.filepath)" class="btn"><i class="fa fa-trash"></i> Delete</button>
                </div>
                <div class="btns" v-else>
                    <button @click="toCart" class="btn">View Cart</button>
                    <button @click="toProducts" class="btn">products</button>
                </div>
            </div>
        </div>

        <div class="row row-2">
            <h2>Related Products</h2>
            <p>View More </p>
        </div>
        <div class="row">
            <div @click="setAsProduct(rel)" class="col-4" v-for="rel in related">
                <img :src="rel.imageUrl" alt="image">
                <h4>{{rel.name}}</h4>
                <div v-if="rel.isNew" class="rating" v-for="i in 5" :key="i">
                    <i class="fa fa-star"></i>
                </div>
                <div v-else class="rating" v-for="j in 3" :key="j">
                    <i class="fa fa-star"></i>
                </div>
                <p>{{parseCurrency(rel.price)}}</p>
            </div>
        </div>
    </div>

    </div>

</template>