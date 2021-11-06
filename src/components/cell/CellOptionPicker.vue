<template>
  <div>
    <van-cell
      :title="title"
      is-link
      :value="internalValue"
      @click="open"
    ></van-cell>
    <van-action-sheet get-container="#app" :title="title" v-model="show">
      <van-picker
        show-toolbar
        :columns="itemNames"
        v-bind="$attrs"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
      </van-picker>
    </van-action-sheet>
  </div>
</template>

<script>
import { computed, toRefs, unref } from "@vue/composition-api";
import { useToggle } from "@/helpers/composition-helpers";

export default {
  name: "CellOptionPicker",
  props: {
    value: [Object, String, Number],
    title: [String],
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    itemText: String,
    itemValue: String,
    returnObject: Boolean,
  },
  setup(props, context) {
    const { value, items } = toRefs(props);
    const itemText = props.itemText;
    const itemValue = props.itemValue;
    const returnObject = props.returnObject;

    const internalValue = computed({
      get: function () {
        const itemObjectList = unref(items);
        const propsValue = unref(value);
        if (returnObject) {
          return propsValue ? propsValue[itemText] ?? "未知名称" : "未选择";
        } else {
          const object = itemObjectList?.find(
            (it) => it[itemValue] === propsValue
          );
          return object ? object[itemText] ?? "未知名称" : "未选择";
        }
      },
      set: (value) => context.emit("input", value),
    });

    const { show, open, close } = useToggle();
    const itemNames = computed(() =>
      unref(items)?.map((it) => it[itemText] ?? "未知名称")
    );
    return {
      internalValue,
      show,
      open,
      close,
      itemNames,
      onConfirm: function (label, index) {
        const value = unref(items)[index];
        internalValue.value = returnObject
          ? value
          : value
          ? value[itemValue]
          : undefined;
        close();
      },
      onCancel: function () {
        internalValue.value = null;
        close();
      },
    };
  },
};
</script>

<style scoped></style>
