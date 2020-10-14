<template lang="pug">
.debris_award_detail
  AwardDetail(v-for='(item,index) in list' :key='index')
  .debris_award_detail_tip
    .debris_award_detail_text 我有疑问?
</template>

<script>
import AwardDetail from './components/award_detail'
export default {
  components: {
    AwardDetail
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
