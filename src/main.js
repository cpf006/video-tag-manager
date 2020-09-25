import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import VueYoutube from 'vue-youtube'
import 'element-ui/lib/theme-chalk/index.css';
 
Vue.use(VueYoutube)
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
