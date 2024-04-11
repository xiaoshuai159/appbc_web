<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/task_management/test_task' }">测试任务</el-breadcrumb-item>
    </el-breadcrumb>
    <TaskList></TaskList>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css"
import TaskList from "./TaskList.vue";
export default {
  name: "TaskIndex",
  components: {
    TaskList
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
/* 面包屑 */
// .el-breadcrumb {
//   margin-left: 70px;
//   margin-bottom: 16px;
//   margin-top: -4px;
// }
// :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
//   color: #333333 !important;
// }
</style>
