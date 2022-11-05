<script setup lang="ts">
    import offer from './Offer.vue';
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import  moment from "moment";
    import  SpinnerVue from './Spinner.vue';


    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user,  logistics} = storeToRefs(softStore);
    
    const setIsExecuted = (log : any) => {
        log = {...log, isExecuted : true};
        if (confirm("Has this logistics order been confirmed successful?")) {
        create("Logistics",log.id,log).then(response => alert(response.data));
        }
    }

    const param = ref("");
    const _logistics = ref([] as any);
   const filter = () => {
    var select_query = document.getElementById("select-log") as HTMLSelectElement;
    if(param.value){
        if (select_query.options[select_query.selectedIndex].value == "all"){
            _logistics.value = logistics.value;
        }
        else if (select_query.options[select_query.selectedIndex].value == "recent"){
            _logistics.value = logistics.value.filter(log => ((moment(new Date()).diff(moment(log.date),'days')) <= 1));
        }
        else if (select_query.options[select_query.selectedIndex].value == "mobile"){
            _logistics.value = logistics.value.filter(log => log.senderMobile == param.value || log.receiverMobile == param.value);
        }
        else if (select_query.options[select_query.selectedIndex].value == "email"){
            _logistics.value = logistics.value.filter(log => log.senderMail == param.value || log.receiverMail == param.value);
        }
        else if(select_query.options[select_query.selectedIndex].value == "executed?"){
            _logistics.value = logistics.value.filter(log => log.isExecuted == true);
        }
        else if(select_query.options[select_query.selectedIndex].value == "not executed?"){
            _logistics.value = logistics.value.filter(log => log.isExecuted != true);
        }
        else if(select_query.options[select_query.selectedIndex].value == "address"){
            _logistics.value = logistics.value.filter(log => log.pickupAddr.toLowerCase().includes(param.value.toLowerCase()) || log.deliveryAddr.toLowerCase().includes(param.value.toLowerCase()));
        }
    }
    else{
        alert("a value is required compulsorily to run this query");
    }
    }
    onMounted(() => {
         _logistics.value = logistics.value;
    })
</script>

<template>
    <div>
        
    <div class="container" v-if="logistics.length">
        <div class="row">
            <h2 class="title">Logistics Orders</h2>
            <div class="col-1">
                <div class="row-3">
                    <p>Filter logistics by ...</p>
                    <select @change="filter" id="select-log">
                        <option value="all">All</option>
                        <option value="recent">Recent</option>
                        <option value="mobile">Customers Mobile</option>
                        <option value="email">Customers Email</option>
                        <option value="executed?">Executed?</option>
                        <option value="not executed?">Not executed?</option>
                        <option value="address">Address</option>
                    </select>
                    <input v-model="param" type="text" placeholder="filter parameter compulsory!">
                </div>
                <div class="col-1">
                <div>
                    <table class="table">
                        <thead>
                            <th>S / N</th>
                            <th>Product Id</th>
                            <th>User</th>
                            <th>Senders Email</th>
                            <th>Receivers Email</th>
                            <th>Senders Mobile</th>
                            <th>Receivers Mobile</th>
                            <th>Pick up Address</th>
                            <th>Delivery Address</th>
                            <th>Product</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Executed?</th>
                            <th>Photo</th>
                        </thead>
                        <tbody>
                            <tr v-for="(log,index) in _logistics" :key="log.Id">
                                <td data-label="S / N">{{index + 1}}</td>
                                <td data-label="Product Id">{{log.id.substring(0,5)}} ... {{log.id.substring(log.id.length-5,log.id.length)}}</td>
                                <td data-label="User">{{user.substring(0,5)}} ... {{user.substring(user.length-5,user.length)}}</td>
                                <td data-label="Sender's Email">{{log.senderMail}}</td>
                                <td data-label="Receiver's Email">{{log.receiverMail}}</td>
                                <td data-label="Sender's Mobile">{{log.senderMobile}}</td>
                                <td data-label="Receiver's Mobile">{{log.receiverMobile}}</td>
                                <td data-label="Pick up Address">{{log.pickupAddr}}</td>
                                <td data-label="Delivery Address">{{log.deliveryAddr}}</td>
                                <td data-label="Product Name">{{log.name}}</td>
                                <td data-label="Date">{{moment(log.date).format('ll')}}</td>
                                <td data-label="Time">{{moment(log.date).format('LT')}}</td>
                                <td v-if="log.isExecuted" data-label="Executed?"><input type="checkbox" checked></td>
                                <td v-else data-label="Executed?"><input @change="setIsExecuted(log)" type="checkbox"></td>
                                <td data-label="Product Photo"><img :src="log.imageUrl" :alt="log.id"></td>
                              </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div v-else>
        <SpinnerVue/>
    </div>

    </div>
</template>