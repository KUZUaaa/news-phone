<template>
    <div class="comment-post">
      <van-field
        class="post-field"
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        :placeholder="this.$t('my.请输入留言')"
        show-word-limit
      />
      <van-button
        class="post-btn"
        @click="onPost"
        :disabled="!message.length"
      >发布</van-button>
    </div>
  </template>
  
  <script>
  import {addComment} from '@/api/comment'
  export default {
    name: 'CommentPost',
    components: {},
    inject:{
      articleId:{
        type:[String,Number,Object],
        default:null
      }
    },
    props: {
      target:{
        type:[String,Number,Object],
        required:true
      }
    },
    data () {
      return {
        message: ''
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onPost(){
        try{
          const {data} = await addComment({
            target:this.target, //评论的id或者文章id
            content:this.message,
            art_id:this.articleId  //回复评论时 传文章id
          })
          this.message = ''
          this.$emit('postSuccess',data.data)
          this.$toast.success(this.$t('my.评论成功'))
        }catch(e){
          this.$toast(this.$t('my.评论失败'))
        }
      }
    }
  }
  </script>
  
  <style scoped lang="less">
  .comment-post {
    display: flex;
    align-items: center;
    padding: 16px 0 16px 16px;
    .post-field {
      background-color: #f5f7f9;
    }
    .post-btn {
      width: 75px;
      border: none;
      padding: 0;
      color: #6ba3d8;
      &::before {
        display: none;
      }
    }
  }
  </style>
  