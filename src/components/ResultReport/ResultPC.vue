<template>
  <div id="result-pc">
    <div class="result-pc-charts-top block_base" style="float: none">
      <div class="el-col-24">
        <!-- 实时数据展示 -->
        <div class="el-breadcrumb__inner result-pc-charts-pie-text">
          实时数据展示
          <span style="margin-left: 32px">
            <el-date-picker v-model="searchData.startDate" type="date" placeholder="选择日期" placement="bottom-start"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker></span>
          <span class="result-pc-charts-pie-date">--</span>
          <el-date-picker v-model="searchData.endDate" type="date" placeholder="选择日期" placement="bottom-start"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <!-- 饼状图 -->
        <div class="result-pc-charts-pie">
          <div class="pie-text">
            <div class="pie-text-top">{{ abnormalNumber }}</div>
            <div class="pie-text-bottom">异常总次数</div>
          </div>
          <div class="pie-data" id="result-pc-charts-pie">饼状图</div>
        </div>
      </div>
      <!-- 折线图 -->
      <div class="el-col-24">
        <div class="el-breadcrumb__inner result-pc-charts-line-text">
          拨测次数
        </div>
        <div class="result-pc-charts-line" id="result-pc-charts-line"></div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="result-pc-charts-bottom">
      <!-- 底线网站 -->
      <div class="result-pc-charts-bottom-left" style="display: flex; flex-direction: column; position: relative">
        <div style="flex: 1" class="check_all">
          <span @click="baselineBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
        </div>

        <div id="result-pc-charts-bar-baseline" style="flex: 9;max-height:200px;"></div>
      </div>
      <!-- 地域 -->
      <div class="result-pc-charts-bottom-left" style="display: flex; flex-direction: column; position: relative">
        <div style="flex: 1" class="check_all">
          <span @click="regionBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
        </div>

        <div id="result-pc-charts-bar-region" style="flex: 9;max-height:200px;"></div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="result-pc-charts-bottom">
      <!-- 重点网站 -->
      <div class="result-pc-charts-bottom-left" style="display: flex; flex-direction: column; position: relative">
        <div style="flex: 1" class="check_all">
          <span @click="keyBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
        </div>
        <div id="result-pc-charts-bar-key" style="flex: 9;max-height:200px;"></div>
      </div>
      <!-- 运营商 -->
      <div class="result-pc-charts-bottom-left" style="display: flex; flex-direction: column; position: relative">
        <div style="flex: 1" class="check_all">
          <span @click="operatorBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
        </div>

        <div id="result-pc-charts-bar-operator" style="flex: 9;max-height:200px;"></div>
      </div>
    </div>
    <!-- 底线网站 弹窗 -->
    <div>
      <el-dialog :visible.sync="baselineBarDialog" :before-close="baselineHandleClose">
        <div slot="title">
          <span>底线网站全部数据</span>
          <span class="allDataStyle">共 {{ baselineBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
        <!-- <CheckAllData
          barName="baseline"
          :startTime="searchData.startDate"
          :endTime="searchData.endDate"
          :barAllData="baselineBarAllData"
        ></CheckAllData> -->
      </el-dialog>
    </div>
    <!-- 地域 弹窗 -->
    <div>
      <el-dialog :visible.sync="regionBarDialog" :before-close="regionHandleClose">
        <div slot="title">
          <span>地域全部数据</span>
          <span class="allDataStyle">共 {{ regionBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
        <!-- <CheckAllData
          barName="region"
          :startTime="searchData.startDate"
          :endTime="searchData.endDate"
          :barAllData="regionBarAllData"
        ></CheckAllData> -->
      </el-dialog>
    </div>
    <!-- 重点网站 弹窗 -->
    <div>
      <el-dialog :visible.sync="keyBarDialog" :before-close="keyHandleClose">
        <div slot="title">
          <span>重点网站全部数据</span>
          <span class="allDataStyle">共 {{ keyBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
        <!-- <CheckAllData
          barName="key"
          :startTime="searchData.startDate"
          :endTime="searchData.endDate"
          :barAllData="keyBarAllData"
        ></CheckAllData> -->
      </el-dialog>
    </div>
    <!-- 运营商 弹窗 -->
    <div>
      <el-dialog :visible.sync="operatorBarDialog" :before-close="operatorHandleClose">
        <div slot="title">
          <span>运营商全部数据</span>
          <span class="allDataStyle">共 {{ operatorBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
        <!-- <CheckAllData
          barName="operator"
          :startTime="searchData.startDate"
          :endTime="searchData.endDate"
          :barAllData="operatorBarAllData"
        ></CheckAllData> -->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { pieOption, lineOption, barOption } from "@/assets/js/pc-options";
import { getNowTime } from "@/utils/getDate";
import {
  //getStatisticsAll,
  // getStatisticsTrend,
  //getStatisticsFloor,
  //getStatisticsCity,
  //getStatisticsKey,
  //getStatisticsISP,
} from "@/api/result-report";
import CheckAllData from "./CheckAllData.vue";

export default {
  name: "ResultPC",
  data() {
    return {
      searchData: {
        startDate: "",
        endDate: "",
      },
      abnormalNumber: 0, // 异常总数
      pieData: [], // 饼状图
      lineData: [], // 折线图
      baselineBarData: [],        // 底线网站
      regionBarData: [],          // 地域
      keyBarData: [],             // 重点网站
      operatorBarData: [],        // 运营商

      baselineBarTotalNum: 0,        // 底线网站总条数
      regionBarTotalNum: 0,          // 地域总条数
      keyBarTotalNum: 0,             // 重点网站总条数
      operatorBarTotalNum: 0,        // 运营商总条数

      baselineBarAllData: [],     // 底线网站 全部
      regionBarAllData: [],       // 地域 全部
      keyBarAllData: [],          // 重点网站  全部
      operatorBarAllData: [],     // 运营商  全部

      baselineBarDialog: false,   // 底线网站 查看全部
      regionBarDialog: false,     // 地域 查看全部
      keyBarDialog: false,        // 重点网站 查看全部
      operatorBarDialog: false,   // 运营商 查看全部
    };
  },
  components: {
    CheckAllData,
  },
  computed: {},
  watch: {
    searchData: {
      handler(newVal, oldVal) {
        let dateParams = {
          startDate: newVal.startDate,
          endDate: newVal.endDate,
        };
        //this.initPieChart(dateParams);
        //this.initLineChart(dateParams);
        //this.initBaselineBarData(dateParams);
        //this.initRegionBarData(dateParams);
        // this.initKeyBarData(dateParams);
        //this.initOperatorBarData(dateParams);
      },
      deep: true,
    },
  },
  mounted() {
    let nowTime = getNowTime();
    this.searchData.startDate = nowTime.beforeDate;
    this.searchData.endDate = nowTime.nowDate;
  },
  methods: {
    // 饼状图
    // initPieChart(pieParams) {
    //   let pieChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-pie")
    //   );
    //   pieChart.setOption(pieOption);
    //   getStatisticsAll(pieParams)
    //     .then((res) => {
    //       console.log("pie", res);
    //       if (res.code === 200 && res.data) {
    //         this.pieData = [];
    //         for (let i of res.data) {
    //           this.pieData.push(i);
    //           if (i.name === "结果异常总数") {
    //             this.abnormalNumber = i.value;
    //           }
    //         }
    //       } else {
    //         console.log("pie-chart请求失败信息: ", res);
    //       }
    //       pieChart.setOption({
    //         series: [
    //           {
    //             name: "Access From",
    //             data: this.pieData,
    //           },
    //           {
    //             name: "Access From",
    //             data: this.pieData,
    //           },
    //         ],
    //       });
    //     })
    //     .catch((err) => {
    //       console.log("getStatisticsAll请求错误:", err);
    //     });
    //   //随着屏幕大小调节图表
    //   window.addEventListener("resize", () => {
    //     pieChart.resize();
    //   });
    // },
    // 折线图
    // initLineChart(lineParams) {
    //   let lineChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-line")
    //   );
    //   lineChart.setOption(lineOption);
    //   getStatisticsTrend(lineParams)
    //     .then((res) => {
    //       console.log("line", res);
    //       if (res.code === 200 && res.data) {
    //         this.lineData = res.data;
    //         lineChart.setOption({
    //           xAxis: {
    //             data: this.lineData.value,
    //           },
    //           series: [
    //             {
    //               name: "异常总次数",
    //               data: this.lineData.abnormalTime,
    //             },
    //             {
    //               name: "正常总次数",
    //               data: this.lineData.normalTime,
    //             },
    //           ],
    //         });
    //       } else {
    //         console.log("line-chart请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("getStatisticsTrend请求错误:", err);
    //     });
    //   window.addEventListener("resize", () => {
    //     lineChart.resize();
    //   });
    // },
    // 底线网站
    // initBaselineBarData(baselinePrams) {
    //   let baselineBarChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-bar-baseline")
    //   );
    //   baselineBarChart.setOption(barOption);
    //   getStatisticsFloor(baselinePrams)
    //     .then((res) => {
    //       console.log("baseline", res);
    //       if (res.code === 200 && res.data) {
    //         this.baselineBarData = []
    //         this.baselineBarAllData = JSON.parse(JSON.stringify(res.data))
    //         this.baselineBarTotalNum = this.baselineBarAllData.value.length
    //         let baselineData = {};
    //         let formatterVal = {};
    //         if (this.baselineBarAllData.value.length > 5) {
    //           baselineData["value"] = this.baselineBarAllData.value.slice(-5);
    //           baselineData["abnormalTime"] = this.baselineBarAllData.abnormalTime.slice(-5);
    //           baselineData["normalTime"] = this.baselineBarAllData.normalTime.slice(-5);
    //           this.baselineBarData = baselineData;
    //           formatterVal = baselineData;
    //         } else {
    //           this.baselineBarData = this.baselineBarAllData;
    //           formatterVal = this.baselineBarAllData;
    //         }
    //         // this.baselineBarData = res.data;
    //         // let formatterVal = res.data;
    //         let abnormalTimeVal = [];
    //         let normalTimeVal = [];
    //         for (let i = 0; i < this.baselineBarData.abnormalTime.length; i++) {
    //           let totalNumber =
    //             this.baselineBarData.abnormalTime[i] +
    //             this.baselineBarData.normalTime[i];
    //           let abnormalPercent =
    //             this.baselineBarData.abnormalTime[i] / totalNumber;
    //           let normalPercent =
    //             this.baselineBarData.normalTime[i] / totalNumber;
    //           abnormalTimeVal.push(abnormalPercent.toFixed(2) * 100);
    //           normalTimeVal.push(normalPercent.toFixed(2) * 100);
    //         }
    //         baselineBarChart.setOption({
    //           title: {
    //             text: "底线网站",
    //           },
    //           tooltip: {
    //             formatter: function (params) {
    //               let list = [];
    //               let listItem = "";
    //               let item = 0;
    //               for (let i = 0; i < params.length; i++) {
    //                 for (let j = 0; j < formatterVal.value.length; j++) {
    //                   if (formatterVal.value[j] == params[i].axisValue) {
    //                     item = j;
    //                   }
    //                 }
    //                 if (params[i].seriesName === "正常总次数") {
    //                   list.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal.normalTime[item]
    //                   );
    //                 } else {
    //                   list.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal.abnormalTime[item]
    //                   );
    //                 }
    //               }
    //               listItem = list.join("<br>");
    //               listItem =
    //                 "<span>" + params[0].axisValue + "</span><br>" + listItem;
    //               return "<div>" + listItem + "</div>";
    //             },
    //           },
    //           yAxis: {
    //             data: this.baselineBarData.value,
    //           },
    //           series: [
    //             {
    //               name: "异常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal.abnormalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               barMaxWidth: 40,
    //               data: abnormalTimeVal,
    //               // data: this.baselineBarData.abnormalTime,
    //               // data: [10, 30, 30, 30, 40, 10, 30],
    //             },
    //             {
    //               name: "正常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal.normalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               data: normalTimeVal,
    //               // data: this.baselineBarData.normalTime,
    //               // data: [20, 10, 20, 20, 20, 30, 30],
    //             },
    //           ],
    //         });
    //       } else {
    //         console.log("baseline-bar-chart请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("baselinePrams请求错误:", err);
    //     });
    //   window.addEventListener("resize", () => {
    //     baselineBarChart.resize();
    //   });
    // },
    // 地域
    // initRegionBarData(regionParams) {
    //   let regionBarChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-bar-region")
    //   );
    //   regionBarChart.setOption(barOption);
    //   getStatisticsCity(regionParams)
    //     .then((res) => {
    //       console.log("region", res.data)
    //       if (res.code === 200 && res.data) {
    //         this.regionBarData = []
    //         this.regionBarAllData = JSON.parse(JSON.stringify(res.data))
    //         this.regionBarTotalNum = this.regionBarAllData.value.length
    //         let regionData = {};
    //         let formatterVal2 = {};
    //         if (this.regionBarAllData.value.length > 5) {
    //           regionData["value"] = this.regionBarAllData.value.slice(-5);
    //           regionData["abnormalTime"] = this.regionBarAllData.abnormalTime.slice(-5);
    //           regionData["normalTime"] = this.regionBarAllData.normalTime.slice(-5);
    //           this.regionBarData = regionData;
    //           formatterVal2 = regionData;
    //         } else {
    //           this.regionBarData = this.regionBarAllData;
    //           formatterVal2 = this.regionBarAllData;
    //         }
    //         // ------
    //         let abnormalTimeVal2 = [];
    //         let normalTimeVal2 = [];
    //         for (let i = 0; i < this.regionBarData.abnormalTime.length; i++) {
    //           let totalNumber2 =
    //             this.regionBarData.abnormalTime[i] +
    //             this.regionBarData.normalTime[i];
    //           let abnormalPercent2 =
    //             this.regionBarData.abnormalTime[i] / totalNumber2;
    //           let normalPercent2 =
    //             this.regionBarData.normalTime[i] / totalNumber2;
    //           abnormalTimeVal2.push(abnormalPercent2.toFixed(2) * 100);
    //           normalTimeVal2.push(normalPercent2.toFixed(2) * 100);
    //         }
    //         regionBarChart.setOption({
    //           title: {
    //             text: "地域",
    //           },
    //           tooltip: {
    //             formatter: function (params) {
    //               let list2 = [];
    //               let listItem2 = "";
    //               let item2 = 0;
    //               for (let i = 0; i < params.length; i++) {
    //                 for (let j = 0; j < formatterVal2.value.length; j++) {
    //                   if (formatterVal2.value[j] == params[i].axisValue) {
    //                     item2 = j;
    //                   }
    //                 }
    //                 if (params[i].seriesName === "正常总次数") {
    //                   list2.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal2.normalTime[item2]
    //                   );
    //                 } else {
    //                   list2.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal2.abnormalTime[item2]
    //                   );
    //                 }
    //               }
    //               listItem2 = list2.join("<br>");
    //               listItem2 =
    //                 "<span>" + params[0].axisValue + "</span><br>" + listItem2;
    //               return "<div>" + listItem2 + "</div>";
    //             },
    //           },
    //           yAxis: {
    //             data: this.regionBarData.value,
    //           },
    //           series: [
    //             {
    //               name: "异常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal2.abnormalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               data: abnormalTimeVal2,
    //             },
    //             {
    //               name: "正常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal2.normalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               data: normalTimeVal2,
    //             },
    //           ],
    //         });
    //       } else {
    //         console.log("region-bar-chart请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("getStatisticsCity请求错误:", err);
    //     });
    //   window.addEventListener("resize", () => {
    //     regionBarChart.resize();
    //   });
    // },
    // 重点网站
    // initKeyBarData(keyParams) {
    //   let keyBarChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-bar-key")
    //   );
    //   keyBarChart.setOption(barOption);
    //   getStatisticsKey(keyParams)
    //     .then((res) => {
    //       console.log("key", res);
    //       if (res.code === 200 && res.data) {
    //         this.keyBarData = []
    //         this.keyBarAllData = JSON.parse(JSON.stringify(res.data))
    //         this.keyBarTotalNum = this.keyBarAllData.value.length
    //         let keyData = {};
    //         let formatterVal3 = {};
    //         if (this.keyBarAllData.value.length > 5) {
    //           keyData["value"] = this.keyBarAllData.value.slice(-5);
    //           keyData["abnormalTime"] = this.keyBarAllData.abnormalTime.slice(-5);
    //           keyData["normalTime"] = this.keyBarAllData.normalTime.slice(-5);
    //           this.keyBarData = keyData;
    //           formatterVal3 = keyData;
    //         } else {
    //           this.keyBarData = this.keyBarAllData;
    //           formatterVal3 = this.keyBarAllData;
    //         }

    //         // this.keyBarData = res.data;
    //         // let formatterVal3 = res.data;
    //         let abnormalTimeVal3 = [];
    //         let normalTimeVal3 = [];
    //         for (let i = 0; i < this.keyBarData.abnormalTime.length; i++) {
    //           let totalNumber3 =
    //             this.keyBarData.abnormalTime[i] + this.keyBarData.normalTime[i];
    //           let abnormalPercent3 =
    //             this.keyBarData.abnormalTime[i] / totalNumber3;
    //           let normalPercent3 = this.keyBarData.normalTime[i] / totalNumber3;
    //           abnormalTimeVal3.push(abnormalPercent3.toFixed(2) * 100);
    //           normalTimeVal3.push(normalPercent3.toFixed(2) * 100);
    //         }
    //         keyBarChart.setOption({
    //           title: {
    //             text: "重点网站",
    //           },
    //           tooltip: {
    //             formatter: function (params) {
    //               let list3 = [];
    //               let listItem3 = "";
    //               let item3 = 0;
    //               for (let i = 0; i < params.length; i++) {
    //                 for (let j = 0; j < formatterVal3.value.length; j++) {
    //                   if (formatterVal3.value[j] == params[i].axisValue) {
    //                     item3 = j;
    //                   }
    //                 }
    //                 if (params[i].seriesName === "正常总次数") {
    //                   list3.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal3.normalTime[item3]
    //                   );
    //                 } else {
    //                   list3.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal3.abnormalTime[item3]
    //                   );
    //                 }
    //               }
    //               listItem3 = list3.join("<br>");
    //               listItem3 =
    //                 "<span>" + params[0].axisValue + "</span><br>" + listItem3;
    //               return "<div>" + listItem3 + "</div>";
    //             },
    //           },
    //           yAxis: {
    //             data: this.keyBarData.value,
    //           },
    //           series: [
    //             {
    //               name: "异常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal3.abnormalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               barMaxWidth: 20,
    //               data: abnormalTimeVal3,
    //               // data: this.keyBarData.abnormalTime,
    //               // data: [10, 30, 30, 30, 40, 10, 30],
    //             },
    //             {
    //               name: "正常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal3.normalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               data: normalTimeVal3,
    //               // data: this.keyBarData.normalTime,
    //               // data: [20, 10, 20, 20, 20, 30, 30],
    //             },
    //           ],
    //         });
    //       } else {
    //         console.log("key-bar-chart请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("getStatisticsKey请求错误:", err);
    //     });
    //   window.addEventListener("resize", () => {
    //     keyBarChart.resize();
    //   });
    // },
    // 运营商
    // initOperatorBarData(ispParams) {
    //   let operatorBarChart = this.$echarts.init(
    //     document.getElementById("result-pc-charts-bar-operator")
    //   );
    //   operatorBarChart.setOption(barOption);
    //   getStatisticsISP(ispParams)
    //     .then((res) => {
    //       console.log("isp", res);
    //       if (res.code === 200 && res.data) {
    //         this.operatorBarData = []
    //         this.operatorBarAllData = JSON.parse(JSON.stringify(res.data))
    //         this.operatorBarTotalNum = this.operatorBarAllData.value.length
    //         let operatorData = {};
    //         let formatterVal4 = {};
    //         if (this.operatorBarAllData.value.length > 5) {
    //           operatorData["value"] = this.operatorBarAllData.value.slice(-5);
    //           operatorData["abnormalTime"] = this.operatorBarAllData.abnormalTime.slice(-5);
    //           operatorData["normalTime"] = this.operatorBarAllData.normalTime.slice(-5);
    //           this.operatorBarData = operatorData;
    //           formatterVal4 = operatorData;
    //         } else {
    //           this.operatorBarData = this.operatorBarAllData;
    //           formatterVal4 = this.operatorBarAllData;
    //         }

    //         // this.operatorBarData = res.data;
    //         // let formatterVal4 = res.data;
    //         let abnormalTimeVal4 = [];
    //         let normalTimeVal4 = [];
    //         for (let i = 0; i < this.operatorBarData.abnormalTime.length; i++) {
    //           let totalNumber4 =
    //             this.operatorBarData.abnormalTime[i] +
    //             this.operatorBarData.normalTime[i];
    //           let abnormalPercent4 =
    //             this.operatorBarData.abnormalTime[i] / totalNumber4;
    //           let normalPercent4 =
    //             this.operatorBarData.normalTime[i] / totalNumber4;
    //           abnormalTimeVal4.push(abnormalPercent4.toFixed(2) * 100);
    //           normalTimeVal4.push(normalPercent4.toFixed(2) * 100);
    //         }
    //         operatorBarChart.setOption({
    //           title: {
    //             text: "运营商",
    //           },
    //           tooltip: {
    //             formatter: function (params) {
    //               let list4 = [];
    //               let listItem4 = "";
    //               let item4 = 0;
    //               for (let i = 0; i < params.length; i++) {
    //                 for (let j = 0; j < formatterVal4.value.length; j++) {
    //                   if (formatterVal4.value[j] == params[i].axisValue) {
    //                     item4 = j;
    //                   }
    //                 }
    //                 if (params[i].seriesName === "正常总次数") {
    //                   list4.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal4.normalTime[item4]
    //                   );
    //                 } else {
    //                   list4.push(
    //                     '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
    //                     params[i].color +
    //                     ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
    //                     params[i].seriesName +
    //                     "</span>&nbsp&nbsp&nbsp&nbsp" +
    //                     formatterVal4.abnormalTime[item4]
    //                   );
    //                 }
    //               }
    //               listItem4 = list4.join("<br>");
    //               listItem4 =
    //                 "<span>" + params[0].axisValue + "</span><br>" + listItem4;
    //               return "<div>" + listItem4 + "</div>";
    //             },
    //           },
    //           yAxis: {
    //             data: this.operatorBarData.value,
    //           },
    //           series: [
    //             {
    //               name: "异常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal4.abnormalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               barMaxWidth: 40,
    //               data: abnormalTimeVal4,
    //               // data: this.operatorBarData.abnormalTime,
    //               // data: [10, 30, 30, 30, 40, 10, 30],
    //             },
    //             {
    //               name: "正常总次数",
    //               type: "bar",
    //               stack: "total",
    //               label: {
    //                 show: true,
    //                 formatter: function (params) {
    //                   return formatterVal4.normalTime[params.dataIndex];
    //                 },
    //               },
    //               emphasis: {
    //                 focus: "series",
    //               },
    //               data: normalTimeVal4,
    //               // data: this.operatorBarData.normalTime,
    //               // data: [20, 10, 20, 20, 20, 30, 30],
    //             },
    //           ],
    //         });
    //       } else {
    //         console.log("operator-bar-chart请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("getStatisticsISP请求错误:", err);
    //     });
    //   window.addEventListener("resize", () => {
    //     operatorBarChart.resize();
    //   });
    // },
    baselineBarClick() {
      this.baselineBarDialog = true;
      let baselineBarParams = {
        barName: "baseline",
        startTime: this.searchData.startDate,
        endTime: this.searchData.endDate,
        barAllData: this.baselineBarAllData
      }
      this.$nextTick(function () {
        this.$bus.$emit('getChartData', baselineBarParams)
      })
    },
    regionBarClick() {
      this.regionBarDialog = true;
      let regionBarParams = {
        barName: "region",
        startTime: this.searchData.startDate,
        endTime: this.searchData.endDate,
        barAllData: this.regionBarAllData
      }
      this.$nextTick(function () {
        this.$bus.$emit('getChartData', regionBarParams)
      })
    },
    keyBarClick() {
      this.keyBarDialog = true;
      let keyBarParams = {
        barName: "key",
        startTime: this.searchData.startDate,
        endTime: this.searchData.endDate,
        barAllData: this.keyBarAllData
      }
      this.$nextTick(function () {
        this.$bus.$emit('getChartData', keyBarParams)
      })
    },
    operatorBarClick() {
      this.operatorBarDialog = true;
      let operatorBarParams = {
        barName: "operator",
        startTime: this.searchData.startDate,
        endTime: this.searchData.endDate,
        barAllData: this.operatorBarAllData
      }
      this.$nextTick(function () {
        this.$bus.$emit('getChartData', operatorBarParams)
      })
    },
    baselineHandleClose() {
      this.baselineBarDialog = false;
    },
    regionHandleClose() {
      this.regionBarDialog = false;
    },
    keyHandleClose() {
      this.keyBarDialog = false;
    },
    operatorHandleClose() {
      this.operatorBarDialog = false;
    },
  },
};
</script>
<style lang="less" scoped>
//查看全部
.check_all {
  cursor: pointer;
  text-align: center;
  border-top: 1px solid #e8e8e8;
  padding-top: 8px;
  margin-top: 8px;
  color: #666666;
  display: inline-block;
  position: absolute;
  bottom: 12px;
  width: 100%;
  background: #fff;
  height: 18px;
  z-index: 999;
}

.check_all:hover {
  color: #3b6fd9;
  transform: 0.4s;
}

.check_all:click {
  color: #3b6fd9;
  transform: 0.4s;
}

.check_all::after {
  color: #3b6fd9;
}

.check_all span:last-child {
  margin-left: 4px;
}

// 数据总条数样式
.allDataStyle {
  color: #666666;
  font-size: 14px;
  vertical-align: bottom;
  margin-left: 12px;
}

//查看全部 结束
.result-pc-charts-top {
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-left: 70px;

  .result-pc-charts-pie-text {
    margin-left: 16px;
    font-family: Microsoft YaHei;
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;

    .result-pc-charts-pie-date {
      font-family: "Microsoft YaHei";
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      padding: 0px 4px 0px 4px;
      color: #666666;
    }
  }

  .result-pc-charts-pie {
    // width: 100%;
    height: 360px;
    border-right: 1px solid #cecece;
    padding: 28px 64px 28px 64px;
    display: flex;

    .pie-text {
      flex: 3;
      margin: auto;
      text-align: center;
      height: 228px;
      border-right: 1px solid #cecece;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .pie-text-top {
        font-family: "Microsoft YaHei";
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 22px;
        color: #333333;
      }

      .pie-text-bottom {
        font-family: "Microsoft YaHei";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 22px;
        color: #666666;
        margin-top: 32px;
      }
    }

    .pie-data {
      flex: 7;
    }
  }

  .result-pc-charts-line-text {
    margin-left: 16px;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #333333;
  }

  .result-pc-charts-line {
    // width: 100%;
    height: 360px;
    padding: 28px 64px 28px 64px;
  }
}

.result-pc-charts-bottom {
  display: flex;
  justify-content: space-between;
  margin-left: 70px;
  margin-bottom: 20px;
  height: 264px;

  .result-pc-charts-bottom-left {
    width: 100%;
    box-shadow: 0 0 8px #cecece;
    padding-top: 12px;
    width: 49%;
    background-color: #ffffff;
  }
}

:deep(.el-input--prefix .el-input__inner) {
  padding-left: 20px;
}

:deep(.el-input__inner) {
  height: 24px;
  width: 104px;
  // margin-left: 32px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 104px;
}

:deep(.el-input--suffix .el-input__inner) {
  padding-right: 0px;
  padding-left: 16px;
}

:deep(.el-input__icon) {
  display: none;
}

:deep(.el-input__prefix, .el-input__suffix) {
  display: none;
}

:deep(.el-dialog__title) {
  line-height: 24px;
  font-size: 20px;
  color: #303133;
  font-weight: 600;
}

// .result-pc-container {
//   box-shadow: 0 0 8px #cecece;
//   padding: 20px;
//   display: flex;
//   margin-bottom: 20px;
//   float: right;
//   width: calc(100% - 110px);
//   height: 380px;
//   .result-pc-charts-middle {
//     height: 264px;
//   }
//   .result-pc-charts-bottom {
//     height: 264px;
//   }
// }
</style>
