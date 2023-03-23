// 评论列表
import request from "@/utils/request";

// 获取文章评论列表
export const getComment = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

// 获取文章评论点赞
export const addCommentLike = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target
        }
    })
}

// 取消文章评论点赞
export const deleteCommentLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${target}`,

    })
}

// 发布评论
export const addComment = (data) => {
    return request({
        method: 'POST',
        url: `/v1_0/comments`,
        data
    })
}