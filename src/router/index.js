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
                path: 'personalinfo_collection',
                component: PersonalInfo_collection
            }
        ]
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
    { path: "/paper", component: () => import('../views/Paper.vue') },
    { path: "/paperread", component: () => import("../views/Paperread.vue") },
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
