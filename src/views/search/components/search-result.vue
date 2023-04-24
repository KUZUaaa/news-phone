<template>
    <div class="search-result">
        <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="this.$t('my.没有更多了')"
        @load="onLoad"
        :error.sync="error"
        >
            <van-cell v-for="(item,index) in list" :key="index" :title="item.title" :to="`/article/${item.art_id}`"/>
        </van-list>
    </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
    name: 'SearchResult',
    props:{
        searchText:{
            require:true,
            type:String
        }
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            page:1,
            per_page:15,
            error: false,
        };
    },

    mounted() {
        
    },

    methods: {
        async onLoad() {
            try{
                const {data} = await getSearchResult({
                    page:this.page,
                    per_page:this.per_page,
                    q:this.searchText
                })
                const {results} = data.data
                this.list.push(...results)
                this.loading = false
                if(results.length){
                    this.page++
                }else{
                    this.finished = true
                }
            }catch(e){
                this.error = true
                this.loading = false
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>