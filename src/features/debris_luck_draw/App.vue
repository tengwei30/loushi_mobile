<template lang="pug">
  .debris_luck_draw
    HeaderNav(
      title='抽奖赢碎片'
    )
      img.left_img(
        slot='left'
        src='../../assets/debris_luck_draw/nav_back.png'
      )
    .luck_draw_center
      img.draw_luck_bg(
        src='../../assets/debris_luck_draw/draw_luck_bg.png'
      )
      .luck_draw_notice 恭喜您抽中东北大米碎片～
      LuckyGrid.draw_luck(
        ref="luckyGrid"
        width="336px"
        height="295px"
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
          v-for='item in luckBtnsFilter' :key='item.text'
          @click='clickDrawLuckBtn(item)'
          :disabled='isClickedDrawBtn'
        )
          | {{item.text}}
    .rule
      .rule_title 活动规则：
      .rule_content
        | 活动规则：<br>
        | 1.每日可获得一次免费抽奖机会<br>
        | 2.免费抽奖次数用完后，可使用金币购买抽奖次数，30个金币购买1次抽奖，150金币购买6次。<br>
        | 3.中奖后系统会自动发放到您的账户中。<br>
        | 4.抽奖奖项包括：5G手机碎片1枚，金条碎片1枚，纳丽丝洗衣液碎片1枚，纸抽碎片1枚，金龙鱼调和油+香米套装碎片1枚，洗碗巾碎片1枚，幸福相约沐浴露碎片1枚，牙膏碎片1枚，VIP碎片1枚，100金币碎片1枚，50枚金币碎片1枚，20金币。<br>
        | 5.抽奖一旦完成，不可取消，抽奖金币不予退还。<br>
    .draw_pop(v-show='isShowPrize')
      .draw_pop_content
        .draw_pop_bg
        .draw_pop_text
         | 恭喜你抽中{{rewardPrize.title}} 碎片碎片碎片
        .draw_pop_btn(@click='closePrizePop') 知道了

</template>

<script>
// 解决移动端button不能点击端问题(定一个全局函数是为了解决重复定义事件问题)
function touchstartFun() {}
import HeaderNav from '@/components/HeaderNav'
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
          id: 1,
          fonts: [{ text: '20个金币', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 1, y: 0,
          id: 2,
          fonts: [{ text: '1个手机碎片', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 2, y: 0,
          id: 3,
          fonts: [{ text: '1吸尘器碎片', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 3, y: 0,
          id: 4,
          fonts: [{ text: '谢谢参与', top: '68%', fontSize: '0', }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '25%' }],
        },
        {
          x: 3, y: 1,
          id: 5,
          fonts: [{ text: '1个电脑碎片', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 3, y: 2,
          fonts: [{ text: '谢谢参与', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 3, y: 3,
          fonts: [{ text: '谢谢参与', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 2, y: 3,
          fonts: [{ text: '1个星球币', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 1, y: 3,
          fonts: [{ text: '1个星球币', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 0, y: 3,
          fonts: [{ text: '5个星球币', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 0, y: 2,
          fonts: [{ text: '5个星球币', top: '68%' }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%', top: '12%' }],
        },
        {
          x: 0, y: 1,
          fonts: [{ text: '谢谢参与', top: '15%', fontSize: '0', fontColor: 'red', letterSpacing: 20 }],
          imgs: [{ src: require('../../assets/debris_luck_draw/default.png'), activeSrc: require('../../assets/debris_luck_draw/active.png'), width: '100%', height: '100%' }, { src: require('../../assets/debris_luck_draw/icon_thanks.png'), height: '50%',  top: '25%' }],
        },
      ],
      button: {
        x: 1, y: 1,
        col: 2,
        row: 2,
        fonts: [{ text: '每日免费抽1次', fontSize: '14', fontColor: '#FFBA35', top: '90%' }],
        imgs: [{ src: require('../../assets/debris_luck_draw/draw_center_icon.png'), width: '100%' }]
      },
      defaultConfig: {
        gutter: 6
      },
      defaultStyle: {
        fontColor: 'rgba(244, 57, 57, 1)',
        fontSize: '12px',
      },
      activeStyle: {
      },
      opacity: 0,
      luckBtns: [
        {
          text: '免费抽1次',
          type: 1
        },
        {
          text: '30金币抽1次'
        }
      ],
      btnType: 1, // 点击按钮的类型
      isShowPrize: false, // 是否显示奖励弹窗
      rewardList: [], // 获奖列表
      rewardPrize: {}, // 弹窗显示的奖品
      isClickedDrawBtn: false, // 是否允许点击抽奖按钮,在抽奖过程中不允许点击,
      count: 1
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
      }
    },
    // 点击抽奖
    clickDrawLuckBtn(target) {
      // 当奖品弹窗弹出才允许再次抽奖
      if (this.isClickedDrawBtn) {
        return
      }
      this.isClickedDrawBtn = true
      this.btnType = target.type
      if (this.btnType === 3) {
        this.rewardList = [
          {
            id: 1,
            title: '20金币'
          }, {
            id: 2,
            title: '1个手机碎片'
          }, {
            id: 3,
            title: '1个吸尘器碎片'
          }, {
            id: 4,
            title: '很遗憾并未获奖'
          }
        ]
      } else {
        this.rewardList = [
          {
            id: 5,
            title: '1个电脑碎片'
          }
        ]
      }
      this.startCallBack()
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
      setTimeout(() => {
        this.$refs.luckyGrid.stop(index)
      }, 3000)
    },
    // 关闭奖品弹窗(点击关闭弹窗，如果获奖列表还有数据，会继续转盘弹窗，奖励其实已经全部发放)
    closePrizePop() {
      this.isShowPrize = false
      if (this.rewardList.length > 0) {
        this.startCallBack()
      }
    },
  },
  computed: {
    luckBtnsFilter() {
      // 过滤抽奖按钮1，当免费抽奖次数还有时只显示免费抽奖的按钮，居中显示
      let btnRes = this.luckBtns.filter(item => item.type === 1)
      return btnRes.length > 0 ? btnRes : this.luckBtns
    }
  },
  mounted() {

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