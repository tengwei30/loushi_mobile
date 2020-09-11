<template lang="pug">
#parent.bookslast-container
  .bookslast-header
    Urge(
      v-if="bookInfo.isSerial === 1 && mId === ''"
      :endInfo="endInfo"
      v-on:urgeforbook="urgeforbook")
    FreeVip(
      v-if="bookInfo.isSerial === 0 && mId === ''"
      :bookInfo="bookInfo"
      :vipExperienceCardInfoControl="vipExperienceCardInfoControl"
      :endInfo="endInfo"
      :mId="mId"
      v-on:receiveforbook="receiveforbook"
      )
    Score(
      v-if="platform !== 51"
      :endInfo="endInfo"
      v-on:commentHandler="commentHandler"
      v-on:rewardHandler="rewardHandler"
    )
</template>

<script>
export default {
  components: {
    Urge: () => import('./components/Urge.vue'),
    FreeVip: () => import('./components/FreeVip.vue'),
    Score: () => import('./components/Score.vue')
  },
  data() {
    return {
      endInfo: {
        urgeInfo: {
          status: 0
        }
      },
      platform: localStorage.getItem('platformId') || 5
    }
  },
  methods: {},
  mounted() {
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
