<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button 
      class="btn_search"
      slot="title"
      size="small"
      type="info"
      round
      icon="search"
      
      >搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- tab栏 -->
    <van-tabs v-model="active" >
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
      <article-list :channel="channel" />
      </van-tab>
      <div slot="nav-right" class="place"></div>
      <div slot="nav-right" class="btn-humberger" @click="isChannelEditShow = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- tab栏 -->
    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit 
      :channels="channels" 
      :active="active"
      @updataActive="updataActive"/>
    </van-popup>
    <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user';
import ArticleList from './components/article-list.vue';
import channelEdit from './components/channel-edit.vue';
import { mapState } from 'vuex';
import { getItem } from '@/utils/storage';
export default {
    name: 'HomeIndex',
    components:{
      ArticleList,
      channelEdit,
    },
    data(){
      return{
        active:0,
        channels:[],
        isChannelEditShow:false,//频道编辑显示

      }
    },
  created() {
    this.loadChannels()
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    async loadChannels(){
      try{
        // const {data} = await getUserChannels() 
        // this.channels = data.data.channels
        let channels = []
        if(this.user){
        const {data} = await getUserChannels() 
        channels = data.data.channels
        }else{
          // 未登录
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if(localChannels){
            channels = localChannels
          }else{
            const {data} = await getUserChannels() 
            channels = data.data.channels
          }
        }
        this.channels =channels
      }catch(err){
        this.$toast('获取用户频道列表失败')
      }
    },
    updataActive(index, isChannelEditShow ){
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    },
  }
}
</script>

<style scoped lang="less">
  .home-container{
    padding-top: 87px;
    padding-bottom: 50px;
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