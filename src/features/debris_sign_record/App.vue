<template lang="pug">
.debris_sign_record
  .debris_sign_record_tip
    | 已连续
    .debris_sign_record_tip_text {{ checkInDays.slice(0, 1) }}
    .debris_sign_record_tip_text {{ checkInDays.slice(1, 2) }}
    | 天签到
  SignRecord(:signList='signList')
</template>

<script>

import SignRecord from './components/sign_record'
import { getSignRecord } from './request'
export default {
  components: {
    SignRecord
  },
  data() {
    return {
      checkInDays: '00',
      signList: []
    }
  },
  methods: {

    async initPage() {
      let res = await getSignRecord()
      console.log(res)
      const { extraResultList, extraData } = res.data
      this.signList = extraResultList
      if (extraData.checkInDays < 10) {
        this.checkInDays = `0${extraData.checkInDays}`
      } else {
        this.checkInDays = extraData.checkInDays.toString()
      }
    }
  },
  mounted() {
    this.initPage()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
