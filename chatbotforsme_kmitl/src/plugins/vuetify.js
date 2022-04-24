
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import vueGoogleCharts from "vue-google-charts"
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
Vue.use(vueGoogleCharts)
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
      },
});
