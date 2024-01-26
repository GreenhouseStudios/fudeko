import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'animate.css';
import './index.css'
import './assets/tailwind.css'
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'
import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-orange/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue)
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
// app.component('v-icon', Icon)
app.mount('#app')