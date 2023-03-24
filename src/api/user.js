// 用户相关请求模块
// 接口文档 http://toutiao.itheima.net/api.html#
import request from '@/utils/request'

export const login = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码

export const sendSms = mobile => {
    return request({
        url: `/v1_0/sms/codes/${mobile}`,
        method: 'get'
    })
}

// 用户信息

export const getUserInfo = () => {
    return request({
        url: `/v1_0/user`,
        method: 'get'
            // 写在请求拦截器里
            // headers:{
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}

// 用户频道列表信息

export const getUserChannels = () => {
    return request({
        url: `/v1_0/user/channels`,
        method: 'get'
            // 写在请求拦截器里
            // headers:{
            //     Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}

// 关注用户

export const addFollow = (target) => {
    return request({
        url: `/v1_0/user/followings`,
        method: 'POST',
        data: {
            target
        }
    })
}

// 取消关注用户

export const deleteFollow = (target) => {
    return request({
        url: `/v1_0/user/followings/${target}`,
        method: 'DELETE',
    })
}

// 获取当前用户个人资料

export const getUserProfile = (target) => {
    return request({
        url: `/v1_0/user/profile`,
        method: 'GET',
    })
}

// 编辑用户个人资料

export const updataUserProfile = (data) => {
    return request({
        url: `/v1_0/user/profile`,
        method: 'PATCH',
        data
    })
}

// 编辑用户个人资料Image

export const updataUserProfileImage = (data) => {
    return request({
        url: `/v1_0/user/photo`,
        method: 'PATCH',
        data
    })
}