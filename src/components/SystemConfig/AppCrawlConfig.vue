<template>
  <div id="app-probe-list" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>app版本跟踪</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>app监测配置</el-breadcrumb-item>
    </el-breadcrumb>
     <!-- 返回上一级 -->
     <div class="task-go-back" @click="goBackTask">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="shadow-div">
      <el-form ref="appProbeForm" :inline="true" :model="appProbeForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="appProbeForm.type">
            <el-option label="全部" value=""></el-option>
            <el-option label="ios" value="ios"></el-option>
            <el-option label="android" value="android"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="packageName">
          <el-input v-model="appProbeForm.packageName">
            <template slot="prepend">App包名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="packageName">
          <el-input v-model="appProbeForm.packageName">
            <template slot="prepend">App名称</template>
          </el-input>
        </el-form-item>
        <div style="text-align: right;">
          <el-button type="primary" @click="appCrawlList()">查询</el-button>
          <el-button type="info" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
    </div>
    <div class="operator-div">
      <div style="display: inline-block;">
        <el-button type="primary" @click="openFrame()" style="width: 130px">+ 新增APP</el-button>
      </div>
    </div>
    <!-- 账号列表 -->
    <div class="shadow-div">
      <div class="base_table">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
          :row-style="{ height: '60px' }">
          <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
          <el-table-column label="序号" width="45" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" :show-overflow-tooltip="true"
            :width="flexWidth('type', tableData, '类型')">
          </el-table-column>
          <el-table-column prop="android" label="App包名" :show-overflow-tooltip="true"
            :width="flexWidth('android', tableData, 'App包名')">
          </el-table-column>
          <el-table-column prop="ios" label="App名称" :width="flexWidth('ios', tableData, 'App名称')">
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn blue" type="info" size="mini" @click="updateAppAcount(scope.row.id)"
                style="margin-right: 10px;">修改</el-button>
              <el-button class="operator-table-btn red" type="danger" size="mini"
                @click="deleteAppAcount(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
          :total="taskTotal" style="float: right; margin-top: 16px">
        </el-pagination>
        <!--点击新增按钮就弹出对话框-->
        <el-dialog title="修改APP信息" :visible.sync="innerVisible" width="28%">
          <!--弹出的对话框的内容-->
          <el-form ref="form" :model="addForm" label-width="100px">
            <el-form-item label="类型" prop="type" class="dialogItem typeItem">
              <el-radio-group v-model="addForm.type">
                <el-radio label="android">android</el-radio>
                <el-radio label="ios">ios</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="lableName" prop="packageName" class="dialogItem">
              <el-input placeholder="请输入" v-model="addForm.packageName" clearable>
              </el-input>
            </el-form-item>
            <el-form-item class="operateBtn">
              <el-button type="primary" @click="toAddAppAccount">保存</el-button>
              <el-button type="info" @click="innerVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
export default {
  name: "AppCrawlConfig",
  data() {
    return {
      appProbeForm: {
        packageName: "",
        type: "",
      },
      tableData: [], //表格数据初始化
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      taskTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
      addForm: {
        id: '',
        packageName: '',
        type: ''
      },
      innerVisible: false,
      lableName: "App包名",
      edit: ""
    };
  },

  watch: {
    "addForm.type": {
      handler(newVal, oldVal) {
        if (newVal === "ios") {
          this.lableName = 'App名称'
        } else {
          this.lableName = 'App包名'
        }
      },
    },
  },

  created() {
    this.appCrawlList(); //初始化表格
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    // 列表初始
    async appCrawlList() {
      const { data: res } = await this.$http.get(
        "/app_package/list",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            packageName: this.appProbeForm.packageName,
            type: this.appProbeForm.type,
          },
        }
      );
      console.log(res);
      if (res.code == 0) {
        let dataList = res.dataList;
        console.log("dataList", dataList)
        dataList.forEach(element => {
          if (element.type == 'ios') {
            element['ios'] = element.packageName
          } else {
            element['ios'] = '/'
          }

          if (element.type == 'android') {
            element['android'] = element.packageName
          } else {
            element['android'] = '/'
          }

        });
        this.tableData = dataList;
        this.taskTotal = res.totalSum; //总条数
        this.$nextTick(() => {
          //在数据加载完，重新渲染表格
          this.$refs["taskTable"].doLayout();
        });
      }
    },
    //刷新
    async refresh() {
      this.appCrawlList();
    },
    //监听回车键
    handleSearch(e) {
      if (e.keyCode == 13) {
        this.appCrawlList();
      }
    },
    //清空
    resetForm() {
      this.appProbeForm.type = "";
      this.appProbeForm.packageName = "";
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.appCrawlList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.appCrawlList();
    },
    //新增app账号
    async toAddAppAccount() {
      console.log("this.edit", this.edit)
      if (this.edit == 'add') {
        const { data: res } = await this.$http.post("/app_package/add?packageName=" + this.addForm.packageName + "&type=" + this.addForm.type);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.innerVisible = false
          this.appCrawlList();
        } else {
          this.$message("添加失败");
        }
      } else {
        this.$confirm("此操作将修改信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const { data: res } = await this.$http.post("/app_package/modify?packageName=" + this.addForm.packageName + "&type=" + this.addForm.type + "&id=" + this.addForm.id);
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.innerVisible = false
            this.appCrawlList()
          } else {
            this.$message("修改失败");
          }
        }).catch(() => {
          this.$message("已取消修改");
        });

      }
    },
    //修改app信息
    async updateAppAcount(id) {
      const { data: res } = await this.$http.get("/app_package/detail?id=" + id);
      if (res.code == 200) {
        this.addForm.type = res.data.type;
        this.addForm.packageName = res.data.packageName;
        this.addForm.id = res.data.id
      }
      this.innerVisible = true
      this.edit = 'update'

    },

    //删除app信息 
    async deleteAppAcount(id) {
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "/app_package/delete?id=" + id
          );

          if (res.code == 200) {
            let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

            let currentPage =
              this.currentPage > totalPage
                ? totalPage
                : this.currentPage;

            this.currentPage = currentPage < 1 ? 1 : currentPage;
            this.appCrawlList();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message(res.msg);
          }
        })
        .catch(() => {
          this.$message("已取消删除");
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

    //返回上一级
    goBackTask() {
      this.$router.push({
        path: "/system_config/app_crawl",
        query: {
          from: "resultTable", //返回参数
          page: this.$route.query.page,
          pageSize: this.$route.query.pageSize,
        },
      });
    },

    openFrame() {
      this.innerVisible = true;
      this.addForm.type = '';
      this.addForm.packageName = '';
      this.edit = 'add'
      this.addForm.id = '';
    }

    
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

:deep(.operateBtn) {
  margin: 0;
  text-align: right;
}

:deep(.operateBtn > .el-form-item__content) {
  margin: 0 !important;
}

:deep(.dialogItem) {
  .el-form-item__label {
    text-align: center;
  }
  .el-input__inner{
    width: inherit;
  }
}

:deep(.typeItem) {
  .el-form-item__content {
    padding: 0 15px;
  }

  .el-form-item__label {
    border-right: 1px solid #dcdfe6;
  }
}

.task-go-back {
  font-family: "Microsoft YaHei";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1675d5;
  float: right;
  margin-top: -34px;
  cursor: pointer;

  i {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #1675d5;
  }
}
</style>