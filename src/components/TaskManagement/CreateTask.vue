<template>
  <div id="create-task" class="el-main grid-content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">客户端管理</el-breadcrumb-item> -->
      <el-breadcrumb-item>测试任务</el-breadcrumb-item>
      <el-breadcrumb-item breadcrumb-item>任务创建</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="task-go-back" @click="goBackTask">
      <span>返回上一级</span>
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="create-task-form">
      <div class="create-task-form-header">任务创建</div>
      <div class="create-task-form-info">
        <el-form ref="createTaskForm" :inline="true" :rules="createTaskRules" :model="createTaskForm"
          :disabled="formIsDisabled" class="demo-form-inline">
          <el-form-item label="通知配置" style="width: 100%" prop="isNotice">
            <el-checkbox v-model="createTaskForm.isNotice">完成后安信告知</el-checkbox>
          </el-form-item>
          <el-form-item label="任务优先级" prop="priority" style="width: 100%">
            <el-select v-model.number="createTaskForm.priority" placeholder="高/中/低">
              <el-option label="高" value="高"></el-option>
              <el-option label="中" value="中"></el-option>
              <el-option label="低" value="低"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拨测类型" prop="businessType" style="width: 100%">
            <el-radio-group v-model="createTaskForm.businessType">
              <el-radio label="APP">APP拨测</el-radio>
              <el-radio label="URL">URL拨测</el-radio>
              <!-- <el-radio label="IP_PORT">IP+PORT</el-radio>
              <el-radio label="DNS">DNS拨测</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任务名称" prop="taskName" style="width: 100%">
            <el-input placeholder="请输入任务名称" v-model="createTaskForm.taskName" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="任务归属" prop="scope" style="width: 100%">
            <el-checkbox-group v-model="createTaskForm.scope" style="width: 28%">
              <!-- <el-checkbox label="1" :disabled="pcScope">固网</el-checkbox> -->
              <el-checkbox label="2" :disabled="appScope">移动端</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="网络类型" prop="netType" style="width: 100%" v-show="createTaskForm.scope.includes('1')">
            <el-select v-model="createTaskForm.netType">
              <el-option label="境内" value="境内"></el-option>
              <el-option label="境外" value="境外"></el-option>
            </el-select>
          </el-form-item>
          <!--app列表+模糊匹配-->
          <el-form-item label="拨测APP" prop="probeApp" style="width: 100%" v-if="createTaskForm.businessType === 'APP'">
            <el-checkbox class="quanxuan" v-model="checkAll" :indeterminate="isIndeterminateModel"
              @change="handleCheckAllAppChange">全选&nbsp;&nbsp;&nbsp;
            </el-checkbox>
            <el-select @change="handleCheckedmodelChange" v-model="createTaskForm.probeApp" filterable
              :reserve-keyword="true" multiple placeholder="请选择" v-if="selectApp">
              <el-option v-for="item in appList" :key="item.id" :label="`${item.appName}_v${item.appVer}`"
                :value="item.appName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拨测目标" prop="taskContent" style="width: 89%" v-else>
            <el-input placeholder="请输入拨测目标" v-model="createTaskForm.taskContent" clearable @clear="clearTaskContent"
              ref="taskContentInput">
            </el-input>
            <el-upload :action="uploadURL" name="file" ref="myUpload" :limit="1" :on-change="handleChangeUpload"
              :show-file-list="false" :on-exceed="handleExceed" :auto-upload="false" class="upload-file">
              <i class="el-icon-folder-add"></i>
              <el-tooltip placement="top" effect="light">
                <div slot="content">
                  {{ uploadTextTitle }}<br />{{ uploadTextType }}<br />{{ uploadTextType }}<br />{{ uploadTextType }}</div>
                <div class="upload-file-text">上传文件</div>
              </el-tooltip>
            </el-upload>
          </el-form-item>
          <el-form-item label="开始时间" prop="taskStartTime" style="width: 100%">
            <el-date-picker v-model="createTaskForm.taskStartTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss" placement="bottom-start" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="任务标签" prop="taskTags" style="width: 100%">
            <el-input placeholder="请输入任务标签" v-model="createTaskForm.taskTags" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="监测次数" prop="plannedTestCount" style="margin-right: 30px">
            <el-input placeholder="请输入整数" v-model.number="createTaskForm.plannedTestCount" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="监测频率（分钟）" prop="testInternal">
            <el-input placeholder="请输入整数" v-model.number="createTaskForm.testInternal" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="拨测节点" style="width: auto" prop="testClients">
            <div style="float: left; margin-bottom: 8px">
              <el-select v-model="createTaskForm.testType" placeholder="请选择节点类型" class="node-select">
                <!-- <el-option label="固网" value="pc"></el-option> -->
                <el-option label="移动端" value="app"></el-option>
              </el-select>
              <el-select v-model="createTaskForm.city" placeholder="请选择城市" class="node-select">
                <el-option v-for="item in cityData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="createTaskForm.operator" placeholder="请选择运营商" class="node-select">
                <el-option v-for="item in operatorData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
              <el-select v-model="createTaskForm.ipAddr" placeholder="请选择IP" class="node-select">
                <el-option v-for="item in ipAddrData" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div class="node-query" style="float: left">
              <el-checkbox v-model="createTaskForm.allSelected" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange" style="width: auto">全选</el-checkbox>
              <el-button type="primary" @click="resetNode">清空</el-button>
              <el-button type="info" @click="queryNode">确定</el-button>
            </div>
          </el-form-item>
          <el-form-item style="width: 100%">
            <div class="node-data">
              <el-checkbox-group v-model="createTaskForm.testClients" @change="handleCheckedNodeChange">
                <el-checkbox name="testClients" v-for="item in testNodeData" :label="item.note" :key="item.id" border>
                  {{ item.note }}
                  <span v-if="item.type === 'APP'" class="appNodeClass nodeClass">app</span>
                  <span v-else-if="item.type === 'PC'" class="pcNodeClass nodeClass">pc</span>
                  <!-- <span v-else-if="testNodeData.length === allNode.length && item.type === 'PC'" class="pcNodeClass nodeClass">PC</span> -->
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-task-form-button">
        <el-button type="primary" style="margin-right: 12px"
          @click="submitCreateTaskForm('createTaskForm')">保存</el-button>
        <el-button type="info" @click="resetCreateTaskForm('createTaskForm')">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
import {
  getTaskNode,
  getAppTaskNode,
  createTask,
  getTaskDetailByID,
  getAppTaskContentByID,
  getTaskContentByID
} from "@/api/task-management";
import { readFile } from "@/utils/readFile";
import { defaultURL } from "@/utils/request";
import xlsx from "xlsx";
import { localeData } from 'moment';
import { arrayFilter, arrayDifferece } from "@/utils/tool.js"


export default {
  name: "CreateTask",
  data() {
    var validatePlannedTestCount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入监测次数"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 1) {
            callback(new Error("监测次数必须大于等于1"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateTestInternal = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入监测频率"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 1) {
            callback(new Error("监测频率必须大于等于1"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateTaskContent = (rule, value, callback) => {
      console.log('createTaskForm.businessType---', this.createTaskForm.businessType);
      let errorTips = ""
      if (value === "") {
        if (this.createTaskForm.businessType === "URL") {
          errorTips = "支持.xlsx类型文件, 无表头, 一列多行, 每行数据格式如'https://www.baidu.com/'"
        }
        // else if (this.createTaskForm.businessType === "DNS") {
        //   errorTips = "支持.xlsx类型文件, 无表头, 一列多行, 每行数据格式如'www.baidu.com'"
        // } else if (this.createTaskForm.businessType === "IP_PORT") {
        //   errorTips = "支持.xlsx类型文件, 无表头, 一列多行, 每行数据格式如'127.0.0.1:8000'"
        // }
        return callback(new Error(errorTips))
      }
    }
    return {
      uploadTextTitle: "上传文件支持.xlsx类型, 无表头, 一列多行,每行数据格式如下: ",
      uploadTextType: "",
      pcScope: false,
      appScope: false,
      formIsDisabled: false,
      appTaskContent: [],
      pcTaskContent: [],
      copyTaskClients: '',
      createTaskForm: {
        isNotice: false,
        priority: "中",
        businessType: "URL",
        taskName: "",
        scope: [],
        taskContent: "", //拨测url
        probeApp: [], //拨测app
        // probeApp: "", 
        // testTarget: "",
        // testApp: "",
        taskStartTime: "",
        taskTags: "",
        plannedTestCount: "",
        testInternal: "",
        testType: "app", // 固网还是移动端
        city: "",
        operator: "",
        ipAddr: "",
        allSelected: false,
        testClients: [],
        netType: "",
      },
      uploadTitle: "",
      selectApp: true, //全选app
      checkAll: false, //全选app
      isIndeterminateModel: false, //全选app
      appList: [], //所有app列表
      isIndeterminate: false,
      testNodeData: [],
      checkNodeList: [],
      checkNodeOnce: [],
      cityData: [], // 下拉菜单中的数据
      operatorData: [],
      ipAddrData: [],
      createTaskRules: {
        priority: [
          { required: true, message: "请选择任务优先级", trigger: "change" },
        ],
        businessType: [
          { required: true, message: "请选择拨测类型", trigger: "change" },
        ],
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
        scope: [
          { type: "array", required: true, message: "请至少选择一个任务归属", trigger: "change" },
        ],
        probeApp: [
          { required: true, message: "请选择拨测APP", trigger: "blur" },
        ],
        taskContent: [
          // { required: true, validator: validateTaskContent, trigger: "blur" },
          { required: true, message: "请输入拨测目标", trigger: "change" },
        ],
        taskTags: [
          { required: true, message: "请输入任务标签", trigger: "blur" },
        ],
        taskStartTime: [
          { type: "string", required: true, message: "请选择日期", trigger: "change" },
        ],
        plannedTestCount: [
          { required: true, validator: validatePlannedTestCount, trigger: "blur" },
        ],
        testInternal: [
          { required: true, validator: validateTestInternal, trigger: "blur" },
        ],
      },
      allNode: [],
      fileList: [],
      uploadURL: "/taskService/api/task/create",
      // uploadURL: defaultURL + '/taskService/api/task/create',
      clientPageParams: {
        page: 1,
        pageSize: 10000
      },
    };
  },
  watch: {
    "createTaskForm.city": {
      handler(newVal) {
        this.queryNode()
      }
    },
    "createTaskForm.operator": {
      handler(newVal) {
        this.queryNode()
      }
    },
    "createTaskForm.ipAddr": {
      handler(newVal) {
        this.queryNode()
      }
    },
    "createTaskForm.businessType": {
      handler(newVal) {
        if (newVal === "URL") {
          this.uploadTextType = "https://www.baidu.com/"
          // this.createTaskForm.scope = ['1', '2']
          this.createTaskForm.scope = ['2']
          this.pcScope = false
          this.appScope = false
        } else if (newVal === "APP") {
          this.createTaskForm.scope = ['2']
          this.pcScope = true
          this.appScope = false
        }
        // else if(newVal === "IP_PORT"){
        //   this.uploadTextType = "127.0.0.1:8000"
        //   this.createTaskForm.scope = ['1']
        //   this.appScope = true
        //   this.pcScope = false
        // }else if(newVal === "DNS"){
        //   this.uploadTextType = "www.baidu.com"
        //   this.createTaskForm.scope = ['1']
        //   this.appScope = true
        //   this.pcScope = false
        // }
      },
      immediate: true
    },
    "createTaskForm.testType": {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          // this.createTaskForm.allSelected = false
          // console.log('createTaskForm.testType', newVal, oldVal);
        }
      },
    },
    allNode: {
      handler(newVal) {
        if (newVal.length !== 0) {
          if (this.$route.query.id && this.$route.query.from) {
            this.getTaskInfoByID(parseInt(this.$route.query.id), this.$route.query.from)
            // 查询移动端 拨测目标 的具体内容
            this.getAppTaskContent(parseInt(this.$route.query.id))
            // 查询固网 拨测目标 的具体内容
            // this.getPCTaskContent(parseInt(this.$route.query.id))
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  mounted() {
    this.initNode()
  },
  created() {
    this.getAppList(); //加载app列表
  },
  methods: {
    // 获取APP 拨测目标内容
    getAppTaskContent(appId) {
      getAppTaskContentByID({ taskId: appId, page: 1, pageSize: 30 }).then(res => {
        // console.log(this.appTaskContent);
        // console.log(res);
        for (let a of res.data.dataList) {
          this.appTaskContent.push(a.monitorObject)
        }
        console.log(this.appTaskContent);
      })
    },
    // 获取PC 拨测目标内容
    getPCTaskContent(pcId) {
      getTaskContentByID({ taskId: pcId }).then(res => {
        for (let p of res.data) {
          this.pcTaskContent.push(p.content)
        }
      })
    },
    // 根据任务ID获取任务详情
    getTaskInfoByID(taskId, taskFrom) {
      getTaskDetailByID({ id: taskId }).then(res => {
        if (taskFrom === "taskName") {
          this.formIsDisabled = true
        }
        setTimeout(() => {
          this.taskNameHandle(res.data.dataList[0])
        }, 500);
      })
    },
    // 任务名称、复制 功能
    taskNameHandle(taskInfo) {
      console.log('==taskInfo===', taskInfo);
      taskInfo.isNotice === 1 ? this.createTaskForm.isNotice = true : this.createTaskForm.isNotice = false
      if (taskInfo.priority === 1) {
        this.createTaskForm.priority = "高"
      } else if (taskInfo.priority === 2) {
        this.createTaskForm.priority = "中"
      } else if (taskInfo.priority === 3) {
        this.createTaskForm.priority = "低"
      }
      this.createTaskForm.businessType = taskInfo.businessType
      this.createTaskForm.taskName = taskInfo.taskName
      // if(taskInfo.nodeType === 1){
      //   this.createTaskForm.scope = ['1']
      // }else if(taskInfo.nodeType === 2){
      //   this.createTaskForm.scope = ['2']
      // }else if(taskInfo.nodeType === 3){
      //   this.createTaskForm.scope = ['1', '2']
      // }
      this.createTaskForm.scope = ['2']
      this.createTaskForm.netType = taskInfo.netType
      if (taskInfo.businessType === 'URL' && taskInfo.type === 'APP') {
        this.createTaskForm.taskContent = this.appTaskContent.join(',')
      } else if (taskInfo.businessType === 'APP' && taskInfo.type === 'APP') {
        this.createTaskForm.probeApp = this.appTaskContent
      } else {
        this.createTaskForm.taskContent = this.pcTaskContent.join(',')
      }
      this.createTaskForm.taskStartTime = taskInfo.taskStartTime
      this.createTaskForm.taskTags = taskInfo.taskTags
      this.createTaskForm.plannedTestCount = taskInfo.plannedTestCount
      this.createTaskForm.testInternal = taskInfo.testInternal
      let testClientsList = []
      if (taskInfo.testClients.indexOf(',') != -1) {
        testClientsList = taskInfo.testClients.split(',')
      } else {
        testClientsList[0] = taskInfo.testClients
      }
      console.log(testClientsList);  // ['58']
      let selectNode = []
      for (let i of testClientsList) {
        for (let j of this.allNode) {
          if (j.id === i) {
            selectNode.push(j)
          }
        }
      }
      // console.log(this.allNode);
      console.log(selectNode);
      for (let k of selectNode) {
        this.createTaskForm.testClients.push(k.note)
      }
      this.copyTaskClients = taskInfo.testClients
    },
    // 初始化 - 节点列表
    initNode() {
      let appDataParams = {
        province: this.createTaskForm.city,
        isp: this.createTaskForm.operator,
        udid: this.createTaskForm.ipAddr,
      };
      getAppTaskNode(appDataParams, this.clientPageParams).then((res) => {
        this.allNode = this.testNodeData = res.data.dataList;
        for (let i of this.testNodeData) {
          if (i.note) {
            let nodeList = i.note.split("_");
            if (nodeList[0]) {
              if (this.cityData.indexOf(nodeList[0]) === -1) {
                this.cityData.push(nodeList[0]);
              }
            }
            if (nodeList[1]) {
              if (this.operatorData.indexOf(nodeList[1]) === -1) {
                this.operatorData.push(nodeList[1]);
              }
            }
            if (nodeList[2]) {
              if (this.ipAddrData.indexOf(nodeList[2]) === -1) {
                this.ipAddrData.push(nodeList[2]);
              }
            }
          }
        }
      })
      // Promise.all([getTaskNode({}), getAppTaskNode(appDataParams,this.clientPageParams)]).then((results) => {
      //   console.log(results);
      //   this.testNodeData = [];
      //   this.testNodeData = results[0].data;
      //   if (results[1].dataList.length > 0) {
      //     for (let i of results[1].dataList) {
      //       this.testNodeData.push(i);
      //     }
      //   }
      //   // console.log('allNode=======', this.testNodeData);
      //   this.allNode = this.testNodeData;
      //   // 初始化 - 获取下拉菜单中的 城市 运营商 ip/udid
      //   for (let i of this.testNodeData) {
      //     if (i.note) {
      //       let nodeList = i.note.split("_");
      //       if (nodeList[0]) {
      //         if (this.cityData.indexOf(nodeList[0]) === -1) {
      //           this.cityData.push(nodeList[0]);
      //         }
      //       }
      //       if (nodeList[1]) {
      //         if (this.operatorData.indexOf(nodeList[1]) === -1) {
      //           this.operatorData.push(nodeList[1]);
      //         }
      //       }
      //       if (nodeList[2]) {
      //         if (this.ipAddrData.indexOf(nodeList[2]) === -1) {
      //           this.ipAddrData.push(nodeList[2]);
      //         }
      //       }
      //     }
      //   }
      // });
    },
    // 查询节点列表
    queryNode() {
      // 半选开启，只要不为全部数组长度
      this.isIndeterminate =
        this.checkNodeList.length > 0 && this.checkNodeList.length < this.allNode.length;
      // 查询input全为空时，显示已选中节点
      if (this.createTaskForm.city === '' &&
        this.createTaskForm.operator === '' &&
        this.createTaskForm.ipAddr === '' &&
        this.createTaskForm.testType === '') {
        // console.log('清空查询-----', this.checkNodeList);
        this.createTaskForm.testClients = this.checkNodeList
        // console.log('909090---复制后', this.createTaskForm.testClients);
      }
      this.createTaskForm.allSelected = false
      // this.testNodeData = [];
      let pcQueryParams = {
        city: this.createTaskForm.city,
        isp: this.createTaskForm.operator,
        ip: this.createTaskForm.ipAddr,
      };
      let appDataParams = {
        province: this.createTaskForm.city,
        isp: this.createTaskForm.operator,
        udid: this.createTaskForm.ipAddr,
      };
      getAppTaskNode(appDataParams, this.clientPageParams).then(({ data: res }) => {
        if (res.code === 0) {
          // this.testNodeData = [];
          console.log(res.dataList);
          this.testNodeData = res.dataList;
          // console.log('app===============', res.dataList);
        } else {
          console.log("app端节点请求失败信息: ", res);
        }
      })
      // if (this.createTaskForm.testType == "pc") {
      //   getTaskNode(pcQueryParams).then((res) => {
      //     if (res.code === 200) {
      //       // this.testNodeData = [];
      //       this.testNodeData = res.data;
      //       // console.log('pc===============', res.data);
      //     } else {
      //       console.log("pc端节点请求失败信息: ", res);
      //     }
      //   });
      // } 
      // else if (this.createTaskForm.testType == "app") {
      //   getAppTaskNode(appDataParams,this.clientPageParams).then((res) => {
      //     if (res.code === 0) {
      //       // this.testNodeData = [];
      //       this.testNodeData = res.dataList;
      //       // console.log('app===============', res.dataList);
      //     } else {
      //       console.log("app端节点请求失败信息: ", res);
      //     }
      //   });
      // } else {
      //   Promise.all([getTaskNode(pcQueryParams), getAppTaskNode(appDataParams,this.clientPageParams)]).then((results) => {
      //     // this.testNodeData = [];
      //     this.testNodeData = results[0].data;
      //     if (results[1].code === 0 && results[1].dataList.length > 0) {
      //       for (let i of results[1].dataList) {
      //         this.testNodeData.push(i);
      //       }
      //     } else {
      //       console.log("节点请求失败信息: ", results);
      //     }
      //   });
      // }

    },
    // 清空拨测节点 选择菜单
    resetNode() {
      this.createTaskForm.testType = "";
      this.createTaskForm.city = "";
      this.createTaskForm.operator = "";
      this.createTaskForm.ipAddr = "";
    },
    //加载app列表
    async getAppList() {
      const { data: res } = await this.$http.get(
        "/app/all",
        {
          params: {
            page: 1,
            pageSize: 100000, //默认传个极大值，即可返回所有的数据
          },
        }
      );
      if (res.code == 0) {
        this.appList = res.dataList;
      }
    },
    //全选所有APP
    handleCheckAllAppChange(val) {
      const all = this.appList.map((item) => {
        return item.appName; //向后台传app脚本文件名
      });
      this.createTaskForm.probeApp = val ? all : []; //app脚本名称列表
      console.log(this.createTaskForm.probeApp);
      this.isIndeterminateModel = false;
      this.selectApp = false; //下拉菜单的所有app被选中
      this.$nextTick().then(() => {
        this.selectApp = true;
      });
    },
    //app选择变化
    handleCheckedmodelChange(value) {
      // console.log("当前多选框全部选项：");
      // console.log(this.appList);

      // console.log("变化的值：");
      // console.log(value);
      console.log("当前多选框内值：");
      console.log(this.createTaskForm.probeApp);
      // console.log("option的value值：");
      // console.log(this.appList);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.appList.length;
      this.isIndeterminateModel =
        checkedCount > 0 && checkedCount < this.appList.length;
    },
    // 拨测节点 全选
    handleCheckAllChange(val) {
      let checkNode = this.testNodeData.map((item) => {
        return item.note;
      });
      if (val) {
        // console.log('全选');
        this.checkNodeList.push(...checkNode)
      } else {
        // console.log('没有全选');
        if (this.testNodeData.length === this.allNode.length) {
          this.checkNodeList = []
        } else {
          this.checkNodeList = arrayDifferece(this.checkNodeList, this.testNodeData)
        }
      }
      // checkNodeList 当前全选 选中的节点
      // this.checkNodeList = checkNode
      // console.log("---------------this.checkNodeList----", this.checkNodeList);
      // console.log('this.createTaskForm.testClients', this.createTaskForm.testClients);
      // console.log('this.testNodeData', this.testNodeData);
      // console.log('val', val, 'checkNode', checkNode);
      this.createTaskForm.testClients = val ? checkNode : [];
      this.isIndeterminate =
        checkNode.length > 0 && checkNode.length < this.testNodeData.length;
    },
    // 拨测节点列表 改变
    handleCheckedNodeChange(value) {
      this.checkNodeList = arrayDifferece(this.checkNodeList, this.testNodeData)
      // TODO 清空查询时，是否checkNodeList = testNodeData
      this.checkNodeList.push(...value)
      this.checkNodeList = arrayFilter(this.checkNodeList)
      let checkedCount = value.length;
      this.createTaskForm.allSelected =
        checkedCount === this.testNodeData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.testNodeData.length;
    },
    // 保存
    submitCreateTaskForm(formName) {
      console.log(this.$route.query.from);
      if (this.$route.query.from === "taskName") return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let isNoticeVal = 0;
          let scopeVal = 3;
          let priorityVal = 1;
          // 处理isNotice字段
          this.createTaskForm.isNotice === false ? isNoticeVal = 0 : isNoticeVal = 1
          // 处理priority字段
          if (this.createTaskForm.priority === "高") {
            priorityVal = 1;
          } else if (this.createTaskForm.priority === "中") {
            priorityVal = 2;
          } else {
            priorityVal = 3;
          }
          // 处理scope字段
          let scopeTemp = this.createTaskForm.scope.join("");
          if (scopeTemp == "12") {
            scopeVal = 3;
          } else {
            scopeVal = parseInt(scopeTemp);
          }
          // 处理testClients字段
          let testClientsVal = ''
          // if(this.$route.query.from === 'copyTask'){
          //   testClientsVal = this.copyTaskClients
          // }else{
          this.checkNodeList = arrayFilter(this.checkNodeList)
          let testClientsTemp = [];
          for (let i of this.allNode) {
            for (let j of this.checkNodeList) {
              if (i.note === j) {
                testClientsTemp.push(i.id);
              }
            }
          }
          testClientsVal = testClientsTemp.join(",");
          // }
          let createParams = {
            businessType: this.createTaskForm.businessType,
            plannedTestCount: this.createTaskForm.plannedTestCount,
            priority: priorityVal,
            nodeType: scopeVal,
            taskContent: this.createTaskForm.businessType === 'APP' ? this.createTaskForm.probeApp.join(",") : this.createTaskForm.taskContent,
            taskName: this.createTaskForm.taskName,
            taskStartTime: this.createTaskForm.taskStartTime,
            isNotice: isNoticeVal,
            netType: this.createTaskForm.netType,
            taskTags: this.createTaskForm.taskTags,
            testClients: testClientsVal,
            testInternal: this.createTaskForm.testInternal,
          };
          console.log("****createParams******", createParams);
          createTask(createParams)
            .then(({ data: res }) => {
              console.log("任务创建返回值:", res);
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: "任务创建成功!",
                });
                this.resetCreateTaskForm("createTaskForm");
                this.$router.push({
                  path: "/task_management/test_task",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "任务创建失败信息: " + res.message,
                });
              }
            })
            .catch((err) => {
              console.log("createTask失败:", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消
    resetCreateTaskForm(formName) {
      if (this.$route.query.from === "taskName") return
      this.$refs[formName].resetFields();
      // this.initNode();
      this.resetNode();
      this.isIndeterminate = false;
      this.createTaskForm.allSelected = false;
      // this.createTaskForm.isNotice = false;
      this.isIndeterminateModel = false; //全选app，默认不全选
      this.checkAll = false; //全选app模板
      // console.log(this.createTaskForm.probeApp);
      this.createTaskForm.probeApp = []
    },
    // 返回上一级
    goBackTask() {
      return this.$router.push("/task_management/test_task");
    },
    // 文件上传
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    // 清空文件上传：点击清空图标，文件个数置为0
    clearTaskContent() {
      if (this.$refs.taskContentInput.$attrs.placeholder == '请输入拨测目标') {
        this.$refs.myUpload.clearFiles();
      }
    },
    async handleChangeUpload(file) {
      let dataBinary = await readFile(file.raw);
      let workBook = xlsx.read(dataBinary, { type: "binary", cellDates: true });
      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(workSheet, { header: 1 });
      let tempContent = [];
      for (let itemData of data) {
        if (typeof itemData[0] != "undefined" && itemData[0].length !== 0) {
          tempContent.push(itemData[0]);
        }
      }
      if (this.createTaskForm.taskContent.length !== 0) {
        this.createTaskForm.taskContent += "," + tempContent.join(",");
      } else {
        this.createTaskForm.taskContent = tempContent.join(",");
      }
      this.$nextTick(() => {
        this.$refs.taskContentInput.focus();
      });
    },
    httpRequest(option) {
      this.fileList.push(option);
    },
  },
};
</script>
<style lang="less" scoped>
.nodeClass {
  font-size: 12px;
  padding: 2px 6px;
  margin: 0 8px;
  border-radius: 8px;
}

.pcNodeClass {
  border: 1px solid #ffa600;
  color: #ffa600;
}

.appNodeClass {
  border: 1px solid #39b3fe;
  color: #39b3fe;
}

:deep(.el-form-item__error) {
  position: relative !important;
}

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

.create-task-form {
  background: #ffffff;
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  float: right;
  width: calc(100% - 110px);
  // height: 940px;
  display: flex;
  flex-direction: column;

  .create-task-form-header {
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

  .create-task-form-info {
    flex: 1;
    padding: 20px;

    .node-data {
      height: 440px;
      padding: 10px 0px;
      overflow-y: scroll;
    }

    .node-query {
      display: inline-block;

      // position: absolute;
      // width: 252px;
      .el-button--info {
        margin-left: 24px;
        border: 1px solid #1675d5;
        color: #1675d5;
      }

      .el-button--primary {
        margin-left: 24px;
        border: 1px solid #d3d4dd;
        color: #606266;
        background: #ffffff;
      }
    }

    .node-select {
      width: 20%;
      margin-right: 30px;
    }

    .upload-file {
      display: inline-block;
      border: 1px solid #1675d5;
      padding: 0px 16px;
      position: absolute;
      width: 8%;
      margin-left: 30px;
      // right: -13%;
      border-radius: 4px;
      text-align: center;

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

  .create-task-form-button {
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
  width: 49%;
  // margin-right: 24px;
  margin-bottom: 0px;
}

:deep(.el-form--inline .el-form-item__content) {
  width: 100%;
}

.el-form--inline .el-form-item {
  margin-right: 0px;
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

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-button+.el-button,
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left: 0px;
}

.el-checkbox {
  width: 24%;
  margin-right: 6px;
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
  background: #ffffff;
  border-color: #d3d4dd;
}

:deep(.el-input__inner) {
  border-radius: 4px !important;
}

:deep(.el-input) {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100% !important;
}

.el-select>.el-input {
  display: block;
}

.quanxuan {
  display: block;
  width: 55px;
}
</style>
