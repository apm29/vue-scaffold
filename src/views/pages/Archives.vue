<template>
  <div class="bg-gray-100">
    <van-nav-bar
      title="一户一档"
      class="sticky top-0 shadow"
      border
    ></van-nav-bar>
    <van-dropdown-menu active-color="#3467ff" class="sticky top-0 z-10">
      <van-dropdown-item v-model="currentBuilding" :options="buildingOptions" />
      <van-dropdown-item v-model="currentUnit" :options="unitOptions" />
      <van-dropdown-item v-model="currentRoom" :options="roomOptions" />
    </van-dropdown-menu>
    <template v-if="houseInfo">
      <div v-for="house of houseInfo" :key="house.addr">
        <van-cell-group title="户主" class="mb-3">
          <van-cell title="姓名"> {{ house.Owner.membername }} </van-cell>
          <van-cell title="联系电话"> {{ house.Owner.memberphone }} </van-cell>
          <van-cell title="身份证"> {{ house.Owner.idno }} </van-cell>
          <van-cell
            title="出入记录"
            is-link
            @click="toAccessRecord(house.Owner)"
          >
            查看出入记录
          </van-cell>
          <van-cell title="照片">
            <van-image
              class="w-45vw"
              :src="house.Owner.memberpicurl"
            ></van-image>
          </van-cell>
        </van-cell-group>
        <van-cell-group
          :title="member.relationtype"
          v-for="member of house.memberList"
          class="mb-3"
          :key="member.memberid"
        >
          <van-cell title="姓名"> {{ member.membername }} </van-cell>
          <van-cell title="联系电话"> {{ member.memberphone }} </van-cell>
          <van-cell title="身份证"> {{ member.idno }} </van-cell>
          <van-cell title="出入记录" is-link @click="toAccessRecord(member)">
            查看出入记录
          </van-cell>
          <van-cell title="照片">
            <van-image class="w-45vw" :src="member.memberpicurl"></van-image>
          </van-cell>
        </van-cell-group>
      </div>
    </template>
  </div>
</template>

<script>
import remote from "@/remote/remote";
import { computed, onMounted, ref, unref, watch } from "@vue/composition-api";

export default {
  name: "Archives",
  setup(props, { root }) {
    const buildings = ref([]);
    const currentBuilding = ref(null);
    const getHouses = async function () {
      const res = await remote.postForm({
        url: "/business/housedictInfo/getAllBuilding",
        data: {
          districtId: root.$store.getters.districtId,
        },
      });
      buildings.value = res.data;
      currentBuilding.value = unref(buildings)[0];
    };
    const units = ref([]);
    const currentUnit = ref(null);
    const getBuildingUnit = async function () {
      const res = await remote.postForm({
        url: "/business/housedictInfo/getAllUnit",
        data: {
          districtId: root.$store.getters.districtId,
          building: unref(currentBuilding),
        },
      });
      units.value = res.data;
      currentUnit.value = unref(units)[0];
    };
    const rooms = ref([]);
    const currentRoom = ref(null);
    const getUnitRoom = async function () {
      const res = await remote.postForm({
        url: "/business/housedictInfo/getAllRoom",
        data: {
          districtId: root.$store.getters.districtId,
          building: unref(currentBuilding),
          unit: unref(currentUnit),
        },
      });
      rooms.value = res.data;
      currentRoom.value = unref(rooms)[0];
    };
    onMounted(getHouses);
    watch(currentBuilding, getBuildingUnit);
    watch(currentUnit, getUnitRoom);

    const page = ref(1);
    const rows = ref(10);
    const houseInfo = ref([]);
    async function getHouseInfo() {
      const res = await remote.postForm({
        url: "/business/housedictInfo/getHouseInfo",
        data: {
          districtId: root.$store.getters.districtId,
          building: unref(currentBuilding),
          unit: unref(currentUnit),
          house: unref(currentRoom),
          page: unref(page),
          rows: unref(rows),
        },
      });
      houseInfo.value = res.data;
    }

    watch(currentRoom, getHouseInfo);

    return {
      buildingOptions: computed(() =>
        unref(buildings).map((it) => ({
          text: it,
          value: it,
        }))
      ),
      currentBuilding,
      unitOptions: computed(() =>
        unref(units).map((it) => ({
          text: it,
          value: it,
        }))
      ),
      currentUnit,
      roomOptions: computed(() =>
        unref(rooms).map((it) => ({
          text: it,
          value: it,
        }))
      ),
      currentRoom,
      houseInfo,
      toAccessRecord: function (member) {
        root.$router.push({
          path: "/records/access",
          query: {
            memberId: member.memberid,
          },
        });
      },
    };
  },
};
</script>

<style>
.van-cell__title {
  flex: 0.5;
}
</style>
