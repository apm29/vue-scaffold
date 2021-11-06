<template>
  <div class="bg-gray-100 min-h-100vh">
    <van-nav-bar
      title="出入记录"
      class="sticky top-0 shadow"
      border
    ></van-nav-bar>
    <van-pull-refresh
      v-model="refreshingMission"
      @refresh="onPagination({ refresh: true })"
    >
      <van-list :finished="noMore" @load="onPagination">
        <van-empty
          description="暂无出入记录"
          v-if="!missionPagedData || !missionPagedData.length"
          image-size="5rem"
        ></van-empty>
        <van-cell
          :title="item.personname"
          :label="item.occurtime"
          v-for="item of missionPagedData"
          :key="item.id"
        >
          <span v-if="item.actiontype === 1">外出</span>
          <span v-if="item.actiontype === 2">回家</span>
        </van-cell>
        <div class="min-h-12rem"></div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { ref, unref } from "@vue/composition-api";
import remote from "@/remote/remote";

export default {
  name: "AccessRecords",
  props: {
    memberId: String,
  },
  setup(props) {
    //分页
    const missionPagedData = ref([]);
    const page = ref(1);
    const pageSize = ref(30);
    const total = ref(0);
    const loadingMission = ref(false);
    const noMore = ref(false);
    const refreshingMission = ref(false);

    async function onPagination({ refresh } = {}) {
      if (refresh) {
        page.value = 1;
        missionPagedData.value = [];
        refreshingMission.value = true;
        noMore.value = false;
      }
      loadingMission.value = true;
      try {
        const pagedData = await remote.postForm({
          url: "/business/inOutLog/getMemberLogs",
          data: {
            page: unref(page),
            rows: unref(pageSize),
            memberId: unref(props.memberId),
          },
        });
        missionPagedData.value = [
          ...unref(missionPagedData),
          ...pagedData.data.rows,
        ];
        total.value = pagedData.data.total;
        noMore.value = unref(total) <= unref(missionPagedData).length;
        page.value += 1;
      } finally {
        refreshingMission.value = false;
        loadingMission.value = false;
      }
    }

    return {
      missionPagedData,
      page,
      pageSize,
      total,
      loadingMission,
      noMore,
      refreshingMission,
      onPagination,
    };
  },
};
</script>

<style scoped></style>
