<template lang="pug">
#debris_award
  .debris_award_list
    Award(:styles="styles")
    Award(:styles="styles")
    Award(:styles="styles")
    Award(:styles="styles")
</template>

<script>
import Award from '../debris_center/components/award'
export default {
  data() {
    return {
      styles: {
        width: '136px',
        height: '205px'
      }
    }
  },
  components: {
    Award
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
body,html
  size(100%, 100%)
  margin 0
  padding 0
#debris_award
  width 100%
  min-height 100vh
  background linear-gradient(180deg, #FFFAF4 0%, #FFE1C7 100%)
  .debris_award_list
    width 100%
    padding 7px 37px 87px
    box-sizing border-box
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-between
</style>
