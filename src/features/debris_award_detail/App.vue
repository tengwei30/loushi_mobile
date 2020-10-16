<template lang="pug">
.debris_award_detail
  AwardDetail(v-for='(item,index) in list' :key='index'
  @goMailAddress='goMailAddress')
  .debris_award_detail_tip
    .debris_award_detail_text(@click='callOnline') 我有疑问?
</template>

<script>
import AwardDetail from './components/award_detail'
import { callOnline } from '@/utils/common.js'
import { skipUrl } from '@/utils/nativeToH5/index'
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
  methods: {
    goMailAddress() {
      skipUrl({
        skipUrl: `${location.origin}/BKH5-debris_mail_address.html`
      })
    },
    callOnline() {
      callOnline()
    }
  },
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
