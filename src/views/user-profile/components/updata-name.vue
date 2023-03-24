<template>
    <div class="updata-name">
        <van-nav-bar class="page-nav-bar"
        title="设置昵称">
            <van-button class="backBtn" slot="left" @click="$emit('close')" icon="arrow-left"></van-button>
            <van-button class="backBtn" slot="right" @click="onUpdataName">完成</van-button>
        </van-nav-bar>

        <van-field
            v-model.trim="newName"
            rows="1"
            autosize
            type="textarea"
            maxlength="11"
            placeholder="请输入新昵称"
            show-word-limit
        />
    </div>
</template>

<script>
import {updataUserProfile} from '@/api/user'
export default {
    name: 'updataName',
    props:{
        value:{
            type:String,
            required:true
        }
    },
    data() {
        return {
            newName:this.value
        };
    },

    mounted() {
        
    },

    methods: {
        async onUpdataName(){
            try{
                const newName = this.newName
                if(!newName.length){
                    this.$toast('昵称不能为空')
                    return
                }
                await updataUserProfile({
                    name:newName
                })
                this.$emit('close')
                this.$emit('input',newName)
                this.$toast.success('修改成功')
            }catch(e){
                this.$toast('修改昵称失败')
            }
        },
    },
};
</script>

<style lang="less" scoped>
.updata-name{
    .backBtn{
    background-color: #3296fa;
    color: #eeeeee;
    border: none;

   }
}

</style>