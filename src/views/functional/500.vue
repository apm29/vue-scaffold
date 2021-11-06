<template>
  <div class="error-page">
    <div class="content-con">
      <img src="@/assets/500_images/error-500.svg" :alt="code" />
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <div class="back-btn-group d-flex">
        <a href="#/">返回首页</a>
        <!--        <a href="#/login">重新登录</a>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    code: {
      type: String,
      default: "500",
    },
    desc: {
      type: String,
      default: "未知错误",
    },
  },
};
</script>
<style lang="scss">
.error-page {
  width: 100%;
  height: 100%;
  padding: 16px;

  .content-con {
    width: 100%;
    height: 100%;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .text-con {
      h4 {
        font-size: 80px;
        font-weight: 700;
        color: #348eed;
      }

      h5 {
        font-size: 20px;
        font-weight: 700;
        color: #67647d;
      }
    }

    .back-btn-group {
      position: absolute;
      right: 0;
      bottom: 20px;
      a {
        color: #348eed;
        margin-right: 2rem;
      }
    }
  }
}
</style>
