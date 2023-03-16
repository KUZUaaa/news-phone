// 文章列表

import request from "@/utils/request";


// 获取文章列表数据
export const getArticle = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}