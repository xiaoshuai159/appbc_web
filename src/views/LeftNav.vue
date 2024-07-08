<template>
  <div id="left-nav-container">
    <div class="sidebar clearfix">
      <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="/home">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="/task_management">
            <i class="el-icon-copy-document"></i>
            <span>任务管理</span>
          </el-menu-item> -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-copy-document"></i>
            <span>任务管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/task_management/test_task">测试任务</el-menu-item>
            <el-menu-item index="/task_management/analyse_task">分析任务</el-menu-item>
            <el-menu-item index="/task_management/patrol_task">巡查任务</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/client_management">
          <i class="el-icon-user"></i>
          <span slot="title">客户端管理</span>
        </el-menu-item>
        <el-menu-item index="/result_report">
          <i class="el-icon-data-line"></i>
          <span slot="title">结果报表</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统配置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/system_config/app_probe">app脚本管理</el-menu-item>
            <el-menu-item index="/system_config/app_account">app账号管理</el-menu-item>
            <el-menu-item index="/system_config/app_crawl">app版本跟踪</el-menu-item>
            <!-- <el-menu-item index="/system_config/apk_manage">apk管理</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "LeftNav",
  data() {
    return {
      activeIndex: '',
    };
  },
  watch: {
    $route(to, from) {
      // if(to.path.split('/')[1] !== 'system_config' ){
      //   this.activeIndex = '/' + to.path.split('/')[1]
      // }else{
      //   this.activeIndex = '/system_config/' + to.path.split('/')[2]
      // }
      
      if(to.path.split('/')[1] == 'system_config' ){
        this.activeIndex = '/system_config/' + to.path.split('/')[2]
      }else if(to.path.split('/')[1] == 'task_management' ){
        this.activeIndex = '/task_management/' + to.path.split('/')[2]
      }else{
        this.activeIndex = '/' + to.path.split('/')[1]
      }
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.collapseState
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      this.$router.push(key)
    }
  }
};
</script>
<style lang="less" scoped>
:deep(.el-submenu) {
  i {
    color: #333333;
    margin-left: 12px;
    margin-right: 0px;
    font-size: 18px;
  }

  span {
    line-height: 64px;
    font-size: 16px;
  }

  .el-menu-item{
    font-size: 14px;
    line-height: 40px;
    height: 40px !important;
    text-align: right;
    border: none;
    padding: 0 55px;
  }
  background-color: #ffffff;
  // height: 64px !important;
  // line-height: 64px;
  font-size:16px;
}

.el-menu--collapse>.el-menu-item.is-active i{
  color: #002267;
  background-color: #ffffff;
  font-weight: 700;
}

:deep(.el-menu-item:hover, .el-menu-item.is-active) {
  i, span {
    color: #002267;
    background-color: #ffffff;
    font-weight: 700;
  }
}

:deep(.el-menu-item:focus) {
  i, span {
    color: #002267;
    background-color: #ffffff;
    font-weight: 700;
  }
}

:deep(.el-menu-item) {
  i {
    color: #333333;
    margin-left: 12px;
    font-size: 18px;
    margin-top: 4px;
  }
  background-color: #ffffff;
  height: 64px !important;
  line-height: 64px;
  font-size:16px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 208px;
  height: calc(100% - 0px);
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: 6px 0px 10px #eeeeee8a;
}

.el-menu {
  border-right: 1px solid #F7F9FC;
  height: calc(100% - 0px);
}

.el-menu-item {
  border-bottom: 1px solid #E1E1E1;
  background-color: #ffffff;
}

.el-menu-item:hover {
  background: #ffffff !important;
  font-weight: 700 !important;
  color: #002267 !important;
  transition: font-weight .5s, color .5s;
}

.el-menu-item:focus {
  background: #ffffff !important;
  font-weight: 700 !important;
  color: #002267 !important;
  transition: font-weight .5s, color .5s;
}

.el-menu-item.is-active{
  background: #ffffff !important;
  font-weight: 700 !important;
  color: #002267 !important;
  transition: font-weight .5s, color .5s;
}

.sidebar {
  width: 208px;
  position: absolute;
  height: calc(100% - 0px);
  left: 0;
  z-index: 500;
  span {
    margin-left: 12px;
    color: #333333;
  }
}

.el-menu-item [class^=el-icon-] {
  margin-right: 0px;
}

.nav-item {
  text-align: center;
}

:deep(.el-menu-item-group__title) {
  display: none !important;
}
</style>
