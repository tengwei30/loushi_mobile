<template lang="pug">
#app
  header.tu__header
    img.avator(:src="avatarUrl")
    span.name {{ nickname }}
  main.tu__main(@click="clickDoc()")
    swiper(ref="mySwiper" :options="swiperOptions")
      swiper-slide(v-for="item in imgs")
        img(:src="item")
  .tu__space
  transition(name="fade")
    .tu__footer(v-if="isshow")
      .content
        p.number_all
          span {{ currentIndex }}
          | /
          span {{ imgs && imgs.length || 0 }}
          | {{ title }}
        p.icon
          span(v-for="item in tags") # {{ item }}
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
import axios from 'axios'
import { getQueryString } from '@/utils/url'
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
          slideChangeTransitionStart() {
            console.log('我是的开始的打印', this, this.isEnd)
          },
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
      navdatas: [
        {
          imgurl: require('@/assets/tu_show/dianzan-5@2x.png'),
          desc: '0'
        }, {
          imgurl: require('@/assets/tu_show/SBitmap@2x.png'),
          desc: '0'
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
        }
      ],
      isshow: true,
      currentIndex: 1,
      isGuide: true,
      imgs: [],
      nickname: null,
      avatarUrl: null,
      title: null,
      tags: [],
      uid: getQueryString('uid') || 1,
      pid: getQueryString('pid') || 2
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
    },
  },
  mounted() {
    axios({
      method: 'POST',
      url: '/pixiv_tumeng/works/preview',
      data: {
        uid: this.uid,
        pid: this.pid
      }
    }).then(res => {
      const { nickname, title, tags, avatarUrl, images, tumengStars, tumengComments } = res.data.data
      this.imgs = images
      this.nickname = nickname
      this.title = title
      this.avatarUrl = avatarUrl
      this.tags = tags
      this.navdatas[0].desc = tumengStars
      this.navdatas[1].desc = tumengComments
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './index.styl'
</style>
