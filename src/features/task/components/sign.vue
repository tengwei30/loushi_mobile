<template lang="pug">
#Sign
  .sign__num
    h4 已签到5天
  //- .rivet-left
  //- .rivet-right
  ul.sign__days
    li(
      v-for="item in signdays"
    )
      span {{ item.day }} 
      span.icon
        img(src="../../../assets/task/gold_coin_false.png")
      span +{{ item.gold }}
</template>
<script>
import rivet from '../../../icons/rivet.vue'
export default {
  components: {
    rivet,
  },
  data() {
    return {
      signdays: [
        {
          day: '第一天',
          is_finish: false,
          num: 0,
          gold: 10,
        },
        {
          day: '第二天',
          is_finish: false,
          num: 0,
          gold: 20,
        },
        {
          day: '第三天',
          is_finish: false,
          num: 0,
          gold: 30,
        },
        {
          day: '第四天',
          is_finish: false,
          num: 0,
          gold: 40,
        },
        {
          day: '第五天',
          is_finish: false,
          num: 0,
          gold: 50,
        },
        {
          day: '第六天',
          is_finish: false,
          num: 0,
          gold: 60,
        },
        {
          day: '第七天',
          is_finish: false,
          num: 0,
          gold: 70,
        },
      ],
    }
  },
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';
#Sign
  size(100%, 132px)
  box-shadow 0 1px 2px 0 rgba(0, 0, 0, 0.2)
  border-radius 4px
  .sign__num
    background #6388FE
    height 38px
    line-height 38px
    border-radius 4px 4px 0 0
    h4
      text-align center
      font-size 14px
      color #ffffff
  // .rivet-left
  //   size(0.26rem, 0.26rem)
  //   absolute(top 0.67rem left 1.6rem)
  //   z-index 2
  // .rivet-right
  //   size(0.26rem, 0.26rem)
  //   absolute(top 0.67rem right 1.6rem)
  //   z-index 2
  .sign__days
    height 94px
    display flex
    padding 15px 15px 0
    box-sizing border-box
    li
      flex 1
      font-size 12px
      display flex
      flex-direction column
      align-items center
      .icon
        size(30px 30px)
        margin 6px 0
        img
          width 100%
</style>
