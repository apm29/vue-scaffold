import remote from "@/remote/remote";

export function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return remote.postFile({
    url: "/business/upload/uploadFile",
    data: formData,
  });
}
