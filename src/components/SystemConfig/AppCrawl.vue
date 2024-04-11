<template>
  <div id="app-crawl-list" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>app版本跟踪</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="shadow-div">
      <el-form ref="appCrawlForm" :inline="true" :model="appCrawlForm">
        <el-form-item prop="appName">
          <el-input v-model="appCrawlForm.appName">
            <template slot="prepend">App真实名称</template>
          </el-input>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="appCrawlForm.source">
            <el-option label="全部" value=""></el-option>
            <el-option label="Google Play" value="Google Play"></el-option>
            <el-option label="Apple Store" value="Apple Store"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间" prop="taskTime">
          <el-date-picker v-model="appCrawlForm.startDate" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placement="bottom-start" placeholder="开始时间" class="input-time">
          </el-date-picker>
          <span class="split">至</span>
          <el-date-picker v-model="appCrawlForm.endDate" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            placement="bottom-start" placeholder="结束时间" class="input-time">
          </el-date-picker>
        </el-form-item>
        <div style="text-align: right;">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="info" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
    </div>
    <div class="operator-div">
      <!-- 新增App -->
      <div style="display: inline-block;">
        <el-button type="primary" @click="toAddProbeApp" style="width: 130px">+ App监测配置</el-button>
      </div>
      <!-- 导出按钮 -->
      <div style="float: right;">
        <el-button style="width: 140px;background-color: #F39300;" @click="exportResult()">
          <i class="el-icon-document-copy"></i>
          <span style="margin-left: 8px;">导出查询结果</span>
        </el-button>
      </div>
    </div>
    <!-- App列表 -->
    <div class="shadow-div">
      <div class="base_table">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark myTooltips" :data="tableData" ref="appCrawlTable"
          :row-style="{ height: '60px' }" @selection-change="handleSelectionChange" table-layout="auto">
          <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
          <!-- <el-table-column label="序号" width="45" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
            </template>
          </el-table-column> -->

          <el-table-column prop="num" label="序号" width="45" fixed="left">
          </el-table-column>

          <el-table-column prop="status" label="更新状态" :show-overflow-tooltip="true" width="90">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0" style="color: #0090ff; background-color: #e5f5ff" class="center-radios">
                正常
              </div>
              <div v-if="scope.row.status == 1" style="color: #f85f68; background-color: #fddcdd" class="center-radios">
                新增
              </div>
              <div v-if="scope.row.status == 2" style="color: #ff9b24; background-color: #fdf2da" class="center-radios">
                更新
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="AppID" :show-overflow-tooltip="true" width="60">
          </el-table-column>
          <el-table-column prop="source" label="来源" :show-overflow-tooltip="true"
            :width="flexWidth('source', tableData, '来源')">
          </el-table-column>
          <el-table-column prop="appName" label="App真实名称" :show-overflow-tooltip="true"
            :width="flexWidth('appName', tableData, 'App真实名称')">
          </el-table-column>
          <el-table-column prop="appVer" label="版本" :width="flexWidth('appVer', tableData, '版本')">
          </el-table-column>
          <el-table-column prop="supplier" label="提供方" :show-overflow-tooltip="true"
            :width="flexWidth('supplier', tableData, '提供方')">
          </el-table-column>
          <el-table-column prop="appUpdateDate" label="更新日期" :width="flexWidth('appUpdateDate', tableData, '更新日期')">
          </el-table-column>
          <el-table-column prop="appPublishDate" label="发布日期" :width="flexWidth('appPublishDate', tableData, '发布日期')">
            <template slot-scope="scope">{{ scope.row.appPublishDate ? scope.row.appPublishDate : "无" }}</template>
          </el-table-column>
          <el-table-column prop="appUrl" label="爬取链接" :show-overflow-tooltip="true"
            :width="flexWidth('appUrl', tableData, '爬取链接')">
          </el-table-column>
          <el-table-column prop="description" label="描述" :show-overflow-tooltip="true" width="250">
          </el-table-column>
          <el-table-column prop="remarks" label="备注" :width="flexWidth('remarks', tableData, '备注')">
          </el-table-column>
          <el-table-column label="操作" width="50" fixed="right">
            <template slot-scope="scope">
              <!-- <i class="el-icon-edit blue"></i> -->
              <el-button class="operator-table-btn blue" type="info" size="mini"
                @click="updateCrawlAppInfo(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
          :total="taskTotal" style="float: right; margin-top: 16px">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";

export default {
  name: "AppCrawl",
  data() {
    return {
      appCrawlForm: {
        appName: "",
        startDate: "",
        endDate: "",
        source: "",
      },
      tableData: [], //表格数据初始化
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      taskTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
      multipleSelection: [],   //多选数组
      ids: ""                   //id串
    };
  },
  created() {
    if (this.$route.query.from == 'resultTable') {
      this.currentPage = parseInt(this.$route.query.page); //请求对应的页码数据
      this.pageSize = parseInt(this.$route.query.pageSize);
    }
    this.appCrawlList(); //初始化表格
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
    // autofit.init({
    //   dh:1000,
    //   dw:1920,
    //   el:'#testapp',
    //   resize:true
    // },false)
  },
  // beforeUnmount() {
  //   autofit.off()
  // },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    // 列表初始
    async appCrawlList() {
      const { data: res } = await this.$http.get(
        "/appVersion/list",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            appName: this.appCrawlForm.appName,
            startDate: this.appCrawlForm.startDate,
            endDate: this.appCrawlForm.endDate,
            source: this.appCrawlForm.source,
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
          this.$refs["appCrawlTable"].doLayout();
        });
      }
    },
    //监听回车键
    handleSearch(e) {
      if (e.keyCode == 13) {
        this.searchForm();
      }
    },
    //查询App
    async searchForm() {
      this.currentPage = 1;
      const { data: res } = await this.$http.get(
        "/appVersion/list",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            appName: this.appCrawlForm.appName,
            startDate: this.appCrawlForm.startDate,
            endDate: this.appCrawlForm.endDate,
            source: this.appCrawlForm.source,
          },
        }
      );
      if (res.code == 0) {
        this.taskTotal = res.totalSum;
        let tempData = res.dataList;
        let startNum = (this.currentPage - 1) * this.pageSize + 1;
        this.tableData = tempData.map((item, index) => {
          item.num = index + startNum;
          return item;
        });
        this.$nextTick(() => {
          //在数据加载完，重新渲染表格
          this.$refs["appCrawlTable"].doLayout();
        });
      }
    },
    //清空
    resetForm() {
      this.appCrawlForm.appName = "";
      this.appCrawlForm.startDate = "";
      this.appCrawlForm.endDate = "";
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
    //修改
    async updateCrawlAppInfo(id) {
      this.$router.push({
        path: "/system_config/update_crawl_app",
        query: {
          id: id,
          page: this.currentPage,
          pageSize: this.pageSize,
          from: "table"
        },
      });
    },
    //导出
    async exportResult() {
      const { data: res } = await this.$http.get(
        "/appVersion/export",
        {
          params: {
            appName: this.appCrawlForm.appName,
            startDate: this.appCrawlForm.startDate,
            endDate: this.appCrawlForm.endDate,
            source: this.appCrawlForm.source,
          },
          responseType: 'blob', //设置请求的类型为blob文件流形式
        },
      );
      console.log(res);
      const link = document.createElement('a');
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
      link.style.display = 'none';
      //设置链接
      link.href = URL.createObjectURL(blob); //将文件流转成blob地址
      link.download = "APP版本监测数据";
      document.body.appendChild(link);
      link.click();
    },
    //批量操作按钮
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
      var str = "";
      for (var i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].id + ",";
      }
      //去掉最后一个逗号(如果不需要去掉，就不用写)
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      this.ids = str;
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

    //新增拨测App
    toAddProbeApp() {
      this.$router.push({
        path: "/system_config/app_crawl_config",
        query: {
          page: this.currentPage,
          pageSize: this.pageSize
        },
      });
    },
  },
};
</script>
<style lang="less">
.myTooltips{
    // background-color: pink !important;
    line-height: 14px!important;
    max-width: 50%!important;
    color: #fff !important;
}
</style>
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
  //margin-bottom: 20px;
  float: right;
  width: calc(100% - 70px);
  padding-bottom: 20px;
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
