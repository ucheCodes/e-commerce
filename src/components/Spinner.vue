<script setup lang="ts">
import { onMounted, ref } from 'vue';

    const timer = ref<number>(0);
    const message = ref<string>("Fetching data, please wait")
    onMounted(() => {
        timer.value = 0;
        setInterval(() => {
            timer.value++;
            if (timer.value >= 20) {
                message.value = "Poor connection, kindly, refresh your browser"
            }
        }, 1000);
    })
</script>

<template>
    <div class="spinner">
        <div class="spin"></div>
        <small>{{message}} ... {{timer}} s</small>
    </div>
</template>