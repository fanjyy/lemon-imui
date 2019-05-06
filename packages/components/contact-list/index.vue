<template>
  <div class='lemon-contact-list'>
    <div class="lemon-contact-item"
         v-for="item in control.friends"
         :key="item.id"
         @click="control._changeMessageView(item)">
      {{item.diaplayName}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'ContactList',
  inject: ["control"],
  data () {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {
  },
}
</script>
<style lang='scss'>
@import '~styles/utils/index';
@include b(contact-item) {
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: #000;
  }
}
</style>