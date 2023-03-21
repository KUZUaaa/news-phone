<template>
    <div class="channelEdit">
        <van-cell :border="false">
            <div slot="title" class="titleText">我的频道</div>
            <van-button slot="right-icon" class="edit-btn" type="warning" plain round size="mini" @click="isEdit=!isEdit">{{ isEdit? '完成':'编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item class="gridItem" v-for="(channel,index) in channels" :key="index" @click="myChannelClick(channel,index)">
                <van-icon slot="icon" name="close" v-show="isEdit&&!fiexChannels.includes(channel.id)"></van-icon>
                <span slot="text" class="text" :class="{active: index === active}">{{channel.name}} </span>
            </van-grid-item>
        </van-grid>

        <van-cell :border="false">
            <div slot="title" class="titleText">频道列表</div>
        </van-cell>
        <van-grid :gutter="10" class="tuijian">
            <van-grid-item icon="plus" class="gridItem" v-for="(channel,index) in tuijianChannels" :key="index" :text="channel.name" @click="addChannel(channel)"/>
        </van-grid>
    </div>
</template>

<script>
import { getAllChannels,addUserChannels,deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage';
export default {
    name: 'ChannelEdit',
    props:{
        channels:{//我的频道
            type:Array,
            require:true
        },
        active:{
            type:Number,
            require:true
        },
    },
    data() {
        return {
            allChannels:[],//所有频道
            isEdit:false,//编辑与完成切换
            fiexChannels:[0],//不给删除的频道
        };
    },
    created() {
        this.loadAllChannels()
    },
    mounted() {
        
    },
    computed:{
        ...mapState(['user']),
        tuijianChannels(){
            const channels = []
            this.allChannels.forEach(channel =>{
               const res = this.channels.find(mychannel =>{
                return mychannel.id === channel.id
               })
               if(!res){
                channels.push(channel)
            }
            })
            
            return channels
        }
    },
    methods: {
        async loadAllChannels(){
            try{
                const { data } = await getAllChannels()
                this.allChannels = data.data.channels
                // console.log(this.tuijianChannels);
            }catch(e){
                this.$toast('获取文章列表失败')
            }
        },
       async addChannel(channel){
            this.channels.push(channel)
            if(this.user){
                try{
                    await addUserChannels({
                    id:channel.id,
                    seq:this.channels.length
                })
                }catch(e){
                    this.$toast('保存失败')
                }
            }else{
                //未登录
                setItem('TOUTIAO_CHANNELS',this.channels)
            }
        },
        myChannelClick(channel,index){
            if(this.isEdit){
                //编辑状态
                if(this.fiexChannels.includes(channel.id)){
                    return
                }
                if(index<=this.active)
                this.$emit('updataActive',this.active - 1, true)
                this.channels.splice(index,1)
                this.deleteChannel(channel)
            }else{
                //完成状态 
                this.$emit('updataActive',index,false)
            }
        },
        async deleteChannel(channel){
                    if(this.user){
                        try{
                            await deleteUserChannels(channel.id)
                        }catch(e){
                            this.$toast('删除失败')
                        }
                    }else{
                        //未登录
                        setItem('TOUTIAO_CHANNELS',this.channels)
                    }
                }
    },
};
</script>

<style lang="less" scoped>
.channelEdit{
    padding: 43px 0 ;
    .titleText{
        font-size: 16px;
        color: #333;
    }
    .edit-btn{
        width: 52px;
        height: 24px;
        font-size: 13px;
    }
    .gridItem{
        width: 80px;
        height: 43px;
        /deep/.van-grid-item__content{
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        .van-grid-item__text , .text{
            font-size: 14px;
            color: #222;
            margin-top: 0;
        }
        .van-grid-item__text , .active{
            font-size: 14px;
            color: #ff976a;
            margin-top: 0;
        }
        /deep/.van-grid-item__icon-wrapper{
            position: unset;
        }

    }
    /deep/ .van-icon-close{
        position: absolute;
        right: -6px;
        top: -6px;
        font-size: 17px;
        z-index: 2;
    }
    .tuijian{
        .gridItem{
            /deep/.van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size: 14px;
                    margin-right: 3px;
                }
                
            }
        }
    }
}
</style>