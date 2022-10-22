<script setup lang="ts">
    import moment from "moment";
    import { onMounted, ref } from "vue";
    import {storeToRefs} from "pinia";
    import {useSoftStore} from "../stores/soft-store";

    const softStore = useSoftStore();
    const {verifyTrans, parseCurrency, KoboToNaira} = useSoftStore();

    const props = defineProps({
        id : String
    });
    const info = ref({} as any);
    const isLoaded = ref<boolean>(false);
    onMounted(() => {
        if (props.id) {
          verifyTrans(props.id).then(response => {
          if (response.status) {
            info.value = response.data.data;
             isLoaded.value = true
          }
          else{
            isLoaded.value = false;
          }
        }).catch((error) => {
          console.error(error);
          alert("an error occured. \n Verification failed, refresh and try again");
        })
        }
    })
</script>

<template>
<div class="container" v-if="isLoaded">
    <div class="row">
        <h2 class="title">Transaction Details</h2>
        <div class="col-1">
            <div v-if="info">
                <table class="table">
                    <thead>
                      <th>Account Name</th>
                      <th>Customer's Email</th>
                      <th>Payment Id</th>
                      <th>Reference</th>
                      <th>Authorisation Code</th>
                      <th>Bank</th>
                      <th>Bank Brand</th>
                      <th>Bin Id</th>
                      <th>Card Type</th>
                      <th>Expiry Month</th>
                      <th>Expiry Year</th>
                      <th>Last 4 Digits</th>
                      <th>Amount</th>
                      <th>Status?</th>
                      <th>Gateway response</th>
                      <th>IP Address</th>
                      <th>Date</th>
                      <th>Time</th>
                    </thead>
                    <tbody>
                      <tr>
                       <td v-if="info.authorization.account_name" data-label="Account Name">{{info.authorization.account_name}}</td>
                        <td v-else data-label="Account Name">{{info.customer.customer_code }}</td>
                        <td data-label="Customer's Email">{{info.customer.email}}</td>
                        <td data-label="Payment Id">{{info.id}}</td>
                        <td data-label="Reference">{{info.reference}}</td> 
                        <td data-label="Auth_Code">{{info.authorization.authorization_code}}</td>
                        <td data-label="Bank">{{info.authorization.bank}}</td> 
                        <td data-label="Bank Brand">{{info.authorization.brand}}</td> 
                        <td data-label="Bin">{{info.authorization.bin}}</td>
                        <td data-label="Card Type">{{info.authorization.card_type}}</td> 
                        <td data-label="Expiry Month">{{info.authorization.exp_month}}</td>
                        <td data-label="Expiry Year">{{info.authorization.exp_year}}</td> 
                        <td data-label="Last 4 digits">{{info.authorization.last4}}</td> 
                        <td data-label="Amount">{{parseCurrency(Number(KoboToNaira(info.amount)))}}</td> 
                        <td v-if="info.status=='success'" data-label="status"><i class="fa fa-check"></i></td>
                        <td v-else data-label="status"><i class="fa fa-times"></i></td>
                        <td data-label="Gateway response">{{info.gateway_response}}</td>
                        <td data-label="IP Address">{{info.ip_address}}</td>
                        <td data-label="Date">{{moment(info.paidAt).format('ll')}}</td>
                        <td data-label="Time">{{moment(info.paidAt).format('LT')}}</td>
                      </tr> 
                    </tbody>
                  </table>
            </div>
            <div v-else>
              <p>No response generated yet. If this persists refresh and confirm you are still connected to the Inernet.</p>
            </div>
    </div>
</div>

</div>
</template>