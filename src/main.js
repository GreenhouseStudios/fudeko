import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'animate.css';
import './index.css'
import './assets/tailwind.css'

import { plugin } from '@formkit/vue'
import defaultConfig from '../formkit.config.js'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import '@formkit/themes/genesis'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });
app.use(plugin, defaultConfig)
// watch(
//     pinia.state,
//     (state) => {
//         if(state.user){
//             localStorage.setItem("counter", JSON.stringify(state.user));
//         }

//     },
//     { deep: true }
//     );

app.directive('tooltip', Tooltip);
app.component('v-icon', Icon)
app.mount('#app')