import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem,removeItem} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY="TOUTIAO_USER"

export default new Vuex.Store({
  state: {
    //存取当前用户信息token等
    user:getItem(TOKEN_KEY),
    
  },
  getters: {
    
  },
  mutations: {
    setUser(state, data){
      state.user = data
      //防止刷新丢失将数据备份到本地
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
