<template lang="pug">
#adImg
  ul.adImg__list
    li(v-for="item in 2")
      p
</template>
<script>
export default {}
</script>
<style lang="stylus">
#adImg
  width 100%
  border-radius 4px
  box-shadow -2px 3px 5px 0px rgba(153,153,153,0.15), 0px 0px 5px 0px rgba(153,153,153,0.15)
  margin-top 15px
  padding 15px 6px
  box-sizing border-box
  .adImg__list
    display flex
    flex-direction row
    justify-content center
    align-items center
    li
      flex 1
      display flex
      flex-direction column
      justify-content center
      align-items center
      padding 0 7px
      box-sizing border-box
      p
        height 86px
        width 100%
        background #D8D8D8
        border-radius 4px
</style>
