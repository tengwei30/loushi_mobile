<template lang="pug">
#app
  h2 iOS test 页面
  content {{ res }}
</template>

<script>
import { getQueryString } from '@/utils/url'
import { post } from '@/config/axios.config'
export default {
  data() {
    return {
      taskId: getQueryString('taskId'),
      res: null
    }
  },
  methods: {
    getRecord() {
      post('/task_api/task/record', { taskId: this.taskId }).then(res => {
        this.res = res.data
      }).catch(err => {
        this.res = err
      })
    }
  },
  mounted() {
    this.getRecord()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
</style>
