<template lang="pug">
#app
  Sign
  AdTab
  AdImg
  TaskList
</template>

<script>
import Sign from './components/sign'
import AdTab from './components/adTab'
import AdImg from './components/adImg'
import TaskList from './components/taskList'
export default {
  components: {
    Sign,
    AdTab,
    AdImg,
    TaskList,
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
html, body
  size(100%, 100%)
#app
  padding 10px 15px 0
  box-sizing border-box
</style>
