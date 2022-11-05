<script setup lang="ts"> 
    import router from '@/router';
    import { onMounted } from 'vue';

    onMounted(() => {
        router.push('/');
    })
</script>

<template>
    <div>
        <div class="text-center">
            <h1 class="title">Welcome To Peter's Soft Digital Store</h1>
            <p>Let Peter's Store be your plug for non stop online and digital shopping</p>
        </div>
    </div>
</template>  