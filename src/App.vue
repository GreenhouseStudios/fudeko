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
    if ( this.participantID && this.partialResponse ) {
      this.$router.push( '/continue' )
    }
  },
  computed: {
    ...mapState( useCounterStore, ['user', 'loading', 'participantID'] ),
  },
  methods: {
    ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading', 'partialResponse'] ),
  },
  components: {
    Nav,
    RouterLink,
    Footer
  },
}
</script>

<template>
  <div id="app" class="bg-white">
    <header class="pb-12">

      <router-link to="/">
        <span class="flex items-center float-left pt-2">
          <img src="./assets/Fudeko-Logo-Final.png" alt="fudeko mikan logo" class="inline w-16 md:w-36">
        </span>
      </router-link>
      <Nav class="float-right"></Nav>
    </header>
    <main class="flex justify-center min-h-screen max-w-screen md:px-10">

      <router-view class="h-full" v-if="!loading" v-slot="{Component, route}">
        <transition :name="route.meta.transition" mode="out-in" duration="1000">
          <component :is="Component" :route="route"></component>
        </transition>
      </router-view>
    </main>
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

p {
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

.fudeko-green {
  background-color: #066032;
  color: #fff;
}

.fudeko-blue {
  background-color: #1d264f;
  color: #fff;
}

.fudeko-orange {
  background-color: #f49230;
  color: #fff;
}

.fudeko-orange-text {
  color: #f49230;
}

.fudeko-blue-text {
  color: #1d264f;
}

.fudeko-green-text {
  color: #066032;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}
</style>