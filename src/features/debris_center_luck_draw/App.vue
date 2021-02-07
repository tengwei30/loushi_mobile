<template lang="pug">
  .debris_luck_draw
    HeaderNav(
      title='抽奖赢碎片'
    )
      img.left_img(
        slot='left'
        src='../../assets/debris_luck_draw/nav_back.png'
        @click='nvaBack'
      )
    .luck_draw_center
      img.draw_luck_bg(
        src='../../assets/debris_luck_draw/draw_luck_bg.png'
      )
      .luck_draw_notice 参与抽奖，抽取珍惜碎片～
      LuckyGrid.draw_luck(
        ref="luckyGrid"
        rows="4"
        cols="4"
        :blocks="blocks"
        :prizes="prizes"
        :button="button"
        :defaultConfig="defaultConfig"
        :defaultStyle="defaultStyle"
        :activeStyle="activeStyle"
        @end="endCallBack"
      )
      .btn_box(
        :class="{'free_draw_btn': luckBtnsFilter.length === 1}"
      )
        button.draw_luck_btn(
          v-for='item in luckBtnsFilter' :key='item.type'
          @click='clickDrawLuckBtn(item)'
          :disabled='isClickedDrawBtn'
        )
          template(v-if='item.type === 3') {{rewardList.length === 0 ? item.name : ('剩余抽奖次数' + rewardList.length)}}
          template(v-else) {{item.name}}
    .rule
      .rule_title 活动规则：
      .rule_content(v-html='ruleContent')
    .draw_pop(v-show='isShowPrize && rewardPrize')
      .draw_pop_content
        .draw_pop_bg(v-if='rewardPrize.type !== 3')
        .draw_pop_text(v-if='rewardPrize.type !== 3')
         | 恭喜你抽中{{rewardPrize.title + '+' + rewardPrize.rewardNum}}
        .draw_pop_text.draw_pop_text_thanks(v-else)
         | {{rewardPrize.title}}
        .draw_pop_btn(@click='closePrizePop') {{rewardList.length === 0 ? '知道了' : '继续抽奖'}}

</template>

<script>
import bk from 'bayread-bridge'
// 解决移动端button不能点击端问题(定一个全局函数是为了解决重复定义事件问题)
function touchstartFun() {}
import HeaderNav from '@/components/HeaderNav'
import { getPrizeListFetch, drawAwardFetch } from './request'
import { getQueryString, nBuryPoint } from '@/utils'
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      blocks: [
        { padding: '11px 5px', background: 'rgba(244, 57, 57, 1)', borderRadius: '8px' },
      ],
      prizes: [
        {
          x: 0, y: 0,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 1, y: 0,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 2, y: 0,
          id: 3,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 3, y: 0,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 3, y: 1,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 3, y: 2,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 3, y: 3,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 2, y: 3,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 1, y: 3,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 0, y: 3,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 0, y: 2,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
        {
          x: 0, y: 1,
          fonts: [],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }],
        },
      ],
      button: {
        x: 1, y: 1,
        col: 2,
        row: 2,
        fonts: [{ text: '每日免费抽1次', fontSize: '0.37rem', fontColor: '#FFBA35', top: '90%' }],
        imgs: [{ src: require('../../assets/debris_luck_draw/draw_center_icon.png'), width: '100%' }]
      },
      defaultConfig: {
        gutter: 6,
        accelerationTime: 500,
        decelerationTime: 1500
      },
      defaultStyle: {
        fontColor: 'rgba(244, 57, 57, 1)',
        fontSize: '0.32rem',
      },
      activeStyle: {
      },
      opacity: 0,
      luckBtns: [],
      btnType: 1, // 点击按钮的类型
      isShowPrize: false, // 是否显示奖励弹窗
      rewardList: [], // 获奖列表
      rewardPrize: {}, // 弹窗显示的奖品
      isClickedDrawBtn: false, // 是否允许点击抽奖按钮,在抽奖过程中不允许点击,
      ruleContent: ''
    }
  },
  methods: {
    // 奖励函数
    endCallBack(prize) {
      console.log(prize, this.btnType)
      this.isClickedDrawBtn = false
      this.isShowPrize = true
      if (this.btnType === 1) {
        // 点击免费抽奖后，重新调用页面接口获取信息
        this.luckBtns = [
          {
            text: '30金币抽1次'
          },
          {
            text: '150金币抽6次',
            type: 3
          }
        ]
        this.init()
      }
    },
    // 点击抽奖
    async clickDrawLuckBtn(target) {
      if (target.enable != 1) {
        return
      }
      // 当奖品弹窗弹出才允许再次抽奖
      if (this.isClickedDrawBtn) {
        return
      }
      nBuryPoint('H5_DEBRIS_LUCK_DRAW_CLICK', {
        activityId: getQueryString('activityId'),
        type: target.type
      })
      this.isClickedDrawBtn = true
      this.btnType = target.type
      let res = await drawAwardFetch(target.type)
      if (res.code === 100) {
        this.rewardList = res.data ? res.data.fragmentPrizeLotteryDrawItemVOList : []
        if (target.type === 1) {
          this.init()
        }
        this.startCallBack()
      }
    },
    // 抽奖开始(将接口返回的获奖列表逐个弹窗)
    startCallBack() {
      this.isClickedDrawBtn = true
      this.rewardPrize = this.rewardList.shift()
      let index = this.prizes.findIndex(item => item.id === this.rewardPrize.id)
      if (index < 0) {
        return
      }
      this.$refs.luckyGrid.play()
      this.$refs.luckyGrid.stop(index)
    },
    // 关闭奖品弹窗(点击关闭弹窗，如果获奖列表还有数据，会继续转盘弹窗，奖励其实已经全部发放)
    closePrizePop() {
      this.isShowPrize = false
      if (this.rewardList.length > 0) {
        this.startCallBack()
      }
    },
    // 返回上一页面
    nvaBack() {
      bk.call('closePageNative')
    },
    // 初始化页面
    async init(activityId) {
      let res = await getPrizeListFetch(activityId)
      if (res.code === 100 && res.data) {
        this.dealPrizeList(res.data.fragmentPrizeLotteryDrawItemVOList)
        this.luckBtns = res.data.fragmentPrizeLotteryDrawTypeVOList
        this.ruleContent = res.data.rule
      }
    },
    // 处理获得的奖品列表
    dealPrizeList(data) {
      this.prizes.map((item, index) => {
        let current = data[index]
        let text = current.title
        text = text + (current.rewardNum === 0 ? '' : `+${current.rewardNum}`)
        if (current.img) {
          item.imgs.push({
            src: current.img,
            height: '50%',
            top: '12%'
          })
          item.fonts.push({
            text,
            fontSize: '0.27rem',
            top: '68%'
          })
        } else {
          item.fonts.push({
            text,
            fontSize: '0.53rem',
            top: '12%',
            lengthLimit: '70%'
          })
        }
        item.id = current.id
      })

      return data
    }
  },
  computed: {
    luckBtnsFilter() {
      // 过滤抽奖按钮1，当免费抽奖次数还有时只显示免费抽奖的按钮，居中显示
      let btnRes = this.luckBtns.filter(item => item.type === 1)
      return btnRes.length > 0 ? btnRes : this.luckBtns
    }
  },
  mounted() {
    this.init(getQueryString('activityId'))
    nBuryPoint('H5_DEBRIS_LUCK_DRAW', {
      activityId: getQueryString('activityId')
    })
  },
  created() {
    document.addEventListener('touchstart', touchstartFun, false)
  },
  watch: {
    isShowPrize() {
      if (this.isShowPrize) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    isClickedDrawBtn() {
      if (this.isClickedDrawBtn) {
        document.removeEventListener('touchstart', touchstartFun, false)
      } else {
        document.addEventListener('touchstart', touchstartFun, false)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>