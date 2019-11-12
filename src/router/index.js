import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import About from '../views/About.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'index', component: index, 
  children: [
    { path: '/about', name: 'about', component: About },
  ]},

]

const router = new VueRouter({
  routes
})

export default router
