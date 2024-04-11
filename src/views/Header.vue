<template>
    <div id="top" class="clearfix">
      <div class="el-header">
        <!-- 拨测系统 -->
        面向移动应用的自动化巡检平台
        <a
          @click="changeCollapseState"
          class="sidebar-open-button"
          style="color: #ffffff; margin-left:40px;">
          <i class="el-icon-s-unfold" v-if="isCollapse === false"></i>
          <i class="el-icon-s-fold" v-else></i>
        </a>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapseState() {
      this.isCollapse = !this.isCollapse
      this.$store.commit("setCollapseState", this.isCollapse);
    },
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #0C172F;
  color: #FFFFFF;
  line-height: 64px;
  font-size: 20px;
  font-weight: bold;
}

</style>
