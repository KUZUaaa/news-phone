// 频道列表 已完成
import request from "@/utils/request";

// 所有频道列表
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/api/channels'
    })
}

// 添加用户频道
export const addUserChannels = (channel) => {
        return request({
            method: 'PATCH',
            url: '/v1_0/user/channels',
            data: {
                channels: [channel]
            }
        })
    }
    // 删除用户频道
export const deleteUserChannels = (channelId) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`,
    })
}