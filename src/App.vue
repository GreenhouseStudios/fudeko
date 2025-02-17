<template>
  <div id="app">

    <Modal @close="modalShowing = false" :showing="modalShowing" v-if="modalShowing && partialResponse">
      <h1 class="text-4xl font-black">Welcome back, {{ first_name }}</h1>
      <p class="m-0 text-xl font-bold">It looks like you were in the middle of something.</p>

      <p class="m-0 text-xl font-bold"><i v-html="response?.substring(0, 40)"></i></p>
      <p class="m-0 text-xl font-bold">Would you like to continue where you left off?</p>
      <Button @click="discardResponse"
        class="mt-12 text-lg font-bold text-white bg-red-500 hover:bg-red-400">Discard Response</Button>
      <router-link :to="'/form/page2/' + this.partialResponse.prompt">
        <Button @click="modalShowing = false"
          class="mt-12 text-lg font-bold text-white bg-green-500 hover:bg-green-400">Continue Writing</Button>
      </router-link>
    </Modal>

    <div :class="modalShowing ? 'filter blur-lg' : ''" v-if="!loading">
      <header class="flex justify-between pb-12 mb-24">

        <router-link to="/">
          <span class="flex items-center float-left pt-2">
            <img src="./assets/Fudeko-Logo-Final.png" alt="fudeko mikan logo" class="inline w-16 md:w-36">
          </span>
        </router-link>
        <Nav></Nav>
      </header>
      <main class="md:px-48 sm:px-4">

        <router-view class="" v-if="!loading" v-slot="{ Component, route }">
          <transition :name="route.meta.transition" mode="out-in" duration="1000">
            <component :is="Component" :route="route"></component>
          </transition>
        </router-view>
      </main>
      <Footer></Footer>
    </div>


  </div>
</template>
<script>
//  import { supabase } from './lib/supabaseClient'
import { useCounterStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'
import Nav from './components/Nav.vue'
import { RouterLink } from 'vue-router'
import Footer from './components/Footer.vue'
import Modal from './components/Modal.vue'
import Button from 'primevue/button'

export default {
  data() {
    return {
      participants: null,
      modalShowing: false,
    }
  },
  async mounted() {
    this.toggleLoading();
    await this.initializeStore();
    this.modalShowing = !!( this.partialResponse.prompt && this.participantID );

    this.toggleLoading();
  },
  computed: {
    ...mapState( useCounterStore, ['user', 'loading', 'participantID', 'participantRecord', 'partialResponse'] ),
    first_name() {
      return this.participantRecord?.first_name;
    },
    response() {
      return this.participantRecord?.response_text;
    },
  },
  methods: {
    ...mapActions( useCounterStore, ['initializeStore', 'toggleLoading', 'clearPartialResponse'] ),
    discardResponse() {
      let userEmail = this.participantRecord.email;
      this.modalShowing = false;
      this.clearPartialResponse();
      this.$router.push( '/form/' + userEmail );
    },
  },
  components: {
    Nav,
    RouterLink,
    Footer,
    Modal,
    // Button
  },
}
</script>



<style >
#app {
  /* font-family: Avenir Black, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  color: #000;
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-out;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Remove list styles */
ul, ol {
  list-style: none;
}

/* Remove default link styles */
a {
  text-decoration: none;
  color: inherit;
}

/* Remove default button styles */
button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

/* Remove default form element styles */
input, textarea, select, button {
  font: inherit;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white; /* Light font color for dark mode */
  }  
}

</style>