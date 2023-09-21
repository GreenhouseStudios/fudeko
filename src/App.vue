<template>
  <div id="app">
    <img src="./assets/mikan-circle.png" alt="fudeko mikan logo" class="w-32 mx-auto md:w-48">
    <Form></Form>
  </div>
</template>

<script>
import Form from "./components/Form.vue"

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<style>

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
