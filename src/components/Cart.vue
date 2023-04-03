<script setup lang="ts">
    import router from '@/router';
    import offer from './Offer.vue';
    import { ref, onMounted } from 'vue';

    import {storeToRefs} from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import {v4 as uuid} from "uuid";
import { parenthesizedExpression } from '@babel/types';

    const softStore = useSoftStore();
    const {setTableName,getUserId,parseCurrency, nairaToKobo, makePayment, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, _offer, cart, vat, user, paystack_url,paystack_secret_key, paystack_public_key} = storeToRefs(softStore);
    
    const total = ref(0);
    const tax = ref(0);
    const subtotal = ref(0);
    const email = ref("");
    const customerMobile = ref("");
    const customerAddress = ref("");
    const psnId = ref("");

    const quantityChanged = (e) => {
        var id = e.target.id;
        var qty = e.target.value;
        var product = cart.value.find(p => p.id == id);
        product.quantity = qty;
        subTotal();
    }
    const remove = (id) => {
        cart.value = cart.value.filter(val => val.id != id);
        subTotal();
    }
    const subTotal = () => {
        total.value = 0; subtotal.value = 0; tax.value = 0;
        cart.value.forEach(item => {
            total.value += (item.price * item.quantity);
        });
        tax.value = total.value * vat.value;
        subtotal.value = total.value + tax.value;
    }
    const pay = () => {
        const totalToKobo = subtotal.value * 100;
        const apiStatus = "200";
        var id = uuid();
        if (isEmailValid() && isMobileValid(customerMobile.value) && customerAddress.value) {
            if (confirm(`${parseCurrency(subtotal.value)} will be debited from your bank`)) {
                const payStackObj = {
                    email : email.value,
                    amount : nairaToKobo(subtotal.value),
                    ref : id,
                    key : paystack_public_key.value
                };
                const orderInfo = {
                    customerId : user.value,
                    customerAddress : customerAddress.value,
                    psnId : psnId.value,
                    transactionId : id,
                    email : email.value,
                    mobile : customerMobile.value,
                    date : new Date(),
                    products : cart.value
                };
                //call paystack api and push the obj if the return status is 200 then add data to orders db
                makePayment(payStackObj,orderInfo);
            }
        }
        else{
            alert("kindly fill in your valid email, address and mobile to proceed");
        }
    }
     const isEmailValid = () => {
      const regex = /\S+@\S+\.\S+/ // this is just a simple check

      return email.value && email.value.length > 0 && regex.test(email.value)
    }
    const isMobileValid = (mobile : string) => {
        if ((mobile.length == 14 && mobile.includes('+')) || mobile.length == 11) {
           return true
        }
        return false;
    }
    
    function scrollIntoDiv() {
        var elem = document.getElementById('cart-page') as HTMLDivElement;
        if (elem) {
            elem.scrollIntoView();
        }
    }

    onMounted(() => {
        if (cart.value.length) {
            subTotal();
        }
        setTimeout(() => {
                scrollIntoDiv();
        }, 3000);
    });
</script>
<template>
    <div id="cart-page">

            <!--Cart Page-->
    <div class="small-container cart-page" v-if="cart.length">
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Sub-total</th>
            </tr>
            <tr v-for="item in cart" :key="item.id">
                <td>
                    <div class="cart-info">
                        <img :src="item.imageUrl" alt="image">
                        <div>
                            <p>{{item.name}}</p>
                            <small>{{parseCurrency(item.price)}}</small><br>
                            <small class="remove" @click=remove(item.id)>Remove</small>
                        </div>
                    </div>
                </td>
                <td><input @change="quantityChanged" :id="item.id" min="1" type="number" :value="item.quantity"></td>
                <td>{{parseCurrency(item.price  * item.quantity)}}</td>
            </tr>
        </table>

        <div class="total-price">
            <table>
                <tr>
                    <td>Sub - total</td>
                    <td>{{parseCurrency(total)}}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td>{{parseCurrency(tax)}}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{{parseCurrency(subtotal)}}</td>
                </tr>
            </table>
        </div>
        <div class="btns">
            <input v-model="email" type="email" placeholder="kindly supply your email address"/>
            <input v-model="customerMobile" type="text" placeholder="kindly supply your mobile contact"/>
            <input v-model="customerAddress" type="text" placeholder="kindly supply your current Address"/>
            <input v-model="psnId" type="text" placeholder="Paste your unique PSN Id, not compulsory*"/>
            <button  @click="pay" class="btn">Pay Now</button>
            <div v-if="paystack_url">
                <a :href="paystack_url"><button class="btn">Check out</button></a>
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        <p>No item in cart</p>
        <div>
            <router-link to="/products">
                <button class="btn">Shop Now</button>
            </router-link>
        </div>
    </div>
    <div v-if="_offer">
        <offer :offer="_offer"/>
    </div>
    </div>
</template>