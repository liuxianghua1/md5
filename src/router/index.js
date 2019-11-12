import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'

// Md5解码页面

// 用户管理
import CreateUser from '../views/Md5/CreateUser'
import UserList from '../views/Md5/UserList'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {path: '/login', name: 'login', component: login, },
  { path: '/', name: 'index', component: index, 
  children: [
    { path: '/CreateUser', name: 'createuser', component: CreateUser },
    { path: '/UserList', name: 'userlist', component: UserList },
  ]},

]

const router = new VueRouter({
  routes
})

export default router
