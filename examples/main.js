import Vue from "vue";
import App from "./App.vue";
import LemonIM from "../packages";
Vue.use(LemonIM);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
