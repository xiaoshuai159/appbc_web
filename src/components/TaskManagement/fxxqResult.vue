<template>
    <div id="result-query" class="el-main grid-content">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>巡查任务</el-breadcrumb-item>
        <el-breadcrumb-item breadcrumb-item>任务详情</el-breadcrumb-item>
      </el-breadcrumb>
      
      <!-- 返回上一级 -->
      <div class="go-back" @click="goBackTask">
        <span>返回上一级</span>
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="shadow-div">
        任务详情：<span style="color:#1675d5">{{ this.url }}</span>
      </div>
      <div class="custom-modal" v-if="showModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="modalImageUrl" style="max-width: 100%; max-height: 100%;" />
        </div>
      </div>
      <div style="float: right; width: calc(100% - 70px)">
        <!-- <div style="display: flex;justify-content: flex-end;width: 100%;margin-bottom: 20px;">
          <el-button style="width: 140px;background-color: #F39300;">
            <i class="el-icon-document-copy"></i>
            <span style="margin-left: 8px;">导出查询结果</span>
          </el-button>
        </div> -->
        <!-- 表格 -->
        <el-button type="primary" @click="startTaskByList" style="width: 100px;margin-bottom:20px;">批量分析</el-button>
        <div class="block_base base_table" style="width:calc(100% - 40px)">
          <el-table element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
          element-loading-background="#f5f7f9" tooltip-effect="dark" :data="tableData" ref="taskTable"
          :row-style="{ height: '60px' }" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="25" fixed="left"> </el-table-column>
          <el-table-column prop="appName" label="APP名称" :show-overflow-tooltip="true" min-width="130">
          </el-table-column>
          <el-table-column prop="pkgName" label="APP包名" :show-overflow-tooltip="true" min-width="150">
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
      
          <el-table-column prop="issuer" label="开发者" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column prop="source" label="来源" :show-overflow-tooltip="true" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="220" fixed="right">
            <template slot-scope="scope">
              <el-button class="operator-table-btn green" style="border-right: 2px solid #cecece;padding-right:10px" type="warning" size="mini" @click="startTask(scope.row.id)">分析</el-button>
              <el-button class="operator-table-btn blue" type="primary" size="mini" 
                >详情</el-button>
                <!-- @click="xqClick(scope.row.id)" -->
            </template>
          </el-table-column>
        </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="resultTotal" style="float: right;margin-top: 16px">
          </el-pagination>
        </div>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div>消息</div>   
      </el-dialog>
    </div>
  </template>
  <script>
  import "@/assets/css/query-form-style.css";
  import "@/assets/css/breadcrumb-tabs-style.css"
  // import AppAbnormalPicture from "./AppAbnormalPicture.vue"
  export default {
    name: "fxxqResult",
    // components: {
    //   AppAbnormalPicture,
    // },
    data() {
      return {
        dialogVisible:false,
        showModal: false,
        modalImageUrl: '',
        resultForm: {
          udid: "",
          url: "",
          isSucFlag: null,
          startTime: "",
          endTime: "",
        },
        tableData: [],
        // 表格加载动画
        clientTableDataLoading: false,
        // 异常图片显示
        abnormalDialogVisible: false,
        clientIds: "",    //任务ID
        taskName: "",    //任务名称
        currentPage: 1, //当前页码
        pageSize: 10, //每页最大条数
        resultTotal: 0,   //实际数据总条数
        img: "",
        id:"",
        url:"",
        ids:""
      };
    },
  
    created() {
      this.currentPage = 1;
      this.id = JSON.parse(sessionStorage.getItem("id"));
      this.url = JSON.parse(sessionStorage.getItem("url"));
      console.log(this.id);
      console.log(this.url);
      // this.clientIds = parseInt(this.$route.query.id);
      // this.taskName = this.$route.query.taskName;
      this.resultList(); //首次查询
    },
    mounted() {
      window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
      window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },
  
    methods: {
      xqClick(id){
        this.dialogVisible = true
        console.log(id);
      },
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
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = 'auto';
    },
      //返回上一级
      goBackTask() {
        this.$router.push({
          path: "/task_management/patrol_task",
          query: {
            from: "resultTable", //返回参数
            page: this.$route.query.page,
            pageSize: this.$route.query.pageSize,
          },
        });
      },
      // 列表初始
      async resultList() {
        console.log(this.id);
        const { data: res } = await this.$http.get(
          "/apk/searchByTask",
          {
            params: {
              page: this.currentPage,
              pageSize: this.pageSize,
              tid:this.id
            },
          }
        );
        // console.log(res);
        if (res.code == 0) {
          //this.tableData = res.dataList;
          this.resultTotal = res.totalSum; //总条数
  
          let tempData = res.dataList;
          let startNum = (this.currentPage - 1) * this.pageSize + 1;
          this.tableData = tempData.map((item, index) => {
            item.num = index + startNum;
            return item;
          });
         
        }
      },
      //刷新
      async refresh() {
        this.resultList();
      },
      //监听回车键
      handleSearch(e) {
        if (e.keyCode == 13) {
          this.searchResult();
        }
      },
      //根据条件筛选结果
      async searchResult() {
        this.currentPage = 1;
        this.resultList();
      },
      //清空
      resetForm() {
        this.resultForm.endTime = "";
        this.resultForm.url = "";
        this.resultForm.startTime = "";
        this.resultForm.udid = "";
        this.resultForm.isSucFlag = null;
      },
      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.resultList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.resultList();
      },
      showImage(url) {
        console.log(url);
        
        this.modalImageUrl = url;
        this.showModal = true;
        document.body.style.overflow = 'hidden';
        
      },
      //结果正常异常
      abnormal(index, row) {
        console.log(row);
        this.$http({
            url:'/result/getPic',
            method:'get',
            responseType: 'blob',	
            params:{id:row.id,taskId:row.taskId}
          }).then(res=>{
            let url = window.URL.createObjectURL(res.data);
            // this.img = url
            this.showImage(url)
          })
        // this.abnormalDialogVisible = true
        // console.log(index, row)
        // if (row.picPath == "") {
        //   this.img = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F040221103339%2F210402103339-7-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672476153&t=6682243d7c6ad1946dc4cda5279af6bd";
        // } else {
        //   this.img = row.picPath;
        // }
      },
      //导出
      async exportResult() {
        const { data: res } = await this.$http.get(
          "/result/exportResult",
          {
            params: {
              taskIds: this.id,
              endTime: this.resultForm.endTime,
              isSucFlag: this.resultForm.isSucFlag,
              startTime: this.resultForm.startTime,
              udid: this.resultForm.udid,
              url: this.resultForm.url,
            },
            responseType: 'blob', //设置请求的类型为blob文件流形式
          },
        );
        console.log(res);
        //方式一
        const link = document.createElement('a');
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        link.style.display = 'none';
        //设置链接
        link.href = URL.createObjectURL(blob); //将文件流转成blob地址
        link.download = "拨测结果"; //文件名
        document.body.appendChild(link);
        link.click();
        
        //方式二
        // let binaryData = [];
        // binaryData.push(res);
        // var _url = window.URL.createObjectURL(new Blob(binaryData, { type: "application/vnd.ms-excel" }))
        // window.open(_url, "_blank").focus();
      },
      //表格自适应宽度
      flexWidth(prop, tableData, title, num = 0) {
        if (tableData.length === 0) {//表格没数据不做处理
          return;
        }
        let flexWidth = 0;//初始化表格列宽
        let columnContent = '';//占位最宽的内容
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font = "14px Microsoft YaHei";
        if ((prop === '') && title) {//标题长内容少的，取标题的值,
          columnContent = title
        } else {// 获取该列中占位最宽的内容
          let index = 0;
          for (let i = 0; i < tableData.length; i++) {
            const now_temp = tableData[i][prop] + '';
            const max_temp = tableData[index][prop] + '';
            const now_temp_w = context.measureText(now_temp).width
            const max_temp_w = context.measureText(max_temp).width
            if (now_temp_w > max_temp_w) {
              index = i;
            }
          }
          columnContent = tableData[index][prop]
          //比较占位最宽的值跟标题、标题为空的留出四个位置
          const column_w = context.measureText(columnContent).width
          const title_w = context.measureText(title).width
          if (column_w < title_w) {
            columnContent = title || '留四个字'
          }
        }
        // 计算最宽内容的列宽
        let width = context.measureText(columnContent);
        flexWidth = width.width + 40 + num
        return flexWidth + 'px';
      },
    }
  };
  </script>
  <style lang="less" scoped>


  .custom-modal {
    display: block;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .modal-content {
    margin: 0 auto;
    height: 100%;
    position: relative;
  }
  .modal-content img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  // .close:hover,
  // .close:focus {
  //   color: black;
  // }
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
    // border-bottom: 1px solid #DEE2E6;
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
    overflow-y: auto;
    color: #333333;
    padding: 20px;
  
  }
  
  :deep(.el-form--inline .el-form-item) {
    display: inline-block;
    margin-right: 1px;
    vertical-align: top;
    margin-right: 20px;
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

  .table-operator {
    font-family: Microsoft YaHei;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
    margin-right: 12px;
  }
  
  .go-back {
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
  
  .shadow-div {
    box-shadow: 0 0 8px #cecece;
    padding: 20px;
    margin-bottom: 20px;
    float: right;
    width: calc(100% - 110px);
    background-color: #fff;
    position: relative;
  }
  </style>
  