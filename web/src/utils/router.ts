import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/user.ts"; // const user = useUserStore();

const routes = [
  {
    path: "/",
    meta: { title: "首页" },
    component: () => import("@/views/base/LayoutIndex.vue"),
    children: [
      {
        path: "/",
        meta: { title: "首页" },
        component: () => import("@/views/base/BaseIndex.vue"),
        children: [
          {
            path: "/detect",
            meta: { title: "检测" },
            component: () => import("@/views/base/detect/DetectIndex.vue"),
          },
          {
            path: "/detect/history",
            meta: { title: "检测历史" },
            component: () => import("@/views/base/detect/DetectHistory.vue"),
          },
          {
            path: "/detect/feedback",
            meta: { title: "检测反馈" },
            component: () => import("@/views/base/detect/DetectFeedback.vue"),
          },
          {
            path: "/network",
            meta: { title: "模型" },
            component: () => import("@/views/base/NetworkIndex.vue"),
          },
          {
            path: "/image",
            meta: { title: "图片" },
            component: () => import("@/views/base/image/ImageIndex.vue"),
          },
          {
            path: "/image/upload",
            meta: { title: "图片" },
            component: () => import("@/views/base/image/ImageUpload.vue"),
          },
        ],
      },
      {
        path: "/admin",
        meta: { title: "后台管理", needLogin: true },
        component: () => import("@/views/admin/LayoutIndex.vue"),
        children: [
          {
            path: "/admin",
            meta: { title: "首页", needLogin: true },
            component: () => import("@/views/admin/AdminIndex.vue"),
          },
          {
            path: "/admin/user",
            meta: { title: "用户管理", needLogin: true },
            component: () => import("@/views/admin/UserIndex.vue"),
          },
          {
            path: "/admin/log",
            meta: { title: "日志管理", needLogin: true },
            component: () => import("@/views/admin/LogIndex.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    meta: { title: "登录" },
    component: () => import("../views/login/LoginIndex.vue"),
  },
  {
    path: "/404",
    meta: { title: "404 Not Found" },
    component: () => import("@/views/pages/404NotFoundView.vue"),
  },
  {
    path: "/403",
    meta: { title: "403 Forbidden" },
    component: () => import("@/views/pages/403ForbiddenView.vue"),
  }, // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/404",
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const user = useUserStore();
  const needLogin = to.matched.some((record) => record.meta?.needLogin);
  console.log("needLogin", needLogin);
  if (needLogin) {
    const isLogin = user.checkLogin();
    console.log("isLogin", isLogin);
    if (isLogin) {
      next();
    } else {
      next("/403");
    }
  } else {
    next();
  }
});

export default router;
