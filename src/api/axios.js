import axios from 'axios'
import https from 'https'
import router from '@/router' // 引入路由对象实例
import store from '@/store'
import { Message } from 'element-ui'
// import {getToken} from '@/api/home'

// 移动端获取token地址完整地址
// phoneTokenUrl = 'http://192.168.20.41:18080/taskTest/api/token/createTokenPayload?payload=123456'

// 实时获取token
const TokenKey = ""
// const defaultURL = "http://192.168.20.41:18080/taskService/api" //移动端外网
// const defaultURL = "http://111.204.101.209:8080/taskService/api" //pc端外网
// const defaultURL = "http://172.27.1.34:8080/taskService/api" //内网 拨测原来
// const defaultURL = "http://172.19.19.41:8001/api" //内网 七部
const defaultURL = "/api"  //// 浩哥 部署环境去掉ip 前端发送的请求里，如果直接指定了ip端口，就不会走nginx代理了
//正确的————————————————————————————————
const instance = axios.create({
  baseURL: defaultURL,
  // timeout: 10000
})

instance.interceptors.request.use(
  config => {
      config.headers['token-key'] = store.state.token
      return config
  },
  error => {
      return Promise.reject(error)
  }
)
// instance.interceptors.response.use(
//     response => {
//       if(response.data.code === 404) {
//         // this.$message({
//         //   message: '1',
//         //   type: "error",
//         // });
//       }else{
//           return response
//       }
//     },
//       error => {
//         console.log(error);
//         if(error.response.status == 404){
//           Message({
//             message: error.response.statusText,
//             type: "error",
//           });
//         }
//           return Promise.reject(error)
//       })
// instance.interceptors.response.use(
//   response => {
//       // console.log("response",response)
//       if(response.data.code === 202) {
//           getToken({payload: 123456}).then(res => {
//               if(res.code === 200){
//                   store.commit('setToken', res.msg)
//               }
//           })
//           let config = response.config
//           config.headers['token-key'] = store.state.token
//           // TODO token 刷新后 重发请求
//           return request(config)
//       }else{
//           return response
//       }
//   },
//   error => {
//       return Promise.reject(error)
//   }
// )
//正确的————————————————————————————————
export default instance
