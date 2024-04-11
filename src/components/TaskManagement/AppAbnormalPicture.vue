<template>
  <div id="abnormal-picture">
    <div class="abnormal-picture-info">
      <div>信息截图</div>
      <div class="abnormal-picture-info-div">
        <img class="abnormal-picture-info-img" :src="img1" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppAbnormalPicture",
  data() {
    return {
      img1:this.img
    }
  },
  props:['img'],
  mounted() {},
  methods :{},
}
</script>
<style lang="less" scoped>
#abnormal-picture{
  height: 580px;
  display: flex;
  flex-direction: column;
  .abnormal-picture-info{
    flex: 7;
    .abnormal-picture-info-div {
      height: 575px;
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