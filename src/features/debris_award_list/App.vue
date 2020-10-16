<template lang="pug">
#debris_award
  .debris_award_list
    Award(:styles="styles" v-for="item in checkinRewardInfoList" :awardInfo="item")
</template>

<script>
import { post } from '@/config/axios.config'
import Award from '../debris_center/components/award'
import { getQueryString } from '@/utils/index'
export default {
  data() {
    return {
      styles: {
        width: '136px',
        height: '205px'
      },
      activityId: getQueryString('activityId') || '128',
      checkinRewardInfoList: []
    }
  },
  components: {
    Award
  },
  methods: {},
  async mounted() {
    let { data } = await post('/activity_api/fragmentPrize/getItemList', {
      activityId: this.activityId
    })
    console.log('碎片中心', data)
    this.checkinRewardInfoList = data || []
    // /activity_api/fragmentPrize/getItemList
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
body,html
  size(100%, 100%)
  margin 0
  padding 0
#debris_award
  width 100%
  min-height 100vh
  background linear-gradient(180deg, #FFFAF4 0%, #FFE1C7 100%)
  .debris_award_list
    width 100%
    padding 7px 37px 87px
    box-sizing border-box
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
</style>
