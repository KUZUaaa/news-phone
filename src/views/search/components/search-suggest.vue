<template>
    <div class="search-suggest">
        <van-cell 
        v-for="(text,index) in suggestions"
        :key="index" 
        icon="search"
        @click="$emit('search',text)">
        <div v-html="highlight(text)" slot="title"></div>
     </van-cell>
    </div>
</template>

<script>
import {getSearchSuggest} from '@/api/search'
import {debounce} from 'lodash'
export default {
    name: 'SearchSuggest',
    props:{
        searchText:{
            require:true,
            type:String
        }
    },
    data() {
        return {
            suggestions:[],
            // timeout:undefined
        };
    },
    watch:{
        searchText:{
            handler:debounce(function(val){
                // clearTimeout(this.timeout)
                // this.timeout = setTimeout(()=>{
                    this.getSearch(val)
                // },300)
                
            },200),
            immediate:true
        }
    },      
    mounted() {
        
    },

    methods: {
        async getSearch(val){
            try{
                const {data} = await getSearchSuggest(val)
                this.suggestions = data.data.options
            }catch (e){
                this.$toast('获取推荐列表失败，请稍后重试')
            }
        },
        highlight(text){
            const reg = new RegExp(this.searchText,'gi')
            const heihlightText = `<span style='color:orange'>${this.searchText}</span>` 
            if(text)
            return text.replace(reg,heihlightText)
        },
    },
};
</script>

<style lang="less" scoped>
.search-suggest{
/deep/ span.active{
    color: orange !important
}
}
</style>