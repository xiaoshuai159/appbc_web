<template>
  <div id="probe-app-detail-modify" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">系统配置</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>app脚本管理</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>新增APP</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="probe-app-go-back" @click="goBackProbeApp">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 新增App -->
    <div class="probe-app-form">
      <div class="probe-app-form-header">新增APP</div>
      <div class="probe-app-form-info">
        <el-form ref="probeAppForm" :inline="true" :rules="probeAppFormRules" :model="probeAppForm"
          class="demo-form-inline">
          <el-form-item label="App文件名" prop="appScriptName">
            <el-input placeholder="请输入App文件名" v-model="probeAppForm.appScriptName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="App真实名称" prop="appName">
            <el-input placeholder="请输入App真实名称" v-model="probeAppForm.appName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="App版本" prop="appVer">
            <el-input placeholder="请输入App版本" v-model="probeAppForm.appVer" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input placeholder="可在此输入对该app的备注信息" v-model="probeAppForm.remarks" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="上传测试用例" prop="fileValidate" style="position: relative;">
            <el-upload action="#" name="file" ref="upload" :limit="1" :show-file-list="true" :on-exceed="handleExceed"
              :auto-upload="false" class="upload-file" :file-list="fileList || []" :http-request="uploadFile" accept=".py"
              :on-change="fileChange" :on-remove="fileRemove">
              <i class="el-icon-folder-add"></i>
              <div class="upload-file-text">上传文件</div>
              <div slot="tip" class="el-upload__tip orange">只能上传一个py文件，且文件名要和上边输入的一致</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="probe-app-form-button">
        <el-button type="primary" @click="submitProbeAppForm()">保存</el-button>
        <el-button type="info" @click="resetProbeAppForm()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
export default {
  name: "AddProbeApp",
  data() {
    return {
      probeAppForm: {
        appScriptName: "",
        appName: "",
        appVer: "",
        remarks: "",
        file: [], //上传的文件
        id: "",
        fileValidate: null
      },

      fileList: [],
      probeAppFormRules: {
        appScriptName: [
          { required: true, message: "请输入app文件名", trigger: "change" },
        ],
        appName: [
          { required: true, message: "请输入app真实名称", trigger: "change" },
        ],
        appVer: [
          { required: true, message: "请输入app版本", trigger: "change" },
        ],
        fileValidate: [
          { required: true, message: "请上传.py文件", trigger: 'change' }
        ],
      },
      id: 0,
      from: "",  //from页面来源,table:App列表页面，update:更新App信息页面
      uploadURL: "/app/edit", //文件上传地址
    };
  },
  created() {
    console.log(this.$route.query)
    this.from = this.$route.query.from;
    if (this.$route.query.from == 'update') { //获取浏览器url的参数，from页面来源,table:App列表页面，update:更新App信息页面 
      this.id = parseInt(this.$route.query.id);
      this.selectProbeAppInfo(this.id); //更新时初始状态：显示单个App的信息
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    //返回上一级
    goBackProbeApp() {
      this.$router.push({
        path: "/system_config/app_probe",
        query: {
          from: "resultTable", //返回参数 //页面来源是App列表还是修改App信息
          page: this.$route.query.page,
          pageSize: this.$route.query.pageSize,
        },
      });
    },
    //查询单个App信息
    async selectProbeAppInfo(id) {
      const { data: res } = await this.$http.get("/app/detail?id=" + id);
      if (res.code == 200) {
        this.probeAppForm.appName = res.data.appName;
        this.probeAppForm.appScriptName = res.data.appScriptName;
        this.probeAppForm.appVer = res.data.appVer;
        this.probeAppForm.remarks = res.data.remarks;
        this.probeAppForm.id = res.data.id;
        this.fileList = [];
        let obj = {}
        obj.name = res.data.appScriptName
        obj.url = ''
        this.fileList.push(obj)
      }
    },
    //验证按钮
    async submitProbeAppForm() {
      this.$refs.probeAppForm.validate((valid) => {
        if (valid) {
          this.submitForm();
        }
      });
    },

    //新增，修改信息
    async submitForm() {
      //注意执行submit方法后，他会触发upload组件中的 http-request
      this.$refs.upload.submit()
      console.log("this.probeAppForm", this.probeAppForm);
      if (this.probeAppForm.file.length == 0 || this.probeAppForm.file.name != this.probeAppForm.appScriptName) {
        this.$message("上传文件名和APP文件名不一致");
        return
      }
      if (this.from == 'table') {
        //新增
        const formData = new FormData()
        formData.append('file', this.probeAppForm.file)
        formData.append('appScriptName', this.probeAppForm.appScriptName)
        formData.append('appName', this.probeAppForm.appName)
        formData.append('appVer', this.probeAppForm.appVer)
        formData.append('remarks', this.probeAppForm.remarks)

        const { data: res } = await this.$http.post("/app/edit", formData);
        // const { data: res } = await this.$http.post("/app/edit?appScriptName=" + this.probeAppForm.appScriptName + "&appName=" + this.probeAppForm.appName + "&appVer=" + this.probeAppForm.appVer + "&remarks=" + this.probeAppForm.remarks + "&file=" + formData);
        if (res.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.$router.push("/system_config/app_probe");
        } else {
          this.$message("添加失败");
        }
      } else { //修改信息
        this.$confirm("此操作将修改APP信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          const { data: res } = await this.$http.post("/app/edit?appScriptName=" + this.probeAppForm.appScriptName + "&appName=" + this.probeAppForm.appName + "&appVer=" + this.probeAppForm.appVer + "&remarks=" + this.probeAppForm.remarks);
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$router.push("/system_config/app_probe");
          } else {
            this.$message("修改失败");
          }
        }).catch(() => {
          this.$message("已取消修改");
        });
      }
    },

    //取消修改
    async resetProbeAppForm() {
      if (this.from == 'table') { //新增
        this.probeAppForm.appScriptName = "",
          this.probeAppForm.appName = "",
          this.probeAppForm.appVer = "",
          this.probeAppForm.remarks = ""
      } else { //修改
        this.selectProbeAppInfo(this.id);
      }
    },
    // 上传文件数量限制
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    //上传文件
    uploadFile(param) {
      console.log("param", param);
      //把上传的文件赋值给data属性的file
      this.probeAppForm.file = param.file;
      this.probeAppForm.fileName = param.file;
    },
    //文件已上传则关闭校验
    fileChange(uploadFile, fileList) {
      this.probeAppForm.fileValidate = uploadFile
      if (fileList.length !== 0) {
        this.$refs.probeAppForm.validateField('fileValidate')
      }
    },
    //文件移除重新校验
    fileRemove(uploadFile, fileList) {
      if (fileList.length === 0) {
        this.probeAppForm.fileValidate = null
        this.$refs.probeAppForm.validateField('fileValidate')
      }
    }

  },
};
</script>
<style lang="less" scoped>
:deep(.el-select .el-input) {
  width: 100% !important;
}

.probe-app-go-back {
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

.probe-app-form {
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

  .probe-app-form-header {
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

  .probe-app-form-info {
    flex: 1;
    padding: 20px;
  }

  .probe-app-form-button {
    height: 40px;
    padding: 20px;
    padding: 24px 20px 4px 0px;
    border-top: 1px solid #dedede;
    display: flex;
    justify-content: end;
  }

  .upload-file {
    display: inline-block;
    // position: absolute;

    :deep(.el-upload) {
      border: 1px solid #1675d5;
      border-radius: 4px;
      padding: 0px 16px;

    }

    .el-upload__tip {
      font-size: 14px;
    }

    i {
      color: #1675d5;
      float: left;
      line-height: 40px;
    }

    .upload-file-text {
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      width: 84px;
      color: #1675d5;
    }
  }
}

// 面包屑
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #1675d5 !important;
}

// 表单
.el-form--inline .el-form-item {
  width: 100%;
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

.orange {
  color: #f39300;
}
</style>
