<template lang="pug">
#Sign
  .sign__num
    h4 已签到5天
  rivet.rivet-left
  rivet.rivet-right
  ul.sign__days
    li(
      v-for="item in signdays"
    )
      span {{ item.day }}
      span.icon
        img(src="../../../assets/task/gold_coin_false.png")
      span(:class="item.is_finish?'item-true':'item-false'") +{{ item.gold }}
  .retro_content(v-if="isShow")
    .retro_top
      h4.retro_charge_title(v-if="entrolists.length!==0") 有补签机会
      p.retro_sign_list(:style="entrolists.length !== 0 ? 'textAlign:right' : ''",@click="gotoSignRecord()") 连续签到记录 &gt;
    ul.retro_bottom(:style="entrolists.length!==3?'justifyContent:space-around':'justifyContent:space-between'",v-show="entrolists.length!==3")
      li(
        v-for="item in entrolists"
        :style="item.status===0?retroStyleNoSign:retroStyleSign"
        @click="submitRetro(item)"
      )
        p.retro_bottom_date {{momenMonth(item.time)}}月{{momentDay(item.time)}}日
        p.retro_bottom_repeat
          span.retro_bottom_repeat_img(v-if="item.status===0")
            img(src="../../../assets/task/video_icon@3x.png")
          span {{item.status===0?'补签':item.status===1?'补签成功':'明日再来'}}
</template>
<script>
import moment from 'moment'
import rivet from '../../../icons/rivet.vue'
export default {
  props: {
    signday: {
      type: Array,
      default: []
    }
  },
  components: {
    rivet,
  },
  data() {
    return {
      signdays: [
        {
          day: '第一天',
          is_finish: false,
          num: 0,
          gold: 10,
        },
        {
          day: '第二天',
          is_finish: false,
          num: 0,
          gold: 20,
        },
        {
          day: '第三天',
          is_finish: false,
          num: 0,
          gold: 30,
        },
        {
          day: '第四天',
          is_finish: false,
          num: 0,
          gold: 40,
        },
        {
          day: '第五天',
          is_finish: false,
          num: 0,
          gold: 50,
        },
        {
          day: '第六天',
          is_finish: false,
          num: 0,
          gold: 60,
        },
        {
          day: '第七天',
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
      isShow: true,
      entrolists: []
    }
  },
  methods: {
    gotoSignRecord() {
      console.log('23')
    },
    submitRetro() { },
    momenMonth(time) {
      return moment(time).format('MM')
    },
    momentDay(time) {
      return moment(time).format('DD')
    },
  }
}
</script>
<style lang="stylus">
@import '../../../styles/index.styl';

#Sign {
  width: 100%;
  min-height: 3.52rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;

  .sign__num {
    background: #6388FE;
    height: 38px;
    line-height: 38px;
    border-radius: 4px 4px 0 0;

    h4 {
      text-align: center;
      font-size: 14px;
      color: #ffffff;
    }
  }

  .rivet-left {
    size(0.26rem, 0.69rem);
    position: absolute;
    top: 0.67rem;
    left: 1.7rem;
    z-index: 2;
  }

  .rivet-right {
    size(0.26rem, 0.69rem);
    position: absolute;
    top: 0.67rem;
    right: 1.7rem;
    z-index: 2;
  }

  .sign__days {
    height: 94px;
    display: flex;
    margin: 15px 15px 0;
    box-sizing: border-box;
    border-bottom: 1px dashed #e9e9e9;

    li {
      flex: 1;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        size(30px 30px);
        margin: 6px 0;

        img {
          width: 100%;
        }
      }
    }

    li span:first-child {
      color: #666;
    }
  }

  .retro_content {
    min-height: 1.25rem;
  }

  .retro_top {
    width: 100%;
    float: left;
    padding: 0.32rem 0.4rem;

    .retro_charge_title {
      color: #333333;
      font-size: 0.45rem;
      line-height: 0.64rem;
      font-weight: bold;
      float: left;
    }

    .retro_sign_list {
      font-size: 0.35rem;
      color: #333333;
      line-height: 0.48rem;
      padding-top: 0.08rem;
      text-align: center;
    }

    .retro_bottom {
      clear: both;
      display: flex;
      flex-direction: row;
      padding: 0rem 0 0.53rem 0;
      justify-content: space-between;
    }

    .retro_bottom li {
      width: 2.35rem;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 0.4rem;
      font-weight: 500;
      line-height: 0.56rem;
      height: 1.68rem;
      position: relative;
    }

    .retro_bottom_date {
      columns: #000000;
      position: absolute;
      top: 0.245rem;
      left: 0;
      right: 0;
      text-align: center;
    }

    .retro_bottom_repeat {
      color: #FFFFFF;
      position: absolute;
      top: 0.96rem;
      left: 0;
      right: 0;
      text-align: center;
    }

    .retro_bottom_repeat_img {
      width: 0.6rem;
      height: 0.39rem;
      display: inline-block;
    }
  }
}
</style>
