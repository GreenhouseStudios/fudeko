<script>
//  import { supabase } from './lib/supabaseClient'
import { useCounterStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'
import Nav from './components/Nav.vue'
import { RouterLink } from 'vue-router'
import Footer from './components/Footer.vue'

export default {
  data() {
    return {
      participants: null
    }
  },
  async mounted() {
    this.toggleLoading();
    await this.initializeStore();
    this.toggleLoading();
  },
  computed: {
    ...mapState( useCounterStore, ['user', 'loading'] ),
  },
  methods: {
    ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading'] ),
  },
  components: {
    Nav,
    RouterLink,
    Footer
  },
}
</script>

<template>
  <div id="app" class="min-h-screen bg-yellow-50">
    <header class="pb-24">

      <router-link to="/">
        <span class="flex items-center float-left pt-2">
          <img src="./assets/Fudeko-Logo-Final.png" alt="fudeko mikan logo" class="inline w-16 md:w-36">
        </span>
      </router-link>
      <Nav class="float-right"></Nav>
    </header>
<main class="min-h-screen  md:px-10">
    <router-view class="h-full" v-if="!loading" /></main>
    <Footer></Footer>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir Black, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

p{
  /* font-family: 'Avenir Heavy', Helvetica, Arial, sans-serif; */

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