// 文章列表 已完成
import request from "@/utils/request";

// 获取文章列表数据
export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

// 获取收藏文章列表数据
export const getCollectedArticle = (params) => {
    return request({
        method: 'GET',
        url: '/V1_0/user/Collected',
        params
    })
}

// 获取历史记录文章列表数据
export const getHistoryArticle = (params) => {
    return request({
        method: 'GET',
        url: '/V1_0/user/history',
        params
    })
}

// 获取用户自己发布的文章My列表数据
export const getMyArticle = (params) => {
    return request({
        method: 'GET',
        url: '/V1_0/user/myArticles',
        params
    })
}

// 获取用户关注列表
export const getUserFollowed = (params) => {
    return request({
        method: 'GET',
        url: '/V1_0/user/followList',
    })
}

// 获取用户粉丝列表
export const getUserFans = (params) => {
    return request({
        method: 'GET',
        url: '/V1_0/user/fans',
    })
}

// 获取文章详情数据
export const getArticleById = (article_id) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${article_id}`,
    })
}

// 收藏文章
export const addCollect = (target) => {
    return request({
        method: 'POST',
        url: `/v1_0/article/collections`,
        data: {
            target
        }
    })
}

// 取消收藏文章
export const deleteCollect = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,

    })
}

// 点赞文章
export const addLike = (target) => {
    return request({
        method: 'POST',
        url: `/v1_0/article/likings`,
        data: {
            target
        }
    })
}

// 取消点赞文章
export const deleteLike = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,

    })
}