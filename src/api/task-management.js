import { request } from '../utils/request'
import api from './index'

export function getResultScreenshot(query) {
    return request({
        url: api.GetResultScreenshot,
        method: 'get',
        params: query,
        responseType: 'blob'
    })
}
export function getTaskNode(query) {
    return request({
        url: api.GetTaskNode,
        method: 'get',
        params: query
    })
}
export function getTaskDetailByID(query) {
    return request({
        url: api.GetTaskDetailByID,
        method: 'get',
        params: query
    })
}
export function getAppTaskContentByID(query) {
    return request({
        url: api.GetAppTaskContentByID,
        method: 'get',
        params: query
    })
}
export function getTaskContentByID(query) {
    return request({
        url: api.GetTaskContentByID,
        method: 'get',
        params: query
    })
}

export function getTaskResult(data) {
    return request({
        url: api.GetTaskResult,
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        params: data
    })
}
export function getAppTaskNode(data,query) {
    return request({
        url: api.GetAppTaskNode,
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        // headers: { 'Content-Type': 'application/json', 'token-key': tokenVal},
        data: data,
        params: query
    })
}
export function createTask(data) {
    return request({
        url: api.CreateTask,
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        // headers: { 'Content-Type': 'application/json', 'token-key': tokenVal},
        // headers: { 'Content-Type': 'multipart/form-data', 'token-key': tokenVal },
        data: data
    })
}