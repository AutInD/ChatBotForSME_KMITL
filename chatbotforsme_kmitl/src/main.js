import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import '@/style/print.css';
import moment from 'moment';
import VueFbCustomerChat from '../plugin/vue-fb-customer-chat.umd';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false;
Vue.use(VueFbCustomerChat, {
  page_id: 110100641400020, //  change 'null' to your Facebook Page ID,
  theme_color: '#333333', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})

new Vue({
  router,
  store,
  vuetify,
  moment,


  
  
  render: (h) => h(App),
}).$mount("#app");

