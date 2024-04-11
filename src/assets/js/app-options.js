// 饼图
const pieOption = {
  color: ['#96CA65', '#F74E57', '#e6a23c'], //饼图颜色:正常、异常、手机故障
  series: [
    { // 饼状图周边文字
      name: "roundWord",
      type: "pie",
      radius: ["30%", "55%"],
      center: ["48%", "50%"],
      avoidLabelOverlap: false,
      label: {
        formatter: "{b}",
        fontSize: 16,
        color: "#000000",
      },
      labelLine: {
        show: true,
        length: 20,
        length2: 10,
        lineStyle: {
          width: 2,
          type: "solid",
        }
      },
      // data: [ //测试数据
      //   { value: 1048, name: "结果正常总数" },
      //   { value: 580, name: "结果异常总数" },
      //   { value: 735, name: "手机故障总数" },
      // ],
    },
    { //饼状图鼠标移上去文字
      name: "hoverWord", // 系列名称
      type: "pie", // 类型是pie，饼图
      radius: ["30%", "55%"], // 饼图的半径。
      center: ["48%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
      avoidLabelOverlap: false, // 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
      label: { // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
        show: false,
        position: "center",
      },
      emphasis: { // 高亮状态的扇区和标签样式。
        label: { // 标签内容
          show: true,
          fontSize: "40",
          fontWeight: "bold",
          formatter: "{active|{d}%}",
          rich: {
            total: {
              fontSize: 28,
              fontFamily: "微软雅黑",
              color: "#000000",
            },
            active: {
              fontFamily: "微软雅黑",
              fontSize: 28,
              color: "#000000",
              lineHeight: 30,
            },
          },
        },
      },
      labelLine: {
        show: false,
      },
      // data: [ // 测试数据
      //   { value: 1048, name: "结果正常总数" },
      //   { value: 580, name: "结果异常总数" },
      //   { value: 735, name: "手机故障总数" },
      // ],
    },
  ],
};
// 折线图
const lineOption = {
  color: ['#96CA65', '#F74E57', '#e6a23c', '#1675D5'],
  legend: {
    // type: "scroll",
    zlevel: 2,
    textStyle: {
      fontSize: 14,
      fontWeight: 400,
      color: "#333333",
    },
    right: 40,
    bottom: 10,
    top: -4,
    data: ["正常总次数", "异常总次数", "手机故障总次数", "拨测总次数"],
  },
  tooltip: {
    trigger: "axis",
    // y轴 数值加上%
    // valueFormatter: (value) => value + "%",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  grid: {
    left: "1%",
    right: "1%",
    bottom: "0%",
    top: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    splitLine: {
      show: true,
      lineStyle: {
        color: "#ffffff",
        width: 1, //这里是为了突出显示加上的
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#666666",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#66b1ff",
        width: 1.5, //这里是为了突出显示加上的
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        color: "#E5EFFF",
        width: 1, //这里是为了突出显示加上的
      },
    },
    axisLabel: {
      show: true,
      formatter: "{value} %",
      textStyle: {
        color: "#666666",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#66b1ff",
        width: 1.5, //这里是为了突出显示加上的
      },
    },
  },
  series: [
    {
      name: "正常总次数",
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "异常总次数",
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "手机故障总次数",
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      emphasis: {
        focus: "series",
      },
    },
    {
      name: "拨测总次数",
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
      emphasis: {
        focus: "series",
      },
    },
  ],
};
//三个维度
const barOption = {
  title: {
    // text: "APP统计",
    left: '4%',
    right: '4%',
    textStyle: {
      fontSize: 24,
      fontFamily: "Microsoft YaHei",
      lineHeight: 22,
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {
    right: '4%',
    data: ['正常总次数', '异常总次数', '手机故障总次数']
    // 使用字符串模板，模板变量为图例名称 {name}
  },
  grid: {
    // show:false,
    left: '5%',
    right: '4%',
    bottom: '-10',
    height: 160,
    containLabel: true
  },
  xAxis: {
    show: false,
    type: "value",
    inverse: true, //x轴逆置
    max: 130,
  },
  yAxis: {
    type: "category",
    // show:false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
    axisTick: {
      show: false, // 不显示坐标轴刻度线
    },
    axisLine: {
      show: false, // 不显示坐标轴线
    },
    axisLabel: {
      show: true, // 不显示坐标轴上的文字
    },
    splitLine: {
      show: false, // 不显示网格线
    },
    axisLabel: {
      textStyle: {
        fontSize: 16
      }
    }
  },
  series: [
    {
      name: "手机故障次数",
      type: "bar",
      itemStyle: {
        color: '#e6a23c',
      },
      stack: "total",
      label: {
        show: true,
        fontSize: 12
      },
      emphasis: {
        focus: "series",
      },
      barWidth: 20,
      barMaxWidth: 25,
    },
    {
      name: "异常总次数",
      type: "bar",
      itemStyle: {
        color: '#F74E57',
      },
      stack: "total",
      label: {
        show: true,
        fontSize: 12
      },
      emphasis: {
        focus: "series",
      },
      barWidth: 20,
      barMaxWidth: 25,
    },
    {
      name: "正常总次数",
      type: "bar",
      itemStyle: {
        color: '#96CA65',
      },
      stack: "total",
      label: {
        show: true,
        fontSize: 12
      },
      barWidth: 20,
      barMaxWidth: 25,
      emphasis: {
        focus: "series",
      },
      // data: [20, 10, 20, 20, 20, 30, 30],
    },
  ],
};
export { pieOption, lineOption, barOption };
