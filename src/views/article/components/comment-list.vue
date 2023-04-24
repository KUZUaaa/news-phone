<template>
    <div class="comment-list">
        <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="this.$t('my.没有更多了')"
        @load="onLoad"
        :immediate-check="false"
        >
            <comment-item v-for="(item,index) in list" :key="index" :comments="item" @reply-click="$emit('reply-click',$event)"/>
        </van-list>
    </div>
</template>

<script>
import { getComment } from '@/api/comment'
import commentItem from './comment-item.vue';
export default {
    components: { commentItem },
    name: 'commentList',
    props:{
        source:{
            type:[Number,Object,String],
            required:true
        },
        list:{
            type:Array,
            default:() => []
        },
        type:{
            type:String,
            default:'a',
            validator(val){
                return ['a','c'].includes(val)
            }
        }
    },
    data() {
        return {
            // list: [],
            loading: false,
            finished: false,
            offset:null,
        };
    },

    mounted() {
        
    },
    created(){
        this.loading = true
        this.onLoad()
    },
    methods: {
        async onLoad() {
            try{
                const {data} = await getComment({
                    type:this.type,
                    source:this.source,
                    offset:this.offset,//文章评论标记：取上次获取的评论列表最后一位的id
                    limit: 10
                })
                const {results,total_count:totalCount} = data.data
                this.list.push(...results)

                this.$emit('onloadSuccess',data.data)
                this.loading = false
                if(results.length){
                    this.offset = data.data.last_id
                }else{
                    this.finished= true
                }
            }catch(e){
                this.$toast(this.$t('my.获取文章评论失败，请稍后重试'))
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>