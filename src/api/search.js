//已完成
import request from "@/utils/request";

// 获取搜索联想建议
export const getSearchSuggest = (q) => {
    return request({
        method: 'GET',
        url: `/api/suggestion?q=${q}`
    })
}

// 获取搜索结果
export const getSearchResult = (params) => {
    return request({
        method: 'GET',
        url: `/api/search`,
        params
    })
}