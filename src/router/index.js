import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import PersonalInfo from '../components/PersonalInfo.vue'
import Top from '../components/Top.vue'
import PersonalInfo_child from '../components/PersonalInfo_child.vue'
import PersonalInfo_follow from '../components/PersonalInfo_follow.vue'
import PersonalInfo_collection from '../components/PersonalInfo_collection.vue'
import PaperCollection from '../components/PaperCollection.vue'
import ManagerInfo from '../components/ManagerInfo.vue'
import ManagerInfo_manager from '../components/ManagerInfo_manager.vue'
import PersonalInfo_academ from '../components/PersonalInfo_academ.vue'
import Search from '../views/Search'
import Scholar from '../views/Scholar.vue'
import Paper from "../views/Paper";
import Paperread from "../views/Paperread";
import Academic_home from "../components/Academic_home.vue"
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path:"/search",
        component:Search
    },
    {
        path:"/scholar",
        component:Scholar
    },
    {
        path: '/personalinfo',
        component: PersonalInfo,
        children: [
            {
                path: '',
                redirect: 'personalinfo_child'
            },
            {
                path: 'personalinfo_child',
                component: PersonalInfo_child
            },
            {
                path: 'personalinfo_follow',
                component: PersonalInfo_follow
            },
            {
                path:'personalinfo_collection',
                component:PersonalInfo_collection
            },
            {
                path:'personalinfo_academ',
                component:PersonalInfo_academ
            }
        ]
    },
    {
        path:'/academic_home',
        component:Academic_home
    },
    {
        path: '/top',
        component: Top
    },
    {
        path: '/papercollection',
        component: PaperCollection
    },
    {
        path: '/managerInfo',
        component: ManagerInfo,
        children: [
            {
                path: '',
                redirect: 'personalinfo_manager'
            },
            {
                path: 'personalinfo_child',
                component: PersonalInfo_child
            },
            {
                path: 'personalinfo_follow',
                component: PersonalInfo_follow
            },
            {
                path: 'personalinfo_collection',
                component: PersonalInfo_collection
            },
            {
                path: 'personalinfo_manager',
                component: ManagerInfo_manager
            }

        ]
    },
    {
        path: "/paper/:id",
        name: 'paper',
        component: Paper
    },
    {
        path: "/paperread/:id",
        name: 'paperread',
        component: Paperread
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
