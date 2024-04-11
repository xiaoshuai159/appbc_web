<template>
  <div id="abnormal-picture">
    <div class="abnormal-picture-info">
      <div>信息截图</div>
      <div class="abnormal-picture-info-div">
        <img class="abnormal-picture-info-img" :src="img" :alt="alt">
      </div>
    </div>
    <div class="abnormal-picture-text">
      <div>路由信息</div>
      <div class="abnormal-picture-text-div" v-html="traceRoute"></div>
    </div>
  </div>

</template>
<script>
// import { getResultScreenshot } from "@/api/task-management.js";
export default {
  name: "AbnormalPicture",
  data() {
    return {
      img: '',
      alt: '图片加载中...'
    }
  },
  props: ['screenshotPath', 'traceroute'],
  computed: {
    traceRoute(){
      if(this.traceroute && this.traceroute !== ''){
        return this.traceroute.split('\r\n').join('<br/>')
      }
    }
  },
  mounted() {
    this.getResultPicture({screenshotPath: this.screenshotPath})
  },
  // methods: {
  //   getResultPicture(obj){
  //     getResultScreenshot(obj).then(res => {
  //       if(res){
  //         if(res.size === 0){
  //           this.alt = '截图为空'
  //         }else{
  //           const href = window.URL.createObjectURL(res)
  //           this.img = href
  //         }
  //       }else{
  //         console.log('截图请求错误信息：', res);
  //       }
  //     })
  //   }
  // }
}
</script>
<style lang="less" scoped>
#abnormal-picture{
  height: 600px;
  display: flex;
  flex-direction: column;
  .abnormal-picture-info{
    flex: 7;
    .abnormal-picture-info-div {
      height: 396px;
      padding: 16px 0px;
      // DIV样式（元素居中显示）
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .abnormal-picture-info-img {
      // 纵向拉伸，横向自动匹配大小
      width: 100%;
      height: auto; 
      max-height: 100%; 
      max-width: 100%;
    }
  }
  .abnormal-picture-text{
    flex: 3;
    .abnormal-picture-text-div {
      // overflow-y: scroll;
      height: 156px;
      padding: 16px 0px;
    }
  }
}
</style>