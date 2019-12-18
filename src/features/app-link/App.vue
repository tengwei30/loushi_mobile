<template lang="pug">
  #app
    .app-content
      | 我是来测试的
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {}
  },
  methods: {},
  created: function() {},
  mounted: function() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl'

html, body
  width 100%
  height 100%
#app
  .app-content
    font-size 44px
    color red
</style>
