<template>
  <div id="crawl-app-detail-modify" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">系统配置</el-breadcrumb-item> -->
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item>app版本跟踪</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>修改监测APP信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="crawl-app-go-back" @click="goBackCrawlApp">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <!-- 修改App信息 -->
    <div class="crawl-app-form">
      <div class="crawl-app-form-header">修改监测APP信息</div>
      <div class="crawl-app-form-info">
        <el-form ref="crawlAppForm" :inline="true" :rules="crawlAppFormRules" :model="crawlAppForm"
          class="demo-form-inline">
          <el-form-item label="App真实名称" prop="appName">
            <el-input v-model="crawlAppForm.appName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="版本" prop="appVer">
            <el-input v-model="crawlAppForm.appVer" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="提供方" prop="supplier">
            <el-input v-model="crawlAppForm.supplier" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="更新日期" prop="appUpdateDate">
            <el-date-picker v-model="crawlAppForm.appUpdateDate" type="datetime" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" placement="bottom-start" placeholder="选择更新日期" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布日期" prop="appPublishDate">
            <el-date-picker v-model="crawlAppForm.appPublishDate" type="datetime" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" placement="bottom-start" placeholder="选择发布日期" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="爬取链接" prop="appUrl">
            <el-input v-model="crawlAppForm.appUrl" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="crawlAppForm.description" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="crawlAppForm.remarks" clearable>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="crawl-app-form-button">
        <el-button type="primary" @click="submitCrawlAppForm()">保存</el-button>
        <el-button type="info" @click="resetCrawlAppForm()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
export default {
  name: "UpdateCrawlApp",
  data() {
    return {
      crawlAppForm: {
        appName: "",
        appVer: "",
        remarks: "",
        supplier:"",
        appUpdateDate:"",
        appPublishDate:"",
        appUrl:"",
        description: "",
        id:"",
      },
      crawlAppFormRules: {
        appName: [
          { required: true, message: "请输入app真实名称", trigger: "change" },
        ],
        appVer: [
          { required: true, message: "请输入app版本", trigger: "change" },
        ],
        supplier: [
          { required: true, message: "请输入app提供方", trigger: "change" },
        ],
        appUpdateDate: [
          { required: true, message: "请输入app更新日期", trigger: "change" },
        ],
        appUrl: [
          { required: true, message: "请输入app爬取链接", trigger: "change" },
        ],
      },
      id: 0,
    };
  },
  created() {
    console.log(this.$route.query) 
    this.id = parseInt(this.$route.query.id);
    this.selectAppInfo(this.id); //更新时初始状态：显示单个App的信息
    
  },
  mounted() {
    window.addEventListener("keydown", this.handleSearch);
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  methods: {
    //返回上一级
    goBackCrawlApp() {
      this.$router.push({
        path: "/system_config/app_crawl",
        query: {
          from: "resultTable", //页面来源是App列表还是修改App信息
          page: this.$route.query.page,
          pageSize: this.$route.query.pageSize,
        },
      });
    },
    //查询单个App信息
    async selectAppInfo(id) {
      const { data: res } = await this.$http.get("/appVersion/detail?id=" + id);
      if (res.code == 200) {
        this.crawlAppForm = res.data
      }
    },
    //保存
    async submitCrawlAppForm() {
      this.$refs.crawlAppForm.validate((valid) => {
        if (valid) {
          this.$confirm("此操作将修改该APP信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(async () => {
            //编辑
            const { data: res } = await this.$http.post("/appVersion/edit", this.crawlAppForm);
              if (res.code == 200) {
                this.$message({
                      message: "修改成功",
                      type: "success",
                });
                this.$router.push({
                  path: "/system_config/app_crawl",
                  query: {
                    from: "resultTable", //返回参数 //页面来源是App列表还是修改App信息
                    page: this.$route.query.page,
                    pageSize: this.$route.query.pageSize,
                  },
                });
              }else{
                this.$message("修改失败");
              }
            }).catch(() => {
              this.$message("已取消修改");
            });
        }
      });
    },

    //取消修改
    async resetCrawlAppForm() {
      this.selectAppInfo(this.id);
    },
  },
};
</script>
<style lang="less" scoped>
:deep(.el-select .el-input) {
  width: 100% !important;
}

.crawl-app-go-back {
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

.crawl-app-form {
  background: #ffffff;
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 110px);
  display: flex;
  flex-direction: column;

  .crawl-app-form-header {
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

  .crawl-app-form-info {
    flex: 1;
    padding: 20px;
  }

  .crawl-app-form-button {
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

.orange {
  color: #f39300;
}
</style>
