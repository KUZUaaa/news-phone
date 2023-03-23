<template>
    <van-button
          :icon="value==1? 'good-job':'good-job-o'"
          :class="{collected:value==1}"
          @click="onClick"
        />
</template>

<script>
import {addLike,deleteLike} from '@/api/article';
export default {
    name: 'likeArticle',
    props:{
        value:{
            required:true,
            type:Number
        },
        articleId:{
            required:true,
            type:[Number,String]
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        async onClick(){
            try{
            if(this.value==1){
              await deleteLike(this.articleId)
              this.$emit('input',0)
            }else{
              await addLike(this.articleId)
              this.$emit('input',1)
            }
            this.$toast(this.value==1?'取消点赞':'点赞成功')
          }catch(e){
            this.$toast('点赞或取消点赞失败')
          } 
        }
    },
};
</script>

<style lang="less" scoped>
.collected{
    .van-icon{
        color:#ffa500 ;
    }
}
</style>