import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleid: "",
    User: [],
    article: "",
    auth: false,
    token: window.localStorage.getItem('token'),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      window.localStorage.setItem('token', token)
    },
    clearToken(state) {
      state.token = ''
      window.localStorage.setItem('token', '')
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      state.auth = true // 获取到用户信息的同时将auth标记为true，当然也可以直接判断userInfo
    },
    set_roleid(context, msg) {
      context.roleid = msg;
    },
    SetUser(context, msg) {
      context.User = msg;
    },
    article(context, msg) {
      context.article = msg;
    },
  },
  getters: {
    get_roleid(state) {
      return state;
    }
  },
  // 事件触发后的逻辑操作
  actions: {
  
  },
  // 返回改变后的数值
  modules: {
  }
})
