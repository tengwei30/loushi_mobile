<template lang="pug">
.welfare__task
  .sign__model
    Sign(
      v-if="day"
      :userTaskRedPackageVOList="userTaskRedPackageVOList"
      :day="day"
      :showRedPackageStyle="showRedPackageStyle"
    )
  DayWelfare
  ExtraWelfare
  DayTask
  AdTask
</template>

<script>
import { getTaskLists } from './request.js'
export default {
  name: 'welfareTask',
  components: {
    Sign: () => import('./components/Sign'),
    DayWelfare: () => import('./components/DayWelfare'),
    ExtraWelfare: () => import('./components/ExtraWelfare'),
    DayTask: () => import('./components/DayTask'),
    AdTask: () => import('./components/AdTask')
  },
  data() {
    return {
      userTaskRedPackageVOList: [
        {
          status: 1,
        },
        {
          status: 0,
        },
        {
          status: 0,
        },
        {
          status: 0,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 0,
        }
      ], // 新人签到
      showRedPackageStyle: 0, // 是否是新签到模式
      day: null
    }
  },
  methods: {},
  mounted() {},
  async created() {
    let data = await getTaskLists()
    const signday = data.filter(item => item.type === 3)
    const { extraData = null, showRedPackageStyle, userTaskRedPackageVOList = null } = signday[0]
    this.day = extraData
    this.showRedPackageStyle = showRedPackageStyle
    this.userTaskRedPackageVOList = userTaskRedPackageVOList
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
