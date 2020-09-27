<template lang="pug">
#debris_app
  header
    .award_list_root
      h3.header_title 我的奖品
      ul.award_list
        li.single_award
          .img_show
            span.img
          .single_award_title iPhone11 pro碎片
          .single_award_progress
            span.default_progress 0/9
        li.single_award
          .img_show
            span.img
          .single_award_title iPhone11 pro碎片
          .single_award_progress
            span.default_progress 0/9
        //- li.single_award
        //-   .img_show
        //-     span.img
        //-   .single_award_title iPhone11 pro碎片
        //-   .single_award_progress
        //-     span.default_progress 0/9
  .sign_module
    ContentSlot(
      title='签到领碎片',
      desc=''
    )
      span 1111
</template>

<script>
import ContentSlot from './components/content_slot'
export default {
  components: {
    ContentSlot
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
@import './debris.styl';
</style>
