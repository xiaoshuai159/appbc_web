<template>
  <div id="task-index" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/task_management/patrol_task' }">巡查任务</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="shadow-div">
      <el-form ref="taskForm" :inline="true" :model="taskForm">
        <el-form-item prop="url">
          <el-input v-model="taskForm.url">
            <template slot="prepend">目标网站</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="tags">
          <el-input v-model="taskForm.tags">
            <template slot="prepend">标签</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="taskForm.status" style="transform: translateY(-1px);">
            <el-option v-for="item in statusList" :label="item.label" :value="item.value"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item prop="apkCnt">
          <el-input v-model="taskForm.apkCnt">
            <template slot="prepend">apk数量</template>
          </el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="taskTime">
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
        <el-button type="primary" @click="toCreateTask" style="width: 120px">+ 新建任务</el-button>
        <span style="margin: 0 16px;
                color: #d3d4dd;
                font-size: 27px;
                text-align: center;
                vertical-align: middle;
              ">|</span>
        <el-button type="primary" @click="toCreateMoreTask" style="width: 140px">+ 批量新建任务</el-button>
      </div>
      <!-- 批量操作按钮 -->
      <div style="float: right; margin-top: 10px">
        <a class="batch-opt border-right" @click="multExport()">
          <i class="el-icon-document"></i>
          <span class="l10 grey" style="cursor: pointer">批量导出</span>
        </a>
        <a class="batch-opt border-right" @click="startTaskByList()">
          <i class="el-icon-video-play green"></i>
          <span class="l10 green" style="cursor: pointer">批量启动</span>
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
          <el-table-column prop="url" label="目标网站" :show-overflow-tooltip="true" min-width="130">
          </el-table-column>
          <el-table-column prop="status" label="状态" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.status == 0" class="font-bold blue">
                待启动
              </div>
              <div v-if="scope.row.status == 1" class="font-bold green">
                进行中
              </div>
              <div v-if="scope.row.status == 2" class="font-bold red">
                已结束
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="taskName" label="任务名称" :show-overflow-tooltip="true" fixed="left" width="150">
            <template slot-scope="scope">
              <span class="task-name" @click="taskInfo(scope.row.id)">
                {{ scope.row.taskName }}
              </span>
            </template>
          </el-table-column> -->
          <el-table-column prop="tags" label="标签" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true" width="190">
          </el-table-column>
          <el-table-column prop="apkCnt" label="apk数量" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column label="下载状态" :show-overflow-tooltip="true" min-width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.apkCnt == 0" type="info">无</el-tag>
              <el-tag v-else-if="scope.row.apkCnt > 0 && scope.row.apkCnt <= scope.row.downloadSuccessCnt"
                type="success">成功</el-tag>
              <el-tag v-else type="danger">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn green" style="border-right: 2px solid #cecece;padding-right:10px"
                type="warning" size="mini" @click="startTask(scope.row.id)"
                :disabled="scope.row.status != 0">启动</el-button>
              <el-button class="operator-table-btn red" style="border-right: 2px solid #cecece;padding-right:10px"
                type="danger" size="mini" @click="deleteTask(scope.row.id)">删除</el-button>
              <!-- <el-button class="operator-table-btn orange" type="primary" size="mini" @click="stopTask(scope.row.id)"
                :disabled="scope.row.status != 1">停止</el-button>
              <el-button class="operator-table-btn red" type="danger" size="mini" @click="deleteTask(scope.row.id)"
                :disabled="scope.row.status == 1"
                style="padding-right: 10px;border-right: 1px solid #cecece;">删除</el-button> 
                <el-button class="operator-table-btn blue" type="warning" size="mini"
                @click="copyTask(scope.row.id)">复制</el-button> -->
              <el-button class="operator-table-btn blue" type="primary" size="mini"
                @click="goResult(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
          :total="taskTotal" style="float: right; margin-top: 16px">
        </el-pagination>
        <el-dialog title="新建任务" :visible.sync="innerVisible" width="28%">
          <!--弹出的对话框的内容-->
          <el-form ref="form" :model="addForm" label-width="100px">
            <el-form-item label="标签" prop="tags" class="dialogItem">
              <el-input placeholder="请输入" v-model="addForm.tags" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="目标网站" prop="url" class="dialogItem">
              <el-input placeholder="请输入" v-model="addForm.url" clearable>
              </el-input>
            </el-form-item>
            <el-form-item class="operateBtn">
              <el-button type="primary" @click="toAddAppAccount">保存</el-button>
              <el-button type="info" @click="innerVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog title="批量新建任务" :visible.sync="innerVisible2" width="28%">
          <!--弹出的对话框的内容-->
          <el-form ref="form" :model="addForm2" label-width="110px">
            <el-form-item label="标签" class="dialogItem">
              <el-input placeholder="请输入" v-model="addForm2.tags" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="上传测试用例" prop="fileValidate" style="position: relative;">
              <el-upload action="#" name="file" ref="upload" :limit="1" :show-file-list="true" accept=".txt, .yaml"
                :auto-upload="false" class="upload-file" :file-list="addForm2.multipartFile || []"
                :on-change="fileChange" :on-exceed="handleExceed" :on-remove="fileRemove">
                <div class="upload-file-text">点击上传文件（txt，yaml格式）</div>

              </el-upload>
            </el-form-item>
            <el-form-item class="operateBtn">
              <el-button type="primary" @click="toAddMoreppAccount">保存</el-button>
              <el-button type="info" @click="innerVisible2 = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/query-form-style.css";
import "@/assets/css/breadcrumb-tabs-style.css"
export default {
  name: "PatrolTask",
  data() {
    return {
      statusList: [{ label: "待启动", value: 0 }, { label: '进行中', value: 1 }, { label: "已结束", value: 2 }],
      addForm2: {
        tags: "",
        multipartFile: [],
        fileValidate: null,
        file: null
      },
      addForm: {
        tags: "",
        url: ""
      },
      taskForm: {
        url: "",
        tags: "",
        taskId: "",
        taskName: "",
        taskTag: "",
        apkCnt: "",
        sTime: "",
        eTime: "",
        createUser: "",
        taskType: "全部",
        nodeType: "2",
        priority: "全部",
        status: ""
      },
      innerVisible: false,
      innerVisible2: false,
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
    async multExport(){
      // if (this.ids.length == 0) {
      //   this.$message("请选择需要导出的任务");
      //   return;
      // }
      const formData = new FormData()
      formData.append("ids",this.ids)
      formData.append("tags",this.taskForm.tags)
      formData.append("status",this.taskForm.status)
      formData.append("apkCnt",this.taskForm.apkCnt)
      formData.append("startDate",this.taskForm.sTime)
      formData.append("endDate",this.taskForm.eTime)
      // const { data: res } = await this.$http.post("/apkSeekerTask/export?ids=" + this.ids,formData);
      const { data: res } = await this.$http({
        method: 'POST',
        url: "/apkSeekerTask/export",
        responseType: 'arraybuffer',
        data:formData
      })
      if (res) {
        // this.tasklist(); //重新请求任务列表
        let blob = res
        let title = '巡查任务导出结果.xlsx'
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
        this.$message({
          message: "导出成功",
          type: "success",
        });
      } else {
        this.$message(res.message);
      }
    },
    //上传文件
    uploadFile(param) {
      console.log("param", param);
      //把上传的文件赋值给data属性的file
      this.addForm2.multipartFile = param.file;
      this.addForm2.fileName = param.file;
      this.toAddMoreppAccount()
    },
    //文件已上传则关闭校验
    fileChange(uploadFile, fileList) {
      this.addForm2.multipartFile = uploadFile
    },
    //文件移除重新校验
    fileRemove(uploadFile, fileList) {
      this.addForm2.multipartFile = fileList
      this.addForm2.file = fileList.length === 0 ? null : fileList[0];
    },
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    async toAddMoreppAccount() {
      console.log(this.addForm2.multipartFile);
      if (this.addForm2.multipartFile.length == 0) {
        this.$message({
          message: "请上传文件！",
          type: "error",
        });
        return false;
      }
      this.$refs.upload.submit()
      const formData = new FormData()
      formData.append('tags', this.addForm2.tags)
      formData.append('multipartFile', this.addForm2.multipartFile.raw)
      const { data: res } = await this.$http.post("/apkSeekerTask/batchCreate", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.code == 200) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.innerVisible2 = false
        this.tasklist();
      } else {
        this.$message(res.message);
        this.addForm2.multipartFile = []
      }
    },
    async toAddAppAccount() {

      if (this.addForm.url.length == 0) {
        this.$message({
          message: "目标网站为必填项！",
          type: "error",
        });
        return false;
      }
      let reqData = {
        tags: this.addForm.tags,
        url: this.addForm.url
      }
      console.log(typeof (reqData.tags));
      const { data: res } = await this.$http.post("/apkSeekerTask/singleSave", null, { params: reqData });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.innerVisible = false
        this.tasklist();
      } else {
        this.$message(res.message);
      }
    },
    goResult(row) {
      console.log(row);
      // var arr = [];
      // if (id) {
      //   arr = [id];
      // } else {
      //   var data = this.$refs.taskTable.selection;
      //   data.forEach(function (item) {
      //     arr.push(item.id);
      //   });
      // }
      // console.log(arr);
      let path = '/task_management/fxxqResult';
      // let path = '/task_management/result_query';
      // if (nodeType == 2) {
      //   path = '/task_management/app_result_query';
      // }
      sessionStorage.setItem("id", JSON.stringify(row.id));
      sessionStorage.setItem("url", JSON.stringify(row.url))
      this.$router.push({
        path: path,
        // query: {
        //   id: id,
        //   from: 'taskName' //页面来源于点击任务名称
        // },
        query: {
          // ids: arr.join(","),
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      });
    },

    // 列表初始
    async tasklist() {
      const { data: res } = await this.$http.get(
        "/apkSeekerTask/list",
        {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            url: this.taskForm.url,
            tags: this.taskForm.tags,
            status: this.taskForm.status,
            apkCnt: this.taskForm.apkCnt,
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
      this.tasklist();
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
      this.taskForm.url = "";
      this.taskForm.tags = "";
      this.taskForm.status = "";
      this.taskForm.apkCnt = "";
      this.taskForm.eTime = "";
      this.taskForm.sTime = ""
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
      this.innerVisible = true;
    },
    toCreateMoreTask() {
      this.innerVisible2 = true;
    },
    //下发
    async startTask(id) {
      const { data: res } = await this.$http.post(
        "/apkSeekerTask/start?ids=" + id
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "启动成功",
          type: "success",
        });
      } else {
        this.$message(res.message);
      }
    },

    //批量下发
    async startTaskByList() {
      console.log(this.ids);
      if (this.ids.length == 0) {
        this.$message("请选择需要启动的任务");
        return;
      }
      const { data: res } = await this.$http.post(
        "/apkSeekerTask/start?ids=" + this.ids
      );
      if (res.code == 200) {
        this.tasklist(); //重新请求任务列表
        this.$message({
          message: "启动成功",
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
            "/apkSeekerTask/stopTask?ids=" + id
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
            "/apkSeekerTask/delete?id=" + id
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
            "/apkSeekerTask/batchDel?ids=" + this.ids
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
            "/apkSeekerTask/stopTask?ids=" + this.ids
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
.upload-file-text {
  border: #dcdfe6 1px solid;
  height: 38px;
  color: #c0c4cc;
  padding: 0 20px;
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

:deep(.dialogItem) {
  .el-form-item__label {
    text-align: center;
  }

  .el-input__inner {
    width: inherit;
  }
}

:deep(.typeItem) {
  .el-form-item__content {
    padding: 0 15px;
  }

  .el-form-item__label {
    border-right: 1px solid #dcdfe6;
  }
}

:deep(.operateBtn) {
  margin: 0;
  text-align: right;
}

:deep(.operateBtn > .el-form-item__content) {
  margin: 0 !important;
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