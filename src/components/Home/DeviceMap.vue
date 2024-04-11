<template>
  <div id="device-map-container" style="
      box-shadow: 0 0 8px #cecece;
      padding: 20px;
      display: flex;
      margin-bottom: 20px;
      float: right;
      width: calc(100% - 110px);
      height: 747px;
      position: relative;
      background-color: #ffffff;
    ">
    <el-carousel indicator-position="outside" :interval="10000" arrow="never" height="95%" style="width: 100%">
      <!-- <el-carousel-item>
        <div id="map-china-pc" ref="chart" style="width: 100%; height: 100%"></div>
        <div class="timedjs">
          <p>
            刷新倒计时：<span id="countdown">{{ minute }}:{{ second }}</span>
          </p>
        </div>
      </el-carousel-item> -->
      <el-carousel-item>
        <div id="map-china-phone" ref="chart" style="width: 100%; height: 100%"></div>
        <div class="timedjs">
          <p>
            刷新倒计时：<span id="countdown">{{ minute }}:{{ second }}</span>
          </p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import china from "@/assets/china.json";
import listcity from "@/assets/qwewqea(2).json";
// import { getPCStatisticsMap } from "@/api/home";

export default {
  name: "DeviceMap",
  data() {
    return {
      // listPc: [],
      // listPc1: [
      //   {
      //     name: "湖南",
      //     offlineDetail: [],
      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "北京",
      //     offlineDetail: [],
      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "上海",
      //     offlineDetail: [],
      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "江西",
      //     offlineDetail: [],
      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "河南",
      //     offlineDetail: [],
      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "山西",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "四川",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "湖北",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "江苏",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "内蒙古",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "安徽",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "辽宁",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "广东",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "浙江",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "陕西",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "贵州",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "山东",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "云南",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "广西",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "吉林",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "南京",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "重庆",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "黑龙江",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "海南",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "新疆",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "福建",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "河北",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "天津",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "宁夏",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "甘肃",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "青海",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "西藏",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "台湾",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "澳门",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "香港",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      //   {
      //     name: "南海诸岛",

      //     offlineDetail: [],

      //     onlineDetail: [],
      //     offlineNum: 0,
      //     value: 0,
      //   },
      // ],
      listPhone: [],
      listPhone1: [
        {
          name: "湖南",
          offlineDetail: [],
          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "北京",
          offlineDetail: [],
          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "上海",
          offlineDetail: [],
          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "江西",
          offlineDetail: [],
          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "河南",
          offlineDetail: [],
          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "山西",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "四川",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "湖北",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "江苏",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "内蒙古",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "安徽",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "辽宁",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "广东",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "浙江",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "陕西",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "贵州",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "山东",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "云南",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "广西",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "吉林",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "南京",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "重庆",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "黑龙江",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "海南",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "新疆",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "福建",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "河北",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "天津",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "宁夏",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "甘肃",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "青海",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "西藏",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "台湾",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "澳门",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "香港",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
        {
          name: "南海诸岛",

          offlineDetail: [],

          onlineDetail: [],
          offlineNum: 0,
          value: 0,
        },
      ],
      chinalist: listcity.data,
      minutes: 10,
      seconds: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.initMapPc();
      this.initMapPhone();
    });
    this.submit();
    // this.getPCStatisticsMapVal();
  },
  watch: {
    // 监听数值变化
    second: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      },
    },
    address: {
      handler(newVal) {
        // console.log(newVal);
        if (newVal.second == "00" && newVal.minute == "00") {
          // this.mapPc();
          this.mapPhone();
          this.seconds = 0;
          this.minutes = 10;
        }
      },
    },
  },
  computed: {
    address() {
      const { second, minute } = this;
      return {
        second,
        minute,
      };
    },
    second() {
      return this.num(this.seconds);
    },
    minute() {
      return this.num(this.minutes);
    },
    // token() {
    //   return this.$store.state.token
    // },
  },
  created() {
    // this.mapPc();
    this.mapPhone();
  },
  methods: {
    // PC端地图
    // getPCStatisticsMapVal() {
    //   getPCStatisticsMap()
    //     .then((res) => {
    //       console.log("pc - map", res);
    //       if (res.code == 200) {
    //         this.listPc = res.data.map((item) => {
    //           return {
    //             name: item.name,
    //             offlineDetail: item.offlineDetail,
    //             offlineNum: item.offlineNum,
    //             onlineDetail: item.onlineDetail,
    //             value: item.onlineNum,
    //           };
    //         });
    //         for (var i = 0; i < this.listPc.length; i++) {
    //           for (var j = 0; j < this.listPc1.length; j++) {
    //             if (this.listPc1[j].name == this.listPc[i].name) {
    //               this.listPc1[j].offlineDetail = this.listPc[i].offlineDetail;
    //               this.listPc1[j].onlineDetail = this.listPc[i].onlineDetail;
    //               this.listPc1[j].offlineNum = this.listPc[i].offlineNum;
    //               this.listPc1[j].value = this.listPc[i].value;
    //             }
    //           }
    //         }
    //         this.$nextTick(() => {
    //           this.initMapPc();
    //         });
    //       } else {
    //         console.log("pc-map请求失败信息: ", res);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("getPCStatisticsMap请求错误:", err);
    //     });
    // },
    // async mapPc() {
    // const { data: res } = await this.$http.get("/pc/statistics/map");
    // console.log('pc - map', res);
    // if (res.code == 200) {
    //   this.listPc = res.data.map((item) => {
    //     return {
    //       name: item.name,
    //       offlineDetail: item.offlineDetail,
    //       offlineNum: item.offlineNum,
    //       onlineDetail: item.onlineDetail,
    //       value: item.onlineNum,
    //     };
    //   });
    //   console.log('listPc:', this.listPc);
    //   for (var i = 0; i < this.listPc.length; i++) {
    //     for (var j = 0; j < this.listPc1.length; j++) {
    //       if (this.listPc1[j].name == this.listPc[i].name) {
    //         this.listPc1[j].offlineDetail = this.listPc[i].offlineDetail;
    //         this.listPc1[j].onlineDetail = this.listPc[i].onlineDetail;
    //         this.listPc1[j].offlineNum = this.listPc[i].offlineNum;
    //         this.listPc1[j].value = this.listPc[i].value;
    //       }
    //     }
    //   }
    //   console.log('listPc1:', this.listPc1);
    //   this.$nextTick(() => {
    //     this.initMapPc();
    //   });
    // }
    // },
    // 移动端地图
    async mapPhone() {
      const { data: res } = await this.$http.get("/client/maps");
      console.log("phone - map", res);
      if (res.code == 200) {
        this.listPhone = res.data.map((item) => {
          return {
            name: item.name,
            offlineDetail: item.offlineDetail,
            offlineNum: item.offlineNum,
            onlineDetail: item.onlineDetail,
            value: item.onlineNum,
          };
        });

        for (var i = 0; i < this.listPhone.length; i++) {
          for (var j = 0; j < this.listPhone1.length; j++) {
            if (this.listPhone1[j].name == this.listPhone[i].name) {
              this.listPhone1[j].offlineDetail =
                this.listPhone[i].offlineDetail;
              this.listPhone1[j].onlineDetail = this.listPhone[i].onlineDetail;
              this.listPhone1[j].offlineNum = this.listPhone[i].offlineNum;
              this.listPhone1[j].value = this.listPhone[i].value;
            }
          }
        }
        this.$nextTick(() => {
          this.initMapPhone();
        });
      }
    },
    // 倒计时
    submit() {
      var _this = this;
      var time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    //两位
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    // PC端地图初始化
    // initMapPc() {
    //   let _this = this;
    //   let chinachart = this.$echarts.init(
    //     document.getElementById("map-china-pc")
    //   );
    //   this.$echarts.registerMap("china", { geoJSON: china });
    //   // 初始化echarts实例
    //   // 进行相关配置
    //   let chartOption = {
    //     title: {
    //       top: "12px",
    //       text: "固网设备全国分布图",
    //       textStyle: { fontSize: 20 }, //字体大小
    //     },
    //     // geo配置详解： https://echarts.baidu.com/option.html#geo
    //     geo: {
    //       // 地理坐标系组件用于地图的绘制
    //       map: "china", // 表示中国地图
    //       roam: true, // 是否开启鼠标缩放和平移漫游
    //       zoom: 1.5, // 当前视角的缩放比例（地图的放大比例）
    //       scaleLimit: {
    //         //滚轮缩放的极限控制
    //         min: 1, //缩放最小大小
    //         max: 3, //缩放最大大小
    //       },
    //       label: {
    //         show: true,
    //       },
    //       itemStyle: {
    //         // 地图区域的多边形 图形样式。
    //         borderColor: "rgba(0, 0, 0,0.8)",
    //         emphasis: {
    //           // 高亮状态下的多边形和标签样式
    //           shadowBlur: 20,
    //           shadowColor: "rgba(0, 0, 0, 0.5)",
    //         },
    //       },
    //       layoutCenter: ["48%", "70%"], //位置
    //       layoutSize: "90%", //大小
    //     },
    //     series: [
    //       {
    //         name: "各区域人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
    //         type: "map",
    //         geoIndex: 0,
    //         label: {
    //           show: true,
    //         },
    //         // 这是需要配置地图上的某个地区的数据（下面是定义的假数据）
    //         data: this.listPc1,
    //       },
    //     ],
    //     tooltip: {
    //       // 鼠标移到图里面的浮动提示框
    //       formatter(params, ticket, callback) {
    //         let zxtext = "";
    //         let zxtext1 = "";
    //         let lxtext = "";
    //         let lxtext1 = "";
    //         //  .forEach((item) => {
    //         if (params.data.onlineDetail.length != 0) {
    //           for (var i = 0; i < params.data.onlineDetail.length; i++) {
    //             let zxtext = params.data.onlineDetail[i].host + "<br/>";
    //             zxtext1 += zxtext;
    //           }
    //         } else {
    //           zxtext1 = "";
    //         }
    //         if (params.data.offlineDetail.length != 0) {
    //           for (var i = 0; i < params.data.offlineDetail.length; i++) {
    //             let lxtext = params.data.offlineDetail[i].host + "<br/>";
    //             lxtext1 += lxtext;
    //           }
    //         } else {
    //           lxtext1 = "";
    //         }
    //         if (params.data.value < 0) {
    //           params.data.value = 0;
    //         }
    //         let htmlStr =
    //           "<div style=font-size:14px;>" +
    //           "<p style=font-size:14px;font-weight:600;>" +
    //           params.data.name +
    //           "</p>" +
    //           "<p style=text-align:left;margin-top:5px;>" +
    //           "在线数量：" +
    //           params.data.value +
    //           "<br/>   </p>" +
    //           "<p style=text-align:left;margin-top:5px;>" +
    //           "在线IP：" +
    //           "<br/>" +
    //           zxtext1 +
    //           " </p>" +
    //           " <p style=text-align:left;margin-top:5px;>" +
    //           "离线数量：" +
    //           params.data.offlineNum +
    //           "<br/> </p>" +
    //           "<p style=text-align:left;margin-top:5px;>" +
    //           "离线IP：" +
    //           "<br/>" +
    //           lxtext1 +
    //           " </p>" +
    //           "</div>";
    //         // // params.data 就是series配置项中的data数据遍历
    //         //    let localValue, perf, downloadSpeep, usability, point;
    //         //    if (params.data) {
    //         //        localValue = params.data.value;
    //         //    } else {

    //         //        localValue = 0;
    //         //    }
    //         return htmlStr;
    //       },
    //       backgroundColor: "rgba(255, 255, 255, 0.815)", //提示标签背景颜色
    //       textStyle: { color: "rgb(78, 75, 75)" }, //提示标签字体颜色
    //       // borderColor :'#fff'
    //     },
    //     // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
    //     // visualMap: {
    //     //   // 左下角的颜色区域
    //     //   type: "piecewise", // 定义为分段型 visualMap
    //     //   min: 0,
    //     //   max: 1000,
    //     //   itemWidth: 40,
    //     //   bottom: 10,
    //     //   left: 10,
    //     //   pieces: [
    //     //     // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，
    //     //     // 以及每一段的文字，以及每一段的特别的样式
    //     //     { gt: 999, label: ">1000人", color: "#82121b" }, // (1000, ]
    //     //     { gt: 100, lte: 999, label: "100-999人", color: "#bb2222" }, // (100, 999]
    //     //     { gt: 10, lte: 99, label: "10-99人", color: "#fe7b6c" }, // (10, 99]
    //     //     { gt: 0, lte: 9, label: "1-9人", color: "#ffaa85" }, // (0, 9]
    //     //   ],
    //     // },
    //     //色度条
    //     visualMap: {
    //       // min: 0,
    //       // max: 30,
    //       // text: ["最高值", "最低值"],
    //       realtime: false,
    //       calculable: true,
    //       splitNumber: 10,
    //       text: ["高", "低"],
    //       // type: 'piecewise', // 类型为分段型
    //       min: -5, //最小值区域  小于1  显示的green
    //       max: 5, //大于4显示
    //       // pieces: [
    //       //   // 自定义每一段的范围，以及每一段的文字
    //       //   { min: 0, max:1, color: '#fff' }, // 不指定 max，表示 max 为无限大（Infinity）。
    //       //   {
    //       //     min: 1,
    //       //     max: 2,
    //       //     color: 'rgb(194, 229, 194)',
    //       //   },
    //       //   {
    //       //     min: 2,
    //       //     max: 3,
    //       //     color: 'rgb(179, 231, 179)',
    //       //   },
    //       //   {
    //       //     min: 3,
    //       //     max: 4,
    //       //     color: 'rgb(162, 231, 162)',
    //       //   },
    //       //   {
    //       //     min: 4,
    //       //     max: 5,
    //       //     color: 'rgb(148, 235, 148)',
    //       //   },
    //       //   {
    //       //     min: 5,
    //       //     max: 6,
    //       //     color: 'rgb(129, 233, 129)',
    //       //   },
    //       //   {
    //       //     min: 6,
    //       //     max: 7,
    //       //     color: 'rgb(110, 233, 110)',
    //       //   },
    //       //   {
    //       //     min: 7,
    //       //     max: 8,
    //       //     color: 'rgb(95, 236, 95)',
    //       //   },
    //       //   {
    //       //     min: 8,
    //       //     max: 9,
    //       //     color: 'rgb(84, 212, 84)',
    //       //   },
    //       //   {
    //       //     min: 9,
    //       //     max: 10,
    //       //     color: 'rgb(69, 182, 69)',
    //       //   },
    //       //   // 不指定 min，表示 min 为无限大（-Infinity）。
    //       //   // padding: [0, 0, 40, 20],
    //       //   // textStyle: {
    //       //   //   color: 'white',
    //       //   // },
    //       //   // show: false,

    //       //   // calculable: true,
    //       //   // align: 'auto',
    //       //   // realtime: false,
    //       //   //  min: this.min,
    //       //   //         max: this.max,
    //       //   //         text: ['最高值', '最低值'],

    //       //   //         inRange: {
    //       //   //              color: ['#2d88eb', '#007aff', '#ff9119', '#d14759'],
    //       //   //         },
    //       // ],
    //       inRange: {
    //         // color: ["rgb(219, 192, 34)", "green"],
    //         color: ["rgb(235, 60, 60)", "#fff", "rgb(69, 182, 69)"],
    //       },
    //       bottom: 0,
    //       left: "left",
    //     },
    //     nameMap: {
    //       湖南省: "湖南",
    //       北京市: "北京",
    //       上海市: "上海",
    //       江西省: "江西",
    //       河南省: "河南",
    //       山西省: "山西",
    //       四川省: "四川",
    //       湖北省: "湖北",
    //       江苏省: "江苏",
    //       内蒙古自治区: "内蒙古",
    //       安徽省: "安徽",
    //       广东省: "广东",
    //       浙江省: "浙江",
    //       陕西省: "陕西",
    //       贵州省: "贵州",
    //       山东省: "山东",
    //       云南省: "云南",
    //       广西壮族自治区: "广西",
    //       吉林省: "吉林",
    //       南京省: "南京",
    //       重庆市: "重庆",
    //       黑龙江省: "黑龙江",
    //       海南省: "海南",
    //       新疆维吾尔自治区: "新疆",
    //       福建省: "福建",
    //       河北省: "河北",
    //       天津市: "天津",
    //       宁夏回族自治区: "宁夏",
    //       青海省: "青海",
    //       西藏自治区: "西藏",
    //       甘肃省: "甘肃",
    //       辽宁省: "辽宁",
    //       台湾省: "台湾",
    //       香港特别行政区: "香港",
    //       澳门特别行政区: "澳门",
    //     },
    //   };

    //   // var bar_qx = this.$refs.chart
    //   // // eslint-disable-next-line camelcase
    //   // let myChart = this.$echarts.init(bar_qx)
    //   // 使用刚指定的配置项和数据显示地图数据
    //   chinachart.setOption(chartOption);
    //   window.addEventListener("resize", function () {
    //     chinachart && chinachart.resize();
    //   });
    //   //根据浏览器大小改变大小
    // },
    // 移动端地图初始化
    initMapPhone() {
      let _this = this;
      let chinachart = this.$echarts.init(
        document.getElementById("map-china-phone")
      );
      this.$echarts.registerMap("china", { geoJSON: china });
      // 初始化echarts实例
      // 进行相关配置
      let chartOption = {
        title: {
          top: "12px",
          text: "移动网设备全国分布图",
          textStyle: { fontSize: 20 }, //字体大小
        },
        // geo配置详解： https://echarts.baidu.com/option.html#geo
        geo: {
          // 地理坐标系组件用于地图的绘制
          map: "china", // 表示中国地图
          // roam: true, // 是否开启鼠标缩放和平移漫游
          zoom: 1.5, // 当前视角的缩放比例（地图的放大比例）
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1, //缩放最小大小
            max: 3, //缩放最大大小
          },
          label: {
            show: true,
          },
          itemStyle: {
            // 地图区域的多边形 图形样式。
            borderColor: "rgba(0, 0, 0,0.8)",
            emphasis: {
              // 高亮状态下的多边形和标签样式
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          layoutCenter: ["48%", "70%"], //位置
          layoutSize: "90%", //大小
        },
        series: [
          {
            name: "各区域人数", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
            type: "map",
            geoIndex: 0,
            label: {
              show: true,
            },

            // 这是需要配置地图上的某个地区的数据（下面是定义的假数据）
            data: this.listPhone1,
          },
        ],
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          formatter(params, ticket, callback) {
            let zxtext = "";
            let zxtext1 = "";
            let lxtext = "";
            let lxtext1 = "";
            //  .forEach((item) => {
            if (params.data.onlineDetail.length != 0) {
              for (var i = 0; i < params.data.onlineDetail.length; i++) {
                let zxtext = params.data.onlineDetail[i].udid + "<br/>";

                zxtext1 += zxtext;
              }
            } else {
              zxtext1 = "";
            }
            if (params.data.offlineDetail.length != 0) {
              for (var i = 0; i < params.data.offlineDetail.length; i++) {
                let lxtext = params.data.offlineDetail[i].udid + "<br/>";

                lxtext1 += lxtext;
              }
            } else {
              lxtext1 = "";
            }
            if (params.data.value < 0) {
              params.data.value = 0;
            }
            let htmlStr =
              "<div style=font-size:14px;>" +
              "<p style=font-size:14px;font-weight:600;>" +
              params.data.name +
              "</p>" +
              "<p style=text-align:left;margin-top:5px;>" +
              "在线数量：" +
              params.data.value +
              "<br/>   </p>" +
              "<p style=text-align:left;margin-top:5px;>" +
              "在线IP：" +
              "<br/>" +
              zxtext1 +
              " </p>" +
              " <p style=text-align:left;margin-top:5px;>" +
              "离线数量：" +
              params.data.offlineNum +
              "<br/> </p>" +
              "<p style=text-align:left;margin-top:5px;>" +
              "离线IP：" +
              "<br/>" +
              lxtext1 +
              " </p>" +
              "</div>";
            // // params.data 就是series配置项中的data数据遍历
            //    let localValue, perf, downloadSpeep, usability, point;
            //    if (params.data) {
            //        localValue = params.data.value;
            //    } else {

            //        localValue = 0;
            //    }

            return htmlStr;
          },
          backgroundColor: "rgba(255, 255, 255, 0.815)", //提示标签背景颜色
          textStyle: { color: "rgb(78, 75, 75)" }, //提示标签字体颜色
          // borderColor :'#fff'
        },
        // visualMap的详细配置解析：https://echarts.baidu.com/option.html#visualMap
        // visualMap: {
        //   // 左下角的颜色区域
        //   type: "piecewise", // 定义为分段型 visualMap
        //   min: 0,
        //   max: 1000,
        //   itemWidth: 40,
        //   bottom: 10,
        //   left: 10,
        //   pieces: [
        //     // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，
        //     // 以及每一段的文字，以及每一段的特别的样式
        //     { gt: 999, label: ">1000人", color: "#82121b" }, // (1000, ]
        //     { gt: 100, lte: 999, label: "100-999人", color: "#bb2222" }, // (100, 999]
        //     { gt: 10, lte: 99, label: "10-99人", color: "#fe7b6c" }, // (10, 99]
        //     { gt: 0, lte: 9, label: "1-9人", color: "#ffaa85" }, // (0, 9]
        //   ],
        // },
        visualMap: {
          // min: 0,
          // max: 30,
          // text: ["最高值", "最低值"],
          realtime: false,
          calculable: true,
          splitNumber: 10,
          text: ["高", "低"],
          // type: 'piecewise', // 类型为分段型
          min: -5, //最小值区域  小于1  显示的green
          max: 5, //大于4显示
          // pieces: [
          //   // 自定义每一段的范围，以及每一段的文字
          //   { min: 0, max:1, color: '#fff' }, // 不指定 max，表示 max 为无限大（Infinity）。
          //   {
          //     min: 1,
          //     max: 2,
          //     color: 'rgb(194, 229, 194)',
          //   },
          //   {
          //     min: 2,
          //     max: 3,
          //     color: 'rgb(179, 231, 179)',
          //   },
          //   {
          //     min: 3,
          //     max: 4,
          //     color: 'rgb(162, 231, 162)',
          //   },
          //   {
          //     min: 4,
          //     max: 5,
          //     color: 'rgb(148, 235, 148)',
          //   },
          //   {
          //     min: 5,
          //     max: 6,
          //     color: 'rgb(129, 233, 129)',
          //   },
          //   {
          //     min: 6,
          //     max: 7,
          //     color: 'rgb(110, 233, 110)',
          //   },
          //   {
          //     min: 7,
          //     max: 8,
          //     color: 'rgb(95, 236, 95)',
          //   },
          //   {
          //     min: 8,
          //     max: 9,
          //     color: 'rgb(84, 212, 84)',
          //   },
          //   {
          //     min: 9,
          //     max: 10,
          //     color: 'rgb(69, 182, 69)',
          //   },
          //   // 不指定 min，表示 min 为无限大（-Infinity）。
          //   // padding: [0, 0, 40, 20],
          //   // textStyle: {
          //   //   color: 'white',
          //   // },
          //   // show: false,

          //   // calculable: true,
          //   // align: 'auto',
          //   // realtime: false,
          //   //  min: this.min,
          //   //         max: this.max,
          //   //         text: ['最高值', '最低值'],

          //   //         inRange: {
          //   //              color: ['#2d88eb', '#007aff', '#ff9119', '#d14759'],
          //   //         },
          // ],
          inRange: {
            // color: ["rgb(219, 192, 34)", "green"],
            color: ["rgb(235, 60, 60)", "#fff", "rgb(69, 182, 69)"],
          },
          bottom: 0,
          left: "left",
        },
        nameMap: {
          湖南省: "湖南",
          北京市: "北京",
          上海市: "上海",
          江西省: "江西",
          河南省: "河南",
          山西省: "山西",
          四川省: "四川",
          湖北省: "湖北",
          江苏省: "江苏",
          内蒙古自治区: "内蒙古",
          安徽省: "安徽",
          广东省: "广东",
          浙江省: "浙江",
          陕西省: "陕西",
          贵州省: "贵州",
          山东省: "山东",
          云南省: "云南",
          广西壮族自治区: "广西",
          吉林省: "吉林",
          南京省: "南京",
          重庆市: "重庆",
          黑龙江省: "黑龙江",
          海南省: "海南",
          新疆维吾尔自治区: "新疆",
          福建省: "福建",
          河北省: "河北",
          天津市: "天津",
          宁夏回族自治区: "宁夏",
          青海省: "青海",
          西藏自治区: "西藏",
          甘肃省: "甘肃",
          辽宁省: "辽宁",
          台湾省: "台湾",
          香港特别行政区: "香港",
          澳门特别行政区: "澳门",
        },
      };

      // var bar_qx = this.$refs.chart
      // // eslint-disable-next-line camelcase
      // let myChart = this.$echarts.init(bar_qx)
      // 使用刚指定的配置项和数据显示地图数据
      chinachart.setOption(chartOption);
      window.addEventListener("resize", function () {
        chinachart && chinachart.resize();
      });
      //根据浏览器大小改变大小
    },
  },
};
</script>

<style scoped lang="less">
.timedjs {
  position: absolute;
  color: #cecece;
  left: 5px;
  top: 48px;
}

.timedjs p {
  font-size: 16px;
}
</style>
