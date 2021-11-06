import Vue from "vue";
import dayjs from "dayjs";

const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);
const isToday = require("dayjs/plugin/isToday");

dayjs.extend(isToday);

Vue.prototype.$dayjs = dayjs;
