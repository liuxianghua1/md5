import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleid: "",
    User:[],
  },
  mutations: {
    set_roleid(context,msg){
      context.roleid = msg;
    },
    SetUser(context,msg){
      context.User = msg;
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
