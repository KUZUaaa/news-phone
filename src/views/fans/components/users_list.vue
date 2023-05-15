<template>
    <div class="article-list" ref="articleListRef">
        <van-pull-refresh v-model="isreFlashLoading" @refresh="onRefresh">
            <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="this.$t('my.没有更多了')"
            :error.sync="error"
            :error-text="this.$t('my.没有更多了')"
            @load="onLoad"
            >
            <!-- <van-cell
                v-for="(article,index) in list"
                :key="index"
                :title="article.title"
            /> -->
            <users-item 
            v-for="(user,index) in list"
            :key="index"
            :user="user"
            />
            </van-list>
        </van-pull-refresh>
        

    </div>
</template>

<script>
import { getUserFans } from '@/api/article'
import UsersItem from './users_item.vue' 

export default {
    name: 'articleList',
    components:{
        UsersItem,     
    },
    props:{

    },
    data() {
        return {
            list: [],//列表数据
            loading: false,
            finished: false,//数据加载结束
            timestamp: null, //请求获取下一页数据
            error:false,//加载失败判断
            isreFlashLoading: false,//下拉刷新的状态控制
            scrollTop: 0,
        };
    },
    activated(){
        this.$refs.articleListRef.scrollTop = this.scrollTop
    },
    mounted() {
        const artListDom = this.$refs.articleListRef
    // 当其滚动时，记录滚动后的top位置
    artListDom.addEventListener('scroll', () => {
      this.scrollTop = artListDom.scrollTop
    })
    },

    methods: {
       async onLoad() {
            try{
                const {data}= await getUserFans()
                const { results } = data.data
                this.list.push(...results)
                console.log(this.list);
                this.loading=false
                this.finished=true
            } catch(err){
                this.error = true
                this.loading = false
            }
        },
        async onRefresh(){
            try{
                const {data}= await getUserFans()
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