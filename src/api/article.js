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