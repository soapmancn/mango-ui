import request from "../axios";

//用户分页查询
export function login(data:any) {
    return request({
        url: '/login/in',
        method: 'post',
        data: data
    })
}

//获取登录的验证码
export function getCheckCode() {
    return request({
        url: '/login/captcha.jpg',
        method: 'get',
        responseType: 'blob'
    })
}