import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'
import store from '../store/index'
import { Message } from 'element-ui'

// Md5解码页面

// 用户管理
import CreateUser from '../views/User/CreateUser'
import UserList from '../views/User/UserList'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: login, meta: { isPublic: true } },
  {
    path: '/', name: 'index', component: index,
    children: [
      {
        path: '/CreateUser', name: 'createuser', component: CreateUser, meta: { roleid: 5 }
      },
      {
        path: '/UserList', name: 'userlist', component: UserList, meta: { roleid: 5 }
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // window.addEventListener("beforeunload", () => {
  //   sessionStorage.setItem("roleid", store.state.roleid)
  // })
  if (!to.meta.isPublic && !localStorage.token) {
    Message({ type: "error", message: "请先登录!" });
    return next('/login')
  }
  else if (to.meta.roleid == store.state.roleid) {
    return next('/#/')
  } 
    next()
})

export default router
