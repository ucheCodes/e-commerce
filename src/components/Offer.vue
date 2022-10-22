<script setup lang="ts">
    import router from "../router";

    const props = defineProps<{
        offer : any
    }>();

    const gotoProductDetails = (id : string) => {
     router.push({ path: '/productDetails/'+id });
    }
    
</script>
<template>
    <div>

            <!--offers-->
    <div class="offer">
        <div class="small-container">
            <h2 class="title">Special Offer</h2>
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