<template>
  <div id="device-status" class="block_base" style="height: 160px;">
    <!-- <div class="guwang">
      <span class="device-status">固网设备状态</span>
      <div style="flex: 1; display: flex">
        <div class="device-number">
          <div>
            <span class="device-num-online">{{onlineDeviceNumber}}</span
            ><span class="device-text">台</span>
          </div>
          <span class="device-number-text">在线设备数量</span>
        </div>
        <div class="device-number" style="border-right: 1px solid #cecece">
          <div>
            <span class="device-num">{{offlineDeviceNumber}}</span
            ><span class="device-text">台</span>
          </div>
          <span class="device-number-text">离线设备数量</span>
        </div>
      </div>
    </div> -->
    <div class="yidongduan">
      <span class="device-status">移动端设备状态</span>
      <div style="flex: 1; display: flex">
        <div class="device-number">
          <div>
            <span class="device-num-online">{{ zxNumPhone }}</span><span class="device-text">台</span>
          </div>
          <span class="device-number-text">在线设备数量</span>
        </div>
        <div class="device-number">
          <div>
            <span class="device-num">{{ lxNumPhone }}</span><span class="device-text">台</span>
          </div>
          <span class="device-number-text">离线设备数量</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {getPCDeviceState} from "@/api/home"
export default {
  name: "DeviceStatus",
  data() {
    return {
      zxNumPhone: 0,
      lxNumPhone: 0,
      onlineDeviceNumber: 0,
      offlineDeviceNumber: 0,
    };
  },
  watch: {
    address: {
      handler(newVal) {
        // console.log(newVal);
        if (newVal.second == "00" && newVal.minute == "00") {
          this.onlineNumPhone();
        }
      },
    },
  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  created() {
    this.onlineNumPhone();
  },
  // mounted() {
  //   this.getPCDeviceStateVal()
  // },
  methods: {
    // 移动端设备在线数量
    async onlineNumPhone() {
      const { data: res } = await this.$http.get("/client/lineNum");
      if (res.code == 200) {
        this.zxNumPhone = res.data.online;
        this.lxNumPhone = res.data.offline;
      }
    },
    // 固网设备状态
    // getPCDeviceStateVal() {
    //   getPCDeviceState().then(res => {
    //     if(res.code === 200) {
    //       this.onlineDeviceNumber = res.data.online
    //       this.offlineDeviceNumber = res.data.offline
    //     }else{
    //       console.log('pc-device-state请求失败信息: ', res);
    //     }
    //   })
    // }
  },
};
</script>
<style lang="less" scoped>
.guwang,
.yidongduan {
  flex: 1;
  display: flex;
  flex-direction: column;

  .device-status {
    text-align: center;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 22px;
    color: #333333;
  }

  .device-number {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .device-num,
    .device-num-online {
      font-family: Microsoft YaHei;
      font-size: 52px;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
      -webkit-background-clip: text;
      color: transparent;
    }

    .device-num {
      background-image: linear-gradient(180deg, #f74e57 0%, #df2020 100%);
    }

    .device-num-online {
      background-image: linear-gradient(180deg, #4abe86 0%, #009c51 100%);
    }

    .device-text {
      font-family: Microsoft YaHei;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      color: #666666;
      margin-left: 12px;
    }

    .device-number-text {
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 22px;
      color: #333333;
      padding-top: 16px;
    }
  }
}</style>