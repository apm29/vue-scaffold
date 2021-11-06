import Mock from "mockjs";
import qs from "qs";

let domain = "http://axjwx.ciih.net";
Mock.mock(domain + "/business/voluntary/query", "post", function (req) {
  console.log("mock: /business/voluntary/query");
  req = qs.parse(req.body);

  let res = {};
  if (req.type == "1") {
    res.data = [
      {
        id: "1",
        title: "交通文明活动",
        content:
          "为进一步提升市民交通安全意识，改善路口交通拥堵现状，特别在五月举行交通路口文明劝导活动。",
        startDate: "2019-05-11",
        endDate: "2019-05-20",
        thumbs: "33",
        views: "53",
        type: "1",
      },
      {
        id: "2",
        title: "卫生大扫除",
        content:
          "为迎接国家卫生城市复检，进一步清理小区卫生死角，特别在六月举行小区卫生死角检查清理活动。",
        startDate: "2019-06-01",
        endDate: "2019-06-15",
        thumbs: "33",
        views: "53",
        type: "1",
      },
    ];
  }
  if (req.type == "2") {
    res.data = [
      {
        id: "1",
        title: "交通文明活动",
        content:
          "为进一步提升市民交通安全意识，改善路口交通拥堵现状，特别在五月举行交通路口文明劝导活动。",
        startDate: "2019-05-11",
        endDate: "2019-05-20",
        thumbs: "33",
        views: "53",
        type: "1",
      },
      {
        id: "2",
        title: "卫生大扫除",
        content:
          "为迎接国家卫生城市复检，进一步清理小区卫生死角，特别在六月举行小区卫生死角检查清理活动。",
        startDate: "2019-06-01",
        endDate: "2019-06-15",
        thumbs: "33",
        views: "53",
        type: "1",
      },
    ];
  }
  if (req.type == "3") {
    res.data = [
      {
        id: "1",
        title: "交通文明活动",
        content:
          "为进一步提升市民交通安全意识，改善路口交通拥堵现状，特别在五月举行交通路口文明劝导活动。",
        startDate: "2019-05-11",
        endDate: "2019-05-20",
        thumbs: "33",
        views: "53",
        type: "1",
      },
      {
        id: "2",
        title: "卫生大扫除",
        content:
          "为迎接国家卫生城市复检，进一步清理小区卫生死角，特别在六月举行小区卫生死角检查清理活动。",
        startDate: "2019-06-01",
        endDate: "2019-06-15",
        thumbs: "33",
        views: "53",
        type: "1",
      },
    ];
  }

  res.status = "1";
  console.log(res);
  return res;
});
