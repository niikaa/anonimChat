<template>
  <div class="reltv-ann">
    <v-list-tile avatar @click="handleClick()">
      <v-list-tile-avatar>
        <img :src="'https://graph.facebook.com/' + data.id + '/picture'"/>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="dark-text">{{ data.name }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
   props: ['type', 'data'],
   methods: {
     handleClick() {

     }
   }
}
</script>
