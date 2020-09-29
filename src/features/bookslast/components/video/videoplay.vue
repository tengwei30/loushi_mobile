<style scoped>
@import url("./videoplay.css");
</style>
<template>
  <div class="video_parent">
    <div id="video"></div>
  </div>
</template>

<script>
export default {
  name: 'videoplay',
  props: {
    videoobj: {
      vurl: '',
      pic: '',
      bg: require('@/assets/bookslast/bg.png')
    }
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      player: new Object()
    }
  },
  methods: {
    stop() {
      this.player.videoPause()
    },
    init() {
      // 挂载完成后进行
      var videoObject = {
        flashvars: {
          p: 1,
          e: 1
        },
        container: '#video', // 容器的ID或className
        variable: 'player', // 播放函数名称
        loaded: 'loadedHandler', // 当播放器加载后执行的函数
        loop: false, // 播放结束是否循环播放
        mobileAutoFull: false,
        autoplay: false,
        poster: this.videoobj.pic?this.videoobj.pic:'', // 封面图片
        // preview: {
        //   //预览图片
        //   file: [
        //     "static/ckplayer/material/mydream_en1800_1010_01.png",
        //     "static/ckplayer/material/mydream_en1800_1010_02.png"
        //   ],
        //   scale: 2
        // },
        config: '', // 指定配置函数
        debug: true, // 是否开启调试模式
        drag: 'start', // 拖动的属性
        seek: 0, // 默认跳转的时间
        promptSpot: [
          // 提示点
          {
            words: '提示点文字01',
            time: 30
          },
          {
            words: '提示点文字02',
            time: 150
          }
        ],
        video: [
          [this.videoobj.vurl, 'video/mp4', '中文标清', 0],
          [this.videoobj.vurl, 'video/mp4', '中文高清', 0],
          [this.videoobj.vurl, 'video/mp4', '英文高清', 10],
          [this.videoobj.vurl, 'video/mp4', '英文超清', 0]
        ]
      }
      // 定义一个对象
      this.player = new ckplayer(videoObject)
      // let that=this
      this.player.addListener('loadedmetadata', function() {
        // that.player.videoPlay();
      })
      document
        .getElementsByTagName('video')[0]
        .setAttribute(
          'style',
          'background-image: url(' + this.videoobj.bg + ')'
        )
    }
  }
}
</script>

