<template>
  <div class='lemon-message-view'
       v-loading="control.messageViewloading"
       element-loading-background="transparent">
    {{ control.messageViewData }}
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  components: {},
  inject: ["control"],
  created () {

  },
  mounted () {
  },
  computed: {},
  watch: {},
  methods: {

  }
}
</script>
<style lang='scss'>
@import '~styles/utils/index';
@include b(message-view) {
  height: 100%;
}
</style>