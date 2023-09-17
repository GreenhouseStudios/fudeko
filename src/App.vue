<template>
  <div id="app">
    <img src="./assets/mikan-circle.png" alt="fudeko mikan logo" height="100" class="h-48 mx-auto">
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
