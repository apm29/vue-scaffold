import dd from "gdt-jsapi";
import { Notify } from "vant";
import ClipboardJS from "clipboard";
export async function copyText(content) {
  try {
    await dd.version();
    return dd.copyToClipboard({ text: content });
  } catch (e) {
    //非钉钉
    const text = document.createElement("p");
    text.setAttribute("data-clipboard-text", content);
    const copy = new ClipboardJS(text);
    copy.on("success", function () {
      Notify({
        message: "复制成功",
        type: "success",
        duration: 5000,
      });
    });
    copy.on("error", function () {
      Notify({
        message: "复制失败",
        type: "danger",
      });
    });
    text.click();
  }
}

export async function downloadByUrl(url, name) {
  try {
    await dd.version();
    return dd.downloadFile({
      url,
      name,
    });
  } catch (e) {
    //非钉钉
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
    link.remove();
  }
}

export async function openFileLink(url) {
  try {
    return await dd.openDownloadFile({
      url,
    });
  } catch (e) {
    Notify({
      message: JSON.stringify(e),
      type: "danger",
    });
    //非钉钉
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
    link.remove();
  }
}
