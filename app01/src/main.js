import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import store from './store/index.js'
import FilterSetup from './filter'
import PopupManager from './plugins/popupmanager'


Vue.config.productionTip = false
Vue.use( FilterSetup)
Vue.use(PopupManager)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')