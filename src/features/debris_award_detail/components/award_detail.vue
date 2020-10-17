<template>
  <div class="award_detail">
    <div class="award_detail_cover">
      <img :src="info.fragmentPrizeBigImgUrl" alt=" ">
    </div>
    <div class="award_detail_title">
      {{info.fragmentPrizeTitle}}
    </div>
    <div class="award_detail_time">中奖时间：{{momentDate(info.createTime)}}</div>
    <div class="award_detail_bottom">
      <div class="award_detail_progress">进度: {{info.status == 4 ? '已发货' : '未发货'}}</div>
      <div class="award_detail_btn" v-if="info.needPost != 0" @click="goMailAddress">邮寄地址</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    info: {
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {
    goMailAddress() {
      const { userRealName, userPhone, userAddress } = this.info
      this.$emit('goMailAddress', {
        userRealName,
        userPhone,
        userAddress
      })
    },
    momentDate(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="stylus">
.award_detail
  width 335px
  margin 20px auto 0
  .award_detail_cover
    width 100%
    height 252px
    background #ffffff
    box-shadow 0px 0px 4px 0px rgba(235,235,235,0.5)
    border-radius 10px
    overflow hidden
    margin-bottom 18px
    img
      width 100%
      height 100%
      border none
  .award_detail_title
    font-size 18px
    color #333333
    background linear-gradient(236deg, #FFC87A 0%, #F43A3A 100%)
    -webkit-background-clip text
    -webkit-text-fill-color transparent
    display inline
  .award_detail_time
    font-size 15px
    color #666666
    margin 18px 0
    font-weight 500
  .award_detail_bottom
    font-size 15px
    color #666666
    font-weight 500
    display flex
    align-items center
    justify-content space-between
    .award_detail_btn
      background rgba(244, 244, 244, 1)
      width 78px
      height 22px
      line-height 22px
      text-align center
      border-radius 22px
</style>