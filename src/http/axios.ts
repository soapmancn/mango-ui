import axios from "axios";
import config from "./config";
import {router} from "../router";
import Cookies from "js-cookie";

export default function $axios() {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        //request 请求拦截
        instance.interceptors.request.use(
            config => {
                let token = Cookies.get('token')
                if (token){ //发送请求时携带token
                    config.headers.token = token
                } else {
                    router.push('/login')
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        //相应拦截器
        instance.interceptors.response.use(
            response => {
                return response.data
            },
            error => {
                return Promise.reject(error)
            }
        )

    })
}