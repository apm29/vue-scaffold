import Vue from "vue";
import VueRouter from "vue-router";
import dd from "gdt-jsapi";
import dayjs from "dayjs";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: { title: "智安小区招标演示" },
  },
  {
    path: "/members",
    name: "Members",
    component: () => import("@/views/pages/Members.vue"),
    meta: { title: "成员管理" },
  },
  {
    path: "/members/add",
    name: "AddMember",
    component: () => import("@/views/pages/AddMember.vue"),
    props: (route) => ({
      familyId: route.query.familyId,
      memberId: route.query.memberId,
    }),
    meta: { title: "添加家庭成员" },
  },
  {
    path: "/records/access",
    name: "AccessRecords",
    component: () => import("@/views/pages/AccessRecords.vue"),
    props: (route) => ({
      personId: route.query.personId,
      memberId: route.query.memberId,
    }),
    meta: { title: "出入记录" },
  },
  {
    path: "/archives",
    name: "Archives",
    component: () => import("@/views/pages/Archives.vue"),
    meta: { title: "一户一档" },
  },

  //功能路由
  {
    path: "/401",
    name: "Unauthorized",
    component: () => import("@/views/functional/401.vue"),
    meta: { hideInMenu: true, title: "401" },
  },
  {
    path: "/500",
    name: "InternalError",
    component: () => import("@/views/functional/500.vue"),
    props: (route) => ({ code: route.query.code, desc: route.query.desc }),
    meta: { hideInMenu: true, title: "500" },
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/functional/404.vue"),
    meta: { hideInMenu: true, title: "404" },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    await dd.setTitle({
      title: to.meta.title,
    });
  } catch (e) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
