<template lang="pug">
#app
  .labor
    .labor-rule 活动规则
    div.labor-top
      img(src='@/assets/labor_activity/title.png')
    div.labor-money-box
      .labor-money-tip
        span 排名前1000名瓜分
        | 十万现金红包
      .labor-members
        | 参与人数：119999
      .labor-money-number ¥100000
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
