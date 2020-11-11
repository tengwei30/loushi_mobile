<template lang="pug">
#tumenactive
  .active_img
  .toast_modalbox(v-if='showModalToast')
    .content_box
      .tip_textbox 当前活动已结束
      .btn_closebox(@click='closeModal()')  知道了
</template>

<script>
export default {
  data() {
    return {
      showModalToast: false
    }
  },
  methods: {
    getQuery() {
      if (window.location.search) {
        let paramsObj= this.changeSearchToObj(window.location.search)
        let nowDate = new Date().getTime()
        if (paramsObj.activetyEndTime) {
          if (nowDate-paramsObj.activetyEndTime>0) this.showModalToast = true
        }
        paramsObj.title&&(document.title=decodeURIComponent(paramsObj.title))
      }
    },
    changeSearchToObj(search) {
      let $_REQUEST = new Object()
      let aParams = search.substr(1).split('&')
      let k = 0
      while (k<aParams.length) {
        let aParam = aParams[k].split('=')
        $_REQUEST[aParam[0]] = aParam[1]
        k++
      }
      return $_REQUEST
    },
    closeModal() {
      this.showModalToast = false
    }
  },
  mounted() {
    this.getQuery()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './index.styl'
</style>
