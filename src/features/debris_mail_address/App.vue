<template lang="pug">
.debris_mail_address
  .debris_mail_address_item
    .debris_mail_address_item_title 姓名
    input.debris_mail_address_item_input(placeholder='')
  .debris_mail_address_item
    .debris_mail_address_item_title 联系电话
    input.debris_mail_address_item_input(type='tel' maxlength=11)
  .debris_mail_address_detail
    .debris_mail_address_detail_title 邮寄地址
    textarea.debris_mail_address_detail_textarea(placeholder='详细地址，请精确至门牌号')
  .debris_mail_address_btn 提交
  .debris_mail_address_rule
    .debris_mail_address_rule_title 注意事项:
    .debris_mail_address_rule_content
      | 1.请认真填写您的地址，若因地址有误造成的未收到货 品，造成的后果，由用户自行承担 <br>2.提交邮寄地址后，平台会在3个工作日内联系您，若 未联系您，请通过“我的”页面-“帮助中心”-“电话客 服”联系我们

</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
