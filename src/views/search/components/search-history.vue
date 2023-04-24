<template>
    <div class="search-history">
        <van-cell :title="this.$t('my.搜索历史')">
            <div v-if="isDeleteShow">
                <span @click="$emit('updataSearchHistory'),isDeleteShow=false">{{$t('my.全部删除')  }}</span>
                <span @click="isDeleteShow=false">/{{$t('my.完成')}}</span>
            </div>
            <van-icon v-else name="delete" @click="isDeleteShow=true"/>
        </van-cell>
        <van-cell  
        v-for="(item,index) in searchHistory" 
        :key="index" 
        :title="item"
        @click="onSearchItemClick(item,index)"
        >
            <van-icon name="close" v-if="isDeleteShow"></van-icon>
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    props:{
        searchHistory:{
            require:true,
            type:Array
        }
    },
    data() {
        return {
            isDeleteShow:false
        };
    },

    mounted() {
        
    },

    methods: {
        onSearchItemClick(item,index){
            if(this.isDeleteShow){
                this.searchHistory.splice(index,1)
                if(!this.searchHistory.length){
                    this.isDeleteShow = false
                }
            }else{
                this.$emit('search',item)
            }
        }
    },
};
</script>

<style lang="less" scoped>

</style>