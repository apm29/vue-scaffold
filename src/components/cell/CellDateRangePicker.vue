<template>
  <div class="cell-range-picker">
    <van-cell
      :title="title"
      is-link
      :value="dateValue"
      @click="open"
    ></van-cell>
    <van-calendar
      type="range"
      v-bind="$attrs"
      @confirm="onConfirm"
      @cancel="onCancel"
      get-container="#app"
      :title="title"
      v-model="show"
    >
    </van-calendar>
  </div>
</template>

<script>
import { computed, ref, toRefs, unref } from "@vue/composition-api";
import dayjs from "dayjs";
import { useToggle } from "@/helpers/composition-helpers";
import { formatter } from "@/plugins/dayjs";

export default {
  name: "CellDateRangePicker",
  props: {
    value: [Array],
    title: [String],
    format: {
      type: String,
      default() {
        return "YYYY/MM/DD";
      },
    },
  },
  setup(props, context) {
    const { value, format } = toRefs(props);
    const template = unref(format);
    const dateValue = computed({
      get: function () {
        const range = unref(value);
        return range && range.length === 2
          ? `${dayjs(range[0]).format(template)} 到
           ${dayjs(range[1]).format(template)}`
          : "未选择";
      },
      set: (value) => context.emit("input", value),
    });

    const { show, open, close } = useToggle();

    return {
      dateValue,
      show,
      open,
      close,
      formatter,
      onConfirm: function (range) {
        dateValue.value = range;
        close();
      },
      onCancel: function () {
        dateValue.value = [];
        close();
      },
    };
  },
};
</script>

<style lang="scss">
.cell-range-picker {
  .van-cell__value {
    flex: 2;
  }
}
</style>
