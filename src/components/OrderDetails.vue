<script setup lang="ts">
    import {onMounted,ref} from "vue";
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";

    const softStore = useSoftStore();
    const { parseCurrency, create, read, readAll, del, delAll, verifyTrans} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer, cart, vat} = storeToRefs(softStore);
    const props = defineProps({
        orders : String
    });
    const _orders = ref([]);
    const subTotal = () => {
        var total = 0;
        _orders.value.forEach(order => {
            total += (order.price * order.quantity);
        });
        return total;
    }
    onMounted(() => {
        if (props.orders) {
           _orders.value =  JSON.parse(props.orders);
           subTotal();
        }
    });
</script>
<template>
    <div>

            <!--Order Details Page-->
    <div class="small-container cart-page">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            <tr v-for="order in _orders" :key="order.id">
                <td>
                    <div class="cart-info">
                        <img :src="order.imageUrl" :alt="order.id">
                        <div>
                            <p>{{order.name}}</p>
                            <small>Price : {{parseCurrency(order.price)}}</small><br>
                            <small>Seller : {{order.mobile}}</small><br>
                        </div>
                    </div>
                </td>
                <td><span>{{order.quantity}} pcs</span></td>
                <td>{{parseCurrency(order.price * order.quantity)}}</td>
            </tr>
        </table>

        <div class="total-price">
            <table>
                <tr>
                    <td>Sub - total</td>
                    <td>{{parseCurrency(subTotal())}}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>{{parseCurrency(vat * subTotal())}}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{{parseCurrency( (vat * subTotal()) + subTotal() )}}</td>
                </tr>
            </table>
        </div>
        <div class="btns">
            <!-- <router-link class="btn" to="/paymentInfo"><i class="fa fa-arrow-left"></i>Details</router-link> -->
            <router-link class="btn" to="/orders"><i class="fa fa-arrow-left"></i>Orders</router-link>
        </div>
    </div>
    </div>
</template>