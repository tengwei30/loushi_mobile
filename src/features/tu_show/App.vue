<template lang="pug">
#app
  header
    img.avator(src="")
    span.name wangermaziaaaaa
  main(@click="clickDoc()")
    swiper(ref="mySwiper" :options="swiperOptions")
      swiper-slide(style="background: red")
        h2 1
      swiper-slide
        h2 2
      swiper-slide
        h2 3
      swiper-slide
        h2 4
      swiper-slide
        h2 5
  .space
  transition(name="fade")
    footer(v-if="isshow")
      .content
        p.number_all
          span {{ currentIndex }}
          | /
          span 5
          | 【お仕事】PRECIOUS DAYS
        p.icon
          span #icon
          span #font
          span #文案
      ul
        li(v-for="item in navdatas")
          img(:src="item.imgurl")
          p.desc {{ item.desc }}
  .Modal(v-show="isGuide")
    //- img(src="@/assets/tu_show/float@2x.png")
    .btn(@click="ledModal()")
      p Got it
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  data() {
    const _this = this
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'fraction'
        },
        loop: false,
        speed: 300,
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: true,
        //   disableOnInteraction: false,
        // },
        on: {
          // slideChangeTransitionStart() {
          //   console.log('我是的开始的打印', this.isEnd)
          // },
          slideChangeTransitionEnd() {
            _this.currentIndex = this.realIndex * 1 + 1
            if (this.realIndex * 1 === 0) {
              _this.$showToast('This is the first illustration', '2000')
            }
            if (this.isEnd) {
              _this.$showToast('This is the last illustration', '2000')
            }
          }
        }
      },
      navdatas: [{
        imgurl: require('@/assets/tu_show/dianzan-5@2x.png'),
        desc: '222'
      }, {
        imgurl: require('@/assets/tu_show/SBitmap@2x.png'),
        desc: '333'
      }, {
        imgurl: require('@/assets/tu_show/fenxiang@2x.png'),
        desc: '分享'
      }, {
        imgurl: require('@/assets/tu_show/shoucang@2x.png'),
        desc: '收藏'
      }, {
        imgurl: require('@/assets/tu_show/sanjiao_right@2x.png'),
        desc: '下一组'
      }, {
        imgurl: require('@/assets/tu_show/Bitmap@2x.png'),
        desc: '弹幕'
      }],
      isshow: true,
      currentIndex: 1,
      isGuide: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    clickDoc() {
      this.isshow = !this.isshow
    },
    ledModal() {
      this.isGuide = false
    }
  },
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './index.styl'
</style>
