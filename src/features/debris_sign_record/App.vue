<template lang="pug">
.debris_sign_record
  .debris_sign_record_tip
    | 已连续
    .debris_sign_record_tip_text 0
    .debris_sign_record_tip_text 3
    | 天签到
  SignRecord
</template>

<script>
import SignRecord from './components/sign_record'
export default {
  components: {
    SignRecord
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
@import './index.styl'
</style>
