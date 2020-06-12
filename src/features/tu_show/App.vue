<template lang="pug">
#app
  header
    img.avator(src="")
    span.name wangming
  main
    swiper(ref="mySwiper" :options="swiperOptions")
      swiper-slide(style="background: red") 1
      swiper-slide 2
      swiper-slide 3
      swiper-slide 4
      swiper-slide 5
  footer
    ul
      li(v-for="item in navdatas")
        img(:src="item.imgurl")
        p.desc {{ item.desc }}
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: false,
        speed: 3000,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: true,
          disableOnInteraction: false,
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
      }]
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
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './index.styl'
</style>
