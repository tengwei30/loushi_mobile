<template lang="pug">
  div.video-player
    video-player(
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
    )
    div.video-ranking(v-show='isShowRanking') {{index+1}}
</template>

<script>
import bus from '../bus'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  props: ['playerOptions', 'index', 'playerList'],
  data() {
    return {
      isShowRanking: true
    }
  },
  mounted() {
    bus.$emit('currentPlayer', {
      index: this.index,
      player: this.$refs.videoPlayer.player
    })
  },
  methods: {
    onPlayerPlay() {
      this.isShowRanking = false
      this.playerList.map(item => {
        item.index !== this.index && item.player.pause()
      })
    }
  }
}
</script>
<style lang="stylus">
.video-player
  position relative
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
    // height 115px
  .vjs-poster
    background-size cover
  .vjs-big-play-button
    border none
    background url('../../../assets/video_vote/vote_player_icon.png') no-repeat center center/34px 34px
    left 50%
    top 50%
    transform translate(-50%, -50%)
    background-color transparent !important
    .vjs-icon-placeholder
      &:before
        content '' !important
</style>