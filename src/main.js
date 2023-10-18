import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css';
import './index.css'
import './assets/tailwind.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Tooltip from 'primevue/tooltip';

Vue.directive('tooltip', Tooltip);
Vue.config.productionTip = false
Vue.component('v-icon', Icon)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')