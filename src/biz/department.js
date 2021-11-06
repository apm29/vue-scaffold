import { onMounted, ref, unref } from "@vue/composition-api";
import { getPagedDepartment } from "@/api/dept";

const departmentDict = ref([]);
export function useDepartment() {
  const currentDepartmentId = ref(null);
  const loadingDepartment = ref(false);
  onMounted(async () => {
    //不重复请求,缓存原来的
    if (unref(departmentDict).length) {
      currentDepartmentId.value = unref(departmentDict)[0].id;
      return;
    }
    try {
      loadingDepartment.value = true;
      const res = await getPagedDepartment({
        pageSize: 999,
        pageNo: 1,
      });
      departmentDict.value = res.data.records;
      currentDepartmentId.value = unref(departmentDict)[0].id;
    } catch (e) {
      loadingDepartment.value = false;
    }
  });
  const getDepartmentNameById = function (id) {
    return unref(departmentDict).find((it) => it.id === id)?.name;
  };

  return {
    currentDepartmentId,
    loadingDepartment,
    departmentDict,
    getDepartmentNameById,
  };
}
