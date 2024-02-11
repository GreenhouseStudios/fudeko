<script>
//  import { supabase } from './lib/supabaseClient'
import { useCounterStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'
import Nav from './components/Nav.vue'
import { RouterLink } from 'vue-router'

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
    RouterLink
  },
}
</script>

<template>
  <div id="app" class="min-h-screen p-0 px-2 bg-yellow-50">
    <header class="pb-24">

      <router-link to="/">
        <span class="flex items-center float-left pt-2">
          <img src="./assets/mikan-circle.png" alt="fudeko mikan logo" class="inline w-16 md:w-12">
          <h1 class="inline ml-2 font-bold">Fudeko Project</h1>
        </span>
      </router-link>
      <Nav class="float-right"></Nav>
    </header>
<main class="md:px-48">
    <router-view v-if="!loading" /></main>
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

h1, h2, h3, h4, h5, h6 {
  font-family: 'Avenir Black', Helvetica, Arial, sans-serif;
}

p{
  font-family: 'Avenir Heavy', Helvetica, Arial, sans-serif;

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