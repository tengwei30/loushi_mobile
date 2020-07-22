<template lang="pug">
  div.video-item
    div.video-item-player
      video-player(:playerOptions='playerOptions'
      :index='index'
      :playerList='playerList')
    div.video-item-tip
      div.video-item-left
        | 最强天意:&nbsp;
        span 55566获票
      div.video-item-vote(@click='handleToggleShowVote') 投票
</template>
<script>
import VideoPlayer from './videoPlayer'
export default {
  components: {
    VideoPlayer
  },
  props: ['index', 'playerList'],
  data() {
    return {
      playerOptions: {
        height: 115,
        width: 325,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        aspectRatio: '325:115',
        sources: [{
          type: 'video/mp4',
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
        }],
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594966636007&di=ed47d28a65512ac19f89d26cf323aa54&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg'
      }
    }
  },
  methods: {
    handleToggleShowVote() {
      this.$emit('handleToggleShowVote')
    }
  }
}
</script>
<style lang="stylus">
.video-item
  width 345px
  height 167px
  box-sizing border-box
  background #ffffff
  border-radius 6px
  padding 6px 10px
  margin 0 auto 20px
  .video-item-player
    width 100%
    height 115px
    border-radius 3px
    overflow hidden
  .video-item-tip
    display flex
    justify-content space-between
    margin-top 10px
    .video-item-left
      font-size 15px
      color #333333
      span
        font-size 12px
        color #8174FB
    .video-item-vote
      width 72px
      height 26px
      line-height 26px
      color #ffffff
      background #8174FB
      border-radius 26px
</style>