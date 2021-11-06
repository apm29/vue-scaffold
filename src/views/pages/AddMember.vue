<template>
  <div>
    <van-nav-bar
      :title="memberId ? '修改成员信息' : '添加家庭成员'"
      class="mb-3 sticky top-0 shadow"
      border
    ></van-nav-bar>
    <van-form>
      <van-field
        v-model="userInfo.memberName"
        name="成员姓名"
        label="成员姓名"
        placeholder="成员姓名"
        :rules="[{ required: true, message: '请填写用成员姓名' }]"
      />
      <van-cell title="成员照片">
        <FileUploader accept="image/*" v-model="userInfo.memberPicUrl">
        </FileUploader>
      </van-cell>
      <van-field
        v-model="userInfo.memberPhone"
        name="联系号码"
        label="联系号码"
        placeholder="联系号码"
        :rules="[{ required: true, message: '请填写联系号码' }]"
      />

      <van-field
        v-model="userInfo.idNo"
        name="身份证号"
        label="身份证号"
        placeholder="身份证号"
        :rules="[{ required: true, message: '请填写身份证号' }]"
      />
      <van-cell title="是否共享出入记录">
        <van-switch
          size="small"
          :active-value="1"
          :inactive-value="0"
          v-model="userInfo.isShare"
        ></van-switch>
      </van-cell>
      <CellOptionPicker
        title="选择成员类型"
        item-text="text"
        item-value="value"
        :items="memberType"
        v-model="userInfo.relationType"
      >
      </CellOptionPicker>
    </van-form>
    <div class="min-h-5rem"></div>
    <van-button class="fixed bottom-0" block type="primary" @click="handleSave">
      {{ memberId ? "保存修改" : "添加成员" }}
    </van-button>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import CellOptionPicker from "@/components/cell/CellOptionPicker";
import FileUploader from "@/components/file/FileUploader";
import remote from "@/remote/remote";
import { Notify } from "vant";

export default {
  name: "AddMember",
  components: { FileUploader, CellOptionPicker },
  props: {
    familyId: String,
    memberId: String,
  },
  setup(props, { root }) {
    const userInfo = reactive({
      memberName: null,
      memberPhone: null,
      memberPicUrl:
        "https://tse2-mm.cn.bing.net/th/id/OIP-C.Ehh4WM0vvtjH7DTGS7cicgHaLG?w=198&h=297&c=7&r=0&o=5&pid=1.7",
      relationType: null,
      idNo: null,
      isShare: 0,
    });
    onMounted(async () => {
      if (props.memberId) {
        const memberRes = await remote.postForm({
          url: "/business/member/getMemberInfo",
          data: {
            memberId: props.memberId,
          },
        });
        console.log(memberRes);
        userInfo.memberName = memberRes.data.membername;
        userInfo.memberPhone = memberRes.data.memberphone;
        userInfo.memberPicUrl = memberRes.data.memberpicurl;
        userInfo.relationType = memberRes.data.relationtype;
        userInfo.idNo = memberRes.data.idno;
        userInfo.isShare = memberRes.data.isShare || 0;
      }
    });
    const handleSave = async function () {
      const addMemberRes = await remote.postForm({
        url: props.memberId
          ? "/business/member/updateMember"
          : "/business/member/addMember",
        data: {
          familyId: props.familyId,
          memberId: props.memberId,
          memberName: userInfo.memberName,
          memberPhone: userInfo.memberPhone,
          memberPicUrl: userInfo.memberPicUrl,
          relationType: userInfo.relationType,
          idNo: userInfo.idNo,
          isShare: userInfo.isShare,
        },
      });
      Notify({
        type: "success",
        message: addMemberRes.text || "保存成功",
      });
      root.$router.back();
    };
    return {
      userInfo,
      handleSave,
      memberType: [
        {
          value: "家庭成员",
          text: "家庭成员",
        },
        {
          value: "访客",
          text: "访客",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
