<template lang="pug">
.debris_award_center
  .debris_award_center_item(v-for='(item,index) in list' :key='index')
    Comment
</template>

<script>
import Comment from '../debris_center/components/comment'
export default {
  components: {
    Comment
  },
  data() {
    return {
      list: [
        {},
        {}
      ]
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
