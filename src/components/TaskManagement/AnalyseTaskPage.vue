<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/task_management/analyse_task' }">分析任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="shadow-div">
      <el-form ref="taskForm" :inline="true" :model="taskForm">
        <el-form-item prop="appName">
          <el-input v-model="taskForm.appName">
            <template slot="prepend">APP名称</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pkgName">
          <el-input v-model="taskForm.pkgName">
            <template slot="prepend">APP包名</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="status" label="分析状态">
          <el-select v-model="taskForm.status" style="transform: translateY(-1px);">
            <el-option v-for="item in statusList" :label="item.label" :value="item.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="入库时间" prop="taskTime">
          <el-date-picker v-model="taskForm.sTime" type="date" format="yyyy-MM-dd" width="10vw"
            value-format="yyyy-MM-dd" placement="bottom-start" placeholder="开始时间" class="input-time">
          </el-date-picker>
          <span class="split">至</span>
          <el-date-picker v-model="taskForm.eTime" type="date" format="yyyy-MM-dd" width="10vw"
            value-format="yyyy-MM-dd" placement="bottom-start" placeholder="结束时间" class="input-time">
          </el-date-picker>
        </el-form-item>
        <div style="text-align: right;">
          <el-button type="primary" @click="searchForm()">查询</el-button>
          <el-button type="info" @click="resetForm()">清空</el-button>
        </div>
      </el-form>
    </div>
    <div class="operator-div">
      <!-- 创建任务 -->
      <div style="display: inline-block;">
        <!-- <el-button type="primary" @click="startTaskByList" style="width: 100px">批量分析</el-button>
        <span style="margin: 0 16px;
                color: #d3d4dd;
                font-size: 27px;
                text-align: center;
                vertical-align: middle;
              ">|</span> -->
        <el-button type="primary" style="width: auto" @click.native="apk_input" :loading="loadingbut3">{{
          loadingbuttext3
        }}</el-button>
        <!-- <span style="margin: 0 16px;
                color: #d3d4dd;
                font-size: 27px;
                text-align: center;
                vertical-align: middle;
              ">|</span>
             <el-button type="primary" @click="outputResult" style="width: 100px">导出结果</el-button>  -->
        <input type="file" ref="fileInput2" @change="handleFileChange2" style="display: none">
        <!-- <el-button type="primary" @click="toCreateTask" style="width: 110px">APK上传<i class="el-icon-upload el-icon--right"></i></el-button> -->
        <!-- <el-upload action="#" name="file" ref="upload" :limit="1" :show-file-list="false" :on-exceed="handleExceed"
                             class="upload-file" :file-list="fileList || []" :http-request="uploadFile" accept=".apk" style="display: inline-block;"
                            :on-change="fileChange" :on-remove="fileRemove" unique="false">
                            <el-button type="primary" @click="toCreateTask" style="width: 110px">APK上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-upload> -->

        <!-- </el-upload> -->
      </div>
      <div style="float: right; margin-top: 10px">
        <a class="batch-opt border-right" @click="outputResult()">
          <i class="el-icon-document"></i>
          <span class="l10 grey" style="cursor: pointer">批量导出</span>
        </a>
        <a class="batch-opt border-right" @click="startTaskByList()">
          <i class="el-icon-video-play green"></i>
          <span class="l10 green" style="cursor: pointer">批量分析</span>
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
          <el-table-column prop="appName" label="APP名称" :show-overflow-tooltip="true" min-width="130">
          </el-table-column>
          <el-table-column prop="pkgName" label="APP包名" :show-overflow-tooltip="true" min-width="150">
          </el-table-column>
          <el-table-column prop="appVersion" label="APP版本" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0" class="font-bold blue">
                待分析
              </div>
              <div v-if="scope.row.status == 1" class="font-bold green">
                分析中
              </div>
              <div v-if="scope.row.status == 2" class="font-bold red">
                已完成
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="issuer" label="开发者" :show-overflow-tooltip="true" min-width="120">
          </el-table-column> -->
          <el-table-column prop="source" label="来源" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn green" style="border-right: 2px solid #cecece;padding-right:10px"
                type="warning" size="mini" @click="startTask(scope.row.id)">分析</el-button>
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="xqClick(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
          :total="taskTotal" style="float: right; margin-top: 16px">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" top="3%">
      <div>
        <p class="dialog-title">APK信息</p>
        <p>文件名称：<span>{{ dialogData.filename }}</span></p>
        <p>APP名称：<span>{{ dialogData.appName }}</span></p>
        <p>APP版本：<span>{{ dialogData.appVersion }}</span></p>
        <p>PackageName：<span>{{ dialogData.pkgName }}</span></p>
        <p>Main Activity：<span>{{ dialogData.mainActivity }}</span></p>
        <p>文件大小：<span>{{ dialogData.fileSize }}</span></p>
        <p>Md5：<span>{{ dialogData.fileMd5 }}</span></p>
        <p>sha1：<span>{{ dialogData.fileSha1 }}</span></p>
        <p>sha256：<span>{{ dialogData.fileSha256 }}</span></p>
        <p class="dialog-title">证书信息</p>
        <p style="height: auto; background-color: #f2f2f2;padding:5px;border:solid #c9c9c9 1px;">{{
          dialogData.certificateInfo }}</p>
        <p class="dialog-title">APP权限信息</p>
        <div class="permissions-list">
          <div v-for="(permission, index) in dialogData.permissions" :key="index"
            style="border:solid #c9c9c9 1px;margin-bottom: -1px;" class="permission-row"
            :class="{ 'odd-row': index % 2 !== 0, 'even-row': index % 2 === 0 }">
            <div class="permission-cell">{{ permission.permission }}</div>
            <div class="status-cell">{{ permission.status }}</div>
          </div>
        </div>
        <p class="dialog-title">第三方SDK信息</p>
        <div class="sdk-list">
          <p v-for="(sdk, index) in dialogData.sdks" :key="index"
            :class="{ 'odd-row': index % 2 !== 0, 'even-row': index % 2 === 0 }" style="margin-bottom: -1px;">{{ sdk }}
          </p>
        </div>
        <p class="dialog-title">动态特征</p>
        <div class="features-list">
          <div v-for="(feature, index) in dialogData.networkFeatures" :key="index" class="feature-row"
            style="border:solid #c9c9c9 1px;margin-bottom: -1px;"
            :class="{ 'odd-row': index % 2 !== 0, 'even-row': index % 2 === 0 }">
            <div class="feature-cell">{{ feature.host }}</div>
            <div class="feature-cell">{{ feature.ip }}</div>
            <div class="feature-cell">{{ feature.port }}</div>
            <div class="feature-cell">{{ feature.protocol }}</div>
            <div class="feature-cell" style="cursor: pointer;">
              <!-- {{ '证书' }} -->
                <el-tooltip effect="dark" placement="top" class="item" :content="feature.sslCert" >
                  <div slot="content" class="oneLine">
                    {{feature.sslCert}}
                  </div>
                  <div>
                    证书
                  </div>
                </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
  name: "AnalyseTask",
  data() {
    return {
      dialogData: {
        filename: "",
        appName: "",
        appVersion: "",
        pkgName: "",
        mainActivity: "",
        fileSize: "",
        fileMd5: "",
        fileSha1: "",
        fileSha256: "",
        certificateInfo: "",
        status: "",
        permissions: [],
        sdks: []
      },
      statusList: [{ label: "待分析", value: 0 }, { label: '分析中', value: 1 }, { label: "已完成", value: 2 }],
      certificateVisible: false,
      dialogVisible: false,
      loadingbuttext3: 'APK上传',
      loadingbut3: false,
      fileList: [],
      curFile: {},
      taskForm: {
        appName: "",
        pkgName: "",
        taskName: "",
        sTime: "",
        eTime: "",
        taskType: "全部",
        status: ""
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
    async outputResult(){
      console.log(this.ids);
      // if (this.ids.length == 0) {
      //   this.$message("请选择需要导出的任务");
      //   return;
      // }
      const formData = new FormData()
      formData.append("ids",this.ids)
      formData.append("appName",this.taskForm.appName)
      formData.append("status",this.taskForm.status)
      formData.append("pkgName",this.taskForm.pkgName)
      formData.append("startDate",this.taskForm.sTime)
      formData.append("endDate",this.taskForm.eTime)
      const { data: res } = await this.$http({
        method: 'POST',
        url: "/apk/export_result",
        responseType: 'arraybuffer',
        data:formData
      })
      // const { data: res } = await this.$http({
      //   method: 'POST',
      //   url: "/apk/export_result?ids=" + this.ids,
      //   responseType: 'arraybuffer',
      // })
      let blob = res
      let title = '分析任务导出结果.xlsx'
      let binaryData = []
      binaryData.push(blob)
      let url = window.URL.createObjectURL(new Blob(binaryData), {
        type: 'application/vnd.ms-excel',
      })
      const aLink = document.createElement('a')
      aLink.href = url
      aLink.setAttribute('download', title)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)          
    },
    showCertificate(sslCert) {
      console.log(sslCert);
      // 显示SSL证书内容的浮层
      this.certificateVisible = true;
    },

    hideCertificate() {
      this.certificateVisible = false;
    },
    async xqClick(id) {
      const { data: res } = await this.$http.get('/apk/analyzeDetail', { params: { id } })
      this.dialogData = res.data
      this.dialogData.permissions.unshift({
        permission: '权限',
        status: '状态'
      })
      this.dialogData.networkFeatures.unshift({
        host:'域名',
        ip:"IP",
        port:"端口",
        protocol:"协议",
        sslCert:"证书"
      })
      this.dialogVisible = true
    },
    handleFileChange2(event) {
      // 获取选中的文件
      const file = event.target.files[0];
      this.loadingbuttext3 = '...上传中'
      this.loadingbut3 = true
      // 执行上传的逻辑
      const formData = new FormData();
      formData.append('multipartFile', file);

      this.$http.post('/apk/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            console.log(res)
            // this.$message(res.data.message);
            this.loadingbuttext3 = 'APK上传'
            this.loadingbut3 = false
            this.newdomainSimpleVo.dataType = 'apk'
            this.tasklist()
          } else {
            console.log(res)
            this.$message(res.data.message);
            this.loadingbuttext3 = 'APK上传'
            this.loadingbut3 = false
          }

        })
        .catch((error) => {
          console.log(error);
          this.$message('上传失败：', error);
          this.loadingbuttext3 = 'APK上传'
          this.loadingbut3 = false
        });
    },
    apk_input() {
      this.$refs.fileInput2.value = '';
      this.$refs.fileInput2.click();
    },
    //上传文件
    uploadFile(param) {
      const { file, onSuccess, onError } = param;
      console.log("param", param);
      //把上传的文件赋值给data属性的file
      this.probeAppForm.file = file;
      this.probeAppForm.fileName = file;
      const formData = new FormData();
      formData.append('multipartFile', file);
      this.$http.post('/apk/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        // 上传成功
        onSuccess(response.data);
      }).catch(error => {
        // 上传失败
        onError(error);
      });

    },

    // 列表初始
    async tasklist() {
      const { data: res } = await this.$http.get(
        "/apk/list",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            appName: this.taskForm.appName,
            pkgName: this.taskForm.pkgName,
            status: this.taskForm.status,
            startDate: this.taskForm.sTime,
            endDate: this.taskForm.eTime,
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
      this.tasklist()
      // const { data: res } = await this.$http.get(
      //   "/task/showPage",
      //   {
      //     params: {
      //       page: this.currentPage,
      //       pageSize: this.pageSize,
      //       id: this.taskForm.taskId,
      //       taskName: this.taskForm.taskName,
      //       taskTags: this.taskForm.taskTag,
      //       taskTimeStart: this.taskForm.sTime,
      //       taskTimeEnd: this.taskForm.eTime,
      //       createUser: this.taskForm.createUser,
      //       businessType: (this.taskForm.taskType == '全部') ? '' : this.taskForm.taskType,
      //      // nodeType: (this.taskForm.nodeType == '全部') ? '' : this.taskForm.nodeType,
      //     //  businessType: this.taskForm.taskType,
      //       nodeType: this.taskForm.nodeType,
      //       priority: (this.taskForm.priority == '全部') ? '' : this.taskForm.priority,
      //       status: this.taskForm.status
      //     },
      //   }
      // );
      // if (res.code == 0) {
      //   this.taskTotal = res.totalSum; //总条数
      //   let tempData = res.dataList;
      //   let startNum = (this.currentPage - 1) * this.pageSize + 1;
      //   this.tableData = tempData.map((item, index) => {
      //     item.num = index + startNum;
      //     return item;
      //   });
      //   this.$nextTick(() => {
      //     //在数据加载完，重新渲染表格
      //     this.$refs["taskTable"].doLayout();
      //   });
      // }
    },
    //清空
    resetForm() {
      this.taskForm.appName = "",
        this.taskForm.pkgName = "",
        this.taskForm.status = "",
        this.taskForm.sTime = "",
       this.taskForm.eTime = "",
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
      // 2.4 暂时关闭
      // return this.$router.push("/task_management/create_task");
    },
    //下发
    async startTask(id) {
      const { data: res } = await this.$http.post(
        "/apk/analyze?ids=" + id
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "分析成功",
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
        this.$message("请选择需要分析的任务");
        return;
      }
      const { data: res } = await this.$http.post(
        "/apk/analyze?ids=" + this.ids
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "分析成功",
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
            "/apk/batchDel?ids=" + this.ids
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
    // 点击“详情”，单个查看拨测结果
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
      let path = '/task_management/fxxqResult';
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
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
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
    },
  },
};
</script>

<style lang="less" scoped>
.oneLine{
  
  width: 400px;
  white-space: pre-wrap;
}
.el-dialog>div {

  .features-list {
    font-size: 10px;

    .feature-row {
      display: flex;
      border-bottom: 1px solid #c9c9c9;

      .feature-cell {
        padding: 5px;
        flex: 1;
        border-right: 1px solid #c9c9c9;

        &:last-child {
          border-right: none;
        }
      }

      &.odd-row {
        background-color: #f2f2f2;
      }

      &.even-row {
        background-color: #fff;
      }
    }
  }
}

.el-dialog>div {
  .permissions-list {
    max-height: 150px; /* 设置列表容器的固定高度 */
    overflow-y: auto; /* 在内容溢出时显示垂直滚动条 */
    font-size: 10px;
    .permission-row {
      display: flex;
      border-bottom: 1px solid #c9c9c9;

      .permission-cell,
      .status-cell {
        padding: 5px;
        flex: 1;
        border-right: 1px solid #c9c9c9;

        &:last-child {
          border-right: none;
        }
      }

      &.odd-row {
        background-color: #f2f2f2;
      }

      &.even-row {
        background-color: #fff;
      }
    }
  }
}

.el-dialog>div {

  .sdk-list {
    max-height: 150px; /* 设置列表容器的固定高度 */
    overflow-y: auto; /* 在内容溢出时显示垂直滚动条 */
    p {
      padding: 5px;
      border: 1px solid #c9c9c9;

      &.odd-row {
        background-color: #f2f2f2;
      }

      &.even-row {
        background-color: #fff;
      }
    }
  }
}

.el-dialog .dialog-title {
  font-weight: 600;
  margin: 10px 0;
}

.el-dialog p {
  font-size: 12px;
  margin-bottom: 5px;
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