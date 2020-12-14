<template lang="pug">
.welfare__task
  .sign__model
    Sign(
      :checkin37RedPData="checkin37RedPData"
    )
  DayWelfare
  ExtraWelfare
  DayTask
</template>

<script>
import Sign from './components/Sign'
import DayWelfare from './components/DayWelfare'
import ExtraWelfare from './components/ExtraWelfare'
import DayTask from './components/DayTask'
export default {
  name: 'welfareTask',
  components: {
    Sign,
    DayWelfare,
    ExtraWelfare,
    DayTask
  },
  data() {
    return {
      checkin37RedPData: [
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 1,
        },
        {
          status: 1,
        }
      ], // 新人签到
    }
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
