<script>
//  import { supabase } from './lib/supabaseClient'
import {useCounterStore} from '@/stores/store'
import { mapActions } from 'pinia'
import Nav from './components/Nav.vue'

  export default {
  data() {
    return {
      participants: null
    }
  },
  async mounted () {
    if(this.user){
      this.initializeStore();
    }
  },
  computed: {
    user() {
      return true
    }
  },
  methods: {
    ...mapActions(useCounterStore,['setPrompts','initializeStore']),
  },
  components: {
    Nav,
  },
 }
 </script>

<template>
  <div id="app" class="min-h-screen p-0 bg-yellow-50">
    <!-- Nav component -->
    <Nav></Nav>
    <img src="./assets/mikan-circle.png" alt="fudeko mikan logo" class="w-16 pt-5 mx-auto md:w-32">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>