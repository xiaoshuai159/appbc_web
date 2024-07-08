<template>
  <div id="result-query" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>测试任务</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>结果查询</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block_base"
    >
      <el-form
        ref="resultQueryFormQuery"
        :inline="true"
        :model="resultQueryFormQuery"
        class="demo-form-inline"
      >
        <el-form-item label="拨测结果" prop="result">
          <el-select v-model="resultQueryFormQuery.result">
            <el-option label="全部" value=""></el-option>
            <el-option label="正常" :value="0"></el-option>
            <el-option label="异常" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间" prop="startFinishTime">
          <el-date-picker
            v-model="resultQueryFormQuery.startFinishTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placement="bottom-start"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="" prop="endFinishTime">
          <div style="float: left;padding: 0px 8px;">至</div>
          <el-date-picker
            v-model="resultQueryFormQuery.endFinishTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placement="bottom-start"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="margin-left: 16px;">
        <el-button
          type="primary"
          @click="submitResultPCFormQuery('resultQueryFormQuery')"
          >查询</el-button
        >
        <el-button
          type="info"
          @click="resetResultPCFormQuery('resultQueryFormQuery')"
          >清空</el-button
        >
      </div>
    </div>
    <div style="float: right; width: calc(100% - 70px)">
      <!-- 设备数量展示 -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;">
        <div style="line-height: 40px;">
          <span class="result-device">任务ID:  </span>
          <span class="result-device-num">{{ testTaskID }}</span>
          <span class="result-device" style="border-left: 1px solid #CECECE; padding-left: 24px;">任务名称:  </span>
          <span class="result-device-num">{{ testTaskName }}</span>
        </div>
        <div>
          <!-- <el-button style="width: 140px;background-color: #F39300;" @click="handleExportExcel"> -->
          <!-- <el-button style="width: 140px;background-color: #F39300;" @click="exportResult">
            <i class="el-icon-document-copy"></i>
            <span style="margin-left: 8px;">导出查询结果</span>
          </el-button> -->
          <a class="batch-opt" @click="exportResult()">
          <i class="el-icon-document"></i>
          <span class="l10 grey" style="cursor: pointer">批量导出</span>
        </a>
        </div>
      </div>
      <!-- 表格 -->
      <div
       class="block_base base_table" style="width:calc(100% - 40px)"
      >
        <el-table
          v-loading="resultTableDataLoading"
          element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9"
          ref="resultPCTable"
          :data="resultTableData"
          tooltip-effect="dark"
          style="width: 100%"
          :row-style="{ height: '40px' }"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeys"
        >
          <el-table-column type="selection" width="30" :reserve-selection="true"> 
          </el-table-column>
          <el-table-column prop="num" label="序号" width="60">
          </el-table-column>
          <el-table-column
            prop="csId"
            label="任务ID"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="taskName"
            label="任务名称"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="taskContent"
            label="测试内容"
            :show-overflow-tooltip="true"
            width="240"
          >
          </el-table-column>
          <el-table-column
            prop="taskTag"
            label="任务标签"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="businessTag"
            label="业务标签"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column> -->
          <el-table-column
            prop="result"
            label="拨测结果"
            width="90"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.result === '0'" >正常</div>
              <div v-else>
                <span @click="abnormal(scope.$index, scope.row)" 
                class="table-operator" 
                style="color: #F74E57;cursor: pointer;text-decoration:underline;">异常</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="host"
            label="内网IP"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="hlwHost"
            label="外网IP"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="测试地"
            :show-overflow-tooltip="true"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="yys"
            label="运营商"
            :show-overflow-tooltip="true"
            width="90"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="monitoringQuantity"
            label="监测数量"
            :show-overflow-tooltip="true"
            width="90"
          >
          </el-table-column> -->
          <el-table-column
            prop="startTime"
            label="下发时间"
            :show-overflow-tooltip="true"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="finishTime"
            label="完成时间"
            :show-overflow-tooltip="true"
            width="180"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="testMachine"
            label="测试机"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column> -->
          <!-- <el-table-column
            prop="sourceAddress"
            label="源地址"
            :show-overflow-tooltip="true"
            width="140"
          >
          </el-table-column> -->
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="resultCurrentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="resultPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultTotal"
        style="float: right;margin-top: 16px"
      >
      </el-pagination>
      <div v-if="abnormalDialogVisible">
        <el-dialog
          title="结果信息"
          :visible.sync="abnormalDialogVisible"
          >
          <AbnormalPicture :screenshotPath="screenshotPath" :traceroute="traceroute"></AbnormalPicture>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="abnormalDialogVisible = false">确认</el-button>
            <el-button style="color: #666666;" @click="abnormalDialogVisible = false">取消</el-button>
          </span>
        </el-dialog>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
// import "@/assets/css/scrollbar.css";
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css"
import AbnormalPicture from "./AbnormalPicture.vue"
import { getTaskResult, getTaskDetailByID } from "@/api/task-management.js";
import { defaultURL } from "@/utils/request.js"
import api from '@/api/index.js'
import XLSX from 'xlsx';
import export2Excel from '@/utils/export2Excel';
export default {
  name: "ResultQuery",
  components: {
    AbnormalPicture,
  },
  data() {
    return {
      resultQueryFormQuery: {
        // host: "",
        // ExtranetIP: "",
        // testResults: "全部",
        // startTime: "全部",
        startFinishTime: "",
        endFinishTime: "",
        result: ""
      },
      csIds: "",
      testTaskID: "",
      testTaskName: "",
      resultTableData: [],
      resultPageSize: 10,
      resultTotal: 0,
      resultCurrentPage: 1,
      resultPageParams: {},
      selectTaskList: [],             // 选中的任务列表
      resultTableDataLoading: false,  // 表格加载动画
      // resultTableDataLoading: true,
      abnormalDialogVisible: false,   // 异常图片显示
      screenshotPath: "",             // 异常截图地址
      traceroute: "",                 // 异常截图路由信息
      exportUrl: "",                  // 文件导出地址
      // exportBasePath: defaultURL + api.GetTaskResult,  // 文件导出路径
      aoa: [
        ['sheet2id', '表头1', '表头2', '表头3', '表头4'],
        [1, '数据11', '数据12', '数据13', '数据14'],
        [2, '数据21', '数据22', '数据23', '数据24']
      ],
    };
  },
  mounted(){
    this.csIds = String(this.$route.query.ids)
    // console.log('666', this.csIds);
    this.resultPageParams["page"] = this.resultCurrentPage;
    this.resultPageParams["pageSize"] = this.resultPageSize;
    this.getPCTaskResult(this.csIds, this.resultPageParams)
  },
  methods: {
    // getPCTaskResult(pcId, pageParams, queryParams) {
    //   // console.log('999000', pcId, typeof(pcId));
    //   this.testTaskID = pcId
    //   getTaskResult({csIds: this.testTaskID, ...pageParams, ...queryParams}).then(res => {
    //     console.log('====pc===', res);
    //     if(res.code === 200 && res.data.list.length > 0){
    //       this.testTaskName = res.data.list[0].taskName
    //       let tempData = res.data.list;
    //       this.resultTotal = res.data.total
    //       let startNum = (this.resultCurrentPage - 1) * this.resultPageSize + 1;
    //       this.resultTableData = tempData.map((item, index) => {
    //         item.num = index + startNum;
    //         return item;
    //       });
    //     }else{
    //       this.resultTableData = []
    //       // 获取任务名称
    //       getTaskDetailByID({id: parseInt(this.testTaskID)}).then(res => {
    //         if(res.code === 0 && res.dataList.length > 0){
    //           this.testTaskName = res.dataList[0].taskName
    //         }
    //       })
    //     }
    //   }).catch(err => {
    //     console.log("getPCTaskResult请求错误", err);
    //   })
    // },
    submitResultPCFormQuery() {
      this.resultCurrentPage = 1;
      this.resultPageSize = 10;
      this.resultPageParams["page"] = this.resultCurrentPage;
      this.resultPageParams["pageSize"] = this.resultPageSize;
      console.log('999', this.resultQueryFormQuery);
      this.getPCTaskResult(this.csIds, this.resultPageParams, this.resultQueryFormQuery)
    },
    resetResultPCFormQuery(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.resultPageSize = val;
      this.resultPageParams["page"] = this.resultCurrentPage;
      this.resultPageParams["pageSize"] = this.resultPageSize;
      this.getPCTaskResult(this.csIds, this.resultPageParams, this.resultQueryFormQuery)
    },
    handleCurrentChange(val) {
      this.resultCurrentPage = val;
      this.resultPageParams["page"] = val;
      this.resultPageParams["pageSize"] = this.resultPageSize;
      this.getPCTaskResult(this.csIds, this.resultPageParams, this.resultQueryFormQuery)
    },
    abnormal(index, row){
      this.abnormalDialogVisible = true
      this.screenshotPath = row.screenshotPath
      this.traceroute = row.traceroute
    },
    handleSelectionChange(val) {
      this.selectTaskList = val
      console.log(this.selectTaskList);
    },
    getRowKeys(row) {
      // num 是唯一标识
      return row.num
    },
    exportResult(){
      // console.log('exportResult', this.selectTaskList);
      // 原方法
      // this.exportUrl = this.exportBasePath + "?csIds=" + this.csIds + "&excelFileName=详细数据&exportExcel=exportExcel"
      // window.open(this.exportUrl, "downloadIframe");
      // 新方法
      // 数据格式处理
      if(this.selectTaskList.length === 0){
        this.$message({
          type: "info",
          message: "请选择要导出的数据",
        });
      }else{
        let exportList = [
          ['序号', '任务ID', '任务名称', '测试内容', '任务标签', '拨测结果', '内网IP', '外网IP', '测试地', '运营商',  '截图地址','下发时间', '完成时间', '路由信息'],
        ]
        for(let item of this.selectTaskList){
          let temp = []
          for(let item2 in item){
            if(item2 === 'result'){
              item[item2] === "0" ? temp.push('正常') : temp.push('异常')
            }else if(item2 === 'num'){
              temp.unshift(item[item2])
            }else{
              temp.push(item[item2])
            }
          }
          exportList.push(temp)
        }
        // 使用 XLSX 内置的工具库将 exportList 转换成 sheet
        let worksheet = XLSX.utils.aoa_to_sheet(exportList);
        export2Excel({
          // 导出excel的数据，key表示工作表名，value表示对应工作表的 sheet 数据，支持导出多个工作表
          worksheets: {
              sheet: worksheet
          }, 
          fileName: '拨测结果详情',     // 导出文件名
          type: 'xlsx'                 // 文件导出类型
        });
        this.$refs.resultPCTable.clearSelection()  // 操作完成之后，清除多选
      }
    },
  },
};
</script>
<style lang="less" scoped>
.batch-opt {
  font-family: Microsoft YaHei;
  font-size: 15px;
  // font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  padding: 0 12px;
}
.grey {
  color: #666666;
}
.l10 {
  margin-left: 10px;
}
:deep(.el-table) {
    font-size: 16px !important;
}
// 面包屑
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #1675d5 !important;
}
// 时间选择图标
:deep(.el-icon-time:before){
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
  max-height:620px;
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
.result-device{
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  // margin-left: 24px;
}
.result-device-num{
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
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  margin-right: 12px;
}
// .el-pagination__editor.el-input .el-input__inner {
//   height: 28px;
//   line-height: 28px;
//   border-radius: 3px;
// }
:deep(.el-pagination__editor.el-input .el-input__inner){
  width: 28px;
  border-radius: 3px;
}
:deep(.el-pagination .el-select .el-input .el-input__inner){
  width: 100px;
}
:deep(.cell) {
  padding: 0 5px !important;
}
:deep(.el-table thead) {
  color: #162b5b;
}
:deep(.el-table .el-table__cell) {
  padding: 4px 0 !important;
}
</style>
