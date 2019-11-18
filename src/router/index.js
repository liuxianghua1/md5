import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import login from '../views/login.vue'
// import store from '../store/index'
import { Message } from 'element-ui'

// Md5解码页面

// 用户管理
import CreateUser from '../views/User/CreateUser'
import UserList from '../views/User/UserList'

// 流水记录
import Record from '../views/Record/Record'

// 解码记录
import DecodingRecord from '../views/Decoding/DecodingRecord'
import DecodingFile from '../views/Decoding/DecodingFile'


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
      { path: '/CreateUser', name: 'createuser', component: CreateUser, meta: { roleid: [1, 2] } },
      {
        path: '/UserList', name: 'userlist', component: UserList, meta: { roleid: [1, 2] }
      },
      { path: '/Record', name: 'record', component: Record, },
      { path: '/DecodingRecord', name: 'decodingrecord', component: DecodingRecord, },
      { path: '/DecodingFile', name: 'decodingfile', component: DecodingFile, },
    ]
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  window.addEventListener('storage', function () {
    localStorage.clear();
    window.location.replace("/#/login");
  });
  if (!to.meta.isPublic && !localStorage.token) {
    Message({ type: "error", message: "请先登录!" });
    return next('/login')
  }
  if (to.fullPath == '/UserList' || to.fullPath == '/CreateUser') {
    if (!to.meta.roleid.includes(Number(localStorage.roleid))) {
      return next('/#/')
    }
  }
  next()
})

export default router
