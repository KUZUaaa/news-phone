<template>
  <div class="layout-container">
    <router-view />

    <!-- 标签导航栏 -->
    <!-- route 开启路由模式 -->
    <van-tabbar class="layout-tabbar" route >
      <van-tabbar-item to="/home" > 
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">{{$t('my.首页')}}</span> 
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span class="text">{{$store.state.user? this.$t('my.我的'):this.$t('my.未登录')}}</span> 
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {

    };
  },
}
</script>

<style scoped lang="less">
.layout-container{
  .layout-tabbar{
    i.iconfont{
      font-size: 9px;
    }
  }
}
</style>