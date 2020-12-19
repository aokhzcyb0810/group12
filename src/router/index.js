import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path:"/hello",compone:()=>import("../views/Home.vue")},
  {path:"/login",compone:()=>import("../views/Login.vue")},
  {path:"/paper",compone:()=>import('../views/Paper.vue')},
  {path:"/paperread",compone:()=>import("../views/Paperread.vue")},
  {path:"/owncomments",compone:()=>import("../views/Owncomments.vue")}
]

const router = new VueRouter({
  routes
})

export default router
