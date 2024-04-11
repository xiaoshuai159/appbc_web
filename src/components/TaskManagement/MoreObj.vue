<template>
  <div id="more-obj" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item>测试任务</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>更多测试对象</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 返回上一级 -->
    <div class="task-go-back" @click="goBackTask">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 搜索框 -->
    <div class="block_base">
      <el-form ref="moreObjForm" :inline="true" :model="moreObjForm" class="demo-form-inline">
        <div class="formLine">
          <el-form-item prop="probeTarget">
            <el-input v-model="moreObjForm.probeTarget">
              <template slot="prepend">监测目标</template>
            </el-input>
          </el-form-item>
          <el-form-item class="formLime-item" style="text-align: right">
            <el-button type="primary" @click="searchForm()">查询</el-button>
            <el-button type="info" @click="resetForm()">清空</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="float: right; width: calc(100% - 70px)">
      <!-- 任务简略信息 -->
      <div style="display: flex;justify-content: space-between; width: 100%; margin-bottom: 20px;">
        <div style="line-height: 40px;">
          <span class="taskInfoTitle">任务ID: </span>
          <span class="taskInfo">{{ taskId }}</span>
          <span class="taskInfoTitle" style="border-left: 1px solid #CECECE; padding-left: 24px;">任务名称: </span>
          <span class="taskInfo">{{ taskName }}</span>
          <span class="taskInfoTitle" style="border-left: 1px solid #CECECE; padding-left: 24px;">任务类型: </span>
          <span class="taskInfo">{{ type }}</span>
        </div>
      </div>
      <!-- 表格 -->
      <div class="block_base base_table" style="width:calc(100% - 40px)">
        <el-table v-loading="tableDataLoading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="objTable" style="width: 100%"
          :row-style="{ height: '60px' }">
          <el-table-column label="序号" min-width="5%" v-if="type === 'APP'">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="序号" min-width="5%" v-else>
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="monitorObject" label="监测对象" min-width="45%" v-if="type === 'APP'">
            <template slot-scope="scope">
              {{ scope.row.monitorObject }}
            </template>
          </el-table-column>
          <el-table-column prop="content" label="监测对象" min-width="45%" v-else>
            <template slot-scope="scope">
              {{ scope.row.content }}
            </template>
          </el-table-column>
          <el-table-column label="序号" min-width="5%" v-if="type === 'APP'">
            <template slot-scope="scope">
              <span v-if="scope.row.monitorObject1 != null">
                {{ scope.$index + 1 + net }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="序号" min-width="5%" v-else>
            <template slot-scope="scope">
              <span v-if="scope.row.content1 != null">
                {{ scope.$index + 1 + pcNet }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="monitorObject1" label="监测对象" min-width="45%" v-if="type === 'APP'">
            <template slot-scope="scope">
              {{ scope.row.monitorObject1 }}
            </template>
          </el-table-column>
          <el-table-column prop="content1" label="监测对象" min-width="45%" v-else>
            <template slot-scope="scope">
              {{ scope.row.content1 }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
          style="float: right;margin-top: 16px">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css";
// import { getTaskContentByID } from "@/api/task-management";
export default {
  name: "MoreObj",
  data() {
    return {
      moreObjForm: {
        probeTarget: "",
      },
      tableData: [],
      currentPage: 1, //当前页码
      pageSize: 30, //每页最大条数
      total: 0, //每页实际条数
      tableDataLoading: false,  // 表格加载动画
      taskId: "",               // 任务id
      taskName: "",             // 任务名称
      type: "",                 // 任务类型
      net: 0,
      pcNet: 0
    }
  },
  created() {
    this.currentPage = 1;
    this.taskId = parseInt(this.$route.query.id);
    this.taskName = this.$route.query.taskName;
    this.type = this.$route.query.type;
    if (this.type === 'APP') {
      this.searchObjectList();
    } else {
      this.getPCTaskContentByID(this.taskId, '');
    }
  },
  methods: {
    // 监测对象列表 - pc
    // getPCTaskContentByID(pcId, pcContent) {
    //   getTaskContentByID({ taskId: pcId, content: pcContent, page: this.currentPage, pageSize: this.pageSize}).then(res => {
    //     console.log('999', res);
    //     if (res.code == 200) {
    //       this.pcNet = Math.ceil(res.data.list.length / 2);
    //       let pcList = res.data.list.slice(0, this.pcNet);
    //       let pcList1 = res.data.list.slice(this.pcNet, res.data.list.length);
    //       for (var i = 0; i < pcList.length; i++) {
    //         for (var j = 0; j < pcList1.length; j++) {
    //           if (pcList1[i] == undefined) {
    //             pcList[i].content1 = null;
    //           } else {
    //             pcList[i].content1 = pcList1[i].content;
    //           }
    //         }
    //       }
    //       this.tableData = res.data.list.slice(0, this.pcNet);
    //       this.total = res.data.total;
    //       this.$nextTick(() => {
    //         //在数据加载完，重新渲染表格
    //         this.$refs["objTable"].doLayout();
    //       });
    //     }
    //   })
    // },
    // 监测对象列表 - app
    async searchObjectList() {
      const { data: res } = await this.$http.get("/task/taskContent",
        {
          params: {
            taskId: parseInt(this.taskId),
            page: this.currentPage,
            pageSize: this.pageSize,
            content: this.moreObjForm.probeTarget,
          },
        });
      if (res.code == 0) {
        this.net = Math.ceil(res.dataList.length / 2);
        let list = res.dataList.slice(0, this.net);
        let list1 = res.dataList.slice(this.net, res.dataList.length);
        for (var i = 0; i < list.length; i++) {
          for (var j = 0; j < list1.length; j++) {
            if (list1[i] == undefined) {
              list[i].monitorObject1 = null;
            } else {
              list[i].monitorObject1 = list1[i].monitorObject;
            }
          }
        }
        this.tableData = res.dataList.slice(0, this.net);
        this.total = res.totalSum;
        this.$nextTick(() => {
          //在数据加载完，重新渲染表格
          this.$refs["objTable"].doLayout();
        });
      }
    },
    // 查询
    async searchForm() {
      if(this.type === 'APP'){
        const { data: res } = await this.$http.get("/task/taskContent",
          {
            params: {
              taskId: parseInt(this.taskId),
              page: this.currentPage,
              pageSize: this.pageSize,
              content: this.moreObjForm.probeTarget,
            },
          });
        if (res.code == 0) {
          this.net = Math.ceil(res.dataList.length / 2);
          let list = res.dataList.slice(0, this.net);
          let list1 = res.dataList.slice(this.net, res.dataList.length);
          for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list1.length; j++) {
              if (list1[i] == undefined) {
                list[i].monitorObject1 = null;
              } else {
                list[i].monitorObject1 = list1[i].monitorObject;
              }
            }
          }
          this.tableData = res.dataList.slice(0, this.net);
          this.total = res.totalSum;
          this.$nextTick(() => {
            //在数据加载完，重新渲染表格
            this.$refs["objTable"].doLayout();
          });
        }
      }else{
        this.getPCTaskContentByID(this.taskId, this.moreObjForm.probeTarget)
      }
    },
    //清空
    resetForm() {
      this.moreObjForm.probeTarget = "";
    },
    //返回上一级
    goBackTask() {
      this.$router.push({
        path: "/task_management/test_task",
        query: {
          from: "resultTable", //返回参数
          page: this.$route.query.page,
          pageSize: this.$route.query.pageSize,
        },
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.type === 'APP') {
        this.searchObjectList();
      } else {
        this.getPCTaskContentByID(this.taskId, '');
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.type === 'APP') {
        this.searchObjectList();
      } else {
        this.getPCTaskContentByID(this.taskId, '');
      }
    },
  },
};
</script>
<style lang="less" scoped>
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

// 面包屑
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #1675d5 !important;
}

// 时间选择图标
:deep(.el-icon-time:before) {
  content: "";
}

// dialog
:deep(.el-dialog__header) {
  padding: 20px;
  border-bottom: 1px solid #DEE2E6;
}

:deep(.el-dialog__footer) {
  padding: 20px;
  border-top: 1px solid #DEE2E6;
}

:deep(.el-dialog__body) {
  font-family: 'Microsoft YaHei';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  max-height: 620px;
  overflow-y: scroll;
  color: #333333;
  padding: 20px;

}

:deep(.el-form--inline .el-form-item) {
  display: inline-block;
  margin-right: 1px;
  vertical-align: top;
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

.el-button--info {
  color: #333333;
  background: #d3d4dd;
  border-color: #d3d4dd;
}

.taskInfoTitle {
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
}

.taskInfo {
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  margin-right: 24px;
  color: #205BD4;
}

.table-operator {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  margin-right: 12px;
}

.el-pagination__editor.el-input .el-input__inner {
  height: 28px;
  line-height: 28px;
  border-radius: 3px;
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
</style>
