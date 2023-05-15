<template>
    <div>
        <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="user.aut_photo"
            />
            <div slot="title" class="user-name">{{user.aut_name}}</div>     
          </van-cell>
    </div>
</template>

<script>
export default {
    name: 'ToutiaoMUsersList',
    props:{
        user:{
            require:true,
            type:Object
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="less" scoped>
.user-info {

        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 9px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 12px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 11px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 85px;
          height: 29px;
        }
      }
</style>