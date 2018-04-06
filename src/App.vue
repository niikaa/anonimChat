<template>
  <div id="app">
    <AppToolbar></AppToolbar>
    <AppFullLoader></AppFullLoader>
    <router-view/>
  </div>
</template>

<script>
import FullLoader from './features/components/Loaders/FullLoader'
import Toolbar from './features/components/Toolbar'

export default {
  name: 'App',
  components: {
    AppFullLoader: FullLoader,
    AppToolbar: Toolbar,
  }
}
</script>

<style>
@import '../static/grid.css';
@import 'https://unpkg.com/vuetify/dist/vuetify.min.css';
@import '../static/style.css';
</style>

