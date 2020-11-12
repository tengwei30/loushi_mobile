<template lang="pug">
.special_subject
  .subject_top
    img(:src='subjectInfo.imgUrl')
  .subject_list
    Book(
      v-for='item in subjectInfo.bookList'
      :key='item.bookId'
      :bookInfo='item'
      @handleClickBook='handleClickBook')
</template>

<script>
import Book from './components/book'
export default {
  components: {
    Book
  },
  data() {
    return {
      subjectInfo: {
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605070092963&di=30ce18e43f12b94814a122cfa519f3c5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8291602f02c7f8074d57297c274e7e60bfcb43fb5ea82-Iun5f9_fw658',
        bookList: [
          {
            author: '一纸虚妄',
            bookCoverUrl: 'https://scdn.ibreader.com/group1/M01/FE/20/rBH_v18n5imAcaerAAF7BDJiehY395.jpg',
            bookName: '绝世无双：都市修罗战神（又名：无敌战神）',
            classify: '现代都市',
            index: 1,
            intro: '他是国家仅存战神，以病弱膏肓之躯，匡护山河万万里！他是大北边境战区无敌战尊，麾下卫兵数百万！返回家乡，未婚妻却被人逼走，生死不知。留有一女，却被人百般欺负！君王一怒，血流万里！当初逼迫未婚妻者杀无赦！当初欺负女儿者满门抄斩！人间最狂，战神中我是王也是皇！又名：无敌战神）主角：君不败',
            popularity: '36.9万人想读',
            scheme: 'breader://bookstore/bookDetails?bookId=4218828&source=topic',
          },
          {
            author: '余花花',
            bookCoverUrl: 'https://scdn.ibreader.com/group1/M01/3F/F0/rBH_vl9Qxs6ANBDYAAGVeEEjINQ779.jpg',
            bookName: '至尊战神豪婿',
            classify: '现代都市',
            index: 2,
            intro: '他是国家仅存战神，以病弱膏肓之躯，匡护山河万万里！他是大北边境战区无敌战尊，麾下卫兵数百万！返回家乡，未婚妻却被人逼走，生死不知。留有一女，却被人百般欺负！君王一怒，血流万里！当初逼迫未婚妻者杀无赦！当初欺负女儿者满门抄斩！人间最狂，战神中我是王也是皇！又名：无敌战神）主角：君不败',
            popularity: '36.9万人想读',
            scheme: 'breader://bookstore/bookDetails?bookId=4218828&source=topic',
          },
        ]
      }
    }
  },
  methods: {
    handleClickBook(target) {
      console.log(target)
    }
  },
  mounted() {},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl';
</style>
