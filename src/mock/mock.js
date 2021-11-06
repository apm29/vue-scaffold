import Mock from "mockjs";

// 设置Mockjs全局属性
Mock.setup({
  timeout: "300-500",
});

import "./PoliceAffairsOnline/index";
import "./user/user";

console.log(1);
