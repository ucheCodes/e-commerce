<script setup lang="ts">
  import offer from './Offer.vue';
  import router from '@/router';
  import { ref, onMounted } from 'vue';
  import {storeToRefs } from "pinia";
  import {useSoftStore} from "../stores/soft-store";
  import  moment from "moment";
  import SpinnerVue from './Spinner.vue';

  const softStore = useSoftStore();
  const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
  const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts, _offer, orders, paystack_public_key, paystack_secret_key} = storeToRefs(softStore);
   
  const param = ref("");
  const _orders = ref([] as any)
  const filter = () => {
    var select_query = document.getElementById("select-query") as HTMLSelectElement;
    if(param.value){
        if (select_query.options[select_query.selectedIndex].value == "all"){
            _orders.value = orders.value;
        }
        else if (select_query.options[select_query.selectedIndex].value == "recent"){
            _orders.value = orders.value.filter(log => ((moment(new Date()).diff(moment(log.date),'days')) <= 1));
        }
        else if (select_query.options[select_query.selectedIndex].value == "mobile"){
            _orders.value = orders.value.filter(log =>  log.mobile == param.value);//log.mobile == param.value ||
        }
        else if (select_query.options[select_query.selectedIndex].value == "email"){
            _orders.value = orders.value.filter(log => log.email == param.value);
        }
        else if(select_query.options[select_query.selectedIndex].value == "executed?"){
            _orders.value = orders.value.filter(log => log.isExecuted == true);
        }
        else if(select_query.options[select_query.selectedIndex].value == "not executed?"){
            _orders.value = orders.value.filter(log => log.isExecuted != true);
        }
        else if(select_query.options[select_query.selectedIndex].value == "reference"){
             _orders.value = orders.value.filter(log => log.transactionId.includes(param.value));
        }
        else if(select_query.options[select_query.selectedIndex].value == "product name"){
          _orders.value = [];
          orders.value.forEach(order => {
            order.products.forEach(product => {
              if (product.name.toLowerCase().includes(param.value.toLowerCase())) {
                _orders.value.push(order);
              }
            });
          });
        }
        else if(select_query.options[select_query.selectedIndex].value == "seller"){
          _orders.value = [];
          orders.value.forEach(order => {
            order.products.forEach(product => {
              if (product.mobile == param.value) {
                _orders.value.push(order);
              }
            });
          });
        }
    }
    else{
        alert("a value is required compulsorily to run this query");
    }
    }
  const setIsExecuted = (order : any) => {
    order = {...order, isExecuted : true};
    if (confirm("Has this order been confirmed successful?")) {
      create("Orders",order.transactionId,order).then(response => alert(response.data));
    }
  }
  onMounted(() => {
    _orders.value = orders.value;
    if (_orders.value) {
      _orders.value.sort(function (x ,y) {
                    const a : any = new Date(x.date);
                    const b : any = new Date(y.date);
                    return b - a;
        });
    }
  });
</script>

<template>
    <div>
       
            <!--Orders-->
    <div class="container" v-if="orders.length">
        <div class="row">
            <h2 class="title">Product Orders</h2>
            <div class="col-1">
                <div class="row-3">
                    <p>Filter orders by ...</p>
                    <select @change="filter" id="select-query">
                      <option value="all">All</option>
                        <option value="recent">Recent</option>
                        <option value="mobile">Customers Mobile</option>
                        <option value="email">Customers Email</option>
                        <option value="executed?">Executed?</option>
                        <option value="not executed?">Not executed?</option>
                        <option value="product name">Product Name</option>
                        <option value="seller">Seller's Mobile</option>
                        <option value="reference">Reference Id</option>
                    </select>
                    <input v-model="param" type="text" placeholder="filter parameter">
                </div>
                <div>
                    <table class="table">
                        <thead>
                          <th>S / N</th>
                          <th>Customer's Id</th>
                          <th>Customer's Email</th>
                          <th>Transaction Id</th>
                          <th>Customer's Mobile</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Product Info</th>
                          <th>Executed?</th>
                        </thead>
                        <tbody>
                          <tr v-for="(order, index) in _orders" :key="order.transactionId">
                            <td data-label="S / N">{{index + 1}}</td>
                            <td data-label="Customer's Id">{{order.customerId.substring(0,5)}} ... {{order.customerId.substring(order.customerId.length-5, order.customerId.length)}}</td>
                            <td data-label="Customer's Email">{{order.email}}</td>
                            <td data-label="Transaction Id">{{order.transactionId.substring(0,5)}} ... {{order.transactionId.substring(order.transactionId.length-5, order.transactionId.length)}}</td>
                            <td data-label="Buyer's Contact">{{order.mobile}}</td>
                            <td data-label="Date Ordered">{{moment(order.date).format("ll")}}</td>
                            <td data-label="Time Ordered">{{moment(order.date).format("LT")}}</td>
                            <td data-label="Product Info"><router-link :to="{name : 'orderDetails', params:{orders : JSON.stringify(order.products)}}" class="btn">View</router-link></td>
                            <td data-label="Payment Info"><router-link class="btn"  :to="{name : 'paymentInfo', params:{id: order.transactionId}}" >Verify</router-link></td>
                            <td v-if="order.isExecuted" data-label="Executed?"><input type="checkbox" checked></td>
                            <td v-else data-label="Executed?"><input @change="setIsExecuted(order)" type="checkbox"></td>
                          </tr>
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
    </div>

    <div v-else>
        <SpinnerVue/>
    </div>

    </div>
</template>