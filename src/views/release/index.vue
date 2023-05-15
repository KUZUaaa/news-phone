<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed :left-text="this.$t('my.返回')" @click-left="onClickLeft">
        <span slot="title" >{{ $t('my.发布文章') }}</span>
      </van-nav-bar>
      <!-- 导航栏 -->
      <van-cell-group class="page-content">
        <van-field v-model="article.title" :label="this.$t('my.标题')" />
        <div class="select">
            <span>{{$t('my.分区')}}</span>
            <van-dropdown-menu class="select-item">
                <van-dropdown-item v-model="article.channel_id" :options="options" />
            </van-dropdown-menu>
        </div>
        <van-field
        v-model="article.content"
        rows="13"
        autosize
        :label="this.$t('my.内容')"
        type="textarea"
        maxlength="10000"
        :placeholder="this.$t('my.请输入内容')"
        show-word-limit
        />
        
        <van-button class="btn_commit" round hairline type="info" @click="commitArt">{{$t('my.发布')}}</van-button>
      </van-cell-group>   
      
    </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import {artRelease} from '@/api/user'
import dayjs from 'dayjs';
export default {
    name: 'Release',

    data() {
        return {
            article:{
                title:undefined,
                content:undefined,
                channel_id:1,
                pubdate:undefined,
            },
            options: [{
                text:'推荐',
                value:1
            }]
        };
    },

    mounted() {
        this.getAllchannels()
    },

    methods: {
        onClickLeft(){
            this.$router.back()
        },
        async getAllchannels(){
           const {data} = await getAllChannels()
           this.options = data.data.channels.map(item=>{
            return {
                text:item.name,
                value:item.id
            }
           })
        },
        async commitArt(){
            this.article.pubdate = dayjs(new Date()).format('YYYY-MM-DD');
            try{
            await artRelease(this.article)
            this.$toast(this.$t('my.上传成功'))
            this.$router.back()
            }catch{
                this.$toast(this.$t('my.上传失败'))
            }
        }
    },
};
</script>

<style scoped lang="less">
.page-content{
    margin-top: 47px;
    background-color: #f5f7f9;
    .van-field{
        margin-bottom: 15px;
    }
    .select{
        display: flex;
        font-size: 17px;
        text-align: center;
        line-height: 50px;
        margin-bottom: 15px;
        span{
            padding: 0 200px 0 15px ;
        }
        .select-item{
            width: 30%;
            
        }
        /deep/.van-dropdown-menu__bar {
            box-shadow: unset !important;
        }
       
    }
    .btn_commit{
        margin: 35px 55px;
        width: 70%;
    }
}
</style>