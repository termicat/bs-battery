import { DashboardState, ThemeModeType } from "@lark-base-open/js-sdk";
import { bsSdk } from "./factory";
import ViewPanel from "./ViewPanel";
import ConfigPanel from "./ConfigPanel";
import { useEffect } from "react";
import i18n from "@bc/i18n";

const mql = window.matchMedia("(prefers-color-scheme: dark)");

function matchMode(e: any) {
  console.log("matchMode", e.matches);

  const body = document.body;
  if (e.matches) {
    if (!body.hasAttribute("theme-mode")) {
      body.setAttribute("theme-mode", "dark");
    }
  } else {
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    }
  }
}

mql.addEventListener("change", matchMode);

export default function App() {
  useEffect(() => {
    async function switchLang() {
      const lang = await bsSdk.getLang();
      i18n.changeLanguage(lang.includes("zh") ? "zh" : lang);
    }

    switchLang();

    return bsSdk.emThemeChange.on(async (event) => {
      const theme = event.data.theme;
      const body = document.body;
      console.log("emThemeChange", theme);

      if (theme === ThemeModeType.DARK) {
        body.setAttribute("theme-mode", "dark");
      } else {
        body.removeAttribute("theme-mode");
      }
    });
  }, []);
  switch (bsSdk.getDashState()) {
    case DashboardState.View:
      return ViewPanel({});
    case DashboardState.FullScreen:
      document.body.setAttribute("theme-mode", "dark");

      return ViewPanel({});
    default:
      return ConfigPanel({});
  }
}
