import axios from 'axios'
import config from "./config";
import {router} from "../router";


export  const request =(options:any)=> {
    return new Promise((resolve, reject) => {

        // create an axios instance
        const instance = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout,
            headers: config.headers,
            withCredentials: config.withCredentials
        })

        // request interceptor
        instance.interceptors.request.use(
            (config:any) => {
                let token = localStorage.getItem('token') //此处换成自己获取回来的token，通常存在在cookie或者store里面
                if (token) {
                    // 让每个请求携带token
                    config.headers['token'] = token
                } else {
                    router.push('/login').then()
                }
                return config
            },
            error => {
                // Do something with request error
                console.log("出错啦", error) // for debug
                Promise.reject(error).then()
            }
        )

        // response interceptor
        instance.interceptors.response.use(
            (response:any) => {
                if (response.data.code == 200 || response.config.responseType == 'blob'){
                    return response.data
                } else {
                    alert(response.data.msg)
                    localStorage.removeItem("token")
                    router.push('/login').then()
                }
            },
            error => {
                console.log('err' + error) // for debug
                alert("出错啦^.^")
                return Promise.reject(error)
            }
        )

        // 请求处理
        instance(options)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default request