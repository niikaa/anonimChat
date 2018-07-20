<template>
  <div :ref="'not-' + id">
    <v-alert
      class="alert-grass"
      :value="true"
      :color="color + ' lighten-1'"
      transition="scale-transition"
    >
      <v-avatar>
        <img
          :src="img  ? img : '/static/icons/bgender.png'"
        >
      </v-avatar>
      <div class="not-txt-cont">
        <h3>{{header}}</h3>
        <p class="not-sub-header">
          {{text}}
        </p>
      </div>
    </v-alert>
  </div>
</template>

<script>
export default {
  props:['text', 'img', 'header', 'id', 'color'],
  methods: {
    onClick() {

    }
  }
}
</script>
