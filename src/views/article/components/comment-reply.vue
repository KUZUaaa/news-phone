<template>
    <div class="comment-reply">
        <van-nav-bar
        title="回复"
        >
            <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
        </van-nav-bar>
        <div class="scroll-wrap">
            <comment-item :comments="comment"/>
            <van-cell title="全部回复"></van-cell>
            <comment-list :source="comment.com_id" :type="'c'" :list="commentList"/>
        </div>
        
      <!-- 回复评论底部按钮 -->
      <div class="post-wrap">
        <van-button class="post-btn" size="small" round @click="isPostShow=true">写评论</van-button>
      </div>
      <!-- /回复评论底部按钮 -->

      <!-- 评论回复 -->
      <van-popup v-model="isPostShow" position="bottom">
        <comment-post 
        :target="comment.com_id"
        @postSuccess="onPostSuccess" />
      </van-popup>
      <!-- /评论回复 -->
    </div>
</template>

<script>
import commentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import commentPost from './comment-post.vue';
export default {
    name: 'commentReply',
    components:{
        commentItem,
        commentList,
        commentPost,
    },
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            isPostShow:false,
            commentList:[],
        };
    },

    mounted() {
        
    },

    methods: {
        onPostSuccess(data){
            this.comment.reply_count++
            this.isPostShow = false
            this.commentList.unshift(data.new_obj)
        }
    },
};
</script>

<style lang="less" scoped>
.scroll-wrap{
    position: fixed;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: auto;
}
.post-wrap{
    position: fixed;
    bottom:0;
    left: 0;
    right: 0;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #d8d8d8;
    .post-btn{
        width: 60%;
    }
}
</style>