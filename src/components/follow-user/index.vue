<template>
        <van-button
            v-if="isFollowed"
              class="follow-btn"
              round
              size="small"
              @click="onFollow"
            >{{$t('my.已关注')}}</van-button>
            <van-button
            v-else
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              @click="onFollow"
            >{{$t('my.关注')}}</van-button>
</template>

<script>
  import { addFollow,deleteFollow } from '@/api/user';
export default {
    name: 'followUser',
    props:{
        isFollowed:{
            required:true,
            type:Boolean
        },
        userId:{
            required:true,
            type:[Number,String,Object]
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        async onFollow(){
          try{
            if(this.isFollowed){
              await deleteFollow(this.userId)
              this.$emit('updataIsFollowed',false)
            }else{
              const {data} = await addFollow(this.userId)
              if(data.status ==400){
                this.$toast(this.$t('my.不能关注自己哦'))
                // this.$toast('关注失败')
                return
              }else{
                this.$emit('updataIsFollowed',true)
              }

            }
          }catch(e){
            if(this.errStatus.response && this.errStatus.response.status === 400)
            this.$toast(this.$t('my.不能关注自己哦'))
            this.$toast(this.$t('my.关注失败'))
          }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>