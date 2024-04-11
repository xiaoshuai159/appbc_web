<template>
  <div id="client-index" class="el-main grid-content">
    <div>
      <el-breadcrumb separator="/" style="margin-bottom:15px!important">
        <el-breadcrumb-item :to="{ path: '/client_management' }">客户端管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="tabs-change">
        <el-tabs type="border-card" v-model="activeClientName" @tab-click="handleClientClick">
          <el-tab-pane label="固网" name="clientPC"></el-tab-pane>
          <el-tab-pane label="移动" name="clientApp"></el-tab-pane>
        </el-tabs>
      </div> -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
  name: 'ClientIndex',
  components: {
  },
  data() {
    return {
      activeClientName: "clientApp",
    };
  },
  created() {
    let currentPath = this.$route.path.split('/')[2]
    if (currentPath === 'client_app') {
      this.activeClientName = 'clientApp'
    } else {
      this.activeClientName = 'clientPC'
    }
  },
  methods: {
    handleClientClick(tab, event) {
      if (tab.index === '0') {
        this.$router.push('/client_management/client_pc')
      } else {
        this.$router.push({
          path: "/client_management/client_app",
          query: {
            from: "table"
          },
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>

</style>