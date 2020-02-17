<template lang="pug">
#app(
  v-if="showFlag"
)
  Sign
  AdTab
  AdImg
  TaskList(
    v-if="newlists.length !== 0"
    taskname="新手任务"
    :tasklists = "newlists"
  )
  TaskList(
    taskname="日常任务"
    :tasklists = "daylists"
  )
</template>

<script>
import Sign from './components/sign'
import AdTab from './components/adTab'
import AdImg from './components/adImg'
import TaskList from './components/taskList'
import { post } from '@/config/axios.config'
export default {
  components: {
    Sign,
    AdTab,
    AdImg,
    TaskList,
  },
  data() {
    return {
      newlists: [],
      daylists: [],
      showFlag: false,
    }
  },
  methods: {
    gettasks(task_type) {
      // 获取任务列表 task_type 1 -- 新人任务 2 -- 日常任务  3 -- 签到任务
      return post('/api/task/v1/task/list', {
        task_type,
      })
    },
  },
  mounted() {
    Promise.all([this.gettasks(1), this.gettasks(2), this.gettasks(3)])
      .then(res => {
        console.log('resss')
        this.showFlag = true
        this.newlists = res[0].data.list.filter(val => val.is_finish === 0)
        this.daylists = res[1].data.list
      })
      .catch(err => {
        console.log('error ----> ', err)
      })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
html, body
  size(100%, 100%)
#app
  padding 10px 15px 5px
  box-sizing border-box
</style>
