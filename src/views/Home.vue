<template>
  <div class="home-page px-2 py-3">
    <div class="relative w-full rounded-lg overflow-hidden">
      <img
        src="/images/banner.jpg"
        alt="banner"
        class="filter blur-2 w-full h-23vh object-cover rounded-lg"
      />
      <h1 class="float-title">智安小区招标演示</h1>
    </div>
    <h2 class="px-3 py-5 text-sm text-gray-500 font-light">我的应用</h2>
    <van-grid>
      <van-grid-item text="成员管理" to="/members">
        <template #icon>
          <i class="mdi mdi-account-group-outline module-icon text-lime-600" />
        </template>
      </van-grid-item>
      <van-grid-item text="一户一档" to="/archives">
        <template #icon>
          <i class="mdi mdi-archive-outline module-icon text-orange-500" />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Home",
  setup() {
    return {};
  },
};
</script>
<style type="text/css" scoped>
.float-title {
  @apply absolute
  top-8
  text-xl
  font-bold
  left-6
  bg-clip-text
  text-transparent
  bg-gradient-to-r
  from-white
  to-white;
}
.module-icon {
  @apply text-3xl;
}
</style>
