<template>
    <div class="updata-gender">
        <van-picker
            title="修改性别"
            show-toolbar
            :columns="columns"
            :default-index="+value"
            @confirm="onConfirm"
            @cancel="$emit('close')"
            @change="onChange"
        />
    </div>
</template>

<script>
import {updataUserProfile} from '@/api/user'
export default {
    name: 'updataGender',
    props:{
        value:{
            type:Number,
            required:true
        }
    },
    data() {
        return {
            columns:['男','女'],
            newGender:this.value
        };
    },

    mounted() {
        
    },

    methods: {
        onChange(picker,value,index){
            this.newGender = index
        },
        async onConfirm(){
            try{
                const newGender = this.newGender
                await updataUserProfile({
                    gender:newGender
                })
                this.$emit('close')
                this.$emit('input',newGender)
                this.$toast.success('修改成功')
            }catch(e){
                this.$toast('修改性别失败')
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>