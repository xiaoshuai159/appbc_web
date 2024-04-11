<template>
  <div id="client-pc">
    <div class="block_base">
      <el-form
        ref="clientPCFormQuery"
        :inline="true"
        :model="clientPCFormQuery"
        class="demo-form-inline"
      >
        <el-form-item label="运营商" prop="hlwIsp" style="margin-right: 12px">
            <el-select v-model="clientPCFormQuery.hlwIsp">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in ispList" :key="item.code" :label="item.desc" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        <!-- <el-form-item style="margin-right: 12px" prop="cityName">
          <el-input v-model="clientPCFormQuery.cityName">
            <template slot="prepend">所在地</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="所在地" style="margin-right: 12px" prop="cityName">
            <el-select v-model="clientPCFormQuery.cityName" filterable clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in locationList" :key="item.code" :label="item.desc" :value="item.desc"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="浏览器" style="margin-right: 12px" prop="browser">
          <el-select v-model="clientPCFormQuery.browser">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in browserList" :key="item.code" :label="item.title" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作系统" style="margin-right: 12px" prop="os">
          <el-select v-model="clientPCFormQuery.os">
            <el-option label="全部" value=""></el-option>
            <el-option label="Linux" value="Linux"></el-option>
            <el-option label="Windows" value="Windows"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" style="margin-right: 12px" prop="state">
          <el-select v-model="clientPCFormQuery.state">
            <el-option label="全部" value=""></el-option>
            <el-option label="在线" value="0"></el-option>
            <el-option label="离线" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属网络"
          style="margin-right: 12px;"
          prop="network"
        >
          <el-select v-model="clientPCFormQuery.network">
            <el-option label="全部" value=""></el-option>
            <el-option label="V" value="V"></el-option>
            <el-option label="W" value="W"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="主机类型"
          style="margin-right: 12px"
          prop="hostType"
        >
          <el-select v-model="clientPCFormQuery.hostType">
            <el-option label="全部" value=""></el-option>
            <el-option label="虚拟机" value="0"></el-option>
            <el-option label="实体机" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item style="margin-right: 12px" prop="hostType">
          <el-input v-model="clientPCFormQuery.hostType">
            <template slot="prepend">主机类型</template>
          </el-input>
        </el-form-item> -->
        <el-form-item style="float: right; margin-right: 14px">
          <el-button type="primary" @click="submitclientPCFormQuery"
            >查询</el-button
          >
          <el-button
            type="info"
            @click="resetclientPCFormQuery('clientPCFormQuery')"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 设备数量展示 -->
    <div style="float: right; width: 100%; margin-bottom: 20px">
      <!-- <div style="display: inline-block; margin-left: 70px">
        <el-button type="primary" @click="toCreateClientPC" style="width: 130px"
          >+ 客户端创建</el-button
        >
      </div> -->
      <div style="display: inline-block; margin-left: 70px">
        <el-button type="primary"  style="width: 130px"
          >+ 客户端创建</el-button
        >
      </div>
      <div style="float: right; margin-top: 10px">
        <span class="client-device">设备在线数量: </span>
        <span class="client-device-num client-device-num-online">{{
          onlineDeviceNumber
        }}</span>
        <span
          class="client-device"
          style="border-left: 1px solid #cecece; padding-left: 24px"
          >设备离线数量:
        </span>
        <span class="client-device-num client-device-num-outline">{{
          offlineDeviceNumber
        }}</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="block_base base_table">
      <el-table
        v-loading="clientTableDataLoading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#f5f7f9"
        ref="clientPCTable"
        :data="clientTableData"
        tooltip-effect="dark"
        style="width: 100%"
        :row-style="{ height: '40px' }"
        
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="num" label="序号" width="60" align="left">
        </el-table-column>
        <el-table-column
          prop="host"
          label="内网IP"
          :show-overflow-tooltip="true"
          width="180"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="hlwIsp"
          label="运营商"
          :show-overflow-tooltip="true"
          width="120"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="所在地"
          :show-overflow-tooltip="true"
          width="120"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          :show-overflow-tooltip="true"
          width="140"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="hlwHostWIp"
          label="外网IP"
          :show-overflow-tooltip="true"
          width="180"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="browser"
          label="浏览器"
          :show-overflow-tooltip="true"
          width="240"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :show-overflow-tooltip="true"
          width="80"
          align="left"
        >
          <template slot-scope="state">
            <span
              v-if="state.row.state === '离线'"
              style="color: #f74e57; font-weight: bold"
              >离线</span
            >
            <span v-else style="color: #1675d5; font-weight: bold">在线</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="network"
          label="所属网络"
          :show-overflow-tooltip="true"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="hostTypeName"
          label="主机类型"
          :show-overflow-tooltip="true"
          width="140"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop=" "
          label="操作"
          align="left"
          fixed="right"
          width="160"
        >
          <template slot-scope="scope">
            <!-- <span
              @click="connectItem(scope.$index, scope.row)"
              class="table-operator"
              style="color: #f39300; cursor: pointer; white-space: nowrap"
              >连接</span
            > -->
            <span
              @click="modifyItem(scope.$index, scope.row)"
              class="table-operator"
              style="color: #1675d5; cursor: pointer; white-space: nowrap"
              >修改</span
            >
            <span
              @click="deleteItem(scope.$index, scope.row)"
              class="table-operator"
              style="color: #f74e57; cursor: pointer; white-space: nowrap"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="clientCurrentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="clientPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="clientTotal"
        style="float: right; margin-top: 16px"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import "@/assets/css/query-form-style.css";
//import { getClientList, deleteClient, getClientDict } from "@/api/client-management";
// import { getPCDeviceState } from "@/api/home";
import { titleCase } from '@/utils/tool'

export default {
  name: "ClientPC",
  data() {
    return {
      onlineDeviceNumber: 0,
      offlineDeviceNumber: 0,
      clientPCFormQuery: {
        hlwIsp: "",
        cityName: "",
        os: "",
        host: "",
        browser: "",
        network: "",
        hostType: "", // TODO 待修改  根据接口字段重命名
        state: "",
      },
      clientPageParams: {},
      clientTableData: [],
      clientCurrentPage: 1,
      clientPageSize: 10,
      clientTotal: 0,
      // 表格加载动画
      clientTableDataLoading: false,
      // clientTableDataLoading: true,
      locationList: [],
      browserList: [],
      ispList: [],
    };
  },
  mounted() {
    this.clientPageParams["page"] = this.clientCurrentPage;
    this.clientPageParams["pageSize"] = this.clientPageSize;
    //this.initClientList(this.clientPCFormQuery, this.clientPageParams);
    //this.initPCDeviceState();
    //this.getDictData()
  },
  methods: {
    // 获取客户端列表
    // initClientList(clientParams, clientParams2) {
    //   console.log("client查询参数: ", clientParams);
    //   getClientList(clientParams, clientParams2).then((res) => {
    //     if (res.code === 200 && res.data.list) {
    //       console.log("client-list: ", res);
    //       let tempData = res.data.list;
    //       this.clientTotal = res.data.total;
    //       let startNum = (this.clientCurrentPage - 1) * this.clientPageSize + 1;
    //       this.clientTableData = tempData.map((item, index) => {
    //         item.num = index + startNum;
    //         return item;
    //       });
    //     } else {
    //       console.log("client-list请求失败信息: ", res);
    //     }
    //   });
    // },
    // 获取设备状态信息
    // initPCDeviceState() {
    //   getPCDeviceState().then((res) => {
    //     if (res.code === 200) {
    //       this.onlineDeviceNumber = res.data.online;
    //       this.offlineDeviceNumber = res.data.offline;
    //     } else {
    //       console.log("pc-device-state请求失败信息: ", res);
    //     }
    //   });
    // },
    // 获取 浏览器、运营商、城市 字典信息
    // getDictData(){
    //   getClientDict().then(res => {
    //     if(res.code === 200) {
    //       this.locationList = res.data.city
    //       console.log(999, this.locationList);
    //       this.browserList = res.data.brower
    //       this.browserList.forEach(item => item.title = titleCase(item.code))
    //       this.ispList = res.data.yys
    //     }else{
    //       console.log('getClientDict请求失败信息: ', res);
    //     }
    //   })
    // },
    // 查询
    submitclientPCFormQuery() {
      this.clientCurrentPage = 1;
      this.clientPageSize = 10;
      this.clientPageParams["page"] = this.clientCurrentPage;
      this.clientPageParams["pageSize"] = this.clientPageSize;
      this.initClientList(this.clientPCFormQuery, this.clientPageParams);
    },
    // 清空
    resetclientPCFormQuery(formName) {
      this.$refs[formName].resetFields();
    },
    // 分页 - size
    handleSizeChange(val) {
      this.clientPageSize = val;
      this.clientPageParams["page"] = this.clientCurrentPage;
      this.clientPageParams["pageSize"] = this.clientPageSize;
      this.initClientList(this.clientPCFormQuery, this.clientPageParams);
    },
    // 分页 - page
    handleCurrentChange(val) {
      this.clientCurrentPage = val;
      this.clientPageParams["page"] = val;
      this.clientPageParams["pageSize"] = this.clientPageSize;
      this.initClientList(this.clientPCFormQuery, this.clientPageParams);
    },
    // 连接
    connectItem(index, row) {},
    // 新增客户端
    // toCreateClientPC() {
    //   this.$router.push({name:'ClientPCOperate', query: {type:'add'}})
    // },
    // 修改
    modifyItem(index, row) {
      // console.log("******************************", index, row);
      this.$router.push({name:'ClientPCOperate', query: {type:'modify', id:row.id}})
    },
    // 删除
  //   deleteItem(index, row) {
  //     this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //     })
  //       .then(() => {
  //         deleteClient({ id: row.id }).then((res) => {
  //           if (res.code === 200) {
  //             this.$message({
  //               type: "success",
  //               message: res.msg,
  //             });
  //             this.clientPageParams["page"] = this.clientCurrentPage;
  //             this.clientPageParams["pageSize"] = this.clientPageSize;
  //             this.initClientList(
  //               this.clientPCFormQuery,
  //               this.clientPageParams
  //             );
  //           } else {
  //             this.$message({
  //               type: "error",
  //               message: res.msg,
  //             });
  //           }
  //         });
  //       })
  //       .catch(() => {
  //         this.$message({
  //           type: "info",
  //           message: "已取消删除",
  //         });
  //       });
  //   },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
    },
  },
};
</script>
<style lang="less" scoped>
// 表格字段加大
:deep(.el-table) {
  font-size: 16px !important;
}
:deep(.el-table thead) {
  color: rgb(22, 43, 91);
}
:deep(.el-table .el-table__cell) {
  padding: 4px 0 !important;
}
// 新增结束

//条件筛选
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
:deep(input.el-input__inner) {
  width: 280px;
}
:deep(.el-form--inline .el-form-item) {
  display: inline-block;
  margin-right: 1px;
  vertical-align: top;
}
:deep(.el-select .el-input) {
  width: 93% !important;
}
//条件筛选结束

.el-button {
  color: #ffffff;
  width: 74px;
  height: 40px;
  border-radius: 4px;
  padding: 10px 20px !important;
  font-size: 16px !important; //新增的部分
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
  background-image: linear-gradient(180deg, #4abe86 0%, #009c51 100%);
}
.client-device-num-outline {
  background-image: linear-gradient(180deg, #f74e57 0%, #df2020 100%);
}
// .table-operator {
//   font-family: Microsoft YaHei;
//   font-size: 17px !important;
//   font-weight: 400;
//   line-height: 22px;
//   text-align: left;
//   margin-right: 8px;
// }
// .el-pagination__editor.el-input .el-input__inner {
//   height: 28px;
//   line-height: 28px;
//   border-radius: 3px;
// }
:deep(.el-pagination__editor.el-input .el-input__inner){
  width: 28px;
  border-radius: 3px;
}
:deep(.el-input--mini .el-input__inner){
  width: 198px !important;
}
// :deep(.el-pagination .el-select .el-input .el-input__inner){
//   width: 100px;
// }
.table-operator {
  font-family: Microsoft YaHei;
  font-size: 14px; //修改了字号
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
}

:deep(.cell) {
  padding: 0 5px !important;
  // text-align: left;
}
// :deep(.el-table th.el-table__cell>.cell){
//   text-align: left;
// }
</style>
