import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/vant";
import "@/plugins/dayjs";
import "@/plugins/composition-api";
import "@/remote/remote-config";
import "@mdi/font/css/materialdesignicons.min.css";
import "windi.css";
// import "@/mock/mock";
import { findMyDistrictInfo } from "@/api/district";
import InitializationFailed from "@/views/functional/InitializationFailed";

Vue.config.productionTip = false;

store.commit(
  "SET_TOKEN",
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhbnhpbmp1IjoiMTYyNjY3NzM1MjExNzUxNzM2NjAiLCJjcmVhdGVkIjoxNjM1OTAxNjcxOTA4LCJuaWNrTmFtZSI6IuWtmeadsCIsImF2YXRhciI6Imh0dHA6Ly9maWxlcy5jaWloLm5ldC9NMDAvMDcvNEQvd0tqSW8xMUtiQ1dBWkd4eUFBRXZjbXFxNzZFODYyLmpwZyIsInVzZXJOYW1lIjoi5a2Z5p2wIn0.AfIrSpFlE8Q6UCuc9sTzf68bSH6uOBLSHKNx3puTmr4"
);

findMyDistrictInfo()
  .then((res) => {
    store.commit("SET_DISTRICT_LIST", res.data);
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  })
  .catch((err) => {
    new Vue({
      router,
      store,
      render: (h) => h(InitializationFailed),
    }).$mount("#app");
  });
