<template>
    <div class="updata-photo">
        <img :src="img"  class="img" ref="image">
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>
    </div>
    
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import {updataUserProfileImage} from '@/api/user'
export default {
    name: 'updataPhoto',
    props:{
        img:{
            type:[Object,String],
            required:true
        }
    },
    data() {
        return {
            cropper:null
        };
    },

    mounted() {
        const image = this.$refs.image
        this.cropper = new Cropper(image, {
            viewMode:1,
            dragMode:'move',
            aspectRatio:1,
            autoCropArea:1,
            cropBoxMovable:false,
            cropBoxResizable:false,
            background:false,
            movable:true
        });
    },

    methods: {
        onConfirm(){
            //https://github.com/fengyuanchen/cropperjs图像裁剪参考网址
            this.cropper.getCroppedCanvas().toBlob( async (blob) => {
                const formData = new FormData()
                formData.append('photo',blob)
                console.log(blob)
                const {data} = await updataUserProfileImage(formData)
                console.log(data);
                this.$emit('close');
                this.$emit('updataPhoto',data.data.photo)
            })
            

        }
        
    },
};
</script>

<style lang="less" scoped>

    .updata-photo{
        background-color: #000;
        height: 100%;
        .img{
            display: block;
        max-width: 100%;
        }
        .toolbar{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .cancel,.confirm{
                width: 45px;
                height: 45px;
                font-size: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                color:white ;
            }
        }
    }
</style>