<template lang="pug">
#Sign
  .sign__num
    .sign_date
      span.sign_tip 已签到
      span.color_tip {{days}}天
    .sign_record(v-if="isShow",@click="gotoSignRecord()") 连续签到记录 &gt;
  ul.sign__days
    li(
      v-for="item in signLists"
    )
      span.icon(:class="item.is_finish?'item-true':'item-false'")
        //- img(src="../../../assets/task/gold_coin_false.png")
        span.number_count +{{ item.gold }}
      span {{ item.day }}
  .toast(v-if='toastShow')
     span {{errortext}}
</template>
<script>
import moment from 'moment'
export default {
  props: {
    signday: {
      type: Array,
      default: []
    }
  },
  components: {
  },
  data() {
    return {
      signLists: [
        {
          day: '1天',
          is_finish: false,
          num: 0,
          gold: 10,
        },
        {
          day: '2天',
          is_finish: false,
          num: 0,
          gold: 20,
        },
        {
          day: '3天',
          is_finish: false,
          num: 0,
          gold: 30,
        },
        {
          day: '4天',
          is_finish: false,
          num: 0,
          gold: 40,
        },
        {
          day: '5天',
          is_finish: false,
          num: 0,
          gold: 50,
        },
        {
          day: '6天',
          is_finish: false,
          num: 0,
          gold: 60,
        },
        {
          day: '7天',
          is_finish: false,
          num: 0,
          gold: 70,
        },
      ],
      retroStyleNoSign: {
        backgroundImage: `url(${require('../../../assets/task/buqianbeijing@3x.png')})`
      },
      retroStyleSign: {
        backgroundImage: `url(${require('../../../assets/task/huibeijing@3x.png')})`
      },
      isShow: false,
      entrolists: [],
      appVersion: localStorage.getItem('version'),
      days: 0,
      clickFlag: true,
      taskId: 1,
      isloading: false,
      toastShow: false,
      errortext: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      let day = this.signday[0].extraData
      if (!day) return
      if (day && day.alert && day.gold) {
        this.$emit('finishpopu', '签到任务完成', day.gold)
      }
      if (day && day.hasOwnProperty('checkInDays')) {
        this.isShow = true
        this.isloading = false
      }
      this.entrolists = this.signday[0].extraResultList
      this.days = day && day.checkInDays
      this.taskId = this.signday[0].id
      for (let i = 0; i < this.signLists.length; i++) {
        let data = this.signLists[i]
        if (i < day.weekCheckInDays) {
          data.is_finish = true
        }
        data.num = parseInt(day.startWeekGold) + i * 10
      }
    })

  },
  methods: {
    gotoSignRecord() {
      if (this.clickFlag) {
        const url = `${window.location.href}signrecord?taskId=${this.taskId}`
        window.location.href = `breader://common/browser?url=${encodeURIComponent(url)}`
        this.clickFlag = false
      }
      setTimeout(() => {
        this.clickFlag = true
      }, 1000)
    },
    submitRetro() { },
    momenMonth(time) {
      return moment(time).format('MM')
    },
    momentDay(time) {
      return moment(time).format('DD')
    }
  }
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';

#Sign {
  width: 100%;
  min-height: 3.52rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 5px 5px 8px 0px rgba(255, 119, 65, 0.05), -5px 5px 8px 0px rgba(255, 119, 65, 0.05);
  position: relative;
  border-radius: 12px;
  padding: 0px 5px;
  box-sizing: border-box;

  .sign__num {
    padding: 20px 5px;
    border-bottom: 1px dashed rgba(215, 216, 215, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sign_date {
    font-size: 0px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333;

    span {
      font-size: 16px;
    }

    .color_tip {
      color: #E91A0E;
    }
  }

  .sign_record {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    line-height: 17px;
  }

  .sign__days {
    height: 94px;
    display: flex;
    margin: 15px 15px 0;
    box-sizing: border-box;

    li {
      flex: 1;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        size(40px 40px);
        margin: 6px 0;
        position: relative;

        img {
          width: 100%;
        }
      }
    }

    li>span:last-child {
      color: #666;
    }

    .item-true {
      background: #FBE945;
      border-radius: 50%;
    }

    .item-false {
      background: #D6D6D6;
      border-radius: 50%;

      .number_count {
        text-shadow: none;
      }
    }

    .number_count {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      text-shadow: 0px 1px 1px rgba(251, 177, 27, 1);
    }
  }
}

.toast {
  display: flex;
  justify-content: center;
  align-items: center;
  fixed(top 0 bottom 0 left 0 right 0);
  z-index: 9999;
  font-weight: bold;
  max-width: 80%;
  margin: 0 auto;

  span {
    font-size: 14px;
    padding: 5px 25px;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    border-radius: 15px;
  }
}
</style>
