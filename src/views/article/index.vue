<template>
    <div class="article-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="新闻头条"
      ></van-nav-bar>
      <!-- /导航栏 -->
  
      <div class="main-wrap">
        <!-- 加载中 -->
        <div class="loading-wrap" v-if="loading">
          <van-loading
            color="#3296fa"
            vertical
          >加载中</van-loading>
        </div>
        <!-- /加载中 -->
  
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-else-if="article.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{article.title}}</h1>
          <!-- /文章标题 -->
  
          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{article.aut_name}}</div>
            <div slot="label" class="publish-date">{{article.pubdate}}</div>
            <!-- 关注 -->
            <followUser
            class="follow-btn"
            :isFollowed="article.is_followed"
            :userId="article.aut_id"
            @updataIsFollowed="article.is_followed=$event"/>
            
          </van-cell>
          <!-- /用户信息 -->
  
          <!-- 文章内容 -->
          <div 
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"></div>
          <van-divider>正文结束</van-divider>
            
        </div>
        <!-- /加载完成-文章详情 -->
  
        <!-- 加载失败 -->
        <div class="error-wrap" v-else-if="errStatus == 404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- 加载失败 --> 
        <!-- 底部区域 -->
        <div class="article-bottom">
            <van-button
              class="comment-btn"
              type="default"
              round
              size="small"
            >写评论</van-button>
            <van-button
              class="btn-item"
            >
                <van-icon name="chat-o" slot="icon" info="123"></van-icon>
            </van-button>
            <!-- 收藏 -->
            <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :articleId="article.art_id"
            />
            <!-- 点赞 -->
            <like-article
            class="btn-item"
            v-model="article.attitude"
            :articleId="article.art_id"
            />
            <van-button class="btn-item" icon="share" ></van-button>
          </div>
          <!-- /底部区域 -->
      </div>
    </div>
  </template>
  
  <script>
  import { ImagePreview } from 'vant';
  import {getArticleById} from '@/api/article'
  import followUser from '@/components/follow-user'
  import collectArticle from '@/components/collect-article'
  import likeArticle from '@/components/like-article'
  export default {
    name: 'ArticleIndex',
    components: {
      followUser,
      collectArticle,
      likeArticle,
    },
    props: {
      articleId: {
        type: [Number, String],
        required: true
      }
    },
    data () {
      return {
        article:{
          title: ''
        },
        loading:true,
        errStatus: 0,
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {
        this.loadArticle()
    },
    methods: {
        async loadArticle(){
          this.loading = true
            try{
                const {data} = await getArticleById(this.articleId)
                this.article = data.data
                this.loading = false
                // 图片预览
                this.$nextTick(()=>{
                  this.previewImage()
                })
                // setTimeout(()=>{
                //   this.previewImage()
                // })
            }catch(e){
                if(e.response&&e.response.status === 404)
                this.errStatus = 404
                this.$toast('获取新闻内容失败')
            }
            this.loading = false
        },
        previewImage(){
          const articleContent = this.$refs['article-content']
          const imgs = articleContent.querySelectorAll('img')
          const images = []
          
          imgs.forEach((img,index) => {
            images.push(img.src)
            img.onclick = () =>{
              ImagePreview({
                images,
                startPosition:index
              })
            }
          });
        },
        
    }
  }
  </script>
  
  <style scoped lang="less">
  @import './github-markdown.css';
  .article-container {
    position: relative;
    
    .main-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 46px;
      bottom: 44px;
      overflow-y: scroll;
      background-color: #fff;
    }
    .article-detail {
      .article-title {
        font-size: 20px;
        padding: 25px 16px;
        margin: 0;
        color: #3a3a3a;
      }
  
      .user-info {
        padding: 0 16px;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 9px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 12px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 11px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 85px;
          height: 29px;
        }
      }
  
      .article-content {
        padding: 22px 16px;
        font-size: 17px;
        /deep/ p {
          text-align: justify;
        }
      }
    }
  
    .loading-wrap {
      padding: 100px 16px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
  
    .error-wrap {
      padding: 100px 16px;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      -webkit-flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 61px;
        color: #b4b4b4;
      }
      .text {
        font-size: 15px;
        color: #666666;
        margin: 16px 0 23px;
      }
      .retry-btn {
        width: 140px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #c3c3c3;
        font-size: 15px;
        color: #666666;
      }
    }
  
    .article-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 99;
      display: -webkit-flex;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 44px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        width: 141px;
        height: 23px;
        border: 1px solid #eeeeee;
        font-size: 15px;
        line-height: 23px;
        color: #a7a7a7;
      }
      .van-icon {
        font-size: 20px;
        .van-info {
          font-size: 8px;
          background-color: #e22829;
        }
      }

      .btn-item{
        border: none;
      }
    }
  }
  </style>