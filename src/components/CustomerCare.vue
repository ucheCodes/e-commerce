<script setup lang="ts">
    import { onMounted,ref } from "vue";
    import  showSlides  from "../assets/slideshow.js";
    import Offer from "./Offer.vue";

    onMounted(() => {
        showSlides();
    });
    const isAdmin = ref<boolean>(false);
    const toggleAdmin = () => {
        isAdmin.value =! isAdmin.value;
        console.log(isAdmin.value);
    }
</script>
<template>
    <div>
        
            <!--Chats Panel-->
    <div class="chats">
        <div class="container">
            <div class="row">
                <div v-if="isAdmin" class="col-2">
                    <h2 class="title">New and Pending Messages</h2>
                    <div class="form-container">
                        <div class="list" v-for="i in 20" :key="i">
                            <div>
                                <small>customer Id</small>
                                <small>5</small>    
                            </div>
                            <div>
                                <small>sept 21, 2022</small>
                                <small>10:31 am</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2" v-else>
                    <div class="slideshow-container">
                        <div class="mySlides fade">
                        <img src="../images/cust1.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/cust2.jpg" style="width:100%">
                        </div>
                    
                        <div class="mySlides fade">
                        <img src="../images/cust3.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/cust4.jpg" style="width:100%">
                        </div>
                        <div class="mySlides fade">
                        <img src="../images/cust5.jpg" style="width:100%">
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <h2 class="title">Customer Care Services</h2>
                    <div class="form-container">
                        <div class="messages">
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                 Nulla perspiciatis ipsam ullam quis odit veritatis error voluptatibus sit
                                  voluptatum repellendus!</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                 Necessitatibus repellendus recusandae architecto aperiam optio eveniet saepe 
                                 dicta enim iure repellat.</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                            <div class="sender">Hello</div>
                            <div class="receiver">Good morning, How are you doing today?</div>
                        </div>
                    </div>
                    <div class="control">
                        <input type="text" placeholder="Send us a message. We'll reply asap">
                        <button @click="toggleAdmin" class="btn">Send</button>
                    </div>
            </div>
            </div>
        </div>
    </div>
    <div>
        <Offer/>
    </div>
    </div>
</template>