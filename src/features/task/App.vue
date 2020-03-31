<template lang="pug">
#app(
  v-if="showFlag"
)
  Sign(v-if="signday.length!==0",:signday="signday")
  section.section(v-if="showNewTask")
    .task_addInfo(v-if="showInfo")
       p.words_text 亲爱的用户，您本日还没有签到成功，马上去资讯平台领去红包吧，满30个就可以签到哦～
       button(@click="goReadAd()") 去看资讯
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
      signday: [{}],
      showNewTask: true,
      showInfo: true
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

html, body {
  size(100%, 100%);
}

#app {
  padding: 10px 15px 5px;
  box-sizing: border-box;

  .section {
    margin: 0;
    padding: 0;
    font-family: inherit;
  }

  .task_addInfo {
    width: 9.22rem;
    height: 2.77rem;
    margin: 0.4rem auto 0;
    padding: 0.32rem 0.59rem 0.48rem 0.61rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    -webkit-box-shadow: -0.05rem 0.08rem 0.13rem 0rem rgba(153, 153, 153, 0.15), 0rem 0rem 0.13rem 0rem rgba(153, 153, 153, 0.15);
    box-shadow: -0.05rem 0.08rem 0.13rem 0rem rgba(153, 153, 153, 0.15), 0rem 0rem 0.13rem 0rem rgba(153, 153, 153, 0.15);
    border-radius: 0.11rem;
    text-align: center;
  }

  .words_text {
    font-size: 0.32rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 0.45rem;
  }

  .task_addInfo button {
    width: 2.4rem;
    height: 0.75rem;
    border: none;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(250, 217, 97, 1)), to(rgba(247, 107, 28, 1)));
    background: linear-gradient(180deg, rgba(250, 217, 97, 1) 0%, rgba(247, 107, 28, 1) 100%);
    border-radius: 0.37rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 0.75rem;
    outline: none;
  }
}
</style>
