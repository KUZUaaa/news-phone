<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()" />
        <!-- 导航栏 -->

        <input 
        type="file" 
        hidden  
        ref="file"
        @change="onFileChange">

        <!-- 个人信息 -->
        <van-cell 
        title="头像"
        @click="$refs.file.click()"
        >
            <van-image
            class="avatar"
            fit="cover"
            round
            :src="user.photo"
            ></van-image>
        </van-cell>
        <van-cell title="昵称" :value="user.name" is-link @click="isUpdataName=true"/>
        <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link @click="isUpdataGender=true"/>
        <van-cell title="生日" :value="user.birthday" is-link @click="isUpdataBirthday=true"/>
        <!-- 个人信息 -->

        <!-- 昵称弹出层 -->
        <van-popup  v-model="isUpdataName" style="height: 100%;" position="bottom">
            <updata-name 
            v-if="isUpdataName"
            @close="isUpdataName = false"
            v-model="user.name" />
        </van-popup>
        <!-- 昵称弹出层 -->

        <!-- 性别 -->
        <van-popup  v-model="isUpdataGender" position="bottom">
            <updata-gender
            v-if="isUpdataGender"
            @close="isUpdataGender = false"
            v-model="user.gender"/>
        </van-popup>
        <!-- 性别 -->

        <!-- 生日 -->
        <van-popup  v-model="isUpdataBirthday" position="bottom">
            <updata-birthday
            v-if="isUpdataBirthday"
            @close="isUpdataBirthday = false"
            v-model="user.birthday"/>
        </van-popup>
        <!-- 生日 -->

        <!-- 头像 -->
        <van-popup  v-model="isUpdataPhoto" position="bottom" style="height: 100%;">
            <updata-photo
            v-if="isUpdataPhoto"
            @close="isUpdataPhoto = false"
            @updataPhoto="user.photo=$event"
            :img="img"
            />
        </van-popup>
        <!-- 头像 -->
    </div>
</template>

<script>
import {getUserProfile} from '@/api/user'
import updataName from './components/updata-name.vue';
import updataGender from './components/updata-gender.vue';
import updataBirthday from './components/updata-birthday.vue';
import updataPhoto from './components/updata-photo.vue';
export default {
    name: 'userProfile',
    components:{
        updataName,
        updataGender,
        updataBirthday,
        updataPhoto,
    },
    data() {
        return {
            user:{},
            isUpdataName:false,
            isUpdataGender:false,
            isUpdataBirthday:false,
            isUpdataPhoto:false,
            img:null,
        };
    },

    mounted() {
        
    },
    created(){
        this.loadUserProfile()
    },
    methods: {
        async loadUserProfile(){
            try{
                const {data} = await getUserProfile()
                this.user = data.data
            }catch(e){
                this.$toast('获取用户个人信息失败')
            }
        },
        // 图片预览
        onFileChange(){
            const file = this.$refs.file.files[0]
            this.img = window.URL.createObjectURL(file)
            this.isUpdataPhoto = true
            this.$refs.file.value = '' //用同一个文件时清空value 不然无法触发change事件
        }
    },
};
</script>

<style lang="less" scoped>
.avatar{
    width: 50px;
    height: 50px;
}
.van-popup{
    background-color: #f5f7f9;
}
</style>