import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import routes from "./router/index";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise(resolve => {
      setTimeout(() => resolve({ top:0 }), 300)
    })
  }
});

createApp(App).use(router).use(createPinia()).mount("#app");
