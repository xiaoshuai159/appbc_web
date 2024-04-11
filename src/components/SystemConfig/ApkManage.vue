<template>
    <div id="app-probe-list" class="el-main grid-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统配置</el-breadcrumb-item>
        <el-breadcrumb-item breadcrumb-item>apk管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="shadow-div">
        <el-form ref="appProbeForm" :inline="true" :model="appProbeForm">
          <el-form-item prop="appName">
            <el-input v-model="appProbeForm.apkname">
              <template slot="prepend">apk包名</template>
            </el-input>
          </el-form-item>
          <div style="text-align: right;">
            <el-button type="primary" @click="searchForm()">查询</el-button>
            <el-button type="info" @click="resetForm()">重置</el-button>
          </div>
        </el-form>
      </div>
      <div class="operator-div">
        <!-- 新增账号 -->
        <div style="display: inline-block;">
          <el-button type="primary" @click="toAddAppAccount" style="width: 130px">+ 上传apk</el-button>
        </div>
      </div>
      
      <!-- 账号列表 -->
      <div class="shadow-div">
        <div class="base_table">
          <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
            :row-style="{ height: '60px' }">
            <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
            <!-- <el-table-column label="序号" width="45" fixed="left">
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column> -->
            <el-table-column prop="id" label="序号" width="45" fixed="left">
            </el-table-column>
            <el-table-column prop="pkgName" label="apk包名" :show-overflow-tooltip="true"
              :width="flexWidth('pkgName', tableData, 'apk包名')">
            </el-table-column>
            <el-table-column prop="mainActivity" label="主活动名" :show-overflow-tooltip="true"
              :width="flexWidth('mainActivity', tableData, '主活动名')">
            </el-table-column>
            <el-table-column prop="apps" label="启动页面名" :width="flexWidth('apps', tableData, 'app名称')">
            </el-table-column>
            <el-table-column prop="signature" label="数字签名" :show-overflow-tooltip="true"
              :width="flexWidth('signature', tableData, '数字签名')">
            </el-table-column>
            <el-table-column prop="permissions" label="权限列表" :show-overflow-tooltip="true"
              :width="flexWidth('permissions', tableData, '权限列表')">
              <template slot-scope="scope">
                <el-button class="operator-table-btn blue" type="info" size="mini" @click="openAllPermiss(scope.row.id)"
                  >更多</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="sdks" label="第三方sdk列表" :show-overflow-tooltip="true"
              :width="flexWidth('sdks', tableData, '第三方sdk列表')">
              <template slot-scope="scope">
                <el-button class="operator-table-btn blue" type="info" size="mini" @click="openAllSdk(scope.row.id)"
                  >更多</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="来源" :show-overflow-tooltip="true"
              :width="flexWidth('source', tableData, '来源')">
            </el-table-column>
            <!-- <el-table-column label="操作" width="120" fixed="right">
              <template slot-scope="scope">
                <el-button class="operator-table-btn blue" type="info" size="mini" @click="updateAppAcount(scope.row.id)"
                  style="margin-right: 10px;">修改</el-button>
                <el-button class="operator-table-btn red" type="danger" size="mini"
                  @click="deleteAppAcount(scope.row.id)">删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="pageSize" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
            :total="taskTotal" style="float: right; margin-top: 16px">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="权限列表" :visible.sync="PermissDialogVisible">
      </el-dialog>
      <el-dialog title="第三方sdk列表" :visible.sync="SdkDialogVisible">
      </el-dialog>
    </div>
  </template>
  <script>
  import "@/assets/css/query-form-style.css";
  export default {
    name: "AppAccount",
    data() {
      return {
        PermissDialogVisible:false,
        SdkDialogVisible:false,
        appProbeForm: {
          apkname: "",
        },
        tableData: [{}], //表格数据初始化
        currentPage: 1, //当前页码
        pageSize: 10, //每页最大条数
        taskTotal: 0, //实际数据总条数
        tableDataLoading: false, // 表格加载动画
      };
    },
    created() {
      if (this.$route.query.from == 'resultTable') {
        this.currentPage = parseInt(this.$route.query.page); //请求对应的页码数据
        this.pageSize = parseInt(this.$route.query.pageSize);
      }
      // this.tasklist(); //初始化表格
    },
    mounted() {
      window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
      window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },
    methods: {
      openAllPermiss(row){
        this.PermissDialogVisible = true
        console.log(row);
      },
      openAllSdk(row){
        console.log(row);
        this.SdkDialogVisible = true
      },
      // 列表初始
      async tasklist() {
        const { data: res } = await this.$http.get(
          "/apk/list",
          {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
              pkgname: this.appProbeForm.apkname,
            },
          }
        );
        console.log(res);
        if (res.code == 0) {
          this.taskTotal = res.totalSum; //总条数
  
          let tempData = res.dataList;
          let startNum = (this.currentPage - 1) * this.pageSize + 1;
          this.tableData = tempData.map((item, index) => {
            item.num = index + startNum;
            return item;
          });
  
          this.$nextTick(() => {
            //在数据加载完，重新渲染表格
            this.$refs["taskTable"].doLayout();
          });
        }
      },
      // 列表初始
      async searchForm() {
        this.currentPage = 1;
        const { data: res } = await this.$http.get(
          "/apk/list",
          {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
              pkgname: this.appProbeForm.apkname,
            },
          }
        );
        console.log(res);
        if (res.code == 0) {
          this.taskTotal = res.totalSum; //总条数
  
          let tempData = res.dataList;
          let startNum = (this.currentPage - 1) * this.pageSize + 1;
          this.tableData = tempData.map((item, index) => {
            item.num = index + startNum;
            return item;
          });
  
          this.$nextTick(() => {
            //在数据加载完，重新渲染表格
            this.$refs["taskTable"].doLayout();
          });
        }
      },
  
      //刷新
      async refresh() {
        this.tasklist();
      },
      //监听回车键
      handleSearch(e) {
        if (e.keyCode == 13) {
          this.tasklist();
        }
      },
      //清空
      resetForm() {
        this.appProbeForm.apkname = "";
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.tasklist();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tasklist();
      },
      //新增app账号
      toAddAppAccount() {
        this.$router.push({
          path: "/system_config/add_apk_manage",
          query: {
            page: this.currentPage,
            pageSize: this.pageSize,
            from: "table"
          },
        });
      },
      //修改app信息
      async updateAppAcount(id) {
        this.$router.push({
          path: "/system_config/add_apk_manage",
          query: {
            id: id,
            page: this.currentPage,
            pageSize: this.pageSize,
            from: "update"
          },
        });
      },
    
      //表格自适应宽度
      flexWidth(prop, tableData, title, num = 0) {
        if (tableData.length === 0) {//表格没数据不做处理
          return;
        }
        let flexWidth = 0;//初始化表格列宽
        let columnContent = '';//占位最宽的内容
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font = "14px Microsoft YaHei";
        if ((prop === '') && title) {//标题长内容少的，取标题的值,
          columnContent = title
        } else {// 获取该列中占位最宽的内容
          let index = 0;
          for (let i = 0; i < tableData.length; i++) {
            const now_temp = tableData[i][prop] + '';
            const max_temp = tableData[index][prop] + '';
            const now_temp_w = context.measureText(now_temp).width
            const max_temp_w = context.measureText(max_temp).width
            if (now_temp_w > max_temp_w) {
              index = i;
            }
          }
          columnContent = tableData[index][prop]
          //比较占位最宽的值跟标题、标题为空的留出四个位置
          const column_w = context.measureText(columnContent).width
          const title_w = context.measureText(title).width
          if (column_w < title_w) {
            columnContent = title || '留四个字'
          }
        }
        // 计算最宽内容的列宽
        let width = context.measureText(columnContent);
        flexWidth = width.width + 40 + num
        return flexWidth + 'px';
      },
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
  
  :deep(.el-table__header) {
    width: 100% !important;
  }
  
  :deep(.el-table__body) {
    width: 100% !important;
  }
  
  .shadow-div {
    box-shadow: 0 0 8px #cecece;
    padding: 20px;
    margin-bottom: 20px;
    float: right;
    width: calc(100% - 110px);
    background-color: #fff;
    position: relative;
  }
  
  .operator-div {
    margin-bottom: 20px;
    float: right;
    width: calc(100% - 70px);
  }
  
  // 表格字段加大
  // :deep(.el-table) {
  //   font-size: 16px !important;
  // }
  
  // :deep(.el-table thead) {
  //   color: rgb(22, 43, 91);
  // }
  
  // :deep(.el-table .el-table__cell) {
  //   padding: 4px 0 !important;
  // }
  // 新增结束
  
  :deep(form.el-form.el-form--inline) {
    width: 100%;
  }
  
  :deep(.el-input-group__prepend) {
    width: 71px;
    text-align: right;
    padding: 0 8px;
  }
  
  :deep(.el-form-item__label) {
    width: 88px;
    padding: 0 8px !important;
  }
  
  :deep(.el-input__prefix, .el-input__suffix) {
    display: none;
  }
  
  :deep(input.el-input__inner) {
    width: 305px;
  }
  
  .input-time {
    width: 143px;
  }
  
  :deep(.input-time > .el-input__inner) {
    padding: 0;
    width: 143px;
    text-align: center;
  }
  
  :deep(.el-input--mini > .el-input__inner) {
    width: 198px;
  }
  
  :deep(.is-in-pagination > .el-input__inner) {
    width: 46px;
  }
  
  span.split {
    vertical-align: top;
    margin: 0 3px;
  }
  
  .formLine {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .formLime-item {
    flex: 1;
    width: 100%;
    margin-right: 0;
  }
  
  :deep(.el-select .el-input) {
    width: 93% !important;
  }
  
  .el-button {
    color: #ffffff;
    width: 70px;
    // width: 74px;
    height: 40px;
    // font-size: 16px !important;
    border-radius: 4px;
  }
  
  .el-button--primary {
    background: #162b5b;
    border-color: #162b5b;
  }
  
  :deep(.el-button--info) {
    color: #333333;
    background-color: white;
    border-color: #d3d4dd;
  }
  
  .batch-opt {
    font-family: Microsoft YaHei;
    font-size: 15px;
    // font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
    padding: 0 12px;
  }
  
  .border-right {
    border-right: 1px solid #cecece;
  }
  
  .l10 {
    margin-left: 10px;
  }
  
  .green {
    color: #4abe86;
  }
  
  .orange {
    color: #f39300;
  }
  
  .red {
    color: #f74e57;
  }
  
  .blue {
    color: #1675d5;
  }
  
  .grey {
    color: #666666;
  }
  
  .font-bold {
    font-weight: bold;
  }
  
  .operator-table-btn {
    font-family: Microsoft YaHei;
    padding: 0;
    width: auto;
    height: auto;
    font-size: 14px;
    // font-size: 17px; //修改了字号
    background-color: white;
    border: none;
    border-radius: 0;
  }
  
  button.is-disabled,
  button.is-disabled:hover {
    color: gray;
    background-color: white;
  }
  
  :deep(.cell) {
    padding: 0 5px !important;
    white-space: nowrap; //不换行
    // font-size: 17px !important;
  }
  
  :deep(.el-table) {
    font-size: 16px !important;
  }
  
  :deep(.el-table thead) {
    color: rgb(22, 43, 91);
  }
  
  :deep(.el-table .el-table__cell) {
    padding: 4px 0 !important;
  }
  
  .center-radios {
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }
  
  .more {
    color: #1675d5;
    text-decoration: underline;
    cursor: pointer;
  }
  </style>
    