<template>
  <div id="task-list">
    <div class="shadow-div">
      <el-form ref="taskForm" :inline="true" :model="taskForm">
        <el-form-item prop="taskId">
          <el-input v-model="taskForm.taskId">
            <template slot="prepend">任务ID</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="taskName">
          <el-input v-model="taskForm.taskName">
            <template slot="prepend">任务名称</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="taskTag">
          <el-input v-model="taskForm.taskTag">
            <template slot="prepend">任务标签</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="createUser">
          <el-input v-model="taskForm.createUser">
            <template slot="prepend">创建人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="taskTime">
          <el-date-picker v-model="taskForm.sTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" width="10vw"
            value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="开始时间" class="input-time">
          </el-date-picker>
          <span class="split">至</span>
          <el-date-picker v-model="taskForm.eTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" width="10vw"
            value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="结束时间" class="input-time">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务类型" prop="taskType">
          <el-select v-model="taskForm.taskType">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="APP" value="APP"></el-option>
            <el-option label="URL" value="URL"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="任务归属" prop="nodeType">
          <el-select v-model="taskForm.nodeType">
            <el-option label="移动网" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="任务优先级" prop="priority">
          <el-select v-model="taskForm.priority">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="高" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="低" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态" prop="status">
          <el-select v-model="taskForm.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="未开始" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已结束" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-row>
          <el-col :span="6"><el-form-item prop="taskId">
          <el-input v-model="taskForm.taskId">
            <template slot="prepend">任务ID</template>
          </el-input>
        </el-form-item></el-col>
          <el-col :span="6"><el-form-item prop="taskName">
          <el-input v-model="taskForm.taskName">
            <template slot="prepend">任务名称</template>
          </el-input>
        </el-form-item></el-col>
          <el-col :span="6"><el-form-item prop="taskTag">
          <el-input v-model="taskForm.taskTag">
            <template slot="prepend">任务标签</template>
          </el-input>
        </el-form-item></el-col>
          <el-col :span="6"><el-form-item prop="createUser">
          <el-input v-model="taskForm.createUser">
            <template slot="prepend">创建人</template>
          </el-input>
        </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="任务时间" prop="taskTime">
          <el-date-picker v-model="taskForm.sTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" width="10vw"
            value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="开始时间" class="input-time">
          </el-date-picker>
          <span class="split">至</span>
          <el-date-picker v-model="taskForm.eTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" width="10vw"
            value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="结束时间" class="input-time">
          </el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务类型" prop="taskType">
          <el-select v-model="taskForm.taskType">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="APP" value="APP"></el-option>
            <el-option label="URL" value="URL"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务归属" prop="nodeType">
          <el-select v-model="taskForm.nodeType">
            <el-option label="移动网" value="2"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务优先级" prop="priority">
          <el-select v-model="taskForm.priority">
            <el-option label="全部" value="全部"></el-option>
            <el-option label="高" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="低" value="3"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
        </el-row>         -->
        <div style="text-align: right;">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="info" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
    </div>
    <div class="operator-div">
      <!-- 创建任务 -->
      <div style="display: inline-block;">
        <el-button type="primary" @click="toCreateTask" style="width: 130px">+ 任务创建</el-button>
        <span style="margin: 0 16px;
                color: #d3d4dd;
                font-size: 26px;
                text-align: center;
                vertical-align: middle;
              ">|</span>
        <el-button type="info" @click="refresh">刷新</el-button>
      </div>
      <!-- 批量操作按钮 -->
      <div style="float: right; margin-top: 10px">
        <a class="batch-opt border-right" @click="goResultList()">
          <i class="el-icon-document"></i>
          <span class="l10 grey" style="cursor: pointer">详细数据</span>
        </a>
        <a class="batch-opt border-right" @click="startTaskByList()">
          <i class="el-icon-video-play green"></i>
          <span class="l10 green" style="cursor: pointer">批量下发</span>
        </a>
        <a class="batch-opt border-right" @click="stopTaskByList()">
          <i class="el-icon-video-pause orange"></i>
          <span class="l10 orange" style="cursor: pointer">批量停止</span>
        </a>
        <a class="batch-opt" @click="deleteTaskByList()">
          <i class="el-icon-delete red"></i>
          <span class="l10 red" style="cursor: pointer">批量删除</span>
        </a>
      </div>
    </div>
    <!-- 任务列表 -->
    <div class="shadow-div">
      <div class="base_table">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
          :row-style="{ height: '60px' }" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
          <!-- <el-table-column label="序号" width="45" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
            </template>
          </el-table-column> -->
          <el-table-column prop="num" label="序号" width="45" fixed="left">
          </el-table-column>
          <!-- <el-table-column prop="priority" label="任务优先级" :show-overflow-tooltip="true" fixed="left" width="90">
            <template slot-scope="scope">
              <div v-if="scope.row.priority == 1" style="color: #f85f68; background-color: #fddcdd" class="center-radios">
                高
              </div>
              <div v-if="scope.row.priority == 2" style="color: #ff9b24; background-color: #fdf2da" class="center-radios">
                中
              </div>
              <div v-if="scope.row.priority == 3" style="color: #0090ff; background-color: #e5f5ff" class="center-radios">
                低
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="任务ID" :show-overflow-tooltip="true" fixed="left" width="130">
          </el-table-column> -->
          <el-table-column prop="id" label="任务ID" :show-overflow-tooltip="true" fixed="left" width="90">
            <template slot-scope="scope">
              <div :style="priorityStyle(scope.row.priority)" class="center-radios">
                <!-- {{ scope.row.num }} -->
                <el-tooltip :content="priorityText(scope.row.priority)" placement="top">
                  <div>{{ scope.row.id }}</div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="taskName" label="任务名称" :show-overflow-tooltip="true" fixed="left" width="150">
            <template slot-scope="scope">
              <span class="task-name" @click="taskInfo(scope.row.id)">
                {{ scope.row.taskName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="taskTags" label="任务标签" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column prop="nodeType" label="任务归属" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.nodeType == 2">移动端</div>
            </template>
          </el-table-column> -->
          <el-table-column prop="businessType" label="任务类型" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column prop="taskContent" label="测试对象" :show-overflow-tooltip="true" width="150">
            <template slot-scope="scope">
              <span class="more" @click="moreObj(scope.row.id, scope.row.taskName, scope.row.type)">
                {{ scope.row.taskContent }}
              </span>
            </template>
          </el-table-column> -->
          <el-table-column prop="penetrateRate" label="穿透率" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="penetrateCount" label="穿透量" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="executedCount" label="总量" :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column prop="realTestCount" label="总量" :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column prop="status" label="任务状态" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0" class="font-bold blue">
                未开始
              </div>
              <div v-if="scope.row.status == 1" class="font-bold green">
                进行中
              </div>
              <div v-if="scope.row.status == 2" class="font-bold red">
                已结束
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cityCnt" label="测试地数量" :show-overflow-tooltip="true" width="90">
          </el-table-column>
          <el-table-column prop="ispCnt" label="运营商数量" :show-overflow-tooltip="true" width="90">
          </el-table-column>
          <el-table-column prop="clientCnt" label="客户端数量" :show-overflow-tooltip="true" width="90">
          </el-table-column>
          <el-table-column prop="plannedTestCount" label="监测次数" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="testInternal" label="监测频率(分钟)" :show-overflow-tooltip="true" width="120">
          </el-table-column>
          <!-- <el-table-column prop="taskStartTime" label="开始时间" :show-overflow-tooltip="true" width="190">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true" width="190">
          </el-table-column> -->
          <el-table-column prop="createUser" label="创建人" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn green" type="warning" size="mini" @click="startTask(scope.row.id)"
                :disabled="scope.row.status != 0">下发</el-button>
              <el-button class="operator-table-btn orange" type="primary" size="mini" @click="stopTask(scope.row.id)"
                :disabled="scope.row.status != 1">停止</el-button>
              <el-button class="operator-table-btn red" type="danger" size="mini" @click="deleteTask(scope.row.id)"
                :disabled="scope.row.status == 1"
                style="padding-right: 10px;border-right: 1px solid #cecece;">删除</el-button>
              <el-button class="operator-table-btn blue" type="warning" size="mini"
                @click="copyTask(scope.row.id)">复制</el-button>
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="goResult(scope.row.id, scope.row.nodeType)">详情</el-button>
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
// import autofit from "autofit.js"
export default {
  name: "TaskList",
  data() {
    return {
      taskForm: {
        taskId: "",
        taskName: "",
        taskTag: "",
        sTime: "",
        eTime: "",
        createUser: "",
        taskType: "全部",
        nodeType: "2",
        priority: "全部",
        status:""
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
    this.tasklist(); //初始化表格
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
    // autofit.init({
    //   dh:800,
    //   dw:1280,
    //   el:'#task-list',
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
    priorityStyle(priority) {
    switch (priority) {
      case 1:
        return {
          color: '#f85f68',
          backgroundColor: '#fddcdd'
        };
      case 2:
        return {
          color: '#ff9b24',
          backgroundColor: '#fdf2da'
        };
      case 3:
        return {
          color: '#0090ff',
          backgroundColor: '#e5f5ff'
        };
      default:
        return {};
    }
  },
  priorityText(priority) {
    switch (priority) {
      case 1:
        return '高';
      case 2:
        return '中';
      case 3:
        return '低';
      default:
        return '';
    }
  },
    // 列表初始
    async tasklist() {
      const { data: res } = await this.$http.get(
        "/task/showPage",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            id: this.taskForm.taskId,
            taskName: this.taskForm.taskName,
            taskTags: this.taskForm.taskTag,
            taskTimeStart: this.taskForm.sTime,
            taskTimeEnd: this.taskForm.eTime,
            createUser: this.taskForm.createUser,
            businessType: (this.taskForm.taskType == '全部') ? '' : this.taskForm.taskType,
            // nodeType: (this.taskForm.nodeType == '全部') ? '' : this.taskForm.nodeType,
            // businessType: this.taskForm.taskType,
            nodeType: this.taskForm.nodeType,
            priority: (this.taskForm.priority == '全部') ? '' : this.taskForm.priority,
            status: this.taskForm.status
          },
        }
      );
      console.log(res);
      if (res.code == 0) {
        //this.tableData = res.dataList;
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
        this.searchForm();
      }
    },
    //查询任务
    async searchForm() {
      this.currentPage = 1;
      const { data: res } = await this.$http.get(
        "/task/showPage",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            id: this.taskForm.taskId,
            taskName: this.taskForm.taskName,
            taskTags: this.taskForm.taskTag,
            taskTimeStart: this.taskForm.sTime,
            taskTimeEnd: this.taskForm.eTime,
            createUser: this.taskForm.createUser,
            businessType: (this.taskForm.taskType == '全部') ? '' : this.taskForm.taskType,
           // nodeType: (this.taskForm.nodeType == '全部') ? '' : this.taskForm.nodeType,
          //  businessType: this.taskForm.taskType,
            nodeType: this.taskForm.nodeType,
            priority: (this.taskForm.priority == '全部') ? '' : this.taskForm.priority,
            status: this.taskForm.status
          },
        }
      );
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
    //清空
    resetForm() {
      this.taskForm.taskId = "";
      this.taskForm.taskName = "";
      this.taskForm.taskTag = "";
      this.taskForm.sTime = "";
      this.taskForm.eTime = "";
      this.taskForm.createUser = "";
      this.taskForm.taskType = "全部";
      // this.taskForm.nodeType = "全部";
      // this.taskForm.taskType = "APP";
      this.taskForm.nodeType = "2";
      this.taskForm.priority = "全部";
      this.taskForm.status = "";
      this.tasklist();
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
    //创建任务
    toCreateTask() {
      return this.$router.push("/task_management/create_task");
    },
    //下发
    async startTask(id) {
      const { data: res } = await this.$http.post(
        "/task/startTask?ids=" + id
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "下发成功",
          type: "success",
        });
      } else {
        this.$message(res.msg);
      }
    },

    //批量下发
    async startTaskByList() {
      console.log(this.ids);
      if (this.ids.length == 0) {
        this.$message("请选择需要下发的任务");
        return;
      }
      const { data: res } = await this.$http.post(
        "/task/startTask?ids=" + this.ids
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "下发成功",
          type: "success",
        });
      } else {
        this.$message(res.message);
      }
    },

    //停止
    async stopTask(id) {
      this.$confirm("此操作将停止该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/task/stopTask?ids=" + id
          );
          if (res.code == 200) {
            this.tasklist();
            this.$message({
              message: "停止成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          this.$message("已取消停止");
        });
    },

    //删除
    async deleteTask(id) {
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/task/delTask?ids=" + id
          );

          if (res.code == 200) {
            let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

            let currentPage =
              this.currentPage > totalPage
                ? totalPage
                : this.currentPage;

            this.currentPage = currentPage < 1 ? 1 : currentPage;
            this.tasklist();
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

    //批量删除
    async deleteTaskByList() {
      if (this.ids.length == 0) {
        this.$message("请选择需要删除的任务");
        return;
      }
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/task/delTask?ids=" + this.ids
          );

          if (res.code == 200) {
            let totalPage = Math.ceil((this.taskTotal - 1) / this.pageSize); // 总页数

            let currentPage =
              this.currentPage > totalPage
                ? totalPage
                : this.currentPage;

            this.currentPage = currentPage < 1 ? 1 : currentPage;
            this.tasklist();
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

    //批量停止
    async stopTaskByList() {
      if (this.ids.length == 0) {
        this.$message("请选择需要停止的任务");
        return;
      }
      this.$confirm("此操作将删除该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.post(
            "/task/stopTask?ids=" + this.ids
          );
          if (res.code == 200) {
            this.tasklist();
            this.$message({
              message: "停止成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          this.$message("已取消停止");
        });
    },

    //点击任务名称，查看任务详细信息
    taskInfo(id) {
      this.$router.push({
        path: "/task_management/create_task",
        query: {
          id: id,
          from: 'taskName' //页面来源于点击任务名称
        },
      });
    },
    //复制
    copyTask(id) {
      this.$router.push({
        path: "/task_management/create_task",
        query: {
          id: id,
          from: 'copyTask' //页面来源于点击任务复制
        },
      });
    },
    //单个查看拨测结果
    goResult(id, nodeType) {
      var arr = [];
      if (id) {
        arr = [id];
      } else {
        var data = this.$refs.taskTable.selection;
        data.forEach(function (item) {
          arr.push(item.id);
        });
      }
      console.log(arr);
      let path = '/task_management/app_result_query';
      // let path = '/task_management/result_query';
      // if (nodeType == 2) {
      //   path = '/task_management/app_result_query';
      // }
      this.$router.push({
        path: path,
        query: {
          ids: arr.join(","),
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    },

    //批量查看拨测结果
    //批量查看拨测结果
    goResultList() {
      var data = this.multipleSelection;
      if (data.length == 0) {
        this.$message("请选择需要查看任务");
        return;
      }
      var arr = [];
      // var nodeType = 1;
      var nodeType = 2;
      if (data.length >= 2) {
        for (var i = 0; i < data.length; i++) {
          if (i == 0) {
            arr.push(data[i].id);
            nodeType = data[i].nodeType;
          } else {
            if (data[i].nodeType == nodeType) {
              arr.push(data[i].id);
              nodeType = data[i].nodeType;
            } else {
              this.$message("请选择相同的任务归属");
              return;
            }
          }
        }
      } else {
        arr.push(data[0].id);
        nodeType = data[0].nodeType;
      }
      let path = '/task_management/result_query';
      if (nodeType == 2) {
        path = '/task_management/app_result_query';
      }
      this.$router.push({
        path: path,
        query: {
          ids: arr.join(","),
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    },

    //更多测试目标
    moreObj(id, taskName, type) {
      this.$router.push({
        path: "/task_management/more_obj",
        query: {
          id: id,
          taskName: taskName,
          type: type,
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      });
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
  // width: 13vw;
}

.input-time {
  width: 143px;
  // width: 6vw;
}

:deep(.input-time > .el-input__inner) {
  padding: 0;
  width: 143px;
  // width: 6vw;
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

.more,
.task-name {
  color: #1675d5;
  text-decoration: underline;
  cursor: pointer;
}
</style>
