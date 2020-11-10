<template lang="pug">
#tumenactive
  .active_img

</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    getQuery() {
      if (window.location.search) {
        let paramsObj= this.changeSearchToObj(window.location.search)
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
