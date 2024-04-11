<template>
  <div id="client-app-detail-modify" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">客户端管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增客户端</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>客户端详细信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="client-go-back" @click="goBackClientApp">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 详细信息修改 -->
    <div class="client-app-form">
      <div class="client-app-form-header">信息修改</div>
      <div class="client-app-form-info">
        <el-form ref="clientAppFormModify" :inline="true" :rules="clientAppFormModifyRules" :model="clientAppFormModify"
          class="demo-form-inline">
          <el-form-item label="AppiumId" prop="appiumId">
            <el-select v-model="clientAppFormModify.appiumId">
              <el-option v-for="item in dataList" :label="`${(item.id)}_${(item.ip)}`" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号" prop="udid">
            <el-input placeholder="请输入设备编号" v-model="clientAppFormModify.udid" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="端口" prop="appiumPort">
            <el-input placeholder="请输入服务端口" v-model="clientAppFormModify.appiumPort" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="手机品牌" prop="brand">
            <el-input placeholder="请输入手机品牌" v-model="clientAppFormModify.brand" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-select v-model="clientAppFormModify.province">
              <el-option label="北京" value="北京"></el-option>
              <el-option label="天津" value="天津"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="重庆" value="重庆"></el-option>
              <el-option label="河北" value="河北"></el-option>
              <el-option label="山西" value="山西"></el-option>
              <el-option label="黑龙江" value="黑龙江"></el-option>
              <el-option label="吉林" value="吉林"></el-option>
              <el-option label="辽宁" value="辽宁"></el-option>
              <el-option label="江苏" value="江苏"></el-option>
              <el-option label="浙江" value="浙江"></el-option>
              <el-option label="安徽" value="安徽"></el-option>
              <el-option label="福建" value="福建"></el-option>
              <el-option label="江西" value="江西"></el-option>
              <el-option label="山东" value="山东"></el-option>
              <el-option label="河南" value="河南"></el-option>
              <el-option label="湖北" value="湖北"></el-option>
              <el-option label="湖南" value="湖南"></el-option>
              <el-option label="广东" value="广东"></el-option>
              <el-option label="海南" value="海南"></el-option>
              <el-option label="四川" value="四川"></el-option>
              <el-option label="贵州" value="贵州"></el-option>
              <el-option label="云南" value="云南"></el-option>
              <el-option label="陕西" value="陕西"></el-option>
              <el-option label="甘肃" value="甘肃"></el-option>
              <el-option label="青海" value="青海"></el-option>
              <el-option label="台湾" value="台湾"></el-option>
              <el-option label="内蒙古" value="内蒙古"></el-option>
              <el-option label="广西" value="广西"></el-option>
              <el-option label="西藏" value="西藏"></el-option>
              <el-option label="宁夏" value="宁夏"></el-option>
              <el-option label="新疆" value="新疆"></el-option>
              <el-option label="香港" value="香港"></el-option>
              <el-option label="澳门" value="澳门"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营商" prop="isp">
            <el-select v-model="clientAppFormModify.isp">
              <el-option label="电信" value="电信"></el-option>
              <el-option label="移动" value="移动"></el-option>
              <el-option label="联通" value="联通"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作系统" prop="os">
            <el-input placeholder="请输入操作系统" v-model="clientAppFormModify.os" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="系统版本" prop="osVersion">
            <el-input placeholder="请输入系统版本" v-model="clientAppFormModify.osVersion" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input placeholder="请输入手机号" v-model="clientAppFormModify.phone" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="客户端状态" prop="status">
            <el-select v-model="clientAppFormModify.status">
              <!-- <el-option label="在线" value="1"></el-option>
              <el-option label="离线" value="0"></el-option> -->
               <el-option v-for="item in statusList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="client-app-form-button">
        <el-button type="primary" @click="submitClientAppFormModify('clientAppFormModify')">保存</el-button>
        <el-button type="info" @click="resetClientAppFormModify('clientAppFormModify')">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
export default {
  name: "ClientAppDetailModify",
  data() {
    return {
      clientAppFormModify: {
        appiumId: "",
        udid: "",
        brand: "",
        appiumPort: "",
        province: "",
        isp: "",
        os: "",
        osVersion: "",
        phone: "",
        status: "",
        city: "",
        country:"中国",
        del:0,
        automationName: "UiAutomator2",
        password: "1qazxsw2",
        username: "goodluck"
      },
      clientAppFormModifyRules: {
        appiumId: [
          { required: true, message: "请选择AppiumId", trigger: "change" },
        ],
        udid: [
          { required: true, message: "请输入设备编号", trigger: "change" },
        ],
        brand: [
          { required: true, message: "请输入手机品牌", trigger: "change" },
        ],
        appiumPort: [
          { required: true, message: "请输入端口", trigger: "change" },
        ],
        brand: [
          { required: true, message: "请输入手机品牌", trigger: "change" },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        isp: [
          { required: true, message: "请选择运营商", trigger: "change" },
        ],
        os: [
          { required: true, message: "请输入操作系统", trigger: "change" },
        ],
        osVersion: [
          { required: true, message: "请输入操作系统", trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择客户端状态", trigger: "change" },
        ],
      },
      clientId: 0, //客户端id
      dataList: [], //appium数组
      statusList: [{
          value: 1,
          label: '在线'
        }, {
          value: 0,
          label: '离线'
        }],   //在线离线数组
      from:"",  //from页面来源: table客户端列表页面，update更新客户端信息页面
    };
  },
  created() {
    console.log(this.$route.query)
    this.from = this.$route.query.from;
    if (this.$route.query.from == 'update') { //获取浏览器url的参数，from页面来源: table客户端列表页面，update更新客户端信息页面 
      this.clientId = parseInt(this.$route.query.id); 
      this.selectClientInfo(this.clientId); //更新时初始状态：显示单个客户端的信息
    }
    this.selectAppiumId();
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    //返回上一级
    goBackClientApp() {
      this.$router.push({
        path: "/client_management/client_app",
        query: {
          from: this.$route.query.from == "table" ? "table": "update", //页面来源是客户端列表还是修改客户端信息
          page: this.$route.query.page,
          pageSize: this.$route.query.pageSize,
        },
      });
    },
    //查询单个客户端信息
    async selectClientInfo(id){
      const { data: res } = await this.$http.get("/client/getOne?id="+id);
      if (res.code == 200) {
        this.clientAppFormModify = res.data
      }
    },
    //验证按钮
    async submitClientAppFormModify(clientForm) {
      this.$refs.clientAppFormModify.validate((valid) => {
          if (valid) {
             this.submitClientAppForm();
          }
        });  
    },

    //新增，修改信息
    async submitClientAppForm() {
        this.clientAppFormModify.city =  this.clientAppFormModify.province
          if(this.from == 'table'){
            //新增
            const { data: res } = await this.$http.post("/client/register", this.clientAppFormModify);
              if (res.code == 200) {
                this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                this.$router.push("/client_management/client_app");
              }else{
                this.$message("添加失败");
            }
        }else{
          //编辑
          const { data: res } = await this.$http.post("/client/modify", this.clientAppFormModify);
          if (res.code == 200) {
           this.$message({
                message: "修改成功",
                type: "success",
              });
           this.$router.push("/client_management/client_app");
          }else{
            this.$message("修改失败");
          }
        }
    },
    
    //取消修改
    async resetClientAppFormModify(){
      if(this.from == 'table'){
         this.clientAppFormModify.appiumId = "",
         this.clientAppFormModify.udid = "",
         this.clientAppFormModify.appiumPort = "",
         this.clientAppFormModify.brand = "",
         this.clientAppFormModify.province = "",
         this.clientAppFormModify.isp = "",
         this.clientAppFormModify.os = "",
         this.clientAppFormModify.osVersion = "",
         this.clientAppFormModify.phone = "",
         this.clientAppFormModify.status = "",
         this.clientAppFormModify.city = ""
      }else{
        this.selectClientInfo(this.clientId);
      }
    },
    //查询appiumld
    async selectAppiumId(){
      const { data: res } = await this.$http.get("/appium/list?page=1&pageSize=10000");
      if (res.code == 0) {
        this.dataList = res.dataList
      }
    },
  },
};
</script>
<style lang="less" scoped>
:deep(.el-select .el-input) {
  width: 100% !important;
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

.client-app-form {
  background: #ffffff;
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 110px);
  // height: 740px;
  display: flex;
  flex-direction: column;

  .client-app-form-header {
    height: 40px;
    font-family: "Microsoft YaHei";
    // font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    align-items: center;
    color: #333333;
    padding-left: 20px;
    border-bottom: 1px solid #dedede;
  }

  .client-app-form-info {
    flex: 1;
    padding: 20px;
  }

  .client-app-form-button {
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
