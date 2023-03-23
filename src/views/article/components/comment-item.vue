<template>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="comments.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{comments.aut_name}}</div>
        <van-button
          class="like-btn"
          :icon="comments.is_liking? 'good-job':'good-job-o'"
          :class="{
            liked:comments.is_liking
          }"
          @click="onCommentLike"
        >{{ comments.like_count>0? comments.like_count:'赞' }}</van-button>
      </div>
  
      <div slot="label">
        <p class="comment-content">{{comments.content}}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{comments.pubdate}}</span>
          <van-button
            class="reply-btn"
            round
            @click="$emit('reply-click',comments)"
          >回复 {{comments.reply_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </template>
  
  <script>
  import {addCommentLike,deleteCommentLike} from '@/api/comment'
  export default {
    name: 'CommentItem',
    components: {},
    props: {
        comments:{
            type:Object,
            required:true
        }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onCommentLike(){
            try{
                if(this.comments.is_liking){
                    await deleteCommentLike(this.comments.com_id)
                    this.comments.like_count--
                }else{
                    await addCommentLike(this.comments.com_id)
                    this.comments.like_count++
                }
                this.comments.is_liking = !this.comments.is_liking
            }catch(e){
                this.$toast('点赞失败')
            }
        }
    }
  }
  </script>
  
  <style scoped lang="less">
  .comment-item {
    .avatar {
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        color: #406599;
        font-size: 13px;
      }
    }
    .comment-content {
      font-size: 16px;
      color: #222222;
      word-break: break-all;
      text-align: justify;
    }
    .comment-pubdate {
      font-size: 9px;
      color: #222;
      margin-right: 12px;
    }
    .bottom-info {
      display: flex;
      align-items: center;
    }
    .reply-btn {
      width: 67px;
      height: 24px;
      line-height: 24px;
      font-size: 10px;
      color: #222;
    }
    .like-btn {
      height: 15px;
      padding: 0;
      border: none;
      font-size: 9px;
      line-height: 15px;
      margin-right: 3px;
      .van-icon {
        font-size: 15px;
      }
      &.liked{
        color: orange;
      }
    }
  }
  </style>