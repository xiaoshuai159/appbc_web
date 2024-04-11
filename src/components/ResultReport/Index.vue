<template>
  <div id="result-index" class="el-main grid-content">
    <div>
      <el-breadcrumb separator="/" style="margin-bottom:15px">
        <el-breadcrumb-item :to="{ path: '/result_report' }">结果报表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="tabs-change">
        <el-tabs type="border-card" v-model="activeResultName" @tab-click="handleResultClick">
          <el-tab-pane label="固网" name="resultPC"></el-tab-pane>
          <el-tab-pane label="移动" name="resultApp"></el-tab-pane>
        </el-tabs>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
  name: 'ResultIndex',
  data() {
    return {
      activeResultName: "resultApp",
    };
  },
  created() {
    let currentPath = this.$route.path.split('/')[2]
    if (currentPath === 'result_app') {
      this.activeResultName = 'resultApp'
    }else{
      this.activeResultName = 'resultPC'
    }
  },
  methods: {
    handleResultClick(tab, event) {
      if(tab.index === '0') {
        this.$router.push('/result_report/result_pc')
      }else{
        this.$router.push('/result_report/result_app')
      }
    }
  }
};
</script>
<style lang="less" scoped>
// /* 面包屑 */
// .el-breadcrumb {
//   margin-left: 70px;
//   margin-bottom: 16px;
// }
// :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
//   color: #333333 !important;
// }
// .button-change{
//   float: right;
//   margin-top: -48px;
//   margin-top: -4px;
// }
</style>