<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed left-text="返回" @click-left="onClickLeft">
        <span slot="title" >{{ $t('my.我的文章') }}</span>
      </van-nav-bar>
      <!-- 导航栏 -->
      <article-list/>
    </div>
  </template>
  
  <script>
  import ArticleList from './components/article-list.vue';
  import { mapState } from 'vuex';
  import { getItem } from '@/utils/storage';
  export default {
      name: 'MyArticles',
      components:{
        ArticleList,
      },
      data(){
        return{
  
        }
      },
    created() {
    },
    computed:{

    },
    methods: {
        onClickLeft(){
            this.$router.back()
        }
    }
  }
  </script>
  
  <style scoped lang="less">
    .home-container{
      padding-top: 47px;
      /deep/.van-nav-bar__title{
        max-width: unset;
  
        
        }
        // 搜索按钮
        .btn_search{
          border: none;
          width: 278px;
          height: 32px;
          background-color: #5babfb;
          border-radius: 16px;
          // opacity: 0.2;
          color:#ffffff;
          font-size: 14px;
        }
        //搜索icon的样式
        .van-icon-search{
          color: #ffffff;
          font-size: 16px;
        }
        // tab栏样式
        /deep/.van-tab{
          min-width: 100px;
          min-height: 42px;
          border-right: 1px solid #edeff3;
        }
        /deep/.van-tabs__wrap  {
           position: fixed;
           top: 46px;
           z-index:1;
           left: 0;
           right: 0;
           height: 41px;
        }
        // tab栏每行样式
        /deep/.van-tabs__line{
          width: 16px;
          height: 3px;
          bottom: 21px;
          background-color: #3296fa;
          border-radius: 2px;
        }
        // 汉堡按钮
        .btn-humberger{
          position: fixed;
          right: 0;
          width: 33px;
          height: 40px;
          padding-top: 2px;
          background-color: #fff;
          opacity: 0.9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          &::before{
            position: fixed;
            right: 33px;
            top: 48px;
            content: '';
            height: 41px;
            width: 1px;
            background-image: url(@/assets/gradient-gray-line.png);
            background-size: contain;
          }
          
        }
        // 汉堡图标
        .icon-gengduo{
          font-size: 17px;
        }
        // 汉堡格占位符
        .place{
            width: 24px;
            height: 41px;
            flex-shrink: 0;
        }
    }
  </style>