import axios from "axios";
// import { getToken, getUserToken } from "../api/home";
import store from "@/store/index";

// development  开发环境
// const defaultURL = "http://192.168.20.41:18080/taskTest/api"
// const defaultURL = "http://111.204.101.209:8080/taskService/api";
// const defaultURL = "http://172.25.5.81:8080/taskService" //tbd 原先拨测地址
// const defaultURL = "http://172.19.19.41:8001"  //七部
// const defaultURL = "http://10.174.194.9:8080/taskService" //二级楼
const defaultURL = ""   // 浩哥 部署环境去掉ip
const request = axios.create({
  baseURL: defaultURL,
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    config.headers["token-key"] = localStorage.getItem("userToken");
    // config.headers["token-key"] = store.state.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// request.interceptors.response.use(
//   (response) => {
//     if (response.data.code === 202) {
//       // getUserToken({password: 'at@123456', userName: 'admin'}).then((res) => {
//       //   if (res.code === 200) {
//       //     localStorage.setItem('userToken', res.data)
//       //   }
//       // });
//       // getToken({ payload: 123456 }).then((res) => {
//       //   if (res.code === 200) {
//       //     store.commit("setToken", res.msg);
//       //   }
//       // });
//       // let config = response.config;
//       // config.headers["token-key"] = store.state.token;
//       // TODO token 刷新后 重发请求
//       return request(config);
//     } else {
//       return response.data;
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { request, defaultURL };
