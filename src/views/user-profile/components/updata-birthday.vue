<template>
    <div class="updata-birthday">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择生日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onConfirm"
        />
    </div>
</template>

<script>
import {updataUserProfile} from '@/api/user'
import dayjs from 'dayjs';
export default {
    name: 'updataBirthday',
    props:{
        value:{
            required:true,
            type:String
        }
    },
    data() {
        return {
            minDate: new Date(1970, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value),
        };
    },

    mounted() {
        
    },

    methods: {
        async onConfirm(){
            try{
                const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
                await updataUserProfile({
                    birthday:currentDate
                })
                this.$emit('close')
                this.$emit('input',currentDate)
                this.$toast.success('修改成功')
            }catch(e){
                this.$toast('修改生日失败',e)
            }
        }
    },
};
</script>

<style lang="scss" scoped>

</style>