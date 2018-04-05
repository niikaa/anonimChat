<template>
  <div id="app">
    <!--<AppFullLoader></AppFullLoader>-->
    <router-view/>
  </div>
</template>

<script>
import FullLoader from './features/components/Loaders/FullLoader'

export default {
  name: 'App',
  components: {
    AppFullLoader: FullLoader
  }
}
</script>

<style>
@import '../static/grid.css';
@import 'https://unpkg.com/vuetify/dist/vuetify.min.css';
@import '../static/style.css';
</style>

