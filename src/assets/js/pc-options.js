const pieOption = {
  // tooltip: {
  //   trigger: 'item'
  // },
  // legend: {
  //   top: '5%',
  //   left: 'center'
  // },
  color: ['#96CA65', '#F74E57'],
  series: [
    {
      name: "Access From",
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
        },
      },
      // data: [
      //   { value: 1048, name: "结果正常总数" },
      //   { value: 735, name: "收集故障总数" },
      //   { value: 580, name: "结果异常总数" },
      // ],
    },
    {
      name: "Access From", // 系列名称
      type: "pie", // 类型 是 pie
      radius: ["30%", "55%"], // 饼图的半径。
      center: ["48%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
      // 支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度。
      avoidLabelOverlap: false,
      label: {
        // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
        show: false,
        position: "center",
      },
      emphasis: {
        // 高亮状态的扇区和标签样式。
        label: {
          // 标签内容
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
      // data: [
      //   { value: 1048, name: "结果正常总数" },
      //   { value: 735, name: "收集故障总数" },
      //   { value: 580, name: "结果异常总数" },
      // ],
    },
  ],
};
const lineOption = {
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
    data: ["异常总次数", "正常总次数"],
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
    // data: [
    //   "0:00",
    //   "1:00",
    //   "2:00",
    //   "3:00",
    //   "4:00",
    //   "5:00",
    //   "6:00",
    //   "7:00",
    //   "8:00",
    //   "9:00",
    //   "10:00",
    //   "11:00",
    //   "12:00",
    //   "13:00",
    //   "14:00",
    //   "15:00",
    //   "16:00",
    //   "17:00",
    //   "18:00",
    //   "19:00",
    //   "20:00",
    //   "21:00",
    //   "22:00",
    //   "23:00",
    // ],
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
      formatter: "{value}",
      // formatter: "{value} %",
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
  color: ["#1675D5", "#e6a23c"],
  // color: ['#37b2ff', '#ffa43e', '#10ff9d', '#ff3c2a', '#f0e978', '#c858d4'],
  series: [
    {
      name: "异常总次数",
      // data: [
      //   0, 10, 30, 38, 43, 55, 60, 80, 90, 90, 68, 43, 55, 60, 70, 10, 30, 58,
      //   43, 41, 10, 17, 20, 10,
      // ],
      type: "line",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
    },
    {
      name: "正常总次数",
      // data: [
      //   0, 0, 0, 70, 63, 55, 60, 40, 20, 10, 68, 33, 55, 30, 10, 10, 80, 42, 63,
      //   41, 10, 30, 40, 50,
      // ],
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
const barOption = {
  title: {
    // text: "底线网站",
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
    data: ['异常总次数', '正常总次数']
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
    inverse: true,
    max: 180,
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
    // {
    //   name: "手机故障总次数",
    //   type: "bar",
    //   stack: "total",
    //   label: {
    //     show: true,
    //   },
    //   emphasis: {
    //     focus: "series",
    //   },
    //   data: [20, 10, 10, 10, 10, 20, 20],
    // },
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
    // {
    //   name: "未拨总次数",
    //   type: "bar",
    //   stack: "total",
    //   label: {
    //     show: true,
    //   },
    //   emphasis: {
    //     focus: "series",
    //   },
    //   data: [50, 50, 40, 40, 30, 40, 20],
    // },
  ],
};
export { pieOption, lineOption, barOption };
