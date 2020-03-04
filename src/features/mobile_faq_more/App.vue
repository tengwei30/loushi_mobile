<template lang="pug">
#app
  List(
    title=""
    :data="list"
    v-on:clickQuestion="clickQuestion"
  )
</template>
<script>
import List from '../mobile_faq/components/list'
import config from '../mobile_faq/data.js'
import { getQueryString } from '@/utils/url'
import { routerToNative } from '@/utils/native'
export default {
  components: {
    List,
  },
  data() {
    return {
      questionId: getQueryString('questionId') || '',
      classesId: getQueryString('classesId') || '',
      key: getQueryString('key') || '',
      list: [],
    }
  },
  methods: {
    clickQuestion(val) { // 点击问题跳转详情
      const url = `${window.location.origin}/BKH5-mobile_faq_detail.html?key=${this.key}&questionId=${val.id}&classesId=${this.classesId}`
      routerToNative(url)
    }
  },
  created() {
    const data = config[this.key].filter(item => item.id === this.classesId)
    document.title = data[0].title
    this.list = data[0].list
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
</style>
