<template>
  <div id="result-app">
    <div class="result-app-charts-top block_base" style="float: none;">
      <div class="el-col-24">
        <!-- 实时数据展示 -->
        <div class="el-breadcrumb__inner result-app-charts-pie-text">
          实时数据展示
          <span style="margin-left: 32px;">
            <el-date-picker v-model="searchData.startDate" type="date" placeholder="选择日期" placement="bottom-start"
              format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker></span>
          <span class="result-app-charts-pie-date">--</span>
          <el-date-picker v-model="searchData.endDate" type="date" placeholder="选择日期" placement="bottom-start"
            format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <!-- 饼状图 -->
        <div class="result-app-charts-pie">
          <div class="pie-text">
            <div class="pie-text-top">{{ abnormalNumber }}</div>
            <div class="pie-text-bottom">异常总次数</div>
          </div>
          <div class="pie-data" id="result-app-charts-pie">饼状图</div>
        </div>
      </div>
      <!-- 折线图 -->
      <div class="el-col-24">
        <div class="el-breadcrumb__inner result-app-charts-line-text">
          拨测次数
        </div>
        <div class="result-app-charts-line" id="result-app-charts-line"></div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="result-app-charts-bottom">
      <!-- 左表格 -->
      <div class="result-app-charts-bottom-left">
        <!-- APP维度 -->
        <div class="result-app-charts-bottom-item" style="display: flex; flex-direction: column; position: relative">
          <div style="flex: 1" class="check_all">
            <span @click="keyBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
          </div>
          <!-- <el-dialog :visible.sync="keyBarDialog" :before-close="keyHandleClose">
            <div slot="title">
              <span>APP统计全部数据</span>
              <span class="allDataStyle">共 {{ keyBarTotalNum }} 条</span>
            </div>
            <CheckAllData barName="key" :startTime="searchData.startDate" :endTime="searchData.endDate"
              :barAllData="keyBarAllData"></CheckAllData>
          </el-dialog> -->
          <div id="result-app-charts-bar-baseline" style="flex: 9;max-height:500px;"></div>
        </div>
      </div>
      <!-- 右表格 -->
      <div class="result-app-charts-bottom-right">
        <!-- 地域维度 -->
        <div class="result-app-charts-bottom-item" style="display: flex; flex-direction: column; position: relative">
          <div style="flex: 1" class="check_all">
            <span @click="regionBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
          </div>
          <!-- <el-dialog :visible.sync="regionBarDialog" :before-close="regionHandleClose">
            <div slot="title">
              <span>地域全部数据</span>
              <span class="allDataStyle">共 {{ regionBarTotalNum }} 条</span>
            </div>
            <CheckAllData barName="region" :startTime="searchData.startDate" :endTime="searchData.endDate"
              :barAllData="regionBarAllData"></CheckAllData>
          </el-dialog> -->
          <div id="result-app-charts-bar-region" style="flex: 9;max-height:200px;"></div>
        </div>
        <!-- 运营商维度 -->
        <div class="result-app-charts-bottom-item" style="display: flex; flex-direction: column; position: relative">
          <div style="flex: 1" class="check_all">
            <span @click="operatorBarClick">查看全部</span><i class="el-icon-d-arrow-right"></i>
          </div>
          <!-- <el-dialog :visible.sync="operatorBarDialog" :before-close="operatorHandleClose">
            <div slot="title">
              <span>运营商全部数据</span>
              <span class="allDataStyle">共 {{ operatorBarTotalNum }} 条</span>
            </div>
            <CheckAllData barName="operator" :startTime="searchData.startDate" :endTime="searchData.endDate"
              :barAllData="operatorBarAllData"></CheckAllData>
          </el-dialog> -->
          <div id="result-app-charts-bar-operator" style="flex: 9;max-height:200px;"></div>
        </div>
      </div>
    </div>


    <!-- APP统计全部数据 弹窗 -->
    <div>
      <el-dialog
        :visible.sync="keyBarDialog"
        :before-close="keyHandleClose"
      >
        <div slot="title">
          <span>APP统计全部数据</span>
          <span class="allDataStyle">共 {{ keyBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
      </el-dialog>
    </div>

    <!-- 地域全部数据 弹窗 -->
    <div>
      <el-dialog
        :visible.sync="regionBarDialog"
        :before-close="regionHandleClose"
      >
        <div slot="title">
          <span>地域全部数据</span>
          <span class="allDataStyle">共 {{ regionBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
      </el-dialog>
    </div>

    <!-- 运营商维度 弹窗 -->
    <div>
      <el-dialog
        :visible.sync="operatorBarDialog"
        :before-close="operatorHandleClose"
      >
        <div slot="title">
          <span>运营商全部数据</span>
          <span class="allDataStyle">共 {{ operatorBarTotalNum }} 条</span>
        </div>
        <CheckAllData></CheckAllData>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import { pieOption, lineOption, barOption } from "@/assets/js/app-options"
import CheckAllData from "./CheckShiftAllData.vue";
import moment from 'moment' // 获取日期插件
import {
  getStatisticsAllApp,   // 饼状图
  getStatisticsTrendApp, // 折线图
  getStatisticsApp,      // app
  getStatisticsCityApp,  // 地域
  getStatisticsISPApp    // 运营商
} from "@/api/result-report-app"
export default {
  name: "ResultApp",
  data() {
    return {
      searchData: {
        startDate: "",
        endDate: "",
      },
      abnormalNumber: 0,      // 异常总数
      pieData: [],            // 饼状图
      lineData: [],           // 折线图
      appBarData: [],         // APP统计
      regionBarData: [],      // 地域
      ispBarData: [],         // 运营商
      regionBarTotalNum: 0,          // 地域总条数
      keyBarTotalNum: 0,             // app纬度
      operatorBarTotalNum: 0,        // 运营商总条数
      regionBarAllData: [],       // 地域 全部
      keyBarAllData: [],          // app纬度
      operatorBarAllData: [],     // 运营商  全部
      regionBarDialog: false,     // 地域 查看全部
      keyBarDialog: false,        // app纬度
      operatorBarDialog: false,   // 运营商 查看全部
    };
  },
  computed: {
  },
  components: {
    CheckAllData,
  },
  watch: {
    searchData: {
      handler(newVal, oldVal) {
        let dateParams = {
          startDate: newVal.startDate,
          endDate: newVal.endDate
        }
        this.initPieChart(dateParams);      // 饼状图
        this.initLineChart(dateParams);     // 折线图
        this.initAppBarData(dateParams);    // app维度
        this.initRegionBarData(dateParams); // 地域维度
        this.initIspBarData(dateParams);    // 运营商维度
      },
      deep: true
    }
  },
  mounted() {
    // 获取当前时间及前一个月
    let startDate = moment().subtract(30, "days").format('YYYY-MM-DD'); //前一个月
    let endDate = moment().format('YYYY-MM-DD'); // 当天
    this.searchData.startDate = startDate;
    this.searchData.endDate = endDate;
  },
  methods: {
    // 饼状图
    initPieChart(pieParams) {
      let pieChart = this.$echarts.init(document.getElementById("result-app-charts-pie"));
      pieChart.setOption(pieOption); //设置图标样式
      console.log(getStatisticsAllApp);
      getStatisticsAllApp(pieParams).then(({data:res})=> {
        
        if (res.code === 200 && res.data) {
          let resData = res.data;
          this.abnormalNumber = resData.abnormalCnt; //异常总次数
          this.pieData = [
            { value: resData.normalCnt, name: "结果正常总数" },
            { value: resData.abnormalCnt, name: "结果异常总数" },
            { value: resData.mobileErrorCnt, name: "手机故障总数" },
          ]
          pieChart.setOption({ //传入图标数据
            series: [
              {
                name: "roundWord", // 饼状图周边文字
                data: this.pieData
              }, {
                name: "hoverWord", // 饼状图鼠标移上去文字
                data: this.pieData
              }
            ],
          })
        } else {
          console.log('饼状图响应异常: ', res);
        }
      }).catch(err => {
        console.log('饼状图请求错误:', err);
      })
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        pieChart.resize();
      });
    },
    // 折线图
    initLineChart(lineParams) {
      let lineChart = this.$echarts.init(document.getElementById("result-app-charts-line"));
      lineChart.setOption(lineOption)
      getStatisticsTrendApp(lineParams).then(({data:res}) => {
        console.log('line', res);
        if (res.code === 200 && res.data) {
          this.lineData = res.data;
          let xData = []; //x轴时间
          let normalArr = [];
          let abnormalArr = [];
          let mobileErrorArr = [];
          let totalArr = [];
          for (let item of this.lineData) {
            xData.push(item["dataDate"]);
            normalArr.push(item["normalCnt"]);
            abnormalArr.push(item["abnormalCnt"]);
            mobileErrorArr.push(item["mobileErrorCnt"]);
            totalArr.push(item["totalCnt"]); //拨测总次数
          }
          lineChart.setOption({
            xAxis: {
              data: xData
            },
            series: [
              {
                name: "正常总次数",
                data: normalArr,
              },
              {
                name: "异常总次数",
                data: abnormalArr,
              },
              {
                name: "手机故障总次数",
                data: mobileErrorArr,
              },
              {
                name: "拨测总次数",
                data: totalArr,
              },
            ]
          })
        } else {
          console.log('line-chart请求失败信息: ', res);
        }
      }).catch(err => {
        console.log('getStatisticsTrend请求错误:', err);
      })
      window.addEventListener("resize", () => {
        lineChart.resize();
      });
    },
    // APP统计
    initAppBarData(baselinePrams) {
      let baselineBarChart = this.$echarts.init(document.getElementById("result-app-charts-bar-baseline"));
      baselineBarChart.setOption(barOption);
      let value = [];
      getStatisticsApp(baselinePrams).then(({data:res}) => {
        console.log('baseline', res);
        if (res.code == 200 && res.data) {
          this.keyBarAllData = [];
          this.keyBarTotalNum = res.data.length;
          for (var i = 0; i < res.data.length; i++) {
            this.keyBarAllData.push(res.data[i]);
          }

          this.appBarData = res.data.splice(0, 10);
          let formatterVal = this.appBarData;
          let normalTimeVal = [];
          let abnormalTimeVal = [];
          let mobileErrorCntVal = [];
          for (let i = 0; i < this.appBarData.length; i++) {
            let totalNumber = this.appBarData[i].abnormalCnt + this.appBarData[i].normalCnt + this.appBarData[i].mobileErrorCnt;
            let normalPercent = this.appBarData[i].normalCnt / totalNumber;    //正常
            let abnormalPercent = this.appBarData[i].abnormalCnt / totalNumber; //异常
            let mobileErrorCnt = this.appBarData[i].mobileErrorCnt / totalNumber; //手机故障
            normalTimeVal.push(normalPercent.toFixed(2) * 100)
            abnormalTimeVal.push(abnormalPercent.toFixed(2) * 100)
            mobileErrorCntVal.push(mobileErrorCnt.toFixed(2) * 100)
            value.push(this.appBarData[i].app)
          }
          formatterVal = formatterVal.reverse()
          normalTimeVal = normalTimeVal.reverse()
          abnormalTimeVal = abnormalTimeVal.reverse()
          mobileErrorCntVal = mobileErrorCntVal.reverse()
          value = value.reverse();

          baselineBarChart.setOption({
            title: {
              text: "APP统计",
            },
            grid: {
              height: 480,
            },
            tooltip: {
              formatter: function (params) {
                let list = []
                let listItem = ''
                let item = 0
                for (let i = 0; i < params.length; i++) {
                  for (let j = 0; j < formatterVal.length; j++) {
                    if (formatterVal[j].app == params[i].axisValue) {
                      item = j
                    }
                  }
                  if (params[i].seriesName === '正常总次数') {
                    list.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal[item].normalCnt
                    )
                  } else if (params[i].seriesName === '异常总次数') {
                    list.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal[item].abnormalCnt
                    )
                  } else {
                    list.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal[item].mobileErrorCnt
                    )
                  }
                }
                listItem = list.join('<br>')
                listItem = '<span>' + params[0].axisValue + '</span><br>' + listItem
                return '<div>' + listItem + '</div>'
              },
            },
            yAxis: {
              data: value,
            },
            series: [
              {
                name: "手机故障总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal[params.dataIndex].mobileErrorCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: mobileErrorCntVal,
                // data: this.appBarData.normalCnt,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
              {
                name: "正常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal[params.dataIndex].normalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: normalTimeVal,
                // data: this.appBarData.normalCnt,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
              {
                name: "异常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal[params.dataIndex].abnormalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                barMaxWidth: 40,
                data: abnormalTimeVal,
                // data: this.appBarData.abnormalCnt,
                // data: [10, 30, 30, 30, 40, 10, 30],
              },
            ]
          })
        } else {
          console.log('baseline-bar-chart请求失败信息: ', res);
        }
      }).catch(err => {
        console.log('baselinePrams请求错误:', err);
      })
      window.addEventListener("resize", () => {
        baselineBarChart.resize();
      })
    },
    // 地域
    initRegionBarData(regionParams) {
      let regionBarChart = this.$echarts.init(document.getElementById("result-app-charts-bar-region"))
      regionBarChart.setOption(barOption)
      let value = [];
      getStatisticsCityApp(regionParams).then(({data:res}) => {
        console.log('region', res);
        if (res.code === 200 && res.data) {
          this.regionBarAllData = [];
          this.regionBarTotalNum = res.data.length;
          for (var i = 0; i < res.data.length; i++) {
            this.regionBarAllData.push(res.data[i]);
          }
          this.regionBarData = res.data.splice(0, 5);
          let formatterVal2 = this.regionBarData;
          let abnormalTimeVal2 = [];
          let normalTimeVal2 = [];
          let mobileErrorCntVal = [];
          for (let i = 0; i < this.regionBarData.length; i++) {
            let totalNumber2 = this.regionBarData[i].abnormalCnt + this.regionBarData[i].normalCnt + this.regionBarData[i].mobileErrorCnt;
            let abnormalPercent2 = this.regionBarData[i].abnormalCnt / totalNumber2
            let normalPercent2 = this.regionBarData[i].normalCnt / totalNumber2
            let mobileErrorCnt = this.regionBarData[i].mobileErrorCnt / totalNumber2
            abnormalTimeVal2.push(abnormalPercent2.toFixed(2) * 100)
            normalTimeVal2.push(normalPercent2.toFixed(2) * 100)
            mobileErrorCntVal.push(mobileErrorCnt.toFixed(2) * 100)
            value.push(this.regionBarData[i].city)
          }

          formatterVal2 = formatterVal2.reverse()
          abnormalTimeVal2 = abnormalTimeVal2.reverse()
          normalTimeVal2 = normalTimeVal2.reverse()
          mobileErrorCntVal = mobileErrorCntVal.reverse()
          value = value.reverse();

          regionBarChart.setOption({
            title: {
              text: "地域",
            },
            grid: {
              height: 180,
            },
            tooltip: {
              formatter: function (params) {
                let list2 = []
                let listItem2 = ''
                let item2 = 0
                for (let i = 0; i < params.length; i++) {
                  for (let j = 0; j < formatterVal2.length; j++) {
                    if (formatterVal2[j].city == params[i].axisValue) {
                      item2 = j
                    }
                  }
                  if (params[i].seriesName === '正常总次数') {
                    list2.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal2[item2].normalCnt
                    )
                  } else if (params[i].seriesName === '异常总次数') {
                    list2.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal2[item2].abnormalCnt
                    )
                  } else {
                    list2.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal2[item2].mobileErrorCnt
                    )
                  }
                }
                listItem2 = list2.join('<br>')
                listItem2 = '<span>' + params[0].axisValue + '</span><br>' + listItem2
                return '<div>' + listItem2 + '</div>'
              },
            },
            yAxis: {
              data: value,
            },
            series: [
              {
                name: "异常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal2[params.dataIndex].abnormalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                barMaxWidth: 40,
                data: abnormalTimeVal2,
                // data: this.regionBarData.abnormalTime,
                // data: [10, 30, 30, 30, 40, 10, 30],
              },
              {
                name: "正常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal2[params.dataIndex].normalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: normalTimeVal2,
                // data: this.regionBarData.normalTime,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
              {
                name: "手机故障总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal2[params.dataIndex].mobileErrorCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: mobileErrorCntVal,
                // data: this.appBarData.normalCnt,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
            ]
          })
        } else {
          console.log('region-bar-chart请求失败信息: ', res);
        }
      }).catch(err => {
        console.log('getStatisticsCity请求错误:', err);
      })
      window.addEventListener("resize", () => {
        regionBarChart.resize();
      })
    },
    // 运营商
    initIspBarData(ispParams) {
      let operatorBarChart = this.$echarts.init(document.getElementById("result-app-charts-bar-operator"));
      operatorBarChart.setOption(barOption);
      let value = [];
      getStatisticsISPApp(ispParams).then(({data:res}) => {
        console.log('isp', res);
        if (res.code === 200 && res.data) {
          this.operatorBarTotalNum = res.data.length;
          this.operatorBarAllData = [];
          for (var i = 0; i < res.data.length; i++) {
            this.operatorBarAllData.push(res.data[i]);
          }
          this.ispBarData = res.data;
          let formatterVal4 = res.data;
          let abnormalTimeVal4 = [];
          let normalTimeVal4 = [];
          let mobileErrorCntVal = [];
          for (let i = 0; i < this.ispBarData.length; i++) {
            let totalNumber4 = this.ispBarData[i].abnormalCnt + this.ispBarData[i].normalCnt + this.ispBarData[i].mobileErrorCnt
            let abnormalPercent4 = this.ispBarData[i].abnormalCnt / totalNumber4
            let normalPercent4 = this.ispBarData[i].normalCnt / totalNumber4
            let mobileErrorCnt = this.ispBarData[i].mobileErrorCnt / totalNumber4
            abnormalTimeVal4.push(abnormalPercent4.toFixed(2) * 100)
            normalTimeVal4.push(normalPercent4.toFixed(2) * 100)
            mobileErrorCntVal.push(mobileErrorCnt.toFixed(2) * 100)
            value.push(this.ispBarData[i].isp)
          }

          formatterVal4 = formatterVal4.reverse()
          abnormalTimeVal4 = abnormalTimeVal4.reverse()
          normalTimeVal4 = normalTimeVal4.reverse()
          mobileErrorCntVal = mobileErrorCntVal.reverse()
          value = value.reverse();

          operatorBarChart.setOption({
            title: {
              text: "运营商",
            },
            grid: {
              height: 180,
            },
            tooltip: {
              formatter: function (params) {
                let list4 = []
                let listItem4 = ''
                let item4 = 0
                for (let i = 0; i < params.length; i++) {
                  for (let j = 0; j < formatterVal4.length; j++) {
                    if (formatterVal4[j].isp == params[i].axisValue) {
                      item4 = j
                    }
                  }
                  if (params[i].seriesName === '正常总次数') {
                    list4.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal4[item4].normalCnt
                    )
                  } else if (params[i].seriesName === '异常总次数') {
                    list4.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal4[item4].abnormalCnt
                    )
                  } else {
                    list4.push(
                      '<i style="display: inline-block;width: 10px;height: 10px;background: ' + params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:85px; display:inline-block;">' +
                      params[i].seriesName + '</span>&nbsp&nbsp&nbsp&nbsp' + formatterVal4[item4].mobileErrorCnt
                    )
                  }
                }
                listItem4 = list4.join('<br>')
                listItem4 = '<span>' + params[0].axisValue + '</span><br>' + listItem4
                return '<div>' + listItem4 + '</div>'
              },
            },
            yAxis: {
              data: value,
            },
            series: [
              {
                name: "异常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal4[params.dataIndex].abnormalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                barMaxWidth: 40,
                data: abnormalTimeVal4,
                // data: this.ispBarData.abnormalTime,
                // data: [10, 30, 30, 30, 40, 10, 30],
              },
              {
                name: "正常总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal4[params.dataIndex].normalCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: normalTimeVal4,
                // data: this.ispBarData.normalTime,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
              {
                name: "手机故障总次数",
                type: "bar",
                stack: "total",
                label: {
                  show: true,
                  formatter: function (params) {
                    return formatterVal4[params.dataIndex].mobileErrorCnt
                  }
                },
                emphasis: {
                  focus: "series",
                },
                data: mobileErrorCntVal,
                // data: this.appBarData.normalCnt,
                // data: [20, 10, 20, 20, 20, 30, 30],
              },
            ]
          })
        } else {
          console.log('operator-bar-chart请求失败信息: ', res);
        }
      }).catch(err => {
        console.log('getStatisticsISP请求错误:', err);
      })
      window.addEventListener("resize", () => {
        operatorBarChart.resize();
      })
    },
    regionBarClick() {
      this.regionBarDialog = true;
      let baselineBarParams = {
        barName:"region", 
        startTime:this.searchData.startDate,
        endTime:this.searchData.endDate, 
        barAllData:this.regionBarAllData
      }
      this.$nextTick(function(){
        this.$bus.$emit('getChartData', baselineBarParams)
      })
    },
    regionHandleClose() {
      this.regionBarDialog = false;
    },
    operatorBarClick() {
      this.operatorBarDialog = true;
      let baselineBarParams = {
        barName:"operator", 
        startTime:this.searchData.startDate,
        endTime:this.searchData.endDate, 
        barAllData:this.operatorBarAllData
      }
      this.$nextTick(function(){
        this.$bus.$emit('getChartData', baselineBarParams)
      })
    },
    operatorHandleClose() {
      this.operatorBarDialog = false;
    },

    keyBarClick() {
      this.keyBarDialog = true;

      let baselineBarParams = {
        barName:"key", 
        startTime:this.searchData.startDate,
        endTime:this.searchData.endDate, 
        barAllData:this.keyBarAllData
      }
      console.log("baselineBarParams",baselineBarParams)
      this.$nextTick(function(){
        this.$bus.$emit('getChartData', baselineBarParams)
      })

    },
    keyHandleClose() {
      this.keyBarDialog = false;
    },

  }
};
</script>
<style lang="less" scoped>
.result-app-charts-top {
  box-shadow: 0 0 8px #cecece;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-left: 70px;

  .result-app-charts-pie-text {
    margin-left: 16px;
    font-family: Microsoft YaHei;
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;

    .result-app-charts-pie-date {
      font-family: "Microsoft YaHei";
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      padding: 0px 4px 0px 4px;
      color: #666666;
    }
  }

  .result-app-charts-pie {
    // width: 100%;
    height: 360px;
    border-right: 1px solid #CECECE;
    padding: 28px 64px 28px 64px;
    display: flex;

    .pie-text {
      flex: 3;
      margin: auto;
      text-align: center;
      height: 228px;
      border-right: 1px solid #CECECE;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .pie-text-top {
        font-family: 'Microsoft YaHei';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 22px;
        color: #333333;
      }

      .pie-text-bottom {
        font-family: 'Microsoft YaHei';
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

  .result-app-charts-line-text {
    margin-left: 16px;
    font-family: 'Microsoft YaHei';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 22px;
    color: #333333;
  }

  .result-app-charts-line {
    // width: 100%;
    height: 360px;
    padding: 28px 64px 28px 64px;
  }
}

.result-app-charts-bottom-item {
  box-shadow: 0 0 8px #cecece;
  padding: 20px 0;
}

.result-app-charts-bottom {
  display: flex;
  justify-content: space-between;
  margin-left: 70px;
  margin-bottom: 20px;
  height: 568px;
  gap: 34px;
  background-color: white;

  .result-app-charts-bottom-left {
    flex: 1;

    .result-app-charts-bottom-item {
      height: 528px;
    }
  }

  .result-app-charts-bottom-right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;

    .result-app-charts-bottom-item {
      flex: 1;
    }
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

.allDataStyle {
  color: #666666;
  font-size: 14px;
  vertical-align: bottom;
  margin-left: 12px;
}
</style>
