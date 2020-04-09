<template lang="pug">
#adTab
  ul.adtab__list
    li(v-for="item in 4")
      p
        span 大转盘
</template>
<script>
export default {}
</script>
<style lang="stylus">
#adTab {
  width: 100%;
  margin-top: 8px;
  padding: 15px 14px;
  box-sizing: border-box;
  background: #fff;

  .adtab__list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        width: 50px;
        height: 50px;
        background: #D8D8D8;
        border-radius: 50px;
      }

      span {
        font-size: 12px;
        padding-top: 8px;
      }
    }
  }
}
</style>
