<template>
    <div class="my-container">
        <!-- 未登录 -->
        <div class="header not-login" v-if="!user">
            <div class="login-btn" @click="$router.push('/login')">
                <img src="@/assets/mobile.png" class="mobile-img">
                <span class="text">{{$t('my.登录')}}</span>
            </div>
        </div>

        <!-- 已登陆 -->
        <div class="header login" v-else>
            <div class="base-info">
                <div class="left">
                    <van-image
                    class="tx"
                    width="66"
                    height="66"
                    round
                    fit="cover"
                    :src="userInfo.photo"
                    />
                    <div class="name">{{ userInfo.name }}</div>
                </div>
                <div class="right">
                    <van-button
                    round
                    class="bjBtn"
                    to="/user/profile">
                      {{$t('my.编辑资料')}}
                    </van-button>   
                </div>
                
            </div>
            <div class="data-stats">
                <div class="data-item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">{{$t('my.头条')}}</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">{{$t('my.关注')}}</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">{{$t('my.粉丝')}}</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">{{$t('my.获赞')}}</span>
                </div>
            </div>
        </div>
        <!-- 导航 -->
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item icon="photo-o" text="文字" class="grid-item">
                <i slot="icon" class="iconfont icon-shoucang"></i>
                <span slot="text" class="text">{{$t('my.收藏')}}</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="文字" class="grid-item">
                <i slot="icon" class="iconfont icon-lishi"></i>
                <span slot="text" class="text">{{$t('my.历史')}}</span>
            </van-grid-item>
        </van-grid>

        <!-- 列表 -->
        <van-cell :title="this.$t('my.消息通知')" is-link class="cell-msg"/>
        <van-cell :title="this.$t('my.语言')" is-link class="cell-msg" @click="languageFlag=true"/>
        <van-cell :title="this.$t('my.退出登陆')" class="btn-logout" v-if="user" @click="onlogout" clickable/>

        <!-- 语言切换弹出层 -->
        <van-popup  v-model="languageFlag" style="height: 100%;" position="bottom">
            <van-picker
            :title="this.$t('my.语言')"
            v-if="languageFlag"
            @close="languageFlag = false"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            />
        </van-popup>
    </div>
  </template>
  
  <script>
    import { mapState } from 'vuex';
    import { getUserInfo } from '@/api/user';
    import {getItem,setItem,removeItem} from '@/utils/storage'
    import { Locale } from 'vant';
    import enUS from 'vant/es/locale/lang/en-US';
    import zhCN from 'vant/lib/locale/lang/zh-CN'
    export default {
      name: 'MyIndex',
      data() {
        return {
            userInfo:{ },
            languageFlag:false,
            columns: ['中文','English'],
            language:'中文'
        }
      },
      created(){
        if(this.user){
            this.loadUserInfo()
        }
      },
      computed: {
        ...mapState(['user'])
      } ,
      methods: {
        onConfirm(value, index) {
            if(index == 0){
                this.languageFlag =false
                setItem('LANGUAGE','zh')
                Locale.use('zh-CN', zhCN)
                return this.$i18n.locale = getItem('LANGUAGE')
            }
            if(index == 1){
                this.languageFlag =false
                setItem('LANGUAGE','en')
                Locale.use('en-US', enUS)
                return this.$i18n.locale = getItem('LANGUAGE')
            }
        },
        onCancel() {
            this.languageFlag =false
        },
        onlogout (){
            this.$dialog.confirm({
                title: this.$t('my.是否退出登陆')
            })
            .then(() => {
                // on confirm
                this.$store.commit('setUser',null)
            })
            .catch(() => {
                // on cancel
                return
            })
        },
        async loadUserInfo(){
            try{
                const { data } = await getUserInfo()
                this.userInfo=data.data
            }catch(err){
                this.$toast(this.$t('my.加载失败'))
                console.log(err);
            }
        }
    }
}
  </script>
  
  <style scoped lang="less">
  .my-container{
    .header{
        height: 201px;
        background-image: url(@/assets/banner.png) ;
        background-size: contain;
    }
    // 未登陆头图
    .not-login{
        display: flex;
        justify-content: center;
        align-items: center;
        .login-btn{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center; 
            .mobile-img{
                width: 2rem;
                height: 2rem;
                margin-bottom: 0.3rem;
            }
            .text{
                font-size: 0.446rem;
                color: white;
            }
        }
    }
    // 已登录头图
    .login{
        .base-info{
            height: 133px;
            padding: 58px 17px 9px 16px ;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                display: flex;
                align-items: center;
                .tx{
                    border: 2px solid #fff;
                }
                .name{
                    padding-left: 11px;
                    height: 15px;
                    font-family: MicrosoftYaHei;
                    font-size: 15px;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
            }
            .bjBtn{
                width: 83px;
                height: 21px;
                font-size: 10px;
                color: #666666;
            }
        }
        .data-stats{
            display: flex;
            .data-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 68px;
                .count{
                    padding-top: 19px;
                    height: 13px;
                    font-family: ArialMT;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;

                }
                .text{
                    padding-top: 9px;
                    font-family: MicrosoftYaHei;
                    font-size: 12px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
            }
        }
    }
    // 收藏 历史
    .grid-nav{
        .grid-item{
            height: 62px;
            .icon-shoucang{
                font-size: 23px;
                color: #eb5253;
            }
            .icon-lishi{
                font-size: 23px;
                color: #eb5253;
            }
            .text{
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #333333;
            }
        }
    }
    // 消息通知
    .cell-msg{
        margin-top: 5px;
        height: 50px;
    }
    // 小智同学
    .cell-ai{
        height: 50px;
    }
    // 退出登陆
    .btn-logout{
        margin-top: 5px;
        padding-top: 14px;
        height: 52px;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 15px;
        color: #d86262;
    }
  }
  
  
  </style>