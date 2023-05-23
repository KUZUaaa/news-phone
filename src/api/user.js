// 用户相关请求模块 差一个编辑用户头像
// 接口文档 http://toutiao.itheima.net/api.html#
import request from '@/utils/request'

// 验证码登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/api/authorizationsBycode',
        data
    })
}

//密码登录
export const loginByPw = (data) => {
    return request({
        method: 'POST',
        url: '/api/authorizations',
        data
    })
}

//注册
export const regest = (data) => {
    return request({
        method: 'POST',
        url: '/api/regester',
        data
    })
}

// 发送验证码

export const sendSms = (data) => {
    return request({
        // url: `/v1_0/sms/codes/${mobile}`,
        url: `/api/sms/codes`,
        method: 'get',
        data
    })
}

// 用户信息

export const getUserInfo = () => {
    return request({
        url: `/v1_0/user`,
        method: 'get'
    })
}

// 用户频道列表信息

export const getUserChannels = () => {
    return request({
        url: `/v1_0/user/channels`,
        method: 'get'
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

// 发布文章

export const artRelease = (data) => {
    return request({
        url: `/v1_0/user/release`,
        method: 'post',
        data
    })
}