export default {
    method: 'get',
    //基础url前缀
    baseUrl: 'http://localhost:8001',
    //请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    //参数
    data: {},
    timeout: 10000,
    withCredentials: true,
    responseType: 'json'
}