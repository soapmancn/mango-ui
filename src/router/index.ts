// 导入路由 createWebHashHistory模式会在url前加上#；createWebHistory模式是正常url但是会需要增加额外的服务器配置
import {createRouter, createWebHashHistory} from 'vue-router'

// 引入需要路由的组件
const Login = () => import("../views/Login.vue")
const User = () => import("../views/User.vue")
const Home = () => import("../views/Home.vue")
const Dept = () => import("../views/Dept.vue")

// 路由配置
const routes = [
    { path: "/", component: Home ,
        children: [
            {
                path: "/user",
                meta: {
                    isShow: true,
                    title: "用户列表"
                },
                component: User
            },
            {
                path: "/dept",
                meta: {
                    isShow: true,
                    title: "机构列表"
                },
                component: Dept
            }]
    },
    { path: "/login", component: Login }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由拦截
router.beforeEach(to => {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login'){
        return '/login'
    }
    if (token && to.path == '/login'){
        return '/'
    }
})
