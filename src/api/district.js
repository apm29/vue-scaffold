import remote from "@/remote/remote";

export function findMyDistrictInfo() {
  return remote.postForm({
    url: "/business/district/findMyDistrictInfo",
  });
}
