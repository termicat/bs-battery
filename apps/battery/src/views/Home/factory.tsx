import { BsSdk } from "@bc/sdk/BsSdk";

export const bsSdk = new BsSdk({
  onDashDataChange: true,
  onDashConfigChange: true,
  onThemeChange: true,
});
