import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'

// Md5解码页面
import CreateUser from '../views/Md5/CreateUser'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'index', component: index, 
  children: [
    { path: '/CreateUser', name: 'CreateUser', component: CreateUser },
  ]},

]

const router = new VueRouter({
  routes
})

export default router
