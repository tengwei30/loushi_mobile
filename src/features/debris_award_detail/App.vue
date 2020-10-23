<template lang="pug">
.debris_award_detail(v-if='isLoaded')
  template(v-if='list.length > 0')
    div(ref='clientBox')
      AwardDetail(v-for='(item,index) in list' :key='index'
      @goMailAddress='goMailAddress'
      :info='item')
    .debris_award_detail_tip
      .debris_award_detail_text(@click='callOnline') 我有疑问?
  .debris_award_detail_null(v-else)
    img(src='@/assets/debris_award_detail/debris_detail_null.png')
    div 您暂时没有奖品哦～
</template>

<script>
import AwardDetail from './components/award_detail'
import { callOnline } from '@/utils/common.js'
import { skipUrl } from '@/utils/nativeToH5/index'
import { getQueryString } from '@/utils/url'
import { debounce } from '@/utils/utils.js'
import { mBuryPoint } from '@/utils/index'
import { getDebrisAwardDetail } from './request'
export default {
  components: {
    AwardDetail
  },
  data() {
    return {
      list: [],
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
