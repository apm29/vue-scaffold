import Vue from "vue";
import Vuex from "vuex";
import {
  getToken,
  getUserInfo,
  setUserInfo,
  setToken,
  getDistrictList,
  setDistrictList,
} from "@/storage/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    userInfo: getUserInfo(),
    districtList: getDistrictList(),
    currentDistrict: null,
  },
  mutations: {
    SET_DISTRICT_LIST(state, districtList) {
      console.log(districtList);
      state.districtList = districtList;
      state.currentDistrict = districtList?.[0] ?? null;
      setDistrictList(districtList);
    },
    SET_USER_INFO(state, userInfo) {
      console.log(userInfo);
      state.userInfo = userInfo;
      setUserInfo(userInfo);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
  },
  getters: {
    appList: function (state) {
      return state.userInfo.appList;
    },
    userId: function (state) {
      return state.userInfo.userId;
    },
    districtId: function (state) {
      return state.currentDistrict?.districtId;
    },
  },
  actions: {},
  modules: {},
});
