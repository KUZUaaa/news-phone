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

export const sendSms = mobile =>{
    return request({
        url: `/v1_0/sms/codes/${mobile}`,
        method: 'get'
    })
}

// 用户信息

export const getUserInfo = () =>{
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

export const getUserChannels = () =>{
    return request({
        url: `/v1_0/user/channels`,
        method: 'get'
        // 写在请求拦截器里
        // headers:{
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}