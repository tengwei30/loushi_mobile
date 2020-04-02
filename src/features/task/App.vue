<template lang="pug">
#app(v-if="showFlag")
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
  Modal(v-if="showAdModal" @goReadAd="goReadAd" @closeModal="closeModal")
</template>

<script>
import Sign from './components/sign'
import AdTab from './components/adTab'
import AdImg from './components/adImg'
import TaskList from './components/taskList'
import Modal from './components/modal'
import { post } from '@/config/axios.config'
export default {
  components: {
    Sign,
    AdTab,
    AdImg,
    TaskList,
    Modal
  },
  data() {
    return {
      newlists: [],
      daylists: [],
      tasklist1: [],
      tasklist2: [],
      tasklist4: [],
      tasklist5: [],
      showFlag: false,
      signday: [{}],
      showNewTask: true,
      showInfo: true,
      showAdModal: false,
      timer: null,
      appVersion: localStorage.getItem('version')
    }
  },
  created() {
    this.getTask130()
    this.showNewTask = true
  },
  methods: {
    // gettasks(task_type) {
    //   // 获取任务列表 task_type 1 -- 新人任务 2 -- 日常任务  3 -- 签到任务
    //   return post('/api/task/v1/task/list', {
    //     task_type,
    //   })
    // },
    goReadAd() {
      setTimeout(() => {
        this.showAdModal = false
      }, 1500)
      if (this.appVersion < 1.35) {
        window.location.href = 'breader://action/luckyPrize?new=0'
        this.getTaskLoad()
        setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
        }, 600000)
        return
      } else {
        window.location.href = 'breader://action/luckyPrize?new=1'
      }
    },
    closeModal() {
      this.showAdModal = false
    },
    getTaskLoad() { // 轮训接口
      const _this = this
      post('/task_api/task/canCompleteTask', { type: 3 }).then(res => {
        if (res) {
          _this.signday = []
          setTimeout(() => {
            _this.getTask130()
          }, 0)
          location.reload()
          clearTimeout(_this.timer)
          return
        }
        _this.timer = setTimeout(() => {
          this.getTaskLoad()
          clearTimeout(_this.timer)
        }, 5000)
      })
    },
    getTask130() {
      post('/task_api/task/list')
        .then(res => {
          let response = res.data
          this.signday = response.filter(item => item.type === 3)
          if (Number(this.signday[0].extraData.conditionStatus) === 2) {
            this.showInfo = true
          } else {
            this.showInfo = false
          }
          if (this.signday[0].extraData.dialog) {
            this.showAdModal = true
          } else {
            this.showAdModal = false
          }
          const daylists = response
            .filter(item => item.type === 2)
            .map(item => {
              if (item.id !== 20 && item.isFinish === 1) {
                item.buttonHint = '已完成'
              }
              return item
            })
          this.tasklist1 = response.filter(item => item.type === 1 && item.isFinish === 0)
          this.tasklist4 = response.filter(item => item.type === 7)
          const adDatas = response.filter(item => item.type === 8)
          // 两位置广告
          const data = JSON.parse(adDatas[0].extraResult)
          this.tasklist5 = data.filter(item => item.type === 1)
          if (this.tasklist5.length === 2) {
            return this.tasklist5
          }
          let adPosTwo = []
          data.filter(item => {
            if (item.type === 2) {
              adPosTwo.push(item.adPos)
            }
          })
          if (adPosTwo.length !== 0) {
            const adStr = adPosTwo.join(',')
            this.getAds(adStr).then(res => {
              if (res.adInfoList) {
                res.adInfoList.map(item => {
                  if (item.adList.length !== 0) {
                    this.tasklist5.push({
                      ...item.adList[0].opAdInfo,
                      adPos: item.adPos,
                      advertiserId: item.adList[0].advertiserId
                    })
                  }
                })
              }
            })
          }
          let adPos = []
          response.filter(item => {
            if (item.type === 6) {
              JSON.parse(item.extraResult).map(val => {
                adPos.push(val.adPos)
              })
            }
          })
          if (adPos.length !== 0) {
            const adStr = adPos.join(',')
            this.getAds(adStr)
              .then(res => {
                if (res.adInfoList) {
                  return res.adInfoList
                }
              })
              .then(res => {
                let data = []
                if (res) {
                  res.map(item => {
                    if (item.adList && item.adList.length !== 0) {
                      data.push(item.adList[0])
                    }
                  })
                  return data
                }

              })
              .then(res => {
                this.tasklist2 = daylists.concat(res)
              })
          } else {
            this.tasklist2 = daylists
          }
          this.showFlag = true
        })
        .catch(err => {
          console.error('error --------->', err)
        })
    },
    getAds(adPosList) {
      // 获取广告
      return post('/api/ad/adInfoList', {
        supportAdvertiser: 10,
        adPosList,
        pageSize: 1
      })
    }
  },
  mounted() {
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';

html, body {
  size(100%, 100%);
}

#app {
  padding: 20px 10px;
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
