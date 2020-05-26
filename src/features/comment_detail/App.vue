<template lang="pug">
  #comment
    comment-title
</template>

<script>
import CommentTitle from './components/commentTitle'
import dsBridge from 'dsbridge'
export default {
  components: {
    CommentTitle
  },
  data() {
    return {
      replyContent: '',
      isShow: true
    }
  },
  methods: {
    handlePop() {
      this.$refs.pop.focus()
    }
  },
  mounted() {
    console.log(dsBridge.call)
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
