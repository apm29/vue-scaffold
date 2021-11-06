<template>
  <div class="flex justify-end">
    <van-uploader
      ref="uploader"
      :after-read="handleSuccess"
      v-model="fileList"
      :max-count="100"
      v-show="false"
    >
    </van-uploader>
    <div
      v-if="!value"
      class="h-36 w-36 bg-gray-200 flex items-center justify-center"
      @click="trigger"
    >
      <van-icon name="photograph" size="2rem"></van-icon>
    </div>
    <van-image
      fit="cover"
      v-if="value"
      :src="value"
      class="h-36 w-36 bg-gray-200 relative"
      @click="preview"
    >
      <div @click.stop="clear" class="van-uploader__preview-delete">
        <i class="van-icon van-icon-cross van-uploader__preview-delete-icon" />
      </div>
    </van-image>
  </div>
</template>

<script>
import { ref, toRefs, unref } from "@vue/composition-api";
import { Dialog, ImagePreview, Notify } from "vant";
import { uploadFile } from "@/api/files";

export default {
  name: "FileUploader",
  props: {
    value: String,
  },
  setup(props, context) {
    const { value } = toRefs(props);
    const fileList = ref([]);
    const uploader = ref(null);
    const handleSuccess = async function (file) {
      try {
        const res = await uploadFile(file.file);
        context.emit("input", res.data.filePath);
        context.emit("file-info", file, res.data);
      } catch (e) {
        alert(JSON.stringify(e));
        await Dialog.confirm({
          message: JSON.stringify(e),
          title: "错误信息",
        });
        handleError();
      }
    };
    const handleError = function () {
      Notify({
        title: "未知错误",
        message: "文件上传失败",
        type: "danger",
      });
    };
    return {
      handleSuccess,
      handleError,
      fileList,
      uploader,
      clear: function () {
        context.emit("input", null);
      },
      trigger: function () {
        fileList.value = [];
        unref(uploader).chooseFile();
      },
      preview: function () {
        ImagePreview({
          images: [unref(value)],
          closeable: true,
        });
      },
    };
  },
};
</script>

<style scoped></style>
