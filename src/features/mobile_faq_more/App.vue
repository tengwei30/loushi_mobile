<template lang="pug">
#app
  List(
    title="常见问题"
  )
</template>
<script>
import List from '../mobile_faq/components/list'
export default {
  components: {
    List,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
</style>
