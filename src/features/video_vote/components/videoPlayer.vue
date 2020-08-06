<template lang="pug">
  div.video-player(
    @click.stop='handleClickPause'
  )
    video-player(
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @statechanged="playerStateChanged($event)"
    )
    div.video-ranking(v-show='isShowRanking') {{rankInfo.rank}}
</template>

<script>
import bus from '../bus'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
let timeout = null
export default {
  components: {
    videoPlayer
  },
  props: ['playerOptions', 'playerList', 'rankInfo'],
  data() {
    return {
      isShowRanking: true,
      play: false
    }
  },
  mounted() {
    bus.$emit('currentPlayer', {
      index: this.rankInfo.rank,
      player: this.$refs.videoPlayer.player
    })
  },
  methods: {
    onPlayerPlay() {
      this.isShowRanking = false
      this.playerList.map(item => {
        if (item.index !== this.rankInfo.rank && item.player.pause) {
          item.player.pause()
        }
      })
    },
    pauseChildVideo(target) {
      let pausePlayer = this.playerList.filter(item => item.index === target.rankInfo.rank)[0]
      pausePlayer && pausePlayer.player.pause && pausePlayer.player.pause()
    },
    handleClickPause(e) {
      // 点击时判断是否显示了控制条，没有显示显示控制条，显示了就暂停或者播放视频
      let ele = this.$refs.videoPlayer.$el.getElementsByClassName('video-js')[0]
      if (ele && (ele.className.indexOf('vjs-has-mine') > -1 || ele.className.indexOf('vjs-paused') > -1)) {
        if (e.target.parentNode.className.indexOf('vjs-vol') > -1) {
          return
        }
        if (this.play && this.$refs.videoPlayer.player.pause) {
          this.$refs.videoPlayer.player.pause()
        } else {
          this.$refs.videoPlayer.player.play()
        }
        return
      }
      this.showVideoControl()
    },
    playerStateChanged(target) {
      // 监听播放转台
      if (target.play) {
        this.play = true
        this.showVideoControl()
      } else if (target.pause) {
        this.play = false
      }
    },
    showVideoControl() {
      let ele = this.$refs.videoPlayer.$el.getElementsByClassName('video-js')[0]
      ele.className = ele.className + ' vjs-has-mine'
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        ele.className = ele.className.replace('vjs-has-mine', '')
      }, 3000)
    }
  }
}
</script>
<style lang="stylus">
.video-player
  position relative
  height 183px
  .video-ranking
    position absolute
    left 5px
    top 5px
    background #987AFB
    width 32px
    height 20px
    line-height 20px
    text-align center
    border 1px solid #ffffff
    border-radius 6px
    box-shadow 0px 0px 7px 0px rgba(52,13,184,1)
    color #ffffff
    font-size 16px
    font-weight 500
  .video-js
    // width 100%
    height 183px
  .vjs-poster
    background-size cover
  .vjs-big-play-button
    border none !important
    background url('../../../assets/video_vote/vote_player_icon.png') no-repeat center center/34px 34px
    left 50% !important
    top 50% !important
    transform translate(-50%, -50%) !important
    background-color transparent !important
    .vjs-icon-placeholder
      &:before
        content '' !important

.vjs-has-started.vjs-paused .vjs-big-play-button{
  display block
}
.vjs-poster{
  background-color transparent !important
  background url('../../../assets/video_vote/video_default.png') no-repeat center/100%
}
.video-js{
  background-color transparent !important
  background url('../../../assets/video_vote/video_default.png') no-repeat center/100%
}
.vjs-has-started.vjs-has-mine .vjs-control-bar{
  opacity 1 !important
}
*::-webkit-media-controls-panel {
  display: none!important;
  -webkit-appearance: none;
}

*::--webkit-media-controls-play-button {
  display: none!important;
  -webkit-appearance: none;
}


*::-webkit-media-controls-start-playback-button {
  display: none!important;
  -webkit-appearance: none;
}
</style>

