<template lang="pug">
div
  .vote-pop(v-if='!isShowSuccess')
    div.vote-pop-container(v-show='showFlag === 1')
      div.vote-pop-header 支持票
      div.vote-pop-close(@click='handleToggleShowVote')
      div.vote-pop-content
        div.vote-pop-toggle-num
          div.vote-pop-delete(
            @click='toggleVoteCounts(-1)'
            :class="{'vote-pop-disabled': voteCount === 0}")
          | {{voteCount}}张
          div.vote-pop-add(@click='toggleVoteCounts(1)'
          :class="{'vote-pop-disabled': voteCount === maxVoteCount}")
        div.vote-pop-toggle-tip 当日有效
        div.vote-pop-bottom
          | 拥有{{maxVoteCount}}张支持票
          span.vote-pop-get-votes-tip(@click='setShowNum(3)') 点击获得更多支持票
          span.vote-pop-vote-btn(@click='handleVoteNow') 立即投票
    div.vote-pop-container(v-show='showFlag === 2')
      div.vote-pop-header 支持票
      div.vote-pop-close(@click='handleToggleShowVote')
      div.vote-pop-content
        div.vote-pop-no-tip 您暂无支持票
        div.vote-pop-no-btn(@click='setShowNum(3)') 立即领取
        div.vote-pop-toggle-tip 当日有效
        div.vote-pop-bottom
          | 拥有0张支持票
    div.vote-pop-container(v-show='showFlag === 3')
      div.vote-pop-header 做任务得支持票
      div.vote-pop-close(@click='handleToggleShowVote')
      div.vote-pop-content
        div.vote-pop-task-item(v-for='item in taskList'
        :key='item')
          div.vote-task-item-left
            div.vote-task-item-title 每日支持票
            div.vote-task-item-desc 每天可领取2张
          div.vote-task-item-btn(:class="{'already-get-award': true}")
            | 领取
  vote-success(v-else
  @handleToggleShowVote='handleToggleShowVote')
</template>
<script>
import VoteSuccess from './voteSuccess'
export default {
  components: {
    VoteSuccess
  },
  data() {
    return {
      showFlag: 1,
      taskList: [1, 2, 3, 4, 5],
      isShowSuccess: false,
      voteCount: 0, // 投递的票数
      maxVoteCount: 0, // 拥有的票数
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.maxVoteCount = 10
      this.voteCount = this.maxVoteCount
    },
    toggleVoteCounts(target) {
      if (target < 0 && this.voteCount > 0) {
        this.voteCount -= 1
      }
      if (target > 0 && this.voteCount < this.maxVoteCount) {
        this.voteCount += 1
      }
    },
    handleVoteNow() {
      this.isShowSuccess = true
    },
    handleToggleShowVote() {
      this.$emit('handleToggleShowVote')
    },
    setShowNum(target) {
      this.showFlag = target
    }
  }
}
</script>
<style lang="stylus">
@import './index.styl'
</style>