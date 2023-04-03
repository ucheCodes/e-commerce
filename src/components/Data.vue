<script setup lang="ts">
    import {useSoftStore} from "../stores/soft-store";
    import axios from 'axios';
    import {v4 as uuid} from "uuid";
    import { ref, onMounted } from 'vue';
    import {storeToRefs } from "pinia";


    const softStore = useSoftStore();
    const {setTableName, getUserId, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl,isAdmin, clientPath,projectName, user, categoryArr, allProducts,offers, commision, _edit} = storeToRefs(softStore);

    const file = ref([] as any);
    const imageUrl = ref<string>("");
    const userImageUrl = ref<string>("");
    const filepath = ref<string>("");
    const username = ref<string>("");
    const userEmail = ref<string>("");
    const userMobile = ref<string>("");
    const password1 = ref<string>("");
    const password2 = ref<string>("");
    const category = ref<string>("");

    const productName = ref<string>("");
    const productPrice = ref<number>(0);
    const productDesc = ref<string>("");
    const mobile = ref<string>("");
    const searchKey = ref<string>("");

        const addCategory = (e) =>{
            e.preventDefault();
            if (category.value) {
                create("Category",category.value.toLowerCase(),category.value.toLowerCase());
                categoryArr.value.push(category.value.toLowerCase());
                alert("New category field added")
            } else {
                alert("category field can not be empty.")
            }
        }
        const setAdminUser = (e) => {
            e.preventDefault();
            if ((password1.value == password2.value) && user.value && username.value != "") {
                if ((password1.value && password2.value) == "$admin") {
                    var admin = {
                        username : username.value,
                        id : user.value
                    };
                    create("Admin",user.value,admin).then(res => alert(res.data));
                }
                else{
                    alert("passwords do not match !!!")
                }
            }
            else if ((password1.value == password2.value) && user.value && username.value != "" && isEmailValid(userEmail.value) && isMobileValid(userMobile.value)) {
                //generate psn id; create and add user to database
                //send email to the user with their psn id
                //enable their dashboard which will contain their wallet info, order and cash out transactions as it is with admin
                //wallet balance and cashout menu that will contain their withdrawal account
                //send out an OTP to their registered email and have then confirm in 3 minutes or less
                //if the confirmed OTP from their email is in alliance with the one saved in database in no more than 3 minutes
                //Then approve the transaction automatically and log it to an admin panel which I will set up
                //All I have to do is wire the user, deduct the amount from their wallet balance and give them a trancaction notification

                //Let the users id be their email so they can not register more than one email at the same time
                //Whwnever they come online and register and register their email then their dashboard will be made visible

                //in the cart component where the users make payment, add #100 to the VAT then add a text box
                //where users can users can supply their psn id
                //Once the psn id is valid and in my database then add #100 to the fund there in and save
                //Users can make payment with their wallet balance
                //The dashboard component should have a button leading to the login component
            }
            else{
               alert("password fields must match and input fields valid as necessary");
            }
        }

        function register(){
            var regForm = document.getElementById("regForm");
            var loginForm = document.getElementById("loginForm");
            var indicator = document.getElementById("indicator");
            if(regForm && loginForm && indicator){
                regForm.style.transform = "translateX(0px)";
                loginForm.style.transform = "translateX(0px)";
                indicator.style.transform = "translateX(100px)";
            }
        }

        function login(){
            var regForm = document.getElementById("regForm");
            var loginForm = document.getElementById("loginForm");
            var indicator = document.getElementById("indicator");
            if(regForm && loginForm && indicator){
                regForm.style.transform = "translateX(300px)";
                loginForm.style.transform = "translateX(300px)";
                indicator.style.transform = "translateX(0px)";
            }
        }

        const uploadUserImage = (e) => {
            alert("copy the on file change code below when ready");
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
        const editPrice = (e) => {
            _edit.value.price = (e.target.value * 1) + (e.target.value * commision.value);
        }
        const editProducts = (e) => {
           e.preventDefault();
            _edit.value.date = new Date();
            if (imageUrl.value && filepath.value) {
                _edit.value.imageUrl = imageUrl.value;
                _edit.value.filepath = filepath.value;
            }
            //add to database
            var select_upload = document.getElementById("select-upload") as HTMLSelectElement;
            var select_state = document.getElementById("select-state") as HTMLSelectElement;
            if (select_state.options[select_state.selectedIndex].value == "new"){
                _edit.value.isNew = true;
            }
            if (select_upload.options[select_upload.selectedIndex].value == "default") {
                    alert("select database upload path : Offer or Products")
            } 
            else if (select_upload.options[select_upload.selectedIndex].value == "products")  {
                create("Products",_edit.value.id,_edit.value).then(response => alert(response.data));
                _edit.value = {};
            }
            else{
                create("Offers",_edit.value.id,_edit.value).then(response => alert(response.data));
                create("Products",_edit.value.id,_edit.value).then(response => alert(response.data));
                _edit.value = {};
            }
        }
        const addNewProducts = (e) => {
            e.preventDefault();
            const isNew =  ref<boolean>(false);
            var select_cat = document.getElementById("select-cat") as HTMLSelectElement;
            var select_upload = document.getElementById("select-upload") as HTMLSelectElement;
            var select_state = document.getElementById("select-state") as HTMLSelectElement;

            if (select_state.options[select_state.selectedIndex].value == "new"){
                isNew.value = true;
            }
            if (productName.value && productPrice.value && productDesc.value && mobile.value && searchKey.value) {
                const product = {
                    id : uuid(),
                    name : productName.value,
                    desc : productDesc.value,
                    category : select_cat.options[select_cat.selectedIndex].value,
                    price : productPrice.value + (productPrice.value * commision.value),
                    mobile : mobile.value,
                    searchKey : searchKey.value,
                    filepath : filepath.value,
                    imageUrl : imageUrl.value,
                    date : new Date(),
                    isNew : isNew.value
                }
                if (select_upload.options[select_upload.selectedIndex].value == "default") {
                    alert("select database upload path : Offer or Products")
                } 
                else if (select_upload.options[select_upload.selectedIndex].value == "products")  {
                    create("Products",product.id,product).then(response => alert(response.data));

                    allProducts.value = [...allProducts.value,product]
                    productName.value = "";productDesc.value = "";productPrice.value = 0;mobile.value = "";
                    searchKey.value = "";filepath.value = ""; imageUrl.value= "";
                }
                else if (select_upload.options[select_upload.selectedIndex].value == "luxury")  {
                    product.category = "luxury";
                    create("Products",product.id,product).then(response => alert(response.data));

                    allProducts.value = [...allProducts.value,product]
                    productName.value = "";productDesc.value = "";productPrice.value = 0;mobile.value = "";
                    searchKey.value = "";filepath.value = ""; imageUrl.value= "";
                }
                else{
                    create("Offers",product.id,product);
                    create("Products",product.id,product).then(response => console.log(response.data));

                    offers.value.push(product);
                    allProducts.value = [...allProducts.value,product]
                    productName.value = "";productDesc.value = "";productPrice.value = 0;mobile.value = "";
                    searchKey.value = "";filepath.value = ""; imageUrl.value= "";
                }
            }
            else{
                alert("all input fields must be filled accordingly");
            }
        }
        const isEmailValid = (email : string) => {
            const regex = /\S+@\S+\.\S+/ // this is just a simple check
            return email && email.length > 0 && regex.test(email)
        }
        const isMobileValid = (mobile : string) => {
            if ((mobile.length == 14 && mobile.includes('+')) || mobile.length == 11) {
            return true
            }
            return false;
         }
        onMounted(() => {
            console.log("make necessary updates and log users to their dashboard when they login")
        });
</script>

<template>
    <div>
        
            <!--Account-->
    <div class="account-page">
        <div class="container">
            <div class="row">
                <div class="col-2" v-if="isAdmin">
                        <h2 class="title">Data Entry page</h2>
                        <div class="form-container container1">
                            <form v-if="_edit.id">
                                <small>Edit product</small>
                                <input v-model="_edit.name" type="text" placeholder="Enter Product name here">
                                <input @change="editPrice" v-model="_edit.price" type="number" placeholder="Product Price">
                                <input v-model="_edit.desc" type="text" placeholder="product description">
                                <input v-model="_edit.mobile" type="text" placeholder="affiliate's Mobile contact">
                                <select v-model="_edit.category" id="select-cat" v-if="categoryArr.length">
                                    <option v-for="c in categoryArr" :key="c" :value="c">{{c}}</option>
                                </select>
                                <input v-model="_edit.searchKey" type="text" placeholder="Add search parameter / sub - category">
                                <input type="file" id="imageFile" accept=".jpg, .jpeg, .png, .jfif" @change="onFileChange" placeholder="upload product image">
                                <div class="img" v-if="imageUrl">
                                    <img :src="imageUrl" alt="product image"/>
                                </div>
                                <select id="select-upload">
                                    <option value="default">Upload data to :</option>
                                    <option value="offers">Offers</option>
                                    <option value="products">Products</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                                <select id="select-state">
                                    <option value="default">Product state :</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                                <button class="btn" type="submit" v-on:click="editProducts">Edit</button>
                            </form>
                            <form v-else>
                                <small>Add a new category</small>
                                <input v-model="category" type="text" placeholder="Enter a new category value">
                                <button @click="addCategory" class="btn" type="submit">Add category</button>
                                <hr>
                                <small>Add a new product</small>
                                <input v-model="productName" type="text" placeholder="Enter Product name here">
                                <input v-model="productPrice" type="number" placeholder="Product Price">
                                <input v-model="productDesc" type="text" placeholder="product description">
                                <input v-model="mobile" type="text" placeholder="affiliate's Mobile contact">
                                <select id="select-cat" v-if="categoryArr.length">
                                    <option value="default">Select Category</option>
                                    <option v-for="c in categoryArr" :key="c" :value="c">{{c}}</option>
                                </select>
                                <input v-model="searchKey" type="text" placeholder="Add search parameter / sub - category">
                                <input type="file" id="imageFile" accept=".jpg, .jpeg, .png, .jfif" @change="onFileChange" placeholder="upload product image">
                                <div class="img" v-if="imageUrl">
                                    <img :src="imageUrl" alt="product image"/>
                                </div>
                                <select id="select-upload">
                                    <option value="default">Upload data to :</option>
                                    <option value="offers">Offers</option>
                                    <option value="products">Products</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                                <select id="select-state">
                                    <option value="default">Product state :</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                                <button class="btn" type="submit" v-on:click="addNewProducts">Upload</button>
                            </form>
                        </div>
                </div>
                <div class="col-2">
                    <h2 class="title">Account Registration</h2>
                    <div class="form-container users-form">
                        <div class="form-btn">
                            <span @click="login">Login</span>
                            <span @click="register">Register</span>
                            <hr id="indicator">
                        </div>
                        <form id="loginForm">
                            <input type="email" placeholder="registered email">
                            <input type="text" placeholder="PSN id">
                            <input type="password" placeholder="password">
                            <button class="btn" type="submit">Login</button>
                            <a href="">Forgot password</a>
                        </form>
                        <form id="regForm">
                            <input v-model="username" type="text" placeholder="username">
                            <input v-model="userEmail" type="email" placeholder="valid email">
                            <input v-model="userMobile" type="text" placeholder="valid mobile contact">
                            <input v-model="password1"  type="password" placeholder="password">
                            <input v-model="password2" type="password" placeholder="confirm password">
                            <input type="file" id="imageFile2" accept=".jpg, .jpeg, .png, .jfif" @change="uploadUserImage" placeholder="upload user image">
                            <div class="imgz" v-if="userImageUrl">
                                <img :src="userImageUrl" alt="user image"/>
                            </div>
                            <div class="imgz" v-else>
                                <img src="../assets/user.jpg" alt="user image"/>
                            </div>
                            <button @click="setAdminUser" class="btn" type="submit">Register</button>
                            <a href="">Forgot password</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>