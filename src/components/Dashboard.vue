<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { useSoftStore } from "../stores/soft-store";

    const softStore = useSoftStore();
    const {} = useSoftStore();
    const {apiUrl,isAdmin, hasUserLoggedIn} = storeToRefs(softStore);
</script>

<template>
    <div>
        This component will hold users wallet balance, PSN credits and debit notifications and also transactions of goods bought and refeered
        <div v-if="hasUserLoggedIn">
            every thing else will fit in here
        </div>
        <div v-else class="text-center">
            <p>kindly Create an account to get free funds, manage your funds and enjoy flexible shopping experience</p>
            <div>
                <router-link to="/data">
                    <button class="btn">Create Account</button>
                </router-link>
            </div>
        </div>
    </div>
</template>