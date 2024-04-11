import { request } from '../utils/request'
import api from './index'

// export function getClientList(data, query) {
//   return request({
//       url: api.GetClientList,
//       method: 'post',
//       headers: { 'Content-Type': 'application/json'},
//       data: data,
//       params: query
//   })
// }
// export function modifyClient(data){
//   return request({
//     url: api.ModifyClient,
//     method: 'post',
//     headers: { 'Content-Type': 'application/json'},
//     data: data
//   })
// }
// export function createClient(data){
//   return request({
//     url: api.CreateClient,
//     method: 'post',
//     headers: { 'Content-Type': 'application/json'},
//     data: data
//   })
// }
// export function deleteClient(query){
//   return request({
//     url: api.DeleteClient,
//     method: 'get',
//     params: query
//   })
// }
// export function getClientDict(){
//   return request({
//     url: api.GetClientDict,
//     method: 'get',
//   })
// }
// export function getSingleClientData(query){
//   return request({
//     url: api.GetSingleClientData,
//     method: 'get',
//     params: query
//   })
// }