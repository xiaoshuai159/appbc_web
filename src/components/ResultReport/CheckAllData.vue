<template>
  <div :id="barName" style="width: 100% auto; height: 600px"></div>
</template>
<script>
import { barOption } from "@/assets/js/pc-options";
export default {
  name: "CheckAllData",
  data() {
    return {
      barName: 'key',
      barChart: null
    };
  },
  mounted() {
    this.$bus.$off('getChartData')
    this.$bus.$on('getChartData', (data) => {
      this.barName = data.barName
      this.$nextTick(function(){
        this.initBarData(this.barName, data.barAllData)
      })
    })
  },
  beforeDestroy() {
    this.$bus.$off('getChartData')
  },
  methods: {
    initBarData(tempName, tempData) {
      if (this.barChart != null && this.barChart != '' && this.barChart != undefined) {
        this.barChart.dispose(); //销毁
      }
      this.barChart = this.$echarts.init(document.getElementById(tempName));
      this.barChart.setOption(barOption);
      let abnormalTimeVal2 = [];
      let normalTimeVal2 = [];
      for (let i = 0; i < tempData.abnormalTime.length; i++) {
        let totalNumber2 = tempData.abnormalTime[i] + tempData.normalTime[i];
        let abnormalPercent2 = tempData.abnormalTime[i] / totalNumber2;
        let normalPercent2 = tempData.normalTime[i] / totalNumber2;
        abnormalTimeVal2.push(abnormalPercent2.toFixed(2) * 100);
        normalTimeVal2.push(normalPercent2.toFixed(2) * 100);
      }
      if (abnormalTimeVal2.length > 16) {
        abnormalTimeVal2 = abnormalTimeVal2.reverse();
        normalTimeVal2 = normalTimeVal2.reverse();
        for (let keyItem in tempData) {
          tempData[keyItem].reverse();
        }
        this.barChart.setOption({
          grid: {
            height: "96%",
          },
          tooltip: {
            formatter: function (params) {
              let list2 = [];
              let listItem2 = "";
              let item2 = 0;
              for (let i = 0; i < params.length; i++) {
                for (let j = 0; j < tempData.value.length; j++) {
                  if (tempData.value[j] == params[i].axisValue) {
                    item2 = j;
                  }
                }
                if (params[i].seriesName === "正常总次数") {
                  list2.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                      params[i].seriesName +
                      "</span>&nbsp&nbsp&nbsp&nbsp" +
                      tempData.normalTime[item2]
                  );
                } else {
                  list2.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                      params[i].seriesName +
                      "</span>&nbsp&nbsp&nbsp&nbsp" +
                      tempData.abnormalTime[item2]
                  );
                }
              }
              listItem2 = list2.join("<br>");
              listItem2 =
                "<span>" + params[0].axisValue + "</span><br>" + listItem2;
              return "<div>" + listItem2 + "</div>";
            },
          },
          yAxis: {
            inverse: true,
            data: tempData.value,
          },
          series: [
            {
              name: "异常总次数",
              type: "bar",
              stack: "total",
              label: {
                show: true,
                formatter: function (params) {
                  return tempData.abnormalTime[params.dataIndex];
                },
              },
              emphasis: {
                focus: "series",
              },
              barWidth: 20,
              barMaxWidth: 250,
              data: abnormalTimeVal2,
            },
            {
              name: "正常总次数",
              type: "bar",
              stack: "total",
              label: {
                show: true,
                formatter: function (params) {
                  return tempData.normalTime[params.dataIndex];
                },
              },
              emphasis: {
                focus: "series",
              },
              barWidth: 20,
              barMaxWidth: 250,
              data: normalTimeVal2,
            },
          ],
          dataZoom: [
            {
              yAxisIndex: [0],
              // start: 100,    //初始化时，滑动条宽度开始标度
              // end: 50,
              show: true, // 是否展示
              orient: "vertical", // 布局方式是横轴
              type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              startValue: 0, // 从头开始。
              endValue: 14, // 一次性展示15个。
              moveHandleSize: 20, // 移动手柄的尺寸高度
              width: 3, // 组件高度
              showDetail: false, // 拖拽时是否展示滚动条两侧的文字
              emphasis: {
                moveHandleStyle: {
                  color: "rgba(214, 216, 220, 1)",
                },
              },
              moveHandleStyle: {
                color: "rgba(214, 216, 220, 1)",
              },
            },
            {
              type: "inside", // 内置滑动，随鼠标滚轮展示
              yAxisIndex: [0],
              start: 100, // 初始化时，滑动条宽度开始标度
              // end: 100, // 初始化时，滑动条宽度结束标度
              zoomOnMouseWheel: false, // 如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。。
              moveOnMouseMove: true,
              moveOnMouseWheel: true, // 鼠标滚轮实现移动
            },
            // https://blog.csdn.net/weixin_42064877/article/details/121958016
          ],
        });
      }else{
        this.barChart.setOption({
          grid: {
            height: "96%",
          },
          tooltip: {
            formatter: function (params) {
              let list2 = [];
              let listItem2 = "";
              let item2 = 0;
              for (let i = 0; i < params.length; i++) {
                for (let j = 0; j < tempData.value.length; j++) {
                  if (tempData.value[j] == params[i].axisValue) {
                    item2 = j;
                  }
                }
                if (params[i].seriesName === "正常总次数") {
                  list2.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                      params[i].seriesName +
                      "</span>&nbsp&nbsp&nbsp&nbsp" +
                      tempData.normalTime[item2]
                  );
                } else {
                  list2.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      params[i].color +
                      ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                      params[i].seriesName +
                      "</span>&nbsp&nbsp&nbsp&nbsp" +
                      tempData.abnormalTime[item2]
                  );
                }
              }
              listItem2 = list2.join("<br>");
              listItem2 =
                "<span>" + params[0].axisValue + "</span><br>" + listItem2;
              return "<div>" + listItem2 + "</div>";
            },
          },
          yAxis: {
            data: tempData.value,
          },
          series: [
            {
              name: "异常总次数",
              type: "bar",
              stack: "total",
              label: {
                show: true,
                formatter: function (params) {
                  return tempData.abnormalTime[params.dataIndex];
                },
              },
              emphasis: {
                focus: "series",
              },
              barWidth: 20,
              barMaxWidth: 250,
              data: abnormalTimeVal2,
            },
            {
              name: "正常总次数",
              type: "bar",
              stack: "total",
              label: {
                show: true,
                formatter: function (params) {
                  return tempData.normalTime[params.dataIndex];
                },
              },
              emphasis: {
                focus: "series",
              },
              barWidth: 20,
              barMaxWidth: 250,
              data: normalTimeVal2,
            },
          ],
        });
      }
      window.addEventListener("resize", () => {
        this.barChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
