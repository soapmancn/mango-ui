import request from "../axios";

//用户分页查询
export function queryByPage(params:any) {
    return request({
        url: '/user',
        method: 'get',
        params
    })
}