<script setup lang="ts">
            //Js for account page// ||||

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
</script>

<template>
    <div>
        
            <!--Account-->
    <div class="account-page">
        <div class="container">
            <div class="row">
                <div class="col-2">
                        <h2 class="title">Data Entry page</h2>
                        <div class="form-container">
                            <form>
                                <input type="text" placeholder="Enter Product name here">
                                <input type="number" placeholder="Product Price">
                                <input type="text" placeholder="product description">
                                <input type="file" placeholder="upload product image">
                                <button class="btn" type="submit">Upload</button>
                            </form>
                        </div>
                </div>
                <div class="col-2">
                    <h2 class="title">Account Registration</h2>
                    <div class="form-container">
                        <div class="form-btn">
                            <span @click="login">Login</span>
                            <span @click="register">Register</span>
                            <hr id="indicator">
                        </div>
                        <form id="loginForm">
                            <input type="text" placeholder="username">
                            <input type="password" placeholder="password">
                            <button class="btn" type="submit">Login</button>
                            <a href="">Forgot password</a>
                        </form>
                        <form id="regForm">
                            <input type="text" placeholder="username">
                            <input type="email" placeholder="password">
                            <input type="password" placeholder="password">
                            <button class="btn" type="submit">Register</button>
                            <a href="">Forgot password</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>