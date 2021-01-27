<template lang="pug">
.debris_award_detail(v-if='isLoaded')
  HeaderNav(
    title='奖励明细'
    :headerSpaceStyle="{height: '68px', background: 'linear-gradient(to right, #F43A3A 10%, #FFC87A)'}"
    :headerNav="{height: '48px', fontSize: '16px', color: '#ffffff', padding: '0 0 0 16px'}"
  )
    img.left_img(
      slot='left'
      src='../../assets/debris_award_detail/nav_back.png'
      @click='nvaBack'
    )
    div.left_right(
      slot='right'
      @click='goDebrisDetailRecord'
    ) 碎片明细
  template(v-if='list.length > 0')
    div(ref='clientBox')
      AwardDetail(v-for='(item,index) in list' :key='index'
      @goMailAddress='goMailAddress'
      @goDebrisComment='goDebrisComment'
      :info='item')
    .debris_award_detail_tip
      .debris_award_detail_text(@click='callOnline') 我有疑问?
  .debris_award_detail_null(v-else)
    img(src='@/assets/debris_award_detail/debris_detail_null.png')
    div 您暂时没有奖品哦～
</template>

<script>
import bk from 'bayread-bridge'
import AwardDetail from './components/award_detail'
import HeaderNav from '@/components/HeaderNav'
import { callOnline } from '@/utils/common.js'
import { skipUrl, toast, closeCurrentPage } from '@/utils/nativeToH5/index'
import { getQueryString } from '@/utils/url'
import { debounce } from '@/utils/utils.js'
import { mBuryPoint } from '@/utils/index'
import { getDebrisAwardDetail } from './request'
export default {
  components: {
    AwardDetail,
    HeaderNav
  },
  data() {
    return {
      list: [{ fragmentPrizeBigImgUrl: 'https://www.baidu.com', fragmentPrizeTitle: 'p40S' }],
      pageIndex: 0,
      isLoadedAll: false,
      isLoaded: false
    }
  },
  methods: {
    async initPage() {
      if (this.isLoadedAll) {
        return
      }
      this.isLoadedAll = true
      let res = await getDebrisAwardDetail({
        pageIndex: this.pageIndex,
        activityId: getQueryString('activityId'),
      })
      this.isLoaded = true
      if (res.code === 100 && res.data.length > 0) {
        this.list = [...this.list, ...res.data]
        this.isLoadedAll = false
        this.pageIndex += 1
      } else if (res.code == 153) {
        toast({
          content: res.msg
        })
        setTimeout(() => {
          closeCurrentPage()
        }, 2000)
        this.isLoadedAll = true
      } else {
        this.isLoadedAll = true
      }

    },
    goMailAddress(target, awardID) {
      mBuryPoint(13, {
        eventPage: 'awardDetails',
        eventType: 2,
        awardID,
        activityId: getQueryString('activityId')
      })
      skipUrl({
        skipUrl: `${location.origin}/BKH5-debris_mail_address.html?from=awardDetail&userInfo=` + encodeURIComponent(JSON.stringify(target))
      })
    },
    callOnline() {
      callOnline()
    },
    scrollEvent() {
      window.addEventListener('scroll', debounce(() => {
        this.scrollDealHeight()
      }, 100))
    },
    scrollDealHeight() {
      if (this.$refs.clientBox) {
        var lineHeight=this.$refs.clientBox.clientHeight
        var windowHeight=document.body.clientHeight || document.documentElement.clientHeight
        var scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop + windowHeight >= lineHeight-10) {
          this.initPage()
        }
      }
    },
    // 碎片明细记录
    goDebrisDetailRecord() {
      skipUrl({
        skipUrl: `${location.origin}/BKH5-debris_detail_record.html?from=awardDetail`
      })
    },
    // 跳转碎片评论
    goDebrisComment(target) {
      console.log(`${location.origin}/BKH5-debris_comment.html?from=awardDetail&info=` + encodeURIComponent(JSON.stringify(target)))
      skipUrl({
        skipUrl: `${location.origin}/BKH5-debris_comment.html?from=awardDetail&info=` + encodeURIComponent(JSON.stringify(target))
      })
    },
    // 返回上一页面
    nvaBack() {
      bk.call('closePageNative')
    }
  },
  mounted() {
    mBuryPoint(13, {
      eventPage: 'awardDetails',
      eventType: 1,
      activityId: getQueryString('activityId')
    })
    this.initPage()
    this.scrollEvent()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
