<template lang="pug">
.welfare__task__sign
  .new__sign__title
    | 每日签到
    img(@click="gotoRule()" src="@/assets/welfare_task/new_sign_problem_icon.png")
  .new__sign__content
    .new__sign__days
      p.new__sign__day__item(
        class="new__sign__day__item"
        v-for="(item, key) in checkin37RedPData"
        :style="(Number(item.status) === 1 || Number(item.status) === 2) ? bgActive : null"
        @click="gotoWithdraw(key, item.status)"
        :key="key")
        span(
          :class="[((Number(key) === 2 || Number(key) === 6) && Number(item.status) === 2) || ((Number(key) === 2 || Number(key) === 6) && Number(item.status) === 3)?  'day__item__gold__active': 'day__item__gold', 'day__item__common']"
          :style="(Number(item.status) === 1 && (key !== 2 || key !== 6))? colorActive: null") {{ (Number(key) === 2 || Number(key) === 6)? (Number(item.status) === 2  ? '已领取' : Number(item.status) === 3 ? '已过期' : `0.${key + 1}元` ) : `+${10 * Number(key + 1)}` }}
        img(:class="[((Number(key) === 2 || Number(key) === 6) && Number(item.status) !== 3 && Number(item.status) !== 2) ? 'red_package_default' : ((Number(key) === 2 || Number(key) === 6)) ? 'red_package_active' : '']"
          :src="(Number(key) === 2 || Number(key) === 6)? ((Number(item.status) === 2)?  redPackageGet: (Number(item.status) === 3) ? redPackageExpire : redPackageDefault): ((Number(item.status) === 1) ? goldActive : goldDefault)"
          alt=""
        )
        span.day__item__common.day__item__date {{key + 1}}天
</template>
<script>
export default {
  name: 'Sign',
  props: ['checkin37RedPData'],
  data() {
    return {
      colorActive: {
        color: '#FFB856'
      },
      bgActive: {
        backgroundColor: '#FFF5F1'
      },
      goldActive: require('@/assets/welfare_task/new_sign_active_red.png'),
      goldDefault: require('@/assets/welfare_task/new_sign_default.png'),
      redPackageDefault: require('@/assets/welfare_task/hongbao.png'),
      redPackageExpire: require('@/assets/welfare_task/red_package_expire.png'),
      redPackageGet: require('@/assets/welfare_task/new_red_package_get.png'),
      days: 0
    }
  },
  mounted() {
    console.log('------', this.checkin37RedPData)
  },
  methods: {
    gotoRule() {
      console.log('点击规则')
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
@import '../../../styles/index.styl';
.welfare__task__sign
  padding: 0 0.27rem;
  box-sizing: border-box;
  margin-bottom: 0.8rem;
  .new__sign__title
    padding: 0.69rem 0 0.51rem;
    font-size: 0.48rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 0.67rem;
    display: flex;
    img
      width: 0.37rem;
      height: 0.37rem;
      display: inline-block;
      margin-left: 0.11rem;
      line-height: 0.4rem;
      padding-top: 0.15rem;
  .new__sign__content
    width: 9.47rem;
    min-height: 3.12rem;
    background: #fff;
    box-shadow: 0rem 0.16rem 0.27rem 0rem #FFF1E5;
    border-radius: 0.43rem;
    position: relative;
    &::before
      content: '';
      position: absolute;
      right: 1.3rem;
      top: -1.2rem;
      width: 2.1rem;
      height: 1.5rem;
      background: url('../../../assets/welfare_task/new_sign_bg_icon.png') no-repeat center center;
      background-size: 100% 100%;
    .new__sign__record
      height: 0.53rem;
      font-size: 0.37rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 0.53rem;
      padding: 0.4rem 0 0.4rem 0.4rem;
      display: flex;
    .new__sign__days
      display: flex;
      flex-direction: row;
      padding: 0.75rem 0.32rem 0;
      box-sizing: border-box;
      justify-content: space-between;
      .new__sign__day__item
        width: 1.01rem;
        min-height: 1.71rem;
        background: #F6F6F6;
        border-radius: 0.11rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img
          width: 0.64rem;
          height: 0.64rem;
        img.red_package_active
          width: 0.69rem;
          height: 0.8rem;
        img.red_package_default
          animation: pulse 0.2s linear infinite;
          width: 0.69rem;
          height: 0.83rem;
        .day__item__common
          height: 0.45rem;
          font-size: 0.32rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #999999;
          line-height: 0.45rem;
        .day__item__date
          color: #999999;
          font-weight: 400!important;
          padding-top: 0.03rem;
          transform: scale(0.9);
        &:nth-of-type(3),&:nth-of-type(7)
          .day__item__gold__active
            font-size: 0.27rem;
            transform: scale(0.8);
          .day__item__gold
            &::before
              position: absolute;
              content: '';
              width: 0.59rem;
              height: 0.56rem;
              background: url('../../../assets/welfare_task/new_sign_icon.png') no-repeat center center;
              background-size: 100% 100%;
              top: -0.45rem;
              right: -0.35rem;
@keyframes pulse
  0%
    transform: rotate(10deg);
  25%
    transform: rotate(0deg);
  50%
    transform: rotate(-10deg);
  75%
    transform: rotate(0deg);
  100%
    transform: rotate(10deg);
</style>