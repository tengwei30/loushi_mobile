<template lang="pug">
  .debris_detail
    HeaderNav(
      title='碎片明细'
      :headerSpaceStyle="{height: '68px', background: 'linear-gradient(to right, #F43A3A 10%, #FFC87A)', opacity: 1}"
      :headerNav="{height: '48px', fontSize: '16px', color: '#ffffff'}"
      height='68px'
    )
      img.left_img(
        slot='left'
        src='../../assets/debris_detail_record/nav_back.png'
        @click='nvaBack'
      )
    .debris_box(v-if='list.length > 0')
      DetailItem(
        v-for='item in list'
        :key='item.id'
        :info='item'
      )
    .debris_detail_null(v-else)
      img(src='../../assets/debris_detail_record/debris_detail_record_null.png')
      .debris_detail_null_tip 您暂时没有获得碎片
</template>

<script>
import bk from 'bayread-bridge'
import DetailItem from './components/DetailItem'
import HeaderNav from '@/components/HeaderNav'
import { getDebrisDetailList } from './request'
export default {
  components: {
    DetailItem,
    HeaderNav
  },
  data() {
    return {
      list: [
        { id: 1 }, { id: 2 }, { id: 3 }
      ]
    }
  },
  methods: {
    // 返回上一页面
    nvaBack() {
      bk.call('closePageNative')
    },
    async init() {
      let res = await getDebrisDetailList()
      console.log(res)
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
