<template>
  <div v-if="Authentication.isFetching" class="full-loader-container">
    <div class="vert-mid">
      <div class="lds-css-full">
        <div class="lds-facebook vert-mid filled">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState ([
    'Authentication'
  ])
}
</script>
