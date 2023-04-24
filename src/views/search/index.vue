<template>
    <div class="search-container">
        <!-- 搜索框 -->
        <form action="/">
            <van-search
                class="search-form"
                v-model="searchText"
                show-action
                :placeholder="this.$t('my.请输入搜索关键词')"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow = false"
            />
        </form>
        <search-result 
        v-if="isResultShow"
        :searchText="searchText"
        @search="onSearch"></search-result>

        <search-suggest 
        v-else-if="searchText"
        :searchText="searchText"
        @search="onSearch"
        ></search-suggest>

        <search-history 
        v-else
        :searchHistory="searchHistory"
        @updataSearchHistory="searchHistory=[]"
        @search="onSearch"
        ></search-history>
        

    </div>
</template>

<script>
import searchHistory from './components/search-history.vue';
import searchResult from './components/search-result.vue';
import searchSuggest from './components/search-suggest.vue';
import { setItem,getItem } from '@/utils/storage';
export default {
    name: 'Index',
    components:{
        searchHistory,
        searchResult,
        searchSuggest
    },
    data() {
        return {
            searchText: '',
            isResultShow:false,
            searchHistory:getItem('TOUTIAO_SEARCH_HISTORY')||[],
        };
    },

    mounted() {
        
    },
    watch:{
        searchHistory(val){
            setItem('TOUTIAO_SEARCH_HISTORY',val)
        },
    },
    methods: {
        onSearch(val) {
            this.searchText = val
            this.isResultShow = true
            const index = this.searchHistory.indexOf(val)
            if(index!== -1){
                this.searchHistory.splice(index,1)
            }
            this.searchHistory.unshift(val)
        },
        onCancel() {
            this.$router.back()
        },
    },
};
</script>

<style lang="less" scoped>
.search-container{
    padding-top: 54px;
}
.search-form{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
</style>