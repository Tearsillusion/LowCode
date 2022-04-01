import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'lib-flexible/flexible'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'



createApp(App).use(ElementPlus).use(store).use(router).mount("#app");
