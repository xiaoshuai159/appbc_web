<template>
  <div id="home-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <DeviceStatus></DeviceStatus>
    <DeviceMap></DeviceMap>
  </div>
</template>
<script>
import DeviceStatus from "./DeviceStatus.vue";
import DeviceMap from "./DeviceMap.vue";
export default {
  name: "HomeIndex",
  components: {
    DeviceStatus,
    DeviceMap,
  },
  data() {
    return {};
  },
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
