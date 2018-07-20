<template>
  <div id="app">
    <AppToolbar></AppToolbar>
    <AppFullLoader></AppFullLoader>
    <router-view/>
    <AppNotifications></AppNotifications>
  </div>
</template>

<script>
import FullLoader from './features/components/Loaders/FullLoader'
import Toolbar from './features/components/Toolbar'
import Notifications from './features/components/notifications'

export default {
  name: 'App',
  components: {
    AppFullLoader: FullLoader,
    AppToolbar: Toolbar,
    AppNotifications: Notifications,
  }
}
</script>

<style>
@import '../static/grid.css';
@import 'https://unpkg.com/vuetify/dist/vuetify.min.css';
@import '../static/style.css';
</style>

