<script setup lang="ts">
    import offer from './Offer.vue';
    import { onMounted, ref } from "vue";
    import  showSlides  from "../assets/slideshow.js";

    import {useSoftStore} from "../stores/soft-store";
    import axios from 'axios';
    import {v4 as uuid} from "uuid";
    import {storeToRefs } from "pinia";

    const softStore = useSoftStore();
    const {setTableName, getUserId, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, _offer, logistics} = storeToRefs(softStore);

    const file = ref([] as any);
    const imageUrl = ref<string>("");
    const filepath = ref<string>("");
    const productName = ref<string>("");
    const productDesc = ref<string>("");
    const senderMobile = ref<string>("");
    const receiverMobile = ref<string>("");
    const senderMail = ref<string>("");
    const receiverMail = ref<string>("");
    const pickupAddr = ref<string>("");
    const deliveryAddr = ref<string>("");

    const submit = (e) => {
        e.preventDefault();
        if (productName.value && productDesc.value && senderMobile.value && receiverMobile.value &&
         senderMail.value && receiverMail.value && pickupAddr.value && deliveryAddr.value) {
            const logData = {
            id : uuid(),
            name : productName.value,
            desc : productDesc.value,
            senderMobile : senderMobile.value,
            receiverMobile : receiverMobile.value,
            senderMail : senderMail.value,
            receiverMail : receiverMail.value,
            pickupAddr : pickupAddr.value,
            deliveryAddr : deliveryAddr.value,
            filepath : filepath.value,
            imageUrl : imageUrl.value,
            date : new Date(),
            user : user.value
        };
        create("Logistics",logData.id,logData).then(response => 
        {
            if (response.status == 200) {
                logistics.value.push(logData);
                alert(response.data);
            }
        });
        productName.value = "";productDesc.value = "";receiverMobile.value = "";senderMobile.value = "";
                senderMail.value = "";receiverMail.value = ""; imageUrl.value= "";
                pickupAddr.value = ""; deliveryAddr.value = "", filepath.value = "";
        } 
        else {
            alert("all input fields must be filled accordingly!")
        }
    }
    const onFileChange = (e) => {
        file.value = e.target.files[0];
        // imageUrl.value = URL.createObjectURL(e.target.files[0]);//Uncomment for ftp
            
        var formData = new FormData();
        formData.append("file",file.value);
        axios.post(apiUrl.value+"file",formData, {headers : {"content-type":"multipart/form-data"}})
        .then(
        response => {
            if (response.data.filepath.slice(response.data.filepath.length - 4,response.data.filepath.length) ==".jpg") {
                imageUrl.value = "data:image/jpeg;base64,"+response.data.fileByte;
                filepath.value = response.data.filepath;
            }
            else if (response.data.filepath.slice(response.data.filepath.length - 4,response.data.filepath.length) ==".png") {
                imageUrl.value = "data:image/png;base64,"+response.data.fileByte;
                filepath.value = response.data.filepath;
            }
            else if (response.data.filepath.slice(response.data.filepath.length - 5,response.data.filepath.length) ==".jfif") {
                imageUrl.value = "data:image/jpeg;base64,"+response.data.fileByte;
                filepath.value = response.data.filepath;
            }
        }
        ).catch(error => console.error(error));
        }

    onMounted(() => {
        showSlides();
    });
</script>
<template>
    <div>
        
            <!--Logistics Panel-->
    <div class="logistics">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div class="slideshow-container">
                        <div class="mySlides fade">
                        <img src="../images/log1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/log2.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/log3.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home4.jpeg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home5.jpeg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/home6.jpeg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/home7.jpeg" style="width:100%">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <h2 class="title">Book Logistics</h2>
                    <div class="form-container container1">
                        <form>
                            <input v-model="productName" type="text" placeholder="Enter Product name here">
                            <input v-model="senderMobile" type="text" placeholder="Sender's Mobile number">
                            <input v-model="receiverMobile" type="text" placeholder="Receiver's Mobile number">
                            <input v-model="senderMail" type="email" placeholder="sender's email">
                            <input v-model="receiverMail" type="email" placeholder="receiver's email">
                            <input v-model="productDesc" type="text" placeholder="product description">
                            <input v-model="pickupAddr" type="text" placeholder="pick up address">
                            <input v-model="deliveryAddr" type="text" placeholder="delivery address">
                            <input type="file" id="imageFile" accept=".jpg, .jpeg, .png, .jfif" @change="onFileChange" placeholder="upload product image">
                            <div class="img" v-if="imageUrl">
                                    <img :src="imageUrl" alt="product image"/>
                            </div>
                            <button @click="submit" class="btn" type="submit">Submit</button>
                        </form>
                    </div>
            </div>
            </div>
        </div>
    </div>

    <div v-if="_offer">
        <offer :offer="_offer"/>
    </div>
    </div>
</template>