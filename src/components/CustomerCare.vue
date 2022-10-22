<script setup lang="ts">
    import { onMounted,ref } from "vue";
    import  showSlides  from "../assets/slideshow.js";
    import offer from "./Offer.vue";
    import {storeToRefs } from "pinia";
    import {useSoftStore} from "../stores/soft-store";
    import {v4 as uuid} from "uuid";
    import moment from "moment";

    const softStore = useSoftStore();
    const {setTableName, getUserId, parseCurrency, create, read, readAll, del, delAll, exists} = useSoftStore();
    const {apiUrl, clientPath,projectName, user, isAdmin, categoryArr, allProducts, _offer,rawChats} = storeToRefs(softStore);

    const message = ref<string>("");
    const receiver = ref<string>("");
    const chats = ref([]);
    const chatList = ref([]);
    const send = () => {
        if (message.value && user.value) {
            if (isAdmin.value) {
                var msg = {
                    sender : "admin",
                    receiver : receiver.value,
                    message : message.value,
                    date : new Date(),
                    id : uuid()
                };
                create("Chats",msg.id,msg).then(response => chats.value.push(msg));

            } else {
                var msg = {
                    sender : user.value,
                    receiver : "admin",
                    message : message.value,
                    date : new Date(),
                    id : uuid()
                };
                
                create("Chats",msg.id,msg).then(response => {
                    message.value = "";
                    chats.value.push(msg);
                });
                read("ChatList",msg.sender).then(
                    response => {
                        if (typeof response.data === 'object') {
                            var count = (JSON.parse(response.data.value)).count + 1;
                        }
                        else{
                            count = 1;
                        }

                        create("ChatList",msg.sender,{
                            id : msg.sender,
                            date : msg.date,
                            count : count
                        });
                    }
                );
            }

            message.value = "";
        }
    }

    const getChats = (userId : string) => {
        readAll("Chats").then(
            response => {
              response.data.forEach(_chat => {
                  var chat = JSON.parse(_chat.value);
                  //console.log(chat);
                if (chat.sender == userId || chat.receiver == userId) {
                    chats.value = chats.value.filter(c => c.id != chat.id);
                    chats.value.push(chat);
                 }   
              });
              if (chats.value.length) {
                chats.value.sort(function (x ,y) {
                    const a : any = new Date(x.date);
                    const b : any = new Date(y.date);
                    return a - b;
                });
             }
            },
        )
    }

    const getChatList = () => {
        readAll("ChatList").then(
                    response => {
                        response.data.forEach(u => {
                            var id = JSON.parse(u.value).id;
                            chatList.value = chatList.value.filter(c => c.id != id);
                            chatList.value = [...chatList.value, JSON.parse(u.value)];
                            // console.log(JSON.parse(u.value));
                     });
                    }
        );
    }
    const getChat = (id : string) => {
        receiver.value = id;
        chats.value = [];
        getChats(id);
            //clear chat count when admin open chats
        read("ChatList",id).then(
                response => {
                    var data = (JSON.parse(response.data.value));
                    data.count = 0;
                    create("ChatList",id,data);
                }
        );
    }
    const updateChats = () => {
        if (isAdmin.value) {
            if (receiver.value) {
                getChats(receiver.value);
                getChatList();
            }
            else{
                getChatList();
            }
        } else {
            if (user.value) {
                getChats(user.value);
            }
        }
    }

    onMounted(() => {
        updateChats();
        setInterval(() => {
            updateChats();
        }, 10000);
        showSlides();
    });
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
                        <div @click="getChat(c.id)" class="list" v-for="c in chatList" :key="c.id">
                            <div>
                                <small>{{c.id.substring(0,5)}} ... {{c.id.substring(c.id.length-5, c.id.length)}}</small>   
                                <small v-if="c.count > 0"><span  class="red">{{c.count}}</span></small>    
                                <small v-else>{{c.count}}</small>    
                            </div>
                            <div>
                                <small>{{moment(c.date).format('ll')}}</small>
                                <small>{{moment(c.date).format('LT')}}</small>
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
                    <div class="title-div">
                        <span><i class="fa fa-phone"> +234 7087051250</i></span><br>
                        <span><i class="fa fa-whatsapp"> +234 8181734574 </i></span><br>
                        <span><i class="fa fa-envelope"> uchevictor610@gmail.com</i></span><br>
                    </div>
                    <div class="form-container">
                        <div v-if="isAdmin" class="messages" v-for="chat in chats" :key="chat.id">
                            <div v-if="chat.sender == 'admin'" class="sender">{{chat.message}}</div>
                            <div v-else class="receiver">{{chat.message}}</div>
                        </div>
                        <div v-else class="messages" v-for="_chat in chats" :key="_chat.id">
                            <div v-if="_chat.sender == user" class="sender">{{_chat.message}}</div>
                            <div v-else class="receiver">{{_chat.message}}</div>
                        </div>
                    </div>
                    <div class="control">
                        <input v-model="message" type="text" placeholder="Send us a message. We'll reply asap">
                        <button @click="send" class="btn">Send</button>
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