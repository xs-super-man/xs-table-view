<template>
  <div id="app">
    <TableIndex />
  </div>
</template>

<script>
import TableIndex from './views/index.vue'

export default {
  name: 'App',
  components: {
    TableIndex
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
}
</style>
