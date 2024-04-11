import { request } from '../utils/request'
import api from './index'

//饼状图
export function getStatisticsAllApp(query) {
    return request({
        url: api.GetStatisticsAllApp,
        method: 'get',
        params: query
    })
}

//折线图
export function getStatisticsTrendApp(query) {
    return request({
        url: api.GetStatisticsTrendApp,
        method: 'get',
        params: query
    })
}

//app维度
export function getStatisticsApp(query) {
    return request({
        url: api.GetStatisticsApp,
        method: 'get',
        params: query
    })
}

//地域维度
export function getStatisticsCityApp(query) {
    return request({
        url: api.GetStatisticsCityApp,
        method: 'get',
        params: query
    })
}

//运营商维度
export function getStatisticsISPApp(query) {
    return request({
        url: api.GetStatisticsISPApp,
        method: 'get',
        params: query
    })
}
