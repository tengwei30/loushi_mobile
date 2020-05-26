<template lang="pug">
  #native-to-h5
    div.title.bold 设置了导航栏的内容,传入的参数是: <br/>
    div {{JSON.stringify(headerOptions)}}
    div.line
    div.close.bold(@click='handleClosePage') 关闭当前页面
    div.line
    div.go-back.bold(@click='handleGoBack') 返回按钮
    div {{JSON.stringify(goBackOptions)}}
    div.line
    div.toast.bold(@click='handleToast') 吐司提示
    div {{JSON.stringify(toastOptions)}}
    div.line
    div.share.bold(@click='handleShare') 分享
    div {{JSON.stringify(shareOptions)}}
</template>

<script>
import { setHeader,
  closeCurrentPage,
  goBack,
  toast,
  shareMenu
} from '@/utils/nativeToH5/index.js'
export default {
  data() {
    return {
      headerOptions: {
        title: '自定义标题',
        titleColor: '#EEEEEE',
        rightText: '发布',
        rightTextColor: '#FF5A00',
        bgColor: '#709EB2',
        iconType: 1,
        callback() {
          console.log('设置成功')
        }
      },
      goBackOptions: {
        step: 1
      },
      toastOptions: {
        content: '测试吐司提示'
      },
      shareOptions: {
        platform: ['qq', 'wechat', 'moments'],
        title: '分享的标题',
        desc: '分享的描述',
        icon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590472859426&di=c3fdbc1a28fd8e8f5bc2b866a189b734&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150410%2Ftooopen_sy_117771445821.jpg',
        url: 'http://www.baidu.com',
        type: 1
      }
    }
  },
  methods: {
    initPage() {
      setHeader(this.headerOptions)
    },
    handleClosePage() {
      closeCurrentPage()
    },
    handleGoBack() {
      goBack(this.goBackOptions)
    },
    handleToast() {
      toast(this.toastOptions)
    },
    handleShare() {
      shareMenu(this.shareOptions, function(isSuccess) {
        toast({ content: `分享后的回调: ${isSuccess}` })
      })
    }
  },
  mounted() {
    this.initPage()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
