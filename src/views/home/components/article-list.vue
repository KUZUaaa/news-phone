<template>
    <div class="article-list">
        <van-pull-refresh v-model="isreFlashLoading" @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <!-- <van-cell
                v-for="(article,index) in list"
                :key="index"
                :title="article.title"
            /> -->
            <article-item 
            v-for="(article,index) in list"
            :key="index"
            :article="article"
            />
            </van-list>
        </van-pull-refresh>
        

    </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'

export default {
    name: 'articleList',
    components:{
        ArticleItem,     
    },
    props:{
        channel:{
            type: Object,
            required: true
        }
    },
    data() {
        return {
            list: [],//列表数据
            loading: false,
            finished: false,//数据加载结束
            timestamp: null, //请求获取下一页数据
            error:false,//加载失败判断
            isreFlashLoading: false,//下拉刷新的状态控制
        };
    },

    mounted() {
        
    },

    methods: {
       async onLoad() {
            try{
                const {data}= await getArticle({
                    channel_id:this.channel.id,
                    // timestamp等于页码 传入时间戳 如果无第一页就data.now 如果有第一页则下一页
                    timestamp: this.timestamp || Date.now()
                })
                const { results } = data.data
                this.list.push(...results)
                this.loading=false
                if(results.length){
                // 更新获取下一页的数据，更新时间戳获取下一页 data.data.pre_timestamp是返回值里的时间戳
                this.timestamp = data.data.pre_timestamp
                }else{
                    this.finished=true
                }
            } catch(err){
                this.error = true
                this.loading = false
            }
        },
        async onRefresh(){
            try{
                const {data}= await getArticle({
                    channel_id:this.channel.id,
                    // timestamp等于页码 传入时间戳 如果无第一页就data.now 如果有第一页则下一页
                    timestamp: Date.now()
                })
                this.list.unshift(...data.data.results)
                this.isreFlashLoading=false
            }catch(err){
                this.isreFlashLoading=false
            }
        }
    },
};
</script>

<style lang="less" scoped>
.article-list {
    height: 79vh;
    overflow-y: auto;
}
</style>