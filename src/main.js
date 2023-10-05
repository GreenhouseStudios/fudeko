import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css';
import './index.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')