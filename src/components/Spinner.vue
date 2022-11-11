<script setup lang="ts">
import { onMounted, ref } from 'vue';

    const timer = ref<number>(0);
    const message = ref<string>("Pls, ensure you have a steady connection")
    onMounted(() => {
        timer.value = 0;
        setInterval(() => {
            timer.value++;
            if (timer.value >= 180) {
                message.value = "Poor connection, kindly, refresh your browser"
            }
        }, 1000);
    })
</script>

<template>

    <div>
        <small class="spinner-text">{{message}} ... {{timer}} s</small>
        <div class="spin"></div>
    </div>
</template>