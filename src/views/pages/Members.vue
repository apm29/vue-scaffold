<template>
  <div class="h-full member-page">
    <van-dropdown-menu
      v-if="housesOptions && housesOptions.length"
      active-color="#3497ff"
      class="sticky top-0 z-10"
    >
      <van-dropdown-item v-model="currentHouseId" :options="housesOptions" />
    </van-dropdown-menu>

    <van-pull-refresh
      v-model="refresh"
      @refresh="getHouseMembers"
      class="px-4 mb-3 bg-gray-100"
    >
      <div class="py-3">
        <div
          class="
            text-sm text-gray-600
            mb-3
            border-l-3
            font-bold
            border-blue-500
            px-1
          "
        >
          通行码
        </div>
        <div
          class="border-sky-300 border-3 rounded text-center relative"
          v-for="passcode of passcodes"
          :key="passcode.passCode"
        >
          <i
            class="
              p-2
              absolute
              top-0
              right-1
              text-lg text-red-500
              mdi mdi-refresh
            "
            @click="getHousePasscode"
          />
          <div
            class="text-3xl px-3 bg-sky-200 py-2 font-extrabold tracking-widest"
          >
            {{ passcode.passCode }}
          </div>
          <div
            @click="showPasscodeQr(passcode.passCode)"
            class="text-gray-500 bg-white px-3 py-1"
          >
            {{ passcode.houseAddress }}
            <i class="mdi mdi-qrcode-scan text-lg text-blue-600 ml-3" />
          </div>
        </div>
      </div>
      <div
        class="
          text-sm text-gray-600
          mb-3
          border-l-3
          font-bold
          border-blue-500
          px-1
        "
      >
        一键开门
      </div>
      <van-button
        @click="handleOpenDoor"
        class="mb-3"
        plain
        hairline
        type="danger"
        block
      >
        <div class="flex items-center">
          一键开门
          <i class="mdi mdi-lock-open ml-2 text-2xl" />
        </div>
      </van-button>
      <van-action-sheet v-model="showDoors" title="选择门禁">
        <div class="px-3 py-2">
          <van-cell-group
            :title="doorName"
            border
            v-for="doorName of Object.keys(doors || {})"
            :key="doorName"
          >
            <van-cell
              :title="doorItem.districtName"
              :label="`门禁类型:${doorItem.type}`"
              v-for="doorItem of doors[doorName]"
              :key="doorItem.id"
              is-link
              @click="doDoorOpen(doorItem)"
            >
              <template #icon>
                <i
                  class="mdi mdi-lock-open-outline text-3xl text-red-600 mr-2"
                />
              </template>
              开门
            </van-cell>
          </van-cell-group>
        </div>
      </van-action-sheet>
      <van-empty
        image-size="4rem"
        class="col-12"
        v-if="!members || !members.length"
        description="未找到成员数据，您可以尝试添加成员。"
      >
      </van-empty>
      <div
        class="
          text-sm text-gray-600
          mb-3
          border-l-3
          font-bold
          border-blue-500
          px-1
        "
      >
        成员
      </div>
      <div
        class="shadow bg-white rounded p-2 overflow-hidden w-full mb-3"
        v-for="(item, index) in members"
        :key="index"
      >
        <div class="flex relative">
          <img
            :src="item.memberpicurl"
            alt="头像"
            class="w-24vw h-32vw mr-2 rounded object-cover"
          />
          <i class="mdi mdi-open-in-app absolute top-1 right-1 text-blue-500" />
          <div class="p-2 flex-grow" @click="toAccessRecord(item)">
            <div class="text-nowrap text-truncate font-bold text-gray-600">
              {{ item.membername }}
            </div>
            <div class="text-nowrap text-sm text-gray-400">
              状态：
              <span v-if="!item.memberstatus">未知</span>
              <span v-if="item.memberstatus === 1">外出</span>
              <span v-if="item.memberstatus === 2">已回家</span>
            </div>
            <div class="text-nowrap text-sm text-gray-400">
              关系：
              <span>{{ item.relationtype || "未知" }}</span>
            </div>
          </div>
        </div>
        <van-divider class="m-0 my-1" />
        <div class="flex justify-end">
          <button
            @click="handleEditMember(item)"
            class="flex text-blue-500 items-center text-sm mr-4"
          >
            <i class="mdi mdi-account-edit text-lg" />编辑
          </button>
          <button
            @click="handleDeleteMember(item)"
            class="flex text-red-500 items-center text-sm"
          >
            <i class="mdi mdi-delete text-lg" />删除
          </button>
        </div>
      </div>
      <div class="min-h-5rem"></div>
    </van-pull-refresh>
    <van-button
      class="fixed bottom-0 z-10"
      block
      type="primary"
      :to="{
        path: '/members/add',
        query: {
          familyId: currentHouseId,
        },
      }"
    >
      添加成员
      <i class="mdi mdi-account-plus" />
    </van-button>
    <van-dialog v-model="show">
      <van-image class="w-full" :src="qrCodeDataUrl"></van-image>
    </van-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode";
import { computed, onMounted, ref, unref, watch } from "@vue/composition-api";
import remote from "@/remote/remote";
import { Dialog, Notify } from "vant";
import { useToggle } from "@/helpers/composition-helpers";

export default {
  name: "Members",
  setup(props, { root }) {
    const houses = ref([]);
    const currentHouseId = ref(null);
    const members = ref([]);
    const tenants = ref([]);
    const refresh = ref(false);
    const passcodes = ref([]);
    const getHouses = async function () {
      const houseRes = await remote.postForm({
        url: "/business/houseInfo/getMyHouse",
        data: {
          districtId: 1,
        },
      });
      houses.value = houseRes.data || [];
      if (!unref(currentHouseId) && unref(houses)?.length) {
        currentHouseId.value = unref(houses)[0]?.houseId;
      }
    };
    const getHouseMembers = async function () {
      try {
        refresh.value = true;
        const res = await remote.postForm({
          url: "/business/member/getFamilyMember",
          data: {
            familyId: unref(currentHouseId),
          },
        });
        members.value = res.data.familyMember || [];
        tenants.value = res.data.tenant || [];
      } finally {
        refresh.value = false;
      }
    };
    const getHousePasscode = async function () {
      const res = await remote.postForm({
        url: "/business/visitor/getMyPassCode",
        data: {
          houseId: unref(currentHouseId),
          districtId: root.$store.getters.districtId,
          lazy: true,
        },
      });
      passcodes.value = res.data;
    };
    const qrCodeDataUrl = ref(null);
    const { show } = useToggle();
    const showPasscodeQr = async function (text) {
      qrCodeDataUrl.value = await QRCode.toDataURL(text);
      show.value = true;
    };
    watch(currentHouseId, getHouseMembers);
    watch(currentHouseId, getHousePasscode);
    onMounted(getHouses);

    //开门
    const doors = ref(null);
    const { show: showDoors } = useToggle();
    const handleOpenDoor = async function () {
      const res = await remote.postForm({
        url: "/business/gateDict/query",
        data: {
          districtId: root.$store.getters.districtId,
        },
      });
      doors.value = res.data;
      showDoors.value = true;
    };

    return {
      refresh,
      houses,
      currentHouseId,
      members,
      tenants,
      getHouses,
      getHouseMembers,
      passcodes,
      getHousePasscode,
      showPasscodeQr,
      qrCodeDataUrl,
      show,
      housesOptions: computed(() =>
        unref(houses).map((it) => ({
          text: it.addr,
          house: it,
          value: it.houseId,
        }))
      ),
      handleEditMember: function (member) {
        root.$router.push({
          path: "/members/add",
          query: {
            familyId: unref(currentHouseId),
            memberId: member.memberid,
          },
        });
      },
      handleDeleteMember: async function (member) {
        const confirm = await Dialog.confirm({
          title: "确认删除该成员吗",
          message: "删除后将无法恢复",
        });
        if (confirm) {
          const addMemberRes = await remote.postForm({
            url: "/business/member/deleteMember",
            data: {
              memberId: member.memberid,
            },
          });
          Notify({
            type: "warning",
            message: addMemberRes.text || "删除成功",
          });
          await getHouseMembers();
        }
      },
      handleOpenDoor,
      doors,
      showDoors,
      doDoorOpen: async function (door) {
        await remote.postForm({
          url: "/business/gateDict/open",
          data: {
            gateId: door.gateId,
          },
        });
        showDoors.value = false;
        await Dialog({
          title: "提示",
          message: "开门请求已发送,开门会有5秒钟左右的延时,请您耐心等待",
        });
      },
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

<style lang="scss">
.member-page {
  button {
    @apply focus:outline-none;
  }
}
</style>
