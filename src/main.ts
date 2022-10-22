import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
//to get the $router available all through the components
// router.isReady().then(()=>{
//     app.mount("#app"); 
// });
