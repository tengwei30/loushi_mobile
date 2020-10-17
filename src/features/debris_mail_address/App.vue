<template lang="pug">
.debris_mail_address
  .debris_mail_address_item
    .debris_mail_address_item_title 姓名
    input.debris_mail_address_item_input(placeholder='' v-model='userRealName')
  .debris_mail_address_item
    .debris_mail_address_item_title 联系电话
    input.debris_mail_address_item_input(type='tel' maxlength=11 v-model='userPhone')
  .debris_mail_address_detail
    .debris_mail_address_detail_title 邮寄地址
    textarea.debris_mail_address_detail_textarea(placeholder='详细地址，请精确至门牌号' v-model='userAddress')
  .debris_mail_address_btn(@click='submit' v-if='isShowBtn') 提交
  .debris_mail_address_btn.is_disabled(v-else) 提交
  .debris_mail_address_rule
    .debris_mail_address_rule_title 注意事项:
    .debris_mail_address_rule_content
      | 1.请认真填写您的地址，若因地址有误造成的未收到货 品，造成的后果，由用户自行承担 <br>2.提交邮寄地址后，平台会在3个工作日内联系您，若 未联系您，请通过“我的”页面-“帮助中心”-“电话客 服”联系我们

</template>

<script>
import { closeCurrentPage } from '@/utils/nativeToH5/index'
import { getQueryString } from '@/utils/url'
import { submitMailAddress } from './request'
// ?userInfo=%7B"userRealName"%3A"张三"%2C"userPhone"%3A"13232333323"%2C"userAddress"%3A"北京市东城区西街口13号"%7D
export default {
  data() {
    return {
      userRealName: '',
      userPhone: '',
      userAddress: '',
      isShowBtn: true
    }
  },
  methods: {
    async submit() {
      if (!this.userRealName) {
        this.$showToast('请输入真实姓名')
        return
      }
      if (!this.userPhone) {
        this.$showToast('请输入手机号')
        return
      }
      if (!this.userAddress) {
        this.$showToast('请输入详细地址')
        return
      }
      this.submitMailAddress()
    },
    async submitMailAddress() {
      let res = await submitMailAddress({
        activityId: getQueryString('activityId') || '', // 活动ID
        // exchangeRecordId: getQueryString('exchangeRecordId') || '',
        activityRecordId: getQueryString('activityRecordId') || '', // 兑换记录ID
        userRealName: this.userRealName,
        userPhone: this.userPhone,
        userAddress: this.userAddress
      })
      if (res.code == 100) {
        closeCurrentPage()
      } else {
        this.$showToast(res.msg || '提交失败')
      }
    },
    initPage() {
      let userInfo = getQueryString('userInfo') ? JSON.parse(getQueryString('userInfo')) : null
      console.log(userInfo)
      if (userInfo) {
        this.userRealName = userInfo.userRealName
        this.userPhone = userInfo.userPhone
        this.userAddress = userInfo.userAddress
        this.isShowBtn = false
      }
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
