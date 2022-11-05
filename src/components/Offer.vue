<script setup lang="ts">
    import router from "../router";
    import SpinnerVue from "./Spinner.vue";

    const props = defineProps<{
        offer : any
    }>();
    const gotoProductDetails = (id : string) => {
     router.push({ path: '/productDetails/'+id });
    }
    
</script>
<template>
    <div>

            <!--offers props.offer.id-->
    <div class="offer">
        <div class="small-container" v-if="props.offer.id">
            <h2 class="title">Exclusive Offer</h2>
            <div class="row" @click="gotoProductDetails(props.offer.id)">
                <div class="col-2">
                    <img :src="props.offer.imageUrl" :alt="props.offer.id" class="offer-img">
                </div>
                <div class="col-2">
                    <p>Exclusively available on Peter's digital store ...</p>
                    <h1>{{props.offer.name}}</h1>
                    <small>{{props.offer.desc}}</small><br>
                    <button class="btn">Get Now</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>