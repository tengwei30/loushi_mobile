<template lang="pug">
#post-bar(ref='wrapper')
  div
    div.top
      div.book
        img.book-cover(:src='bookInfo.bookCoverUrl')
        div.book-info
          div.book-name {{bookInfo.bookName}}
          div.book-tip
            span {{bookInfo.comments}}帖子
      div.nav(ref='navDom' v-show='!isFixedTop')
        div.nav-dynamic(
          :class='{"active": type === 1}'
          @click='handleToggleCommentList(1)') 动态
        div.nav-hot(
          :class='{"is-show-hot": isShowHot, "active": type !== 1}'
          @click='handleToggleHot') {{type===3?'我的发布':'热门'}}
          div.hot-box(v-show='isShowHot')
            div.hot-item(
              :class='{"active": type === 2}'
              @click.stop='handleToggleCommentList(2)') 热门
            div.hot-item(
              :class='{"active": type === 3}'
              @click.stop='handleToggleCommentList(3)') 我的发布
    div.wrapper(:class='{"is-fixed-wrapper": isFixedTop}')
      .content
        //- div.ad-box 幸运抽奖100%中奖
        div.comment-box
          comment-item(v-for='item in list' :key='item.id'
          :commentInfo='item'
          @deleteComment='deleteComment'
          @toggleStar='toggleStar'
          @clickReplyItemBtn='clickReplyItemBtn')
          div.is-null-comment(v-if='this.list.length === 0') 没有书评就等你了～
          template(v-else)
            div.is-has-more(v-if='isHasMore') 加载中
            div.is-has-more(v-else) 暂无更多
  div.nav(v-show='isFixedTop' :class='{"is-fixed-top": isFixedTop}')
    div.nav-dynamic(
      :class='{"active": type === 1}'
      @click='handleToggleCommentList(1)') 动态
    div.nav-hot(
      :class='{"is-show-hot": isShowHot, "active": type !== 1}'
      @click='handleToggleHot') 热门
      div.hot-box(v-show='isShowHot')
        div.hot-item(
          :class='{"active": type === 2}'
          @click.stop='handleToggleCommentList(2)') 热门
        div.hot-item(
          :class='{"active": type === 3}'
          @click.stop='handleToggleCommentList(3)') 我的发布
  div.publish(@click='handleGoPublishPost' :class='{"publish-animate": !isShowPublishPost}')
    img(src='@/assets/community/publish_icon.png')
    | 发帖
  reply-input(v-show='replyInputFlag' @publishReply='publishReply')
  delete-dialog(v-show='isShowDeleteFlag'
  @deleteComment='deleteComment')
</template>

<script>
import BScroll from 'better-scroll'
import CommentItem from './components/commentItem'
import ReplyInput from '@/features/comment_detail/components/replyInput'
import { getQueryString } from '@/utils/url'
import { skipUrl, setHeader, toast, judgeIsLogined, skipLoginPage } from '@/utils/nativeToH5/index'
import bus from '@/features/comment_detail/bus'
import DeleteDialog from '@/features/post_bar/components/deleteDialog'
import { mBuryPoint } from '@/utils/buryPoint'

import { publishReply } from '@/features/comment_detail/request'
import { getBookFriendsBarInfo,
  getPostsList,
  deleteComment,
  getStar,
  getUnStar } from './request'
export default {
  components: {
    CommentItem,
    ReplyInput,
    DeleteDialog
  },
  data() {
    return {
      scroll: null,
      isShowHot: false,
      type: 1, // 数据类型1=动态，2=热门，3=我的发布
      list: [],
      bookInfo: {},
      pageNum: 0,
      replyInputFlag: false,
      commentInfo: {},
      isFixedTop: false,
      navDomTop: 0,
      isShowDeleteFlag: false,
      needDeleteCommentId: '',
      isHasMore: true,
      isShowPublishPost: true
    }
  },
  methods: {
    initBScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true, tap: true, probeType: 3, bounce: false })
        this.scroll.on('scroll', () => {
          this.isFixedTop = (this.navDomTop + this.scroll.y < 0)
          if (this.scroll.directionY == -1) {
            this.isShowPublishPost = true
          } else if (this.scroll.directionY == 1) {
            this.isShowPublishPost = false
          }
        })
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.isHasMore) {
            this.getPostsList()
          }
          if (this.scroll.directionY == -1) {
            this.isShowPublishPost = true
          } else if (this.scroll.directionY == 1) {
            this.isShowPublishPost = false
          }
        })
        // better-scroll阻止了浏览器原生的click事件，用tab注册一个事件，点击后让input失去焦点
        this.$refs.wrapper.addEventListener('tap', () => {
          bus.$emit('replyInputBlur')
        }, false)
      })
    },
    handleToggleHot() {
      this.isShowHot = !this.isShowHot
    },
    async handleToggleCommentList(target) {
      this.isShowHot = false
      if (this.type === target) {
        return
      }
      if (target == 2) {
        let bookId = getQueryString('bookId')
        mBuryPoint('6', {
          clickHotSelect: 'clickHotSelect',
          bookId
        })
      }
      this.type = target
      this.scroll.scrollTo(0, 0, 500)
      this.list = []
      this.pageNum = 0
      this.getPostsList()
    },
    initPage() {
      this.navDomTop = this.$refs.navDom.offsetTop
      this.getBookFriendsBarInfo()
      this.getPostsList()
      this.initBScroll()
    },
    async getBookFriendsBarInfo() {
      let bookId = getQueryString('bookId')
      mBuryPoint('6', {
        enterPostBarIndex: 'enterPostBarIndex',
        bookId
      })
      let res = await getBookFriendsBarInfo(bookId)
      console.log(res)
      if (res.code === 100) {
        this.bookInfo = res.data || {}
        setHeader({
          title: this.bookInfo.bookName,
          titleColor: '#ffffff',
          refreshIcon: 0,
          closeIcon: 0,
          bgColor: '#709EB2'
        })
      }
    },
    async getPostsList() {
      let bookId = getQueryString('bookId')
      let res = await getPostsList(bookId, this.type, this.pageNum)
      if (res.code === 100) {
        if (res.data && res.data.length > 0) {
          this.list = this.list.concat(res.data)
          this.pageNum += 1
          this.isHasMore = true
        } else {
          this.isHasMore = false
        }
      }
      this.getDifferList()
      this.scroll.refresh()
    },
    async deleteComment() {
      const res = await deleteComment(this.needDeleteCommentId)
      if (res.code === 100) {
        this.list = this.list.filter(item => {
          return item.commentId !== this.needDeleteCommentId
        })
        this.isShowDeleteFlag = false
      }
    },
    getCorrectList(commentInfo, type) {
      this.list.map(item => {
        if (item.commentId === commentInfo.commentId) {
          item.liked = type > 0
          item.stars = type > 0 ? (item.stars + 1) : (item.stars - 1)
          console.log(item)
        }
      })
    },
    toggleStar(commentInfo) {
      this.commentInfo = commentInfo
      judgeIsLogined({
        callback: 'isLoginedToggleStar'
      })
    },
    handleGoPublishPost() {
      // 点击发帖
      let bookId = getQueryString('bookId')
      mBuryPoint('6', {
        clickPublishPost: 'clickPublishPost',
        bookId
      })
      judgeIsLogined({
        callback: 'isLogined'
      })
    },
    getDifferList() {
      // 返回到首页时，对比下是否有新更改的内容
      let postBarInfo = localStorage.getItem('postBarInfo')
      postBarInfo = postBarInfo ? JSON.parse(postBarInfo) : ''
      if (typeof postBarInfo === 'object') {
        this.list = this.list.filter(item => {
          return !item.isLocalDeleted
        })
        this.list = this.list.map(item => {
          if (item.commentId === postBarInfo.commentId) {
            item = postBarInfo
          }
          return item
        })
        console.log(this.list)
        localStorage.removeItem('postBarInfo')
      }
    },
    showPageReload() {
      setHeader({
        title: this.bookInfo.bookName,
        titleColor: '#ffffff',
        refreshIcon: 1,
        closeIcon: 1,
        bgColor: '#709EB2'
      })
      this.getDifferList()
    },
    clickReplyItemBtn(commentInfo) {
      this.commentInfo = commentInfo
      judgeIsLogined({
        callback: 'isLoginedReplyItemBtn'
      })
    },
    async publishReply(content) {
      let parentId = this.commentInfo.commentId
      let type = 1
      let res = await publishReply(parentId, content, type)
      console.log(res, res.code == 100, 22)
      this.replyInputFlag = false
      if (res.code == 100) {
        this.commentInfo.replyNum += 1
        localStorage.setItem('postBarInfo', JSON.stringify(this.commentInfo))
        toast({
          content: '回复成功'
        })
      } else {
        toast({
          content: res.msg
        })
      }
    }
  },
  mounted() {
    this.initPage()
    window.showPageReload = this.showPageReload
    window.isLogined = (isLogined) => {
      console.log(isLogined, '是否登陆111')
      if (isLogined) {
        skipUrl({
          skipUrl: `${window.location.origin}/BKH5-publish_post.html${window.location.search}`
        })
      } else {
        skipLoginPage()
      }
    }
    window.isLoginedToggleStar = async(isLogined) => {
      if (isLogined) {
        if (!this.commentInfo.liked) {
          let res = await getStar(this.commentInfo.commentId)
          if (res.code === 100) {
            this.getCorrectList(this.commentInfo, 1)
          }
          return
        }
        let res = await getUnStar(this.commentInfo.commentId)
        if (res.code === 100) {
          this.getCorrectList(this.commentInfo, -1)
        }
      } else {
        skipLoginPage()
      }
    }
    window.isLoginedReplyItemBtn = async(isLogined) => {
      if (isLogined) {
        this.isShowPublishPost = false
        this.replyInputFlag = true
        await this.$nextTick()
        bus.$emit('getReplyFoucs', this.commentInfo)
      } else {
        skipLoginPage()
      }
    }
    window.ibreader.prohibitPull()
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../styles/index.styl';
@import './index.styl'
</style>
