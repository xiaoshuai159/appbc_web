import router from "./router";
import store from "./store";

// router.beforeEach((to, from, next) => {
//   let token = store.state.token;
//   let payload = 123456;
//   if (token) {
//     next();
//   } else {
//     store.dispatch("getTokenValue", { payload: payload }).then((res) => {
//       // console.log(333, res);
//     });
//     next();
//   }
// });
