import { BsSdk } from "@/libs/bs-sdk/BsSdk";

export const bsSdk = new BsSdk({
  onDashDataChange: true,
  onDashConfigChange: true,
});
