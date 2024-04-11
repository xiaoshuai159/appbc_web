<template>
  <div id="client-pc-operate" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">客户端管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
      <el-breadcrumb-item>固网</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item
        >{{ clientPCTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="client-go-back" @click="goBackClientPC">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 新增 修改客户端 -->
    <div class="client-pc-form">
      <div class="client-pc-form-header">{{ clientPCTitle }}</div>
      <div class="client-pc-form-info">
        <el-form
          ref="clientPCForm"
          :inline="true"
          :rules="clientPCFormRules"
          :model="clientPCForm"
          class="demo-form-inline"
        >
          <el-form-item label="内网IP" prop="host">
            <el-input
              placeholder="请输入内网IP"
              v-model="clientPCForm.host"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="外网IP" prop="hlwHostWIp">
            <el-input
              placeholder="请输入外网IP"
              v-model="clientPCForm.hlwHostWIp"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="所在地" prop="cityName">
            <el-select v-model="clientPCForm.cityName">
              <el-option v-for="item in locationList" :key="item.code" :label="item.desc" :value="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市编码" prop="hlwLocation">
            <el-select v-model="clientPCForm.hlwLocation" disabled>
              <el-option v-for="item in locationList" :key="item.code" :label="item.code" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营商" prop="hlwIsp">
            <el-select v-model="clientPCForm.hlwIsp">
              <el-option v-for="item in ispList" :key="item.code" :label="item.desc" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作系统" prop="os">
            <el-select v-model="clientPCForm.os">
              <el-option label="Linux" value="Linux"></el-option>
              <el-option label="Windows" value="Windows"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="浏览器" prop="browser">
            <el-select v-model="clientPCForm.browser" multiple>
              <el-option v-for="item in browserList" :key="item.code" :label="item.title" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="clientPCForm.state">
              <el-option label="在线" value="0"></el-option>
              <el-option label="离线" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主机类型" prop="hostType">
            <el-select v-model="clientPCForm.hostType">
              <el-option label="虚拟机" value="0"></el-option>
              <el-option label="实体机" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属网络" prop="network">
            <el-select v-model="clientPCForm.network">
              <el-option label="V" value="V"></el-option>
              <el-option label="W" value="W"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="client-pc-form-button">
        <el-button
          type="primary"
          @click="submitClientPCForm('clientPCForm')"
          >保存</el-button
        >
        <el-button
          type="info"
          @click="resetForm('clientPCForm')"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
//import { createClient, modifyClient, getSingleClientData, getClientDict } from "@/api/client-management";
import { titleCase } from '@/utils/tool'

export default {
  name: "ClientPCOperate",
  data() {
    return {
      locationList: [],
      browserList: [],
      ispList: [],
      clientPCForm: {
        host: "",
        hlwHostWIp: "",
        cityName: "",
        hlwLocation: "",
        hlwIsp: "",
        os: "",
        browser: [],
        state: "",
        hostType: "",
        network: ""
      },
      clientPCFormRules: {
        host: [
          { required: true, message: "请输入内网IP", trigger: "blur" },
        ],
        hlwHostWIp: [
          { required: true, message: "请输入外网IP", trigger: "blur" },
        ],
        hlwIsp: [
          { required: true, message: "请输入运营商名称", trigger: "blur" },
        ],
        hlwLocation: [
          { required: true, message: "请输入城市编码", trigger: "blur" },
        ],
        cityName: [
          { required: true, message: "请输入所在地", trigger: "blur" },
        ],
        browser: [
          { required: true, message: "请输入浏览器", trigger: "blur" },
        ],
        os: [
          { required: true, message: "请至少选择一个操作系统类型", trigger: "change" },
        ],
        state: [
          { required: true, message: "请至少选择一个客户端状态", trigger: "change" },
        ],
        hostType: [
          { required: true, message: "请至少选择一个客户端状态", trigger: "change" },
        ],
        network: [
          { required: true, message: "请至少选择一个客户端状态", trigger: "change" },
        ],
      },
      clientPCTitle: '',
      clientPCType: '',
      clientPCID: '',
    };
  },
  watch: {
    "clientPCForm.cityName": {
      handler(newVal, oldVal) {
        for (let item of this.locationList) {
          if(item.desc === newVal) {
            this.clientPCForm.hlwLocation = item.code
          }
        }
      }
    }
  },
  mounted() {
    // console.log('create-----11122333', this.$route.query); 
    // console.log('create-----11122333', this.$route.params.type);
    this.clientPCType = this.$route.query.type
    this.clientPCID = this.$route.query.id
    this.getDictData()
    if(this.clientPCType === 'add'){
      this.clientPCTitle='新增客户端'
    }else{
      this.clientPCTitle='修改客户端'
      //this.getModifyClientPCData()
    }
  },
  methods: {
    // 返回上一级
    goBackClientPC() {
      return this.$router.push("/client_management/client_pc");
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 保存
    // submitClientPCForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if(valid) {
    //       let clientPCFormParams = {
    //         host: this.clientPCForm.host,
    //         hlwHostWIp: this.clientPCForm.hlwHostWIp,
    //         cityName: this.clientPCForm.cityName,
    //         hlwLocation: this.clientPCForm.hlwLocation,
    //         hlwIsp: this.clientPCForm.hlwIsp,
    //         os: this.clientPCForm.os,
    //         browser: this.clientPCForm.browser.join(','),
    //         state: this.clientPCForm.state,
    //         hostType: Number(this.clientPCForm.hostType),
    //         network: this.clientPCForm.network,
    //       }
    //       if (this.clientPCType === 'add'){
    //         // 新增客户端
    //         this.createClientPC(clientPCFormParams)
    //       }else{
    //         // 修改客户端
    //         clientPCFormParams.id = this.clientPCID
    //         //this.modifyClientPC(clientPCFormParams)
    //       }
    //     }else{
    //       console.log('error submit!')
    //       return false
    //     }
    //   })
    // },
    // 新增客户端
    // createClientPC(createParams){
    //   createClient(createParams).then(res => {
    //     if(res.code === 200) {
    //       this.$message({
    //         type: 'success',
    //         message: res.msg
    //       });
    //       // this.$router.push("/client_management/client_pc");
    //     }else{
    //       this.$message({
    //         type: 'error',
    //         message: res.msg
    //       });
    //     }
    //   }).catch(err => {
    //     console.log("createClientPC失败:", err);
    //   })
    // },
    // 修改客户端
    // modifyClientPC(clientModifyParams){
    //   this.$confirm('此操作将修改该条数据, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     modifyClient(clientModifyParams).then(res => {
    //       if(res.code === 200) {
    //         this.$message({
    //           type: 'success',
    //           message: res.msg
    //         });
    //         // this.$router.push("/client_management/client_pc");
    //       }else{
    //         this.$message({
    //           type: 'error',
    //           message: res.msg
    //         });
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消修改'
    //     });  
    //   })
    // },
    // 根据id获取要修改的单条客户端信息
    // getModifyClientPCData(){
    //   getSingleClientData({id: this.clientPCID}).then(res => {
    //     console.log('555', res);
    //     if(res.code === 200) {
    //       this.clientPCForm.host = res.data.host,
    //       this.clientPCForm.hlwHostWIp = res.data.hlwHostWIp,
    //       this.clientPCForm.cityName = res.data.cityName,
    //       this.clientPCForm.hlwLocation = res.data.hlwLocation,
    //       this.clientPCForm.hlwIsp = res.data.hlwIsp,
    //       this.clientPCForm.os = res.data.os,
    //       this.clientPCForm.browser = res.data.browser.split(','),
    //       this.clientPCForm.state = res.data.state,
    //       res.data.hostType === null ? this.clientPCForm.hostType = '' : this.clientPCForm.hostType = String(res.data.hostType)
    //       this.clientPCForm.network = res.data.network
    //     }else{
    //       this.$message({
    //         type: 'error',
    //         message: res.msg
    //       });
    //     }
    //   })
    // },
    // 获取 浏览器、运营商、城市 字典信息
    // getDictData(){
    //   getClientDict().then(res => {
    //     if(res.code === 200) {
    //       this.locationList = res.data.city
    //       this.browserList = res.data.brower
    //       this.browserList.forEach(item => item.title = titleCase(item.code))
    //       this.ispList = res.data.yys
    //     }else{
    //       console.log('getClientDict请求失败信息: ', res);
    //     }
    //   })
    // },
  },
};
</script>
<style lang="less" scoped>
:deep(.el-select .el-input){
  width: 100%!important;
}
.client-go-back {
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
.client-pc-form {
  background: #ffffff;
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 110px);
  height: 940px;
  display: flex;
  flex-direction: column;
  .client-pc-form-header {
    height: 40px;
    font-family: "Microsoft YaHei";
    // font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    align-items: center;
    color: #333333;
    padding-left: 20px;
    border-bottom: 1px solid #dedede;
  }
  .client-pc-form-info {
    flex: 1;
    padding: 20px;
  }
  .client-pc-form-button {
    height: 40px;
    padding: 20px;
    padding: 24px 20px 4px 0px;
    border-top: 1px solid #dedede;
    display: flex;
    justify-content: end;
  }
}
// 面包屑
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #1675d5 !important;
}
// 表单
.el-form--inline .el-form-item {
  width: 48%;
  margin-right: 24px;
}
:deep(.el-form--inline .el-form-item__content) {
  width: 100%;
}
:deep(.el-form-item__label) {
  color: #333333 !important;
  background-color: #ffffff !important;
  border: none !important;
  padding: 0px !important;
}
.el-select {
  width: 100%;
}
// 按钮
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
  background: #FFFFFF;
  border-color: #d3d4dd;
}
</style>
