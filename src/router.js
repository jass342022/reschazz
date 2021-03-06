import Vue from "vue";
import VueRouter from 'vue-router'
    
Vue.use(VueRouter)
import Home from "./components/Home/Home";

const routes = [
    {
      path: "/",
      name: "/",
      component: Home
    }
  ];
  const router = new VueRouter({
    mode: "history",
    routes
  });
  export default router;