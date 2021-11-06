import Mock from "mockjs";
import qs from "qs";

let domain = "http://axjwx.ciih.net";
Mock.mock(
  domain + "/business/ConvenientMap/getAllType",
  "post",
  function (req) {
    console.log("mock: /business/ConvenientMap/getAllType");
    req = qs.parse(req.body);

    let res = {
      status: "1",
      data: [
        {
          typeId: 1,
          typeName: "派出所",
        },
        {
          typeId: 2,
          typeName: "消防设施点",
        },
        {
          typeId: 3,
          typeName: "代办点",
        },
        {
          typeId: 4,
          typeName: "车管所",
        },
        {
          typeId: 5,
          typeName: "交警大队",
        },
      ],
      token: "",
      text: "",
    };
    console.log(res);
    return res;
  }
);

Mock.mock(
  domain + "/business/ConvenientMap/getPiontByType",
  "post",
  function (req) {
    console.log("mock: /business/ConvenientMap/getPiontByType");
    console.log("req:", req);
    req = qs.parse(req.body);
    let data = [];

    switch (req.type) {
      case "1":
        data = [
          {
            id: "4",
            lng: "120.227776",
            lat: "29.735426",
            name: "工业新城派出所治安巡逻点",
            phone: "0575-87113044",
            contact: "张警官",
          },
          {
            id: "5",
            lng: "120.233129",
            lat: "29.736875",
            name: "工业新城派出所治安巡逻点2",
            phone: "0575-87113045",
            contact: "王警官",
          },
        ];
        break;
      case "2":
        data = [
          {
            id: "1",
            lng: "120.227856",
            lat: "29.732462",
            name: "测试消防1",
            phone: "0575-8821930",
          },
          {
            id: "2",
            lng: "120.224192",
            lat: "29.737176",
            name: "测试消防222",
            phone: "0575-8823910",
          },
          {
            id: "3",
            lng: "120.228473",
            lat: "29.738299",
            name: "消防33",
            phone: "0575-87220133",
          },
        ];
      default:
        break;
    }

    let res = {
      status: "1",
      data: data,
    };
    console.log(res);
    return res;
  }
);

Mock.mock(
  domain + "/business/ConvenientMap/getOnePiont",
  "post",
  function (req) {
    console.log("mock: /business/ConvenientMap/getOnePiont");
    console.log("req:", req);

    let res = {
      status: "1",
      data: {
        id: "3",
        lng: "120.228473",
        lat: "29.738299",
        name: "消防33",
        phone: "0575-87220133",
      },
    };
    console.log(res);
    return res;
  }
);
