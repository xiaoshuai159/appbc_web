<template>
  <div id="client-list">
    <div class="shadow-div">
      <el-form ref="clientAppForm" :inline="true" :model="clientAppForm">
        <el-form-item prop="appiumId">
          <el-input v-model="clientAppForm.appiumId">
            <template slot="prepend">AppiumId</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="clientAppForm.id">
            <template slot="prepend">客户端编号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="udid">
          <el-input v-model="clientAppForm.udid">
            <template slot="prepend">设备编号</template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="clientAppForm.status">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="在线" value="1"></el-option>
            <el-option label="离线" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="province" label="省份">
          <el-select v-model="clientAppForm.province">
            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isp" label="运营商">
          <el-select v-model="clientAppForm.isp">
            <el-option v-for="item in ispOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="operateSystem" label="操作系统">
          <el-select v-model="clientAppForm.os">
            <el-option v-for="item in osOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="osVersion" label="系统版本">
          <el-select v-model="clientAppForm.osVersion">
            <el-option v-for="item in versionOptions" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="operator-form-btn">
          <el-button type="primary" @click="cx()">查询</el-button>
          <el-button type="info" @click="resetForm()">重置</el-button>
        </div>
      </el-form>
    </div>
    <!-- 操作列 -->
    <div class="operator-div">
      <!-- 创建任务 -->
      <div style="display: inline-block;">
        <el-button type="primary" @click="addClient()" style="width: 130px">+ 新增客户端</el-button>
      </div>
      <!-- 设备数量展示 -->
      <div style="float: right; margin-top: 10px">
        <span class="client-device">设备在线数量: </span>
        <span class="client-device-num client-device-num-online">{{ online }}</span>
        <span class="client-device" style="border-left: 1px solid #CECECE; padding-left: 24px;">设备离线数量: </span>
        <span class="client-device-num client-device-num-outline">{{ outline }}</span>
      </div>
    </div>
    <!-- 客户端列表 -->
    <div class="shadow-div">
      <div class="base_table">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="clientTable"
          :row-style="{ height: '60px' }">
          <el-table-column type="selection" width="25"> </el-table-column>
          <el-table-column label="序号" width="45">
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="appiumId" label="AppiumId" :show-overflow-tooltip="true" width="95">
          </el-table-column>
          <el-table-column prop="appiumIp" label="AppiumIp" :show-overflow-tooltip="true"
            :width="flexWidth('appiumIp', tableData, 'AppiumIp')">
          </el-table-column>
          <el-table-column prop="id" label="客户端编号" :show-overflow-tooltip="true" width="90">
          </el-table-column>
          <el-table-column prop="udid" label="设备编号" :show-overflow-tooltip="true"
            :width="flexWidth('udid', tableData, '设备编号')">
          </el-table-column>
          <el-table-column prop="udid" label="设备名称" :show-overflow-tooltip="true"
            :width="flexWidth('udid', tableData, '设备名称')">
          </el-table-column>
          <el-table-column prop="appiumPort" label="端口" :show-overflow-tooltip="true"
            :width="flexWidth('appiumPort', tableData, '端口')">
          </el-table-column>
          <el-table-column prop="brand" label="手机品牌" :show-overflow-tooltip="true"
            :width="flexWidth('brand', tableData, '手机品牌')">
          </el-table-column>
          <el-table-column prop="province" label="省份" :show-overflow-tooltip="true"
            :width="flexWidth('province', tableData, '省份')">
          </el-table-column>
          <el-table-column prop="isp" label="运营商" :show-overflow-tooltip="true"
            :width="flexWidth('isp', tableData, '运营商')">
          </el-table-column>
          <el-table-column prop="os" label="操作系统" :show-overflow-tooltip="true"
            :width="flexWidth('os', tableData, '操作系统')">
          </el-table-column>
          <el-table-column prop="osVersion" label="系统版本" :show-overflow-tooltip="true"
            :width="flexWidth('osVersion', tableData, '系统版本')">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true"
            :width="flexWidth('phone', tableData, '手机号')">
          </el-table-column>
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true"
            :width="flexWidth('status', tableData, '状态')">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 1" class="font-bold green">
                在线
              </div>
              <div v-if="scope.row.status === 0" class="font-bold red">
                离线
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="更新时间" :show-overflow-tooltip="true" width="190">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="110">
            <template slot-scope="scope">
              <!-- <el-button class="operator-table-btn orange" type="warning" size="mini" @click="connectClient(scope.row.id)"
                :disabled="scope.row.status == 0">连接</el-button>
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="updateClient(scope.row.id)">修改</el-button>
              <el-button class="operator-table-btn red" type="danger" size="mini"
                @click="deleteClient(scope.row.id)">删除</el-button> -->
              <!-- <el-button class="operator-table-btn orange" type="warning" size="mini"
                :disabled="scope.row.status == 0">连接</el-button> -->
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="updateClient(scope.row.id)">修改</el-button>
              <el-button class="operator-table-btn red" type="danger" size="mini"
                @click="deleteClient(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
          :total="clientTotal" style="float: right; margin-top: 16px">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
export default {
  name: "ClientApp",
  data() {
    return {
      osOptions:[],
      provinceOptions: [],
      ispOptions:[],
      versionOptions:[],
      clientAppForm: {
        appiumId: "",
        id: "",
        udid: "",
        sTime: "",
        eTime: "",
        province: "",
        taskType: "全部",
        status: "全部",
        priority: "全部",
        isp: "",
        os: "",
        osVersion:""
      },
      outline: 0,
      online: 0,
      tableData: [], //表格数据初始化
      currentPage: 1, //当前页码
      pageSize: 10, //每页最大条数
      clientTotal: 0, //实际数据总条数
      tableDataLoading: false, // 表格加载动画
    };
  },
  created() {
    if (this.$route.query.from == 'update') { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
      this.currentPage = parseInt(this.$route.query.page); //请求对应的页码数据
      this.pageSize = parseInt(this.$route.query.pageSize);
    }
    this.clientList(); //初始化表格
    this.clientLineNum();
    this.getOptionsAPI()
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    async getOptionsAPI() {
      const { data: provinceRes } = await this.$http.get("/dict/province");
      this.provinceOptions = provinceRes.map((item) => {
        return {
          value: item,
          label: item
        }
      })
      const { data: ispRes } = await this.$http.get("/dict/isp");
      this.ispOptions = ispRes.map((item) => {
        return {
          value: item,
          label: item
        }
      })
      const { data: versionRes } = await this.$http.get("/dict/android_version");
      this.versionOptions = versionRes.map((item) => {
        return {
          value: item,
          label: item
        }
      })
      const { data: osRes } = await this.$http.get("/dict/systems");
      this.osOptions = osRes.map((item) => {
        return {
          value: item,
          label: item
        }
      })
    },
    // 列表初始
    async clientList() {
      let list = {};
      const { data: res } = await this.$http.post("/client/list?page=" + this.currentPage + "&pageSize=" + this.pageSize, list);
      if (res.code == 0) {
        this.tableData = res.dataList;
        this.clientTotal = res.totalSum;
        this.$nextTick(() => {
          //在数据加载完，重新渲染表格
          this.$refs["clientTable"].doLayout();
        });
      }
    },
    //刷新
    async refresh() {
      this.clientList();
    },
    //监听回车键
    handleSearch(e) {
      if (e.keyCode == 13) {
        this.searchForm();
      }
    },
    //查询客户端
    async searchForm() {

      // 列表初始
      let list = {
        appiumId: this.clientAppForm.appiumId,
        id: this.clientAppForm.id == "" ? null : Number(this.clientAppForm.id),
        udid: this.clientAppForm.udid,
        status: this.clientAppForm.status == "全部" ? null : this.clientAppForm.status,
        province: this.clientAppForm.province,
        isp: this.clientAppForm.isp,
        os: this.clientAppForm.os,
        osVersion: this.clientAppForm.osVersion,
      };
      console.log(this.currentPage);
      const { data: res } = await this.$http.post("/client/list?page=" + this.currentPage + "&pageSize=" + this.pageSize, list);
      if (res.code == 0) {
        this.tableData = res.dataList;
        this.clientTotal = res.totalSum;
        this.$nextTick(() => {
          //在数据加载完，重新渲染表格
          this.$refs["clientTable"].doLayout();
        });
      }
    },
    cx() {
      this.currentPage = 1;
      this.pageSize = 10
      // console.log(this.currentPage);
      this.searchForm()
    },
    //清空
    resetForm() {
      this.clientAppForm.appiumId = "";
      this.clientAppForm.id = "";
      this.clientAppForm.udid = "";
      this.clientAppForm.status = "全部";
      this.clientAppForm.province = "",
        this.clientAppForm.isp = "",
        this.clientAppForm.os = "",
        this.clientAppForm.osVersion = "",
        this.currentPage = 1,
        this.clientList();
    },
    //分页
    handleSizeChange(val) {
      console.log("size:" + val);
      this.pageSize = val;
      this.searchForm();
    },
    handleCurrentChange(val) {
      console.log("Current11111:" + val);
      this.currentPage = val;
      this.searchForm();
    },
    //新增客户端
    addClient() {
      this.$router.push({
        path: "/client_management/client_app_detail_modify",
        query: {
          from: "table" //客户端列表页面
        },
      });
    },
    //连接
    async connectClient(id) {
    },
    //修改
    async updateClient(id) {
      this.$router.push({
        path: "/client_management/client_app_detail_modify",
        query: {
          from: "update", //更新客户端信息页面
          id: id,
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    },
    //删除
    async deleteClient(id) {
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.get(
            "/client/delClient?id=" + id
          );

          if (res.code == 200) {
            let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

            let currentPage =
              this.currentPage > totalPage
                ? totalPage
                : this.currentPage;

            this.currentPage = currentPage < 1 ? 1 : currentPage;
            this.clientList();
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
    // 统计初始初始
    async clientLineNum() {
      const { data: res } = await this.$http.get("/client/lineNum");
      if (res.code == 200) {
        this.online = res.data.online;
        this.outline = res.data.offline;
      }
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
  height: 40px;
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
  color: #1675D5;
  text-decoration: underline;
  cursor: pointer;
}

.client-device {
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  // margin-left: 24px;
}

.client-device-num {
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  margin-right: 24px;
  -webkit-background-clip: text;
  color: transparent;
}

.client-device-num-online {
  background-image: linear-gradient(180deg, #4ABE86 0%, #009C51 100%);
}

.client-device-num-outline {
  background-image: linear-gradient(180deg, #F74E57 0%, #DF2020 100%);
}

.operator-form-btn {
  position: absolute;
  right: 20px;
  display: inline-block;
}

.operator-div {
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 70px);
}
</style>
