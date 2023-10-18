import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/Form/:email',
        name: 'Form',
        component: () => import('../components/Form.vue'),
    },
    {
      path: '/Form/:email/:promptNumber',
      name: 'Form',
      component: () => import('../components/Form.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
