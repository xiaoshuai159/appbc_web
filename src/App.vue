<template>
  <div id="app">
    <Header></Header>
    <div>
      <LeftNav style="float: left;"></LeftNav>
      <router-view :class="{'box-view': active}"></router-view>
    </div>
  </div>
</template>
<script>
import "@/assets/css/font-awesome.min.css";
import "@/assets/css/style.css";
import Header from "@/views/Header.vue";
import LeftNav from "@/views/LeftNav.vue";
// import { getToken, getUserToken } from "@/api/home"
import store from "@/store"
export default {
  data() {
    return {
      userToken: ''
    }
  },
  // created() {
  //   getToken({payload: 123456}).then(res => {
  //     if(res.code === 200) {
  //       store.commit('setToken', res.msg)
  //     }
  //   })
  //   getUserToken({password: 'at@123456', userName: 'admin'}).then(res => {
  //     if(res.code === 200) {
  //       localStorage.setItem('userToken', res.data)
  //     }
  //   })
  // },
  components: {
    Header,
    LeftNav
  },
  computed: {
    active() {
      return !this.$store.state.collapseState
    }
  },
}
</script>
<style lang="less">
.box-view {
  margin-left: 140px;
}
body{
  margin: 0px !important;
  min-width: 1200px;
  overflow-x: scroll;
  background: #F7F9FC;
}
</style>
