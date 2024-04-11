<template>
  <div id="system-index" class="el-main grid-content">
    <div>
      <el-breadcrumb separator="/" style="margin-bottom:0px!important">
        <el-breadcrumb-item :to="{ path: '/system-config' }">系统配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
import AppCrawl from "./AppCrawl.vue";
import AppProbe from "./AppProbe.vue";
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
  name: 'SystemIndex',
  components: {
    AppProbe,
    AppCrawl,
  },
  data() {
    return {};
  },
  // created() {
  //   let currentPath = this.$route.path.split('/')[2]
  //   if (currentPath === 'client_app') {
  //     this.activeClientName = 'clientApp'
  //   } else {
  //     this.activeClientName = 'clientPC'
  //   }
  // },
  // methods: {
  //   handleClientClick(tab, event) {
  //     if (tab.index === '0') {
  //       this.$router.push('/client_management/client_pc')
  //     } else {
  //       this.$router.push({
  //         path: "/client_management/client_app",
  //         query: {
  //           from: "table"
  //         },
  //       });
  //     }
  //   }
  // }
};
</script>
<style lang="less" scoped>
/* 面包屑 */
.el-breadcrumb {
  margin-left: 70px;
  margin-bottom: 16px;
  margin-top: -4px;
}
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #333333 !important;
}
</style>