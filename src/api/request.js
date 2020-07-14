import { request } from "./config"

export function getSnake() {
    return request({
        url:'/Snake.json',
    })
}

export function getSnakeGoods(type,page) {
    return request({
        url:'/Snake.json',
        params:{
            type,
            page,
        }
    })
}