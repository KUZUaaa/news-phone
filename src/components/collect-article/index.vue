<template>
    <van-button
          :icon="value? 'star':'star-o'"
          :class="{collected:value}"
          @click="onClick"
        />
</template>

<script>
import { addCollect,deleteCollect } from '@/api/article';
export default {
    name: 'collectArticle',
    props:{
        value:{
            required:true,
            type:Boolean
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
            if(this.value){
              await deleteCollect(this.articleId)
              this.$emit('input',false)
            }else{
              await addCollect(this.articleId)
              this.$emit('input',true)
            }
            this.$toast(this.value?'取消收藏':'收藏成功')
          }catch(e){
            this.$toast('收藏失败')
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