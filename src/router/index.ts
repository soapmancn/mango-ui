// 导入路由 createWebHashHistory模式会在url前加上#；createWebHistory模式是正常url但是会需要增加额外的服务器配置
import {createRouter, createWebHashHistory} from 'vue-router'

// 引入需要路由的组件
const Login = () => import("../views/Login.vue")
const Home = () => import("../views/Home.vue")
const HelloWorld = () => import("../views/HelloWorld.vue")
const Page404 = () => import("../views/404.vue")

// 路由配置
const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/helloworld", component: HelloWorld },
    { path: "/404", component: Page404 },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})