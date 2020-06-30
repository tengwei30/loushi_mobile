<template lang="pug">
  #app
    .app-content
      | 我是来测试的
</template>

<script>
import { postFormatData } from '@/config/format-data'
console.log('test')
export default {
  name: 'app',
  components: {},
  data() {
    return {}
  },
  methods: {
    getList() {
      return postFormatData('/api/task/v1/task/list', {
        task_type: '2',
      })
    },
  },
  created() {},
  mounted() {
    this.getList().then(res => {
      console.log('data', res)
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl'

html, body
  width 100%
  height 100%
#app
  .app-content
    font-size 44px
    color red
</style>
