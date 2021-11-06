<template>
  <div class="cell-datetime-picker">
    <van-cell
      :title="title"
      is-link
      :value="internalValue"
      @click="open"
    ></van-cell>
    <van-action-sheet get-container="#app" :title="title" v-model="show">
      <van-datetime-picker
        :formatter="formatter"
        v-bind="$attrs"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
      </van-datetime-picker>
    </van-action-sheet>
  </div>
</template>

<script>
import { computed, ref, toRefs, unref } from "@vue/composition-api";
import dayjs from "dayjs";
import { useToggle } from "@/helpers/composition-helpers";
import { formatter } from "@/plugins/dayjs";
export default {
  name: "CellDatetimePicker",
  props: {
    value: [String],
    title: [String],
    format: {
      type: String,
      default() {
        return "YYYY-MM-DD HH:mm:ss";
      },
    },
  },
  setup(props, context) {
    const { value, format } = toRefs(props);
    const template = unref(format);
    const internalValue = computed({
      get: function () {
        const date = unref(value);
        return date ? dayjs(date).format(template) : "未选择";
      },
      set: (value) => context.emit("input", dayjs(value).format(template)),
    });

    const { show, open, close } = useToggle();

    return {
      internalValue,
      show,
      open,
      close,
      formatter,
      onConfirm: function (value) {
        internalValue.value = value;
        close();
      },
      onCancel: function () {
        close();
      },
    };
  },
};
</script>

<style lang="scss">
.cell-datetime-picker {
  .van-cell__title {
    flex: 0.5;
  }
}
</style>
